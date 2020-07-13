# Singapore Train

App to find travel direction in Singapore, with map for nagivation and live update of train arrival times.

![singapore-train](https://user-images.githubusercontent.com/21174154/85298588-7b1d4580-b4ce-11ea-8a72-30a02552b208.gif)

## Demo

https://singapore-train.herokuapp.com/

## Tech stack

- Typescript, React, Redux, Redux-saga (code split using lazy loading & Suspense)
- d3
- socket.io
- Integration & Unit tests: jest, enzyme

## Commands:

### Before:

- to make a copy of ./src/configs/index.ts.example -> ./src/configs/index.ts

```
yarn copy:configs
```

- Fill in `SERVER_URL` for socket connection (if running on the same server, fill in `/`);
- Fill in `STATIC_FILE_SERVER_URL` for server (i.e AWS s3) containing static files like images or GeoJSON files


### Install
```
yarn
```

to install node_modules


### Build
```
yarn build
```

to build app


### Start
```
yarn start
```

to start NodeJS Server, app will run on port 3001


### Dev

1. run server on port 3001 (for socket.io connection)

```
yarn start
```

2. change SERVER_URL in `/src/configs/index.js` to `http://localhost:3001`

3. run dev server

```
yarn dev
```

app will run on port 3000


### Test
```
yarn test --coverage --watchAll
```

<img width="399" alt="Screenshot 2020-06-22 at 21 27 14" src="https://user-images.githubusercontent.com/21174154/85299237-3b0a9280-b4cf-11ea-8771-94a4e66e6d2d.png">