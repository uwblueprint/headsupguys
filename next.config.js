const withPlugins = require("next-compose-plugins");
const removeImports = require("next-remove-imports")({});

const config = {};

module.exports = withPlugins([removeImports], {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
});
