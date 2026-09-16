import eslintReact from '@eslint-react/eslint-plugin';

const recommended = eslintReact.configs.recommended;

export default {
  name: 'react',
  files: ['**/*.{js,jsx,ts,tsx,mdx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  plugins: {
    ...recommended.plugins,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    ...recommended.rules,
    'no-console': 'warn',
    '@eslint-react/no-array-index-key': 'off',
    '@eslint-react/naming-convention-ref-name': 'off',
    '@eslint-react/no-clone-element': 'off',
    '@eslint-react/exhaustive-deps': 'off',
    '@eslint-react/static-components': 'off',
    '@eslint-react/no-unnecessary-use-prefix': 'off',
    '@eslint-react/set-state-in-effect': 'off',
  },
  settings: {
    ...recommended.settings,
  },
};
