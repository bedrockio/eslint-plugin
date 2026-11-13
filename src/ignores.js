// An object with only "ignores" makes ESLint skip these files
// entirely. Placed next to rules, "ignores" would only stop
// those rules from applying while the files are still linted.
export default {
  name: 'ignores',
  ignores: [
    'node_modules/**/*',
    '**/dist/**/*',
    '**/*.d.ts',
  ],
};
