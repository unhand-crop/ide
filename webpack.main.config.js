const path = require("path");
const fs = require("fs");
const rules = require("./webpack.rules");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

const rmDir = (path) => {
  if (fs.existsSync(resolve(path))) {
    fs.rmSync(resolve(path), { recursive: true });
  }
};

const isDev = process.env.NODE_ENV === "development";

const patterns = [
  {
    from: resolve("src/scripts"),
    to: resolve(".webpack/main/scripts"),
  },
];

if (!isDev) {
  rmDir("./res/home");
  rmDir("./res/logs");
  rmDir("./res/vm");

  patterns.push({
    from: resolve("./res"),
    to: resolve(".webpack/res"),
  });
}

const plugins = [
  new CopyWebpackPlugin({
    patterns,
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
