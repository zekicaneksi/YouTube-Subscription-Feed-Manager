# YouTube-Subscription-Feed-Manager
A site that ables you to filter and see better your subscription feed.

The frontend and backend are de-coupled (separate apps) but are meant to be used with a single origin. Cookies must be configured to allow CORS if the client will be hosted on a second origin.

## Environment Variables
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
BACKEND_ADDRESS=<BACKEND_ADRESS> --- example "http://localhost:3001"
```
- `.env.production` file with such variables must be created in `frontend/`;
```
BACKEND_ADDRESS=<BACKEND_ADRESS> --- example "http://localhost:3001"
```

### Backend
- `.env.development` file with such variables must be created in `backend/`;
```
PORT=<PORT NUMBER>
```
- `.env.production` file with such variables must be created in `backend/`;
```
PORT=<PORT NUMBER>
```

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
