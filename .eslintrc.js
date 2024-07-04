module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-empty-interface': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'import/no-anonymous-default-export': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  globals: {
    React: 'writable'
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
}