import globals from 'globals';

export default {
  name: 'vite',
  files: ['**/*.{js,jsx,ts,tsx,mdx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: globals.browser,
  },
  settings: {
    'import/resolver': {
      exports: true,
      ['@bedrockio/eslint-plugin/resolvers/vite']: {
        config: './vite.config.js',
      },
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
