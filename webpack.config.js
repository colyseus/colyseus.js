const webpack = require('webpack')
const path = require('path')

module.exports = function(options) {

    return {
        entry: path.join(__dirname, "src/index.ts"),

        output: {
            path: path.join(__dirname, "dist"),
            filename: "colyseus.js",

            libraryTarget: "var",
            library: "Colyseus"
        },

        devtool: 'inline-source-map',

        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader" },
            ],
        },

        resolve: {
            extensions: ['.ts', '.js', '.json']
        }

    }
};
