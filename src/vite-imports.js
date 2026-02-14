import path from 'path';
import * as plugin from 'eslint-plugin-import';
import importRules from './importRules.js';
import { existsSync } from 'fs';

async function loadConfig() {
  const file = path.join(process.cwd(), 'vite.config.js');

  if (!existsSync(file)) {
    // This file will be imported from index.js so
    // bail if no vite.config.js file exists.
    return;
  }

  const module = await import(file);

  return module.default;
}

const viteConfig = await loadConfig();

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
