const path = require("path");
const rules = require("./webpack.rules");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: resolve("src/scripts"),
        to: resolve(".webpack/main/scripts"),
      },
    ],
  }),
];

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
