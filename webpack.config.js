"use strict";
const path = require("path");
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  //  mode: "development",
  entry: "./index.js",
  output: {
    filename: "files.min.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UnminifiedWebpackPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js", ".json", ".wasm"]
  }
};
