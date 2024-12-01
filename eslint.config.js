import * as tsEslint from 'typescript-eslint'
import js from '@eslint/js'
import importX from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import security from 'eslint-plugin-security'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import vue from 'eslint-plugin-vue'
import unocss from '@unocss/eslint-plugin'

export default tsEslint.config(
  js.configs.recommended,
  comments.recommended,
  security.configs.recommended,
  ...tsEslint.configs.stylisticTypeChecked,
  ...tsEslint.configs.strictTypeChecked,
  importX.flatConfigs.typescript,
  ...vue.configs['flat/recommended'],
  unocss.configs.flat,
  prettierRecommended,
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      'import-x': importX,
      perfectionist,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['**/tsconfig.json', '**/tsconfig.*.json'],
        },
      },
    },
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.vue'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        parser: '@typescript-eslint/parser',
        project: './tsconfig.app.json',
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'side-effect',
            ['builtin-type', 'builtin'],
            ['external-type', 'external'],
            ['internal-type', 'internal'],
            ['parent-type', 'parent', 'sibling-type', 'sibling'],
            'object',
            'unknown',
          ],
          internalPattern: ['^@/.*'],
        },
      ],
      'import-x/no-cycle': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
      ],
    },
  },
  {
    files: ['vite.config.ts', 'uno.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },
  {
    ignores: ['**/dist/*', '**/dist-generate-html/*', 'eslint.config.js', '*.timestamp-*.mjs'],
  },
)
