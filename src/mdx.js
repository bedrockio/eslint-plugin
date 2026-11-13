import * as mdx from 'eslint-plugin-mdx';

const plugin = {
  ...mdx.flat,
  name: 'mdx',
  files: ['**/*.mdx'],
  rules: {
    ...mdx.flat.rules,
    // Note this seems to be causing
    // issues in the resolve so disable it.
    'import-x/named': 'off',
    'no-unused-expressions': 'off',
  },
};

export default plugin;
