import globals from 'globals';

export default {
  name: 'node',
  files: ['**/*.{js,jsx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  languageOptions: {
    globals: globals.node,
  },
  settings: {
    'import/resolver': {
      exports: true,
      node: {
        moduleDirectory: ['node_modules', 'src'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.css',
          '.less',
          '.png',
          '.jpg',
          '.jpeg',
          '.gif',
          '.svg',
          '.webp',
          '.webm',
          '.mp4',
        ],
      },
    },
  },
};
