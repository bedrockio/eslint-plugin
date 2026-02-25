let ts;
let importError;

try {
  // This is to make this package optional.
  ts = await import('typescript-eslint');
} catch (err) {
  // Package not installed. Capture error to
  // allow re-throwing if plugin is accessed,
  // otherwise allow it to export silently.
  importError = err;
}

export default {
  files: ['**/*.{ts,tsx}'],
  ignores: ['node_modules/**/*', '**/dist/**/*', '**/*.d.ts'],
  languageOptions: {
    parser: ts?.parser,
  },
  get plugins() {
    if (importError) {
      throw importError;
    }
    return {
      '@typescript-eslint': ts?.plugin,
    };
  },
  rules: {
    ...ts?.plugin.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
