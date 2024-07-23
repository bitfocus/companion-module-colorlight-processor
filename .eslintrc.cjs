module.exports = {
  extends: './node_modules/@companion-module/tools/eslint/main.cjs',
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'node/no-unsupported-features/es-syntax': 'off'
  }
}
