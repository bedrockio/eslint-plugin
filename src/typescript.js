import ts from 'typescript-eslint';

export default {
  files: ['**/*.{ts,tsx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    parser: ts.parser,
  },
  plugins: {
    '@typescript-eslint': ts.plugin,
  },
  rules: {
    ...ts.plugin.configs.recommended.rules,
  },
};
