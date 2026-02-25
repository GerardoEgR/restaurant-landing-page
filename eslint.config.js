import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import prettier from "eslint-config-prettier";

export default [

  // Ignorar archivos generados
  {
    ignores: [
      "dist",
      ".astro",
      "node_modules"
    ]
  },

  // JavaScript base
  js.configs.recommended,

  // TypeScript moderno
  ...tseslint.configs.recommended,

  // Astro recomendado
  ...astro.configs.recommended,

  // Soporte correcto para archivos Astro
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

  // Reglas TypeScript personalizadas
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error"
    }
  },

  // ⚡ Prettier SIEMPRE al final (solo desactiva conflictos)
  prettier
];
