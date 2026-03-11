import plugin from 'eslint-plugin-jest';

export default {
  ...plugin.configs['flat/recommended'],
  name: 'jest',
  files: [
    '**/test*/**/*.{js,jsx,ts,tsx}',
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/__mocks__/**/*.{js,jsx,ts,tsx}',
    '**/*.test.js',
    '**/*.spec.js',
  ],
  languageOptions: {
    globals: plugin.environments.globals.globals,
  },
  rules: {
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect*', 'assert*'],
      },
    ],
    'jest/no-focused-tests': 'off',
    'jest/no-disabled-tests': 'off',
    'jest/no-conditional-expect': 'off',
  },
};
