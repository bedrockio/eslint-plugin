import * as plugin from 'eslint-plugin-import-x';

export default {
  ...plugin.flatConfigs.recommended,
  name: 'imports',
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    ...plugin.flatConfigs.recommended.rules,
    'import-x/namespace': 'off',
    'import-x/no-unresolved': 'warn',
    'import-x/no-named-as-default-member': 'off',
    'import-x/first': 'warn',
    'import-x/order': [
      'warn',
      {
        'newlines-between': 'always-and-inside-groups',
        sortTypesGroup: true,
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        named: true,
        warnOnUnassignedImports: true,
        consolidateIslands: 'inside-groups',
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
            pattern: '+(hooks|@hooks|utils|@utils){,/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '+(assets|@assets){,**}',
            group: 'sibling',
            position: 'after',
          },
          {
            pattern: '**/*.+(css|less|scss|png|jpg|svg|json)',
            group: 'type',
            position: 'after',
          },
          {
            pattern: './**/*.+(css|less|scss|png|jpg|svg|json)',
            group: 'type',
            position: 'after',
          },
        ],
      },
    ],
  },
};
