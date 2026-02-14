import * as plugin from 'eslint-plugin-import';
import importRules from './importRules.js';

export default {
  ...plugin.flatConfigs.recommended,
  files: ['**/*.{js,jsx,ts,tsx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    ...plugin.flatConfigs.recommended.rules,
    ...importRules,
    'import/no-unresolved': [
      'warn',
      {
        // package.json "style" may be used here which
        // will resolve for webpack but not within the
        // eslint plugin
        ignore: ['\\.css$'],
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
