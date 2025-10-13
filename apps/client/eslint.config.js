import { defineConfig } from "eslint/config";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import globals from "globals";

import { makeConfigFromBase } from "../../configs/eslint-factory.js";

export default makeConfigFromBase(
  defineConfig([
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        reactX.configs["recommended-type-checked"],
        reactHooks.configs["recommended-latest"],
        reactDom.configs.recommended,
        reactRefresh.configs.vite,
      ],
    },
    {
      languageOptions: {
        globals: globals.browser,
      },
    },
  ]),
);
