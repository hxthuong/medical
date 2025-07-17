const { override, useBabelRc, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
    // addWebpackModuleRule({
    //     test: /\.js$/,
    //     enforce: 'pre',
    //     use: ['source-map-loader'],
    //     exclude: [/node_modules\/react-datepicker/],
    // }),
    (config) => {
        // Filter out existing source-map-loader rules (precaution)
        config.module.rules = config.module.rules.map((rule) => {
            if (Array.isArray(rule.oneOf)) {
                rule.oneOf = rule.oneOf.filter(
                    (r) => !(r.enforce === 'pre' && r.loader && r.loader.includes('source-map-loader')),
                );
            }
            return rule;
        });

        // Add new source-map-loader rule that excludes node_modules
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: /node_modules/, // ✅ This avoids warnings from react-datepicker
        });

        return config;
    },
);
