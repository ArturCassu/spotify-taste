import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Strict TypeScript rules
    rules: {
      // No any
      "@typescript-eslint/no-explicit-any": "error",

      // Require explicit return types on functions/methods
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        },
      ],

      // Prefer interfaces for object types
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],

      // No unused vars (error, but allow _prefixed)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Enforce consistent imports
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // No console in production code (warn to allow during dev)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Prefer const
      "prefer-const": "error",

      // No var
      "no-var": "error",
    },
  },
]);

export default eslintConfig;
