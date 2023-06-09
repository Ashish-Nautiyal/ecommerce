module.exports = {
    env: {
        node: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
    }
};