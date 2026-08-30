/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-css-order", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ],
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  objectWrap: "preserve",
  bracketSameLine: false,
  arrowParens: "avoid",
  requirePragma: false,
  insertPragma: false,
  checkIgnorePragma: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  singleAttributePerLine: false
};

export default prettierConfig;
