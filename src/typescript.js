import { parser } from 'typescript-eslint';

export default {
  files: ['**/*.{ts,tsx}'],
  ignores: ['node_modules/**/*', 'dist/**/*', '**/*.d.ts'],
  languageOptions: {
    parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
};
