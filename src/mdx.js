import * as mdx from 'eslint-plugin-mdx';

const plugin = {
  ...mdx.flat,
  name: 'mdx',
  files: ['**/*.mdx'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  rules: {
    ...mdx.flat.rules,
    // Note this seems to be causing
    // issues in the resolve so disable it.
    'import/named': 'off',
    'no-unused-expressions': 'off',
  },
};

export default plugin;
