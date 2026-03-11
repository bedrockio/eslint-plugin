import globals from 'globals';

export default {
  name: 'webpack',
  files: ['**/*.{js,jsx,ts,tsx,mdx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: globals.browser,
  },
  rules: {
    'import/no-unresolved': [
      'warn',
      {
        // package.json "style" may be used here which
        // will resolve for webpack but not within the
        // eslint plugin
        ignore: ['\\.css$'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
