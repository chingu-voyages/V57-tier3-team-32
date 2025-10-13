// see https://github.com/eslint-community/eslint-plugin-n/issues/209
// eslint-disable-next-line n/no-extraneous-import
import { defineConfig } from "eslint/config";
import nodePlugin from "eslint-plugin-n";

import { makeConfigFromBase } from "../../configs/eslint-factory.js";

export default makeConfigFromBase(
  defineConfig([
    nodePlugin.configs["flat/recommended-module"],
    {
      files: ["**/*.{test,spec}.ts"],
      rules: { "@typescript-eslint/no-floating-promises": "off" },
    },
  ]),
);
