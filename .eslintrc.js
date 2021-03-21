module.exports = {

    env: {
        browser: true,
        es6: true,
        node: true,
    },

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        
    ],

    globals: {
        Atomic: 'readonly',
        SharedArrayBuffer: 'readonly',
    },

    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmVersion: 11,
        sourceType: 'module',
    },

    plugins: ['@typescript-eslint'],
    rules: {"prettier/prettier": [
        "error",
        {
          "endOfLine": "auto"
        },
      ],},
}