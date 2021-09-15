module.exports = {
  "env": {
    "browser": true,
    "es2020": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "camelcase": "off",
    "no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": ["error",  {"devDependencies": true}],
    "react/jsx-props-no-spreading": "off",
    "no-unused-vars": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "jsx-a11y/label-has-for":"off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-restricted-globals": "off",
    "no-unused-expressions": "off",
  },
};
