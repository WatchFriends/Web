var webpack = require("webpack"),
    path = require("path"),
    merge = require("webpack-merge"),
    {CheckerPlugin} = require('awesome-typescript-loader');
    
module.exports = {
    entry:  "./app/ts/main",
    output: {
        path: "./wwwroot",
        filename: "app.bundle.js"
    },
    module: {
        loaders: [
            {test: /\.ts$/, loaders: [
                //"ts",
                "awesome-typescript",
                "angular2-template",
                //"angular2-router"
            ]},
        { test: /\.(css|html)$/, loader: "raw"}
        ]
    },
    plugins: [
        new CheckerPlugin(),
    ],
    resolve: {
        extensions: [".ts",".js"],
        root: [
            path.resolve("./node_modules")
        ]
    },
    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
}