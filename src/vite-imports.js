import path from 'path';
import * as plugin from 'eslint-plugin-import';
import importRules from './importRules.js';

let viteConfig;

try {
  const file = path.join(process.cwd(), 'vite.config.js');
  const { default: config } = await import(file);
  viteConfig = config;
} catch {
  // Config file does not exist or
  // top-level await not supported.
}

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
    ...importRules,
  },
  settings: {
    'import/resolver': {
      exports: true,
      vite: {
        viteConfig,
      },
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
