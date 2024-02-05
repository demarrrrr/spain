module.exports = {
    customSyntax: 'postcss-scss',
    extends: [
        'stylelint-config-twbs-bootstrap',
        'stylelint-config-standard',
        'stylelint-config-recommended',
    ],
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    rules: {
        'block-no-empty': true,
        'color-no-invalid-hex': true,
        'comment-no-empty': true,
        'stylistic/indentation': [
            4,
            {
              baseIndentLevel: 0,
            }
          ],
        'declaration-block-no-duplicate-custom-properties': true,
        'declaration-block-no-duplicate-properties': [
            true,
            {
                ignore: ['consecutive-duplicates-with-different-values'],
            },
        ],
        "no-descending-specificity": null,
        'declaration-block-no-shorthand-property-overrides': true,
        'font-family-no-duplicate-names': true,
        'font-family-no-missing-generic-family-keyword': true,
        'function-calc-no-unspaced-operator': true,
        'function-linear-gradient-no-nonstandard-direction': true,
        'keyframe-declaration-no-important': true,
        'media-feature-name-no-unknown': true,
        'named-grid-areas-no-invalid': true,
        'no-duplicate-at-import-rules': true,
        'no-duplicate-selectors': true,
        'no-empty-source': true,
        'no-invalid-double-slash-comments': true,
        'property-no-unknown': true,
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-element-no-unknown': true,
        'selector-class-pattern': null,
        'order/properties-order': null,
        'at-rule-no-unknown': null,
        'property-no-vendor-prefix':  {
            ignoreProperties: ["background-clip"]
        },
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['bootstap']
            }
        ],
        'selector-type-no-unknown': true,
        'string-no-newline': true,
        'unit-no-unknown': true,
        'import-notation': null,
        'stylistic/number-leading-zero': 'always'
    },
    'ignoreFiles': ['./dist/assets/css/*.css']
}
