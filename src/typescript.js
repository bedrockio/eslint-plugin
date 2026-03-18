let ts;
let importError;

try {
  ts = (await import('typescript-eslint')).default;
} catch (err) {
  importError = err;
}

export default {
  name: 'typescript',
  files: ['**/*.{ts,tsx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: ts?.parser,
  },

  // Throw error if import failed only if
  // plugin is actually being used.
  get plugins() {
    if (importError) {
      throw importError;
    }
    return {
      '@typescript-eslint': ts.plugin,
    };
  },

  rules: {
    // Pull in `eslint-recommended` adjustments from typescript-eslint.
    // This disables core ESLint rules that conflict with TypeScript (e.g. no-undef).
    ...ts?.plugin.configs['eslint-recommended'].overrides[0].rules,

    // Pull in the TypeScript recommended rules themselves.
    // Avoid the flat config version as it's an array.
    ...ts?.plugin.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',

    // The above configs try to slip this rule in there despite it
    // not being part of eslint-recommended so force it off again.
    'prefer-const': 'off',
  },
};
