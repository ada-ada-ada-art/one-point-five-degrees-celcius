module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: [
  ],
  // add your custom rules here
  rules: {
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  }
}
