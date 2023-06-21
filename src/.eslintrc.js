module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:compat/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: ["simple-import-sort"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-constructed-context-values": "warn",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^react"],
          ["^@?\\w"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],
    "simple-import-sort/exports": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-underscore-dangle": "off",
    "import/no-relative-packages": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/naming-convention": [
      2,
      {
        selector: "default",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allowSingleOrDouble",
        trailingUnderscore: "forbid",
      },
    ],
    "promise/catch-or-return": "off",
    "promise/always-return": "off",
    "no-console": "off",
    "react/no-array-index-key": "off",
    "import/prefer-default-export": "off",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
};
