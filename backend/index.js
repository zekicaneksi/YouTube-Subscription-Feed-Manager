import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import Axios from 'Axios';
import passport from 'passport';
import session from 'express-session';
import googleAuth from 'passport-google-oauth20';
import * as dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, `.env.${process.env.NODE_ENV}`) });

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ADDRESS);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});

app.use(session({
  secret: process.env.SECRET,
  resave: false ,
  saveUninitialized: true ,
}));

app.use(passport.initialize());
app.use(passport.session());  

var GoogleStrategy = googleAuth.Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.refreshToken=refreshToken;
    return cb(null, profile);
  }
));

passport.serializeUser( (user, done) => { done(null, user)} );
passport.deserializeUser((user, done) => {done (null, user)});

// Middleware
function checkAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send(JSON.stringify('/auth/google'));
  return next();
}

app.get('/checkAuthenticated', checkAuthenticated, async (req, res) => {
  return res.status(200).send();
});

app.get('/auth/google', (req, res, next) => {
  if (req.query.return) {req.session.oauth2return = req.query.return;}
  next();
  },
  passport.authenticate('google', { accessType:'offline', prompt:'consent', scope: [
    'https://www.googleapis.com/auth/youtube.readonly',
    "profile"] })
);

app.get(process.env.CALLBACK_URL,
  function (req, res, next) {
    if(req.session.oauth2return) req.oauth2return = req.session.oauth2return;
    next();
  },
  passport.authenticate('google'),
  function(req, res) {
    return res.redirect(req.oauth2return);
  }
);

app.get('/logout', checkAuthenticated, async (req, res) => {
  req.logout(function (err) {
    if (err) {
    return next(err);
    }
    return res.status(200).send();
  });
  return res.status(500).send();
});

app.get('/getAcessToken', checkAuthenticated, async (req,res) => {
  let toReturn='';
  await Axios
  .post('https://oauth2.googleapis.com/token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: req.user.refreshToken
  })
  .then(res => {
    toReturn = res.data.access_token;
  })
  .catch(error => {
    console.log(error);
  });
  return res.send(JSON.stringify(toReturn));
});

app.listen(process.env.PORT, () => console.log(`Server listening on port: ${process.env.PORT}`));