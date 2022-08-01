module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': [
          'error',
          {
            bracketSpacing: true,
            jsxBracketSameLine: true,
            singleQuote: true,
            trailingComma: 'all',
            printWidth: 120,
            jsxSingleQuote: false,
            semi: true,
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
};
