import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from 'typescript-eslint'

export function makeConfigFromBase(appConfigs = []) {
  return defineConfig([
    { ignores: ['dist/'] },
    js.configs.recommended,
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        tseslint.configs.recommendedTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        {
          languageOptions: {
            parserOptions: {
              projectService: true,
              tsconfigRootDir: import.meta.dirname,
            },
          }
        }
      ],
    },
    ...appConfigs,
    eslintConfigPrettier,
    {
      languageOptions: {
        // keep it synced to tsconfig's lib
        ecmaVersion: 2023,
      },
    },
  ])

}
