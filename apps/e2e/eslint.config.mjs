import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
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
    ignores: ['eslint.config.mjs'],
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: './',
      },
    },

    rules: {
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

      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/strict-boolean-expressions': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/consistent-type-assertions': 0,
      'no-void': 0,

      'padding-line-between-statements': [
        2,
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

      '@typescript-eslint/no-floating-promises': 1,
    },
  },
]
