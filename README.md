# ConfessIt README

This repository contains the source code for <https://confessit.app>.

We welcome anyone who would like to contribute to this project. Please see our [code of conduct](./code_of_conduct.md) for more information. And feel free to get in touch by starting a [discussion](https://github.com/kas-catholic/confessit-web/discussions) or commenting on an [issue](https://github.com/kas-catholic/confessit-web/issues) here on GitHub.

## Development

1. We highly recommend using [nvm](https://github.com/nvm-sh/nvm) to manage your Node installation. See the [nvm Installation Instructions](https://github.com/nvm-sh/nvm#install--update-script). We have a `.nvmrc` checked in, so running `nvm install` in this project directory after setting up nvm will ensure the correct Node version is installed.
2. We use NPM to manage our dependencies. Install the project dependencies with `npm install`.
3. Run `npm run dev` to build the project and run the development server. You can kill the server with `CTRL-C` and restart it any time with `npm run dev` again.

This project is a [progressive web app](https://vite-pwa-org.netlify.app/) [Astro](https://astro.build/) app with React. Reading the [React](https://reactjs.org/docs/getting-started.html) and [Astro](https://docs.astro.build/) docs will help you get started if you're not already familiar with these frameworks. We use [TailwindCSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/) as our CSS framework and [astro-i18next](https://astro-i18next.yassinedoghri.com/) for translations.

See [CONTRIBUTING](CONTRIBUTING.md) for more information about how to contribute to the development of ConfessIt.

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

## Translations

**We want to support more languages, and welcome translation additions and improvements!** See [CONTRIBUTING](CONTRIBUTING.md) for more information about how to add or improve a translation to a different language.

## Production Deployment

Our `main` branch is continuously deployed via [Netlify](https://www.netlify.com/). Simply merge to main and the site will be updated.

---

## Learn More

You can learn more in the [Astro documentation](https://docs.astro.build/).

To learn React, check out the [React documentation](https://reactjs.org/).

For styling, see the [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/)
documentation.

We're also using [Swiper](https://swiperjs.com/) for the swipable columns.

The app is deployed to <https://confessit.app>, hosted on Netlify.
