import * as plugin from 'eslint-plugin-import';

export default {
  ...plugin.flatConfigs.recommended,
  files: ['**/*.{js,jsx,ts,tsx}'],
  ignores: ['node_modules/**/*', 'dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    ...plugin.flatConfigs.recommended.rules,
    'import/no-unresolved': [
      'warn',
      {
        // package.json "style" may be used here which
        // will resolve for webpack but not within the
        // eslint plugin
        ignore: ['\\.css$'],
      },
    ],
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [
          {
            pattern: 'semantic',
            group: 'external',
          },
          {
            pattern:
              '+(stores|helpers|layouts|@stores|@helpers|@layouts){,/**}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern:
              '+(screens|modals|components|@screens|@modals|@components){,/**}',
            group: 'internal',
          },
          {
            pattern: '+(utils|@utils){,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '+(assets|@assets){,**}',
            group: 'sibling',
            position: 'after',
          },
        ],
        groups: [
          'builtin',
          'unknown',
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
      webpack: {
        config: './webpack.config.js',
      },
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
