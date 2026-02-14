export default {
  'import/no-unresolved': 'warn',
  'import/no-named-as-default-member': 'off',
  'import/first': 'warn',
  'import/order': [
    'warn',
    {
      'newlines-between': 'always-and-inside-groups',
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
          pattern: '+(stores|helpers|layouts|@stores|@helpers|@layouts){,/**}',
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
};
