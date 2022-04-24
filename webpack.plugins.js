const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const fs = require("fs");

const packageInfo = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

module.exports = [
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(packageInfo.version),
  }),
  new ForkTsCheckerWebpackPlugin(),
];
