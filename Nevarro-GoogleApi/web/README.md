# Next.js (React) with TypeScript example

## How to use
Install yarn if you don't have it already:
```bash
npm install -g yarn
```

Install it and run:

```sh
yarn install -D # install dependencies, required for the first time
yarn dev # run development server on http://localhost:3000
```

And later on you can do some of the following:

```sh
yarn build # build the app
yarn start # run production server
yarn lint # run eslint to check for errors and code style issues
```

## Directory structure
There are various directories in this project, but the following give a brief description of each:

#### pages
This directory contains all the pages in the application. 
Each page is a React component exported from a `.tsx` file. 
The name of the file will be the path of the page. 
For example, `pages/index.tsx` will be accessible at `/` and `pages/about.tsx` will be accessible at `/about`.
Files that start with an underscore will not be accessible directly, but can be imported from other files and can be used as templates.
For example, `pages/_document.tsx` is used as a template for all the pages in the application. 
For more information, see [Custom Document](https://nextjs.org/docs/advanced-features/custom-document).

#### public
This directory contains static files such as images that will be served at the root of the application. 
For example, `public/logo.png` will be accessible at `/logo.png`.
For more information, see [Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving).

#### src
Here you will find the source code of the application. Most of the code is in the `src/components` directory, which contains all the React components used in the application.

#### styles
This directory contains global CSS styles for the application.

#### types
This directory contains TypeScript type definitions for the application. These are used to provide type information for JavaScript libraries that don't have type definitions.
Or for your own custom types regarding things such as the data returned from an API.

#### node_modules
This directory contains all the dependencies of the application. This directory is not included in the repository, but is created when you run `yarn install`.

#### .next
This directory contains the compiled output of the application. This directory is not included in the repository, but is created when you run `yarn build`.

## The idea behind the example

The project uses [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5. If you prefer, you can [use styled-components instead](https://mui.com/material-ui/guides/interoperability/#styled-components).

## The link component

The [example folder](https://github.com/mui/material-ui/tree/HEAD/examples/nextjs-with-typescript) provides an adapter for the use of [Next.js's Link component](https://nextjs.org/docs/api-reference/next/link) with MUI.
More information [in the documentation](https://mui.com/material-ui/guides/routing/#next-js).

## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation, continuing browsing it from the [templates](https://mui.com/material-ui/getting-started/templates/) section.
