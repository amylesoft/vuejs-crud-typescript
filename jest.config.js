module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    transform: {
        "^.+\\.vue$": "vue-jest"
    },
    collectCoverage: true,
    coverageDirectory: "tests/__coverage__",
    coveragePathIgnorePatterns: ["/node_modules/"]
}
