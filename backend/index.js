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

app.get('/test', async (req,res) => {
  console.log('a request has been made');
  return res.send('hello from server');
});

app.listen(process.env.PORT, () => console.log(`Server listening on port: ${process.env.PORT}`));