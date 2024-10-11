module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [".eslintrc.js", ".eslintrc.cjs"],
  plugins: [
    "react",
  ],
  rules: {
    // React
    "react/destructuring-assignment": 0,
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
