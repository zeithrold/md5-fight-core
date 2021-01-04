module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: ['dist'],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/no-cycle': 0,
    'no-shadow': 0,
    'no-unused-vars': 0,
    'class-methods-use-this': 0,
    'no-restricted-syntax': 0,
  },
};
