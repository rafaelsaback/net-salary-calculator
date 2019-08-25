module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true, // Allows using browser globals such as document
    node: true, // Allows using node globals such as __dirname
    es6: true,
  },
  plugins: ['react-hooks', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error', // Hooks
    'react-hooks/exhaustive-deps': 'warn', // Hooks
    'prettier/prettier': 'error', // Prettier
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  settings: {
    react: {
      version: '16.8.2',
    },
  },
};
