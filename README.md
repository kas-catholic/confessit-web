# ConfessIt README

This repository contains the source code for <https://confessit.app>.

We welcome anyone who would like to contribute to this project. Please see our [code of conduct](./code_of_conduct.md) for more information. And feel free to get in touch by starting a [discussion](https://github.com/kas-catholic/confessit-web/discussions) or commenting on an [issue](https://github.com/kas-catholic/confessit-web/issues) here on GitHub.

## Development

1. We highly recommend using [nvm](https://github.com/nvm-sh/nvm) to manage your Node installation. See the [nvm Installation Instructions](https://github.com/nvm-sh/nvm#install--update-script). We have a `.nvmrc` checked in, so running `nvm install` in this project directory after setting up nvm will ensure the correct Node version is installed.
2. We use [Yarn 2](https://yarnpkg.com/) to manage our dependencies. The [Yarn Installation Instructions](https://yarnpkg.com/getting-started/install) recommend running `corepack enable` to install Yarn.
3. Install the project dependencies with `yarn install`.
4. Run `yarn start` as described [below](#yarn-start) to build the project and run the development server. You can kill the server with `CTRL-C` and restart it any time with `yarn start` again.

This project is a [progressive web app](https://create-react-app.dev/docs/making-a-progressive-web-app/) React app and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Reading the [React](https://reactjs.org/docs/getting-started.html) and [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) docs will help you get started if you're not already familiar with these frameworks. We use [React Bootstrap](https://react-bootstrap.github.io/) as our CSS framework and [react-i18next](https://react.i18next.com/) for translations.

See [CONTRIBUTING](CONTRIBUTING.md) for more information about how to contribute to the development of ConfessIt.

## Translations

**We want to support more languages, and welcome translation additions and improvements!** See [CONTRIBUTING](CONTRIBUTING.md) for more information about how to add or improve a translation to a different language.

## Production Deployment

Our `main` branch is continuously deployed via [Netlify](https://www.netlify.com/). Simply merge to main and the site will be updated.

----

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

> We don't have any tests yet, but we plan to add some soon.

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

We're also using [Swiper](https://swiperjs.com/) via [react-id-swiper](https://github.com/kidjp85/react-id-swiper) for the swipable columns.

The app is deployed to <https://confessit.app>, hosted on Netlify.
