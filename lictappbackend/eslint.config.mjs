// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',            // Desactiva la regla de uso de `any`
      '@typescript-eslint/no-floating-promises': 'off',     // Muestra advertencia, no error
      '@typescript-eslint/no-unsafe-assignment':'off',
      '@typescript-eslint/no-unsafe-argument': 'off',       // Muestra advertencia para argumentos inseguros
      '@typescript-eslint/no-unsafe-call': 'off',            // Desactiva la advertencia para llamadas inseguras
      '@typescript-eslint/no-unused-vars': 'off',            // Desactiva la advertencia para variables no usadas
      'prettier/prettier': 'off',                            // Desactiva las reglas de Prettier en ESLint
      'no-console': 'off',                                   // Permite el uso de console.log sin advertencias
      'no-debugger': 'off',                                  // Permite el uso de `debugger`
      'no-unsafe-finally': 'off',                            // Permite el uso de `finally` con código inseguro
    },
  },
);
