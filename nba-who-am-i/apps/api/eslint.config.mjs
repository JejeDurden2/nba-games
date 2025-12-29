import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['prisma/**/*.ts', 'src/main.ts'],
    rules: {
      'no-console': 'off', // Allow console in seed scripts and main entry
    },
  },
  {
    files: ['**/*.mjs', '**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
);
