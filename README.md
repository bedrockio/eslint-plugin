# @bedrockio/eslint-plugin

Common ESLint plugin for Bedrock projects. Note that this package uses flat
config new to ESLint v9.

- [Install](#install)
  - [Webpack](#webpack)
- [Usage](#usage)
- [VSCode](#vscode)

## Install

Install both [ESLint](http://eslint.org) and this plugin:

### Webpack Resolver (Optional)

If you need webpack import resolution, install:

```sh
$ npm install eslint @bedrockio/eslint-plugin --save-dev
```

## Usage

You can now use the exported modules in a flat ESLint config:

```js
import { recommended, react, jest } from '@bedrockio/eslint-plugin';

export default [
  jest,
  react,
  recommended,
  {
    // In most cases this won't be needed, however
    // note that to scope rules to different files,
    // configs will overwrite each other unless exported
    // as an array so need to deep merge them together.
    files: ['src/**/*.js'],
    languageOptions: {
      // Custom language options like babel transforms
      // etc. Note that the exported react plugin is
      // already set up to parse JSX. This complex
      // setup is only if you have mixed environments
      // in the same project.
    },
    plugins: {
      ...react.plugins,
      ...recommended.plugins,
    },
    settings: {
      ...react.settings,
      ...recommended.settings,
    },
    rules: {
      ...react.rules,
      ...recommended.rules,
    },
  },
];
```

## VSCode

Although not part of linting, getting intellisense in VSCode to work properly in
a project is a pain. To make it work nicely add this to your project:

```jsonc
// jsconfig.json
{
  "compilerOptions": {
    // - import from "../../components"
    // + import from "components"
    "baseUrl": "./src",
    // Support JSX if needed
    "jsx": "react-jsx",
    "checkJs": false,
    // Makes package imports behave better.
    "module": "nodenext",
    // Helps with some commonjs modules.
    "allowSyntheticDefaultImports": true
  },
  // Skip parsing useless files.
  "exclude": ["dist", "build", "node_modules"]
}
```

Another annoyance is module resolution for specific packages (specifically
lodash and react-router):

```js
// You can simply import "react-router-dom"
// but the intellisense isn't aware of this.
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
```

To fix these kind of errors simply import the appropriate types:

```bash
npm install --save-dev @types/lodash
npm install --save-dev @types/react-router-dom
# ...etc
```
