module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true
  },
  rules: {
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true }
    ],
    'one-var': [
      'error',
      { initialized: 'never', uninitialized: 'consecutive' }
    ],
    'class-methods-use-this': [
      'error',
      { exceptMethods: ['isMobile', 'extendSettings'] }
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['elements', 'element'] }
    ],
    'new-cap': ['error', { newIsCap: false, capIsNew: false }],
    'max-len': ['error', { ignoreComments: true, ignoreStrings: true }],
    'prettier/prettier': 'error'
  }
};
