import react from 'eslint-plugin-react';

export default {
  name: 'react',
  files: ['**/*.{js,jsx,ts,tsx,mdx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  plugins: {
    react,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    ...react.configs['recommended'].rules,
    ...react.configs['jsx-runtime'].rules,
    'no-console': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: [
          {
            char: '>',
            alternatives: ['&gt;'],
          },
          {
            char: '<',
            alternatives: ['&lt;'],
          },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
