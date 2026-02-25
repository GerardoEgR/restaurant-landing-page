import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [

  // Ignorar carpetas generadas
  {
    ignores: [
      "dist",
      ".astro",
      "node_modules"
    ]
  },

  // Configuración base JS
  js.configs.recommended,

  // Configuración recomendada TypeScript
  ...tseslint.configs.recommended,

  // Configuración recomendada Astro
  ...astro.configs.recommended,

  // Soporte para archivos .astro
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"]
      }
    }
  },

  // Reglas personalizadas TS
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error"
    }
  },

  // Integración Prettier (SIEMPRE al final)
  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "warn"
    }
  }

];
