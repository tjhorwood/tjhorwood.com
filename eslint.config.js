export const env = {
  browser: true,
  es2021: true,
  node: true,
};
export const plugins = [
  '@typescript-eslint',
  'simple-import-sort',
  'unused-imports',
  'import',
];
export const rules = {
  'no-unused-vars': 'off',
  'no-console': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  'react/no-unescaped-entities': 'off',
  'react/display-name': 'off',
  'react/jsx-curly-brace-presence': [
    'warn',
    { props: 'never', children: 'never' },
  ],
  //#region  //*=========== Unused Import ===========
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  'unused-imports/no-unused-imports': 'warn',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],
  //#endregion  //*======== Unused Import ===========
  //#region  //*=========== Import Sort ===========
  'simple-import-sort/exports': 'warn',
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // ext library & side effect imports
        ['^@?\\w', '^\\u0000'],
        // {s}css files
        ['^.+\\.s?css$'],
        // Lib and hooks
        ['^@/lib', '^@/hooks'],
        // static data
        ['^@/data'],
        // components
        ['^@/components', '^@/container'],
        // zustand store
        ['^@/store'],
        // Other imports
        ['^@/'],
        // relative paths up until 3 level
        [
          '^\\./?$',
          '^\\.(?!/?$)',
          '^\\.\\./?$',
          '^\\.\\./\\.(?!/?$)',
          '^\\.\\./\\.\\./?$',
          '^\\.\\./\\.\\.(?!/?$)',
          '^\\.\\./\\.\\./\\.\\./?$',
          '^\\.\\./\\.\\./\\.\\.(?!/?$)',
        ],
        ['^@/types'],
        // other that didnt fit in
        ['^'],
      ],
    },
  ],
  //#endregion  //*======== Import Sort ===========
  // Add these rules
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-duplicates': 'error',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
};
export const globals = {
  React: true,
  JSX: true,
};
