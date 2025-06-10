import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'error',
            'no-console': 'warn',
            'no-unused-vars': 'error',
            eqeqeq: ['error', 'always'],
            curly: 'error',
            'prefer-const': 'error',
        },
    },
    prettierConfig,
];