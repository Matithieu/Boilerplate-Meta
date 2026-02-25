import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'dist',
      'scripts/build/**'
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'plugin:@tanstack/eslint-plugin-query/recommended',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      'react-refresh': reactRefresh,
      // "@tanstack/query": fixupPluginRules(tanstackQuery),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: globals.node,

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json', './scripts/tsconfig.json', './tsconfig.build.json'],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'mdx/code-blocks': true,
    },

    rules: {
      eqeqeq: 'error',
      'no-nested-ternary': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'no-void': 'off',

      '@/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['block', 'block-like'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['block', 'block-like'],
        },
      ],

      'react/jsx-boolean-value': ['error', 'never'],

      'react/jsx-curly-brace-presence': [
        'error',
        {
          propElementValues: 'always',
        },
      ],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:', '^@', '^\\w'],
            ['^#/utils', '^#/configs'],
            ['^#/types'],
            ['^#/fixtures'],
            ['^#/modules'],
            ['^\\.\\./', '^\\./'],
          ],
        },
      ],

      'react/jsx-handler-names': 'error',
      'react/jsx-no-constructed-context-values': 'error',

      'react/jsx-pascal-case': [
        'error',
        {
          allowNamespace: true,
          allowLeadingUnderscore: false,
        },
      ],

      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandFirst: true,
        },
      ],

      'no-console': [
        'warn',
        {
          allow: ['error', 'info', 'warn'],
        },
      ],

      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-deprecated-options': 'off',
      '@tanstack/query/prefer-query-object-syntax': 'off',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',
    },
  },
]
