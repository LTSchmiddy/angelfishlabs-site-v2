const path = require('path');
const webpack = require("webpack");
// Some build important variables:
// Most of these are here so that setup.py can configure the webpack build process.

// Mainly used to populate the './src/react folder instead of default build location.
// Handy for source tests and autocompletion.'
let wpDest = "./dist/";
if (process.env.hasOwnProperty("WP_DEST")) {
    wpDest = process.env.WP_DEST;
}

// Set the Webpack mode.
let wpMode = "production";
if (process.env.hasOwnProperty("WP_MODE")) {
    wpMode = process.env.WP_MODE;
}


// Define Webpack Config:
module.exports = {
    mode: wpMode,
    entry: path.resolve(__dirname, 'react_src/app.tsx'),
    output: {
        publicPath: "/react/",
        path: path.resolve(__dirname, wpDest + 'react/'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json5-loader',
                type: 'javascript/auto'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /index.html/
            },
            {
                test: /(?<!\.t)\.hbs$/,
                use: [
                    'html-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /(?<!\.m)\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.m\.s[ac]ss$/i,
                use: [
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    node: {
        global: true
    },
    resolve: {
        alias: {
            react_src: path.resolve(__dirname, "src/react_src"),
        },
        extensions: [ '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    plugins: [
        new webpack.ProvidePlugin({
          // jQuery:
          $: 'jquery',
          jQuery: 'jquery',
          "window.$": 'jquery',
          "window.jQuery": 'jquery',

          // Lodash:
          _: 'lodash',
          lodash: 'lodash',
          "window._": 'lodash',
          "window.lodash": 'lodash',
        }),
    ]
};

console.log("Config Loaded.");