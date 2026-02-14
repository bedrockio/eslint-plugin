import * as plugin from 'eslint-plugin-import';
import importRules from './importRules.js';

export default {
  ...plugin.flatConfigs.recommended,
  files: ['**/*.{js,jsx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    ...importRules,
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
