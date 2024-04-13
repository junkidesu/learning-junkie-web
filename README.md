# Learning Junkie

This repository contains the source code for the Learning Junkie web application.

## Technologies Used

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for interacting with the API
- [React Router](https://reactrouter.com/en/main) for navigation
- [react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

You can install and manage different versions of Node.js and npm with [nvm](https://github.com/nvm-sh/nvm).

#### Environment Variables

`BACKEND_URL` environment variable needs to be specified for the application to work.

#### REST API

The web application requires a REST API to connect to. Please see [this repository](https://github.com/junkidesu/learning-junkie-api) to get started.

### Start Development Server

At the root of the repository, run the following:

```sh
$ npm install
$ npm run dev
```
