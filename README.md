# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Set env variables

```
Copy .env.example to .env
```

## Build and run your app with Compose.

```
npm run docker:build
```

## For clean log folder

```
npm run cleanLog
```

## Scan app image

```
npm run docker:scan:app
```

## Scan postgreql image

```
npm run docker:scan:db
```

## Run migrations

```
npm run migration:run
```


After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Also you can import OpenAPI file from doc folder to https://editor-next.swagger.io/ to see the api tree and to have an ability to check it.

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

