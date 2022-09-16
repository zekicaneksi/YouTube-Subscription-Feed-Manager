# YouTube-Subscription-Feed-Manager
A site that ables you to filter and see your subscription feed better.


## Environment Variables
### Note
The frontend and backend are de-coupled (separate apps).
### Front-end
- In the `frontend/package.json` file's `scripts` setting, the ports must be changed to your liking;
```
  "scripts": {
    "dev": "next dev --port 3000",  --- Development Port
    "build": "next build",
    "start": "next start --port 2000", --- Production Port
    "lint": "next lint"
  }
```
- `.env.development` file with such variables must be created in `frontend/`;
```
NEXT_PUBLIC_BACKEND_ADDRESS="<BACKEND_ADRESS>" --- example "http://localhost:3001"
```
- `.env.production` file with such variables must be created in `frontend/`;
```
NEXT_PUBLIC_BACKEND_ADDRESS="<BACKEND_ADRESS>" --- example "http://localhost:2001"
```

### Backend
- `.env.development` file with such variables must be created in `backend/`;
```
PORT=<PORT NUMBER>
REDIS_CONNECTION_STRING="<REDIS_CONNECTION_STRING>" --- example "redis://localhost:6379"
SECRET="<SECRET>" --- Secret for sessions
CLIENT_ID="<CLIENT_ID>" --- Google Project's Client ID
CLIENT_SECRET="<CLIENT_SECRET>" --- Google Project's Client Secret
CALLBACK_URL="<CALLBACK_URL>" --- Google Project's Authorized Redirect URI
FRONTEND_ADDRESS="<FRONTEND_ADDRESS>" --- example "http://localhost:3000" --- to allow CORS
```
- `.env.production` file with such variables must be created in `backend/`;
```
PORT=<PORT NUMBER>
REDIS_CONNECTION_STRING="<REDIS_CONNECTION_STRING>" --- example "redis://localhost:6379"
SECRET="<SECRET>" --- Secret for sessions
CLIENT_ID="<CLIENT_ID>" --- Google Project's Client ID
CLIENT_SECRET="<CLIENT_SECRET>" --- Google Project's Client Secret
CALLBACK_URL="<CALLBACK_URL>" --- Google Project's Authorized Redirect URI
FRONTEND_ADDRESS="<FRONTEND_ADDRESS>" --- example "http://localhost:2000" --- to allow CORS
```
#### NOTES

##### Google Project Stuff
The Google Project is required for OAuth2.0 Authentication and Authorization for YouTube API. So that we can access the user's YouTube data and display subscription lists, videos, etc.

Also, make sure that your backend address (example: both http://localhost:3001 and http://localhost) is listed in your Google project's `Authorized JavaScript origins`.

Google has a nice documentation regarding OAuth2.0 and accessing API; <br>
https://developers.google.com/identity/protocols/oauth2

I also have a minimalistic project that implements Google OAuth2.0 with Passportjs; <br>
https://github.com/zekicaneksi/Passportjs-GoogleAuth2.0-With-API-call-from-front-end-example

##### Changing Session Storage
Currently `passportjs` uses `express-session` and `express-session` uses `connect-redis` for storage. <br>
To change the session storage, delete the `redis store set up` section from `backend/index.js` and set up then provide the desired storage to the session middleware. A list of compatible storages is provided in `express-session`'s npm page.<br>
Also, delete the `REDIS_CONNECTION_STRING` variable in backend's environment files.

## Setting Up The Project
- `npm install` in both `frontend/` and `backend/`
- Create environment files as stated in [Environment Variables](#environment-variables)
- start Redis server (for session storage, if you wish to change the storage check [HERE](#changing-session-storage))

## Development
To run the project;
- `npm run dev` in `frontend/`
- `npm run dev` in `backend/`

## Deployment
To build the project;
- `npm run build` in `frontend/`

To run the project;
- `npm run start` in `frontend/`
- `npm run start` in `backend/`
