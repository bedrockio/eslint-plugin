import * as mdx from 'eslint-plugin-mdx';

const plugin = {
  ...mdx.flat,
  name: 'mdx',
  files: ['**/*.mdx'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  processor: mdx.createRemarkProcessor({
    lintCodeBlocks: true,
  }),
  rules: {
    ...mdx.flat.rules,
    // Note this seems to be causing
    // issues in the resolve so disable it.
    'import/named': 'off',
    'no-unused-expressions': 'off',
  },
};

Object.defineProperty(plugin, 'codeBlocks', {
  value: mdx.flatCodeBlocks,
});

export default plugin;
