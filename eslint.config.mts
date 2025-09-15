import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import {defineConfig, globalIgnores} from "eslint/config"
import prettierConfig from "eslint-config-prettier"

export default defineConfig([
    globalIgnores(["apps/client/dist/", "apps/server/dist/"]),
    {
        files: ["**/*.{js,mjs,cjs,mts,cts}"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {globals: globals.browser},
    },
    {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {tseslint, prettierConfig},
        extends: [...tseslint.configs.recommended],
        rules: {},
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
])
