module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    'airbnb-base', // can't use "@vue/airbnb" without installing full vue-cli-service
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // Prefer tabs to spaces
    indent: [
      'error',
      'tab',
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoredNodes: ['JSXElement', 'JSXElement *'],
      },
    ],
    'no-tabs': 0,
    'no-void': 0,
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'vue/html-indent': [
      'error',
      'tab',
    ],
    // Everything is in devDependencies, don't restrict imports from that list
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': true,
      },
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e' // for e.returnvalue
        ],
      },
    ],
  },
  // Restore default indenting for generated eslint/nuxt/jest config files
  overrides: [
    {
      files: ['.eslintrc.js', 'nuxt.config.js', 'jest.config.js'],
      rules: {
        indent: [
          'error',
          2,
        ],
        'no-tabs': 1,
      },
    }
  ],
};
