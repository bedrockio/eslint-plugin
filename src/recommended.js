import js from '@eslint/js';
import globals from 'globals';

export default {
  files: ['**/*.{js,jsx,ts,tsx}'],
  ignores: ['node_modules/**/*', 'dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.browser,
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    semi: 'error',
    'no-console': 'warn',
    curly: ['error', 'multi-line', 'consistent'],
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
      },
    ],
  },
};
