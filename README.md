# ConfessIt README

This repository contains the source code for <https://confessit.app>.

We welcome anyone who would like to contribute to this project. Please see our [code of conduct](./code_of_conduct.md) for more information. And feel free to get in touch by starting a [discussion](https://github.com/kas-catholic/confessit-web/discussions) or commenting on an [issue](https://github.com/kas-catholic/confessit-web/issues) here on GitHub.

## Development

1. We highly recommend using [nvm](https://github.com/nvm-sh/nvm) to manage your Node installation. See the [nvm Installation Instructions](https://github.com/nvm-sh/nvm#install--update-script). We have a `.nvmrc` checked in, so running `nvm install` in this project directory after setting up nvm will ensure the correct Node version is installed.
2. We use ~[Yarn 2](https://yarnpkg.com/)~ NPM to manage our dependencies. The [Yarn Installation Instructions](https://yarnpkg.com/getting-started/install) recommend running `corepack enable` to install Yarn.
3. Install the project dependencies with `yarn install`.
4. Run `yarn start` as described [below](#yarn-start) to build the project and run the development server. You can kill the server with `CTRL-C` and restart it any time with `yarn start` again.

This project is a [progressive web app](https://create-react-app.dev/docs/making-a-progressive-web-app/) React app and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Reading the [React](https://reactjs.org/docs/getting-started.html) and [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) docs will help you get started if you're not already familiar with these frameworks. We use [React Bootstrap](https://react-bootstrap.github.io/) as our CSS framework and [react-i18next](https://react.i18next.com/) for translations.

See [CONTRIBUTING](CONTRIBUTING.md) for more information about how to contribute to the development of ConfessIt.

## Translations

**We want to support more languages, and welcome translation additions and improvements!** See [CONTRIBUTING](CONTRIBUTING.md) for more information about how to add or improve a translation to a different language.

## Production Deployment

Our `main` branch is continuously deployed via [Netlify](https://www.netlify.com/). Simply merge to main and the site will be updated.

---

## Learn More

You can learn more in the [Astro documentation](https://docs.astro.build/).

To learn React, check out the [React documentation](https://reactjs.org/).

We're also using [Swiper](https://swiperjs.com/) via [react-id-swiper](https://github.com/kidjp85/react-id-swiper) for the swipable columns.

The app is deployed to <https://confessit.app>, hosted on Netlify.


# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
