import js from '@eslint/js';

export default {
  name: 'recommended',
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    ...js.configs.recommended.rules,
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
