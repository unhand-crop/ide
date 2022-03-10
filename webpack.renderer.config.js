const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

const resolve = (dir) => path.resolve(__dirname, dir);

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

rules.push({
  test: /\.scss$/,
  exclude: /\.module.scss$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "sass-loader" },
  ],
});

rules.push({
  test: /\.module.scss$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "sass-loader" },
  ],
});

plugins.push(
  new MonacoWebpackPlugin(["javascript", "typescript", "css", "html", "json"])
);

plugins.push(
  new CopyWebpackPlugin({
    patterns: [
      { from: resolve("public"), to: resolve(".webpack/renderer/public") },
      { from: resolve("charts"), to: resolve(".webpack/renderer") },
    ],
  })
);

module.exports = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
  },
};
