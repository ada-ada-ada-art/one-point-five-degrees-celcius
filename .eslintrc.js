module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: [],
  // add your custom rules here
  rules: {
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        "allowString": true,
        "allowNumber": true
      }
    ]
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  }
}