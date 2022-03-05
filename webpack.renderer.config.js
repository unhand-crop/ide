const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const path = require("path");

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

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
  },
};
