module.exports = {
    plugins: ['@typescript-eslint', '@html-eslint'],
    globals: {
        browser: false,
        window: true,
        document: true
    },
    env: {
        node: true,
        jasmine: true,
        jquery: true,
        browser: true,
        es6: true
    },
    overrides: [
        {
            files: ['*.js'],
            extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
            rules: {
                'no-new': 'warn',
                'no-void': 0,
                'global-require': 0,
                'prefer-arrow-callback': 'error',
                'func-names': 2,
                'no-use-before-define': 'error',
                'guard-for-in': 'error',
                curly: 0,
                'eol-last': 0,
                'linebreak-style': ['off'],
                semi: 'off',
                quotes: ['error', 'single'],
                'max-len': [
                    'error',
                    {
                        code: 120,
                        ignoreComments: true,
                        ignoreTrailingComments: true,
                        ignoreUrls: true,
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true,
                        ignoreRegExpLiterals: true
                    }
                ],
                indent: [
                    'error',
                    4,
                    {
                        SwitchCase: 1
                    }
                ],
                'import/order': [
                    'error',
                    {
                        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                        'newlines-between': 'always'
                    }
                ],
                "import/no-extraneous-dependencies": ['error', {"devDependencies": ["./configuration/*.ts", './utils/*.ts', 'webpack.config.ts']}],
                'import/prefer-default-export': 'off',
                'import/no-dynamic-require': 'warn',
                'object-curly-spacing': ['error', 'always'],
                'object-curly-newline': ['off'],
                'arrow-parens': [
                    'error',
                    'as-needed',
                    {
                        requireForBlockBody: true
                    }
                ],
                'no-shadow': ['off'],
                'no-param-reassign': ['off'],
                yoda: ['off']
            },
        },
        {
            parser: '@typescript-eslint/parser',
            files: ['*.ts'],
            extends: ['airbnb-base', 'airbnb-typescript/base', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'prettier'],
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.json']
            },
            env: {
                node: true,
                jasmine: true,
                jquery: true,
                browser: true,
                es6: true
            },
            rules: {
                'no-new': 'warn',
                'no-void': 0,
                'global-require': 0,
                'prefer-arrow-callback': 'error',
                'func-names': 2,
                'no-use-before-define': 'error',
                '@typescript-eslint/indent': ['error', 4],
                'guard-for-in': 'error',
                curly: 0,
                'eol-last': 0,
                'linebreak-style': ['off'],
                semi: 'off',
                '@typescript-eslint/semi': ['warn', 'never'],
                quotes: ['error', 'single'],
                'max-len': [
                    'error',
                    {
                        code: 120,
                        ignoreComments: true,
                        ignoreTrailingComments: true,
                        ignoreUrls: true,
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true,
                        ignoreRegExpLiterals: true
                    }
                ],
                indent: [
                    'error',
                    4,
                    {
                        SwitchCase: 1
                    }
                ],
                'import/order': [
                    'error',
                    {
                        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                        'newlines-between': 'always'
                    }
                ],
                "import/no-extraneous-dependencies": ['error', {"devDependencies": ["./configuration/*.ts", './utils/*.ts', 'webpack.config.ts']}],
                'import/prefer-default-export': 'off',
                '@typescript-eslint/no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": false }],
                'object-curly-spacing': ['error', 'always'],
                'object-curly-newline': ['off'],
                'import/no-dynamic-require': 'warn',
                'arrow-parens': [
                    'error',
                    'as-needed',
                    {
                        requireForBlockBody: true
                    }
                ],
                'no-shadow': ['off'],
                'no-param-reassign': ['off'],
                yoda: ['off']
            },
            globals: {
                browser: false,
                window: true,
                document: true
            },
        },
        {
            files: ['*.html'],
            parser: "@html-eslint/parser",
            extends: ["plugin:@html-eslint/recommended", 'prettier'],
            rules: {
                '@html-eslint/require-doctype': 0,
                '@html-eslint/no-extra-spacing-attrs': 0,
                '@html-eslint/require-closing-tags': 1
            },
          },
    ],
}
