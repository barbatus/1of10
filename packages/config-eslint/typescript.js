const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "turbo",
  ],
  ignorePatterns: [".eslintrc.js", ".eslintrc.cjs"],
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "import",
    "unused-imports",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  rules: {
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-shadow": "off",  // Disabled in favor of the typescript rule
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/require-await": "off",

    // Bug: https://github.com/typescript-eslint/typescript-eslint/issues/5407
    "@typescript-eslint/no-redundant-type-constituents": "off",

    "import/export": "off", // See https://github.com/import-js/eslint-plugin-import/issues/2167
    "import/no-deprecated": "warn",
    "import/no-duplicates": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-unresolved": "off",
    "import/order": "off",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-imports": "off",

    // Unused imports
    "unused-imports/no-unused-imports": "error",

    // console.log rules
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
