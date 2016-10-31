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


        plugins: (
            (options.production)
                ? [
                    new webpack.LoaderOptionsPlugin({
                        minimize: true,
                        debug: false
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {},
                        output: { comments: false },
                        sourceMap: false
                    })
                  ]
                : []
        ),

        resolve: {
            extensions: ['.ts', '.js', '.json']
        }

    }
};
