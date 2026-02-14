import * as mdx from 'eslint-plugin-mdx';

const plugin = {
  ...mdx.flat,
  files: ['**/*.mdx'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  processor: mdx.createRemarkProcessor({
    lintCodeBlocks: true,
  }),
  rules: {
    ...mdx.flat.rules,
    semi: 'off',
    'no-undef': 'off',
    'no-unused-expressions': 'off',
  },
};

Object.defineProperty(plugin, 'codeBlocks', {
  value: mdx.flatCodeBlocks,
});

export default plugin;
