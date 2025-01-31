import * as plugin from 'eslint-plugin-import';

export default {
  files: ['**/*.{js,jsx}'],
  ignores: ['node_modules/**/*', 'dist/**/*', '**/*.d.ts'],
  plugins: {
    import: plugin,
  },
  rules: {
    'import/no-unresolved': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [
          {
            pattern: 'utils',
            group: 'internal',
          },
          {
            pattern: 'utils/**',
            group: 'internal',
          },
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
