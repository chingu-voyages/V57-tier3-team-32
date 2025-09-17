import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

import { makeConfigFromBase } from "../../configs/eslint-factory.js";

export default makeConfigFromBase(
  defineConfig([
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
      ],
    },
    {
      languageOptions: {
        globals: globals.browser,
      },
    },
  ])
)
