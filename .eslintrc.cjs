/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
  ],
  "rules": {
    "no-console": "off",
    "vue/no-v-html": 0,
    "no-unexpected-multiline": 0,
    "vue/html-self-closing": "off"
  },
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  settings: {
    'import/resolver': {
      alias: true
    },
  },
};
