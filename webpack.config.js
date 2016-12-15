var webpack = require("webpack"),
    path = require("path"),
    merge = require("webpack-merge"),
    {CheckerPlugin} = require('awesome-typescript-loader');

module.exports = {
    target: 'web',
    entry: "./app/ts/main",
    output: {
        path: "./wwwroot",
        filename: "app.bundle.js"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/, loaders: [
                    //"ts",
                    "awesome-typescript",
                    "angular2-template",
                    //"angular2-router"
                ]
            },
            { test: /\.html$/, loader: "raw" },
            { test: /\.css$/, loaders: ["raw", "postcss"] },
            { test: /\.scss$/, loaders: ["raw", "postcss", "sass"] },
            { test: /\.json$/, loader: 'json' },
        ]
    },
    plugins: [
        new CheckerPlugin(),
    ],
    resolve: {
        extensions: [".ts", ".js", ".json"],
        modules: [
            path.join(__dirname, "node_modules")
        ]
    }
}