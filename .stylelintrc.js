module.exports = {
    "extends": "stylelint-config-fluid",
    "plugins": [
        "stylelint-use-logical-spec"
    ],
    "ignoreFiles": ["dist/**/*.css", "src/static/design-system/css/*.css"],
    "rules": {
        "custom-property-pattern": null,
        "import-notation": "string",
        "selector-class-pattern": null,
        "liberty/use-logical-spec": ["always", {"except": ["float", "top", "left", "right", "bottom", "max-width", "min-width", "max-height", "min-height", "width", "height"]}]
    }
};
