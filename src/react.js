import eslintReact from '@eslint-react/eslint-plugin';

const recommended = eslintReact.configs.recommended;

export default {
  name: 'react',
  files: ['**/*.{js,jsx,ts,tsx,mdx}'],
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
    '@eslint-react/no-children-to-array': 'off',
    '@eslint-react/no-children-map': 'off',
    '@eslint-react/no-children-for-each': 'off',
    '@eslint-react/no-children-count': 'off',
    '@eslint-react/use-state': [
      'warn',
      {
        enforceLazyInitialization: false,
      },
    ],
  },
  settings: {
    ...recommended.settings,
  },
};
