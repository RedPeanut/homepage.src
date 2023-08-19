const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/app/app.js"),
  // 로더
  resolveLoader: {
    // Hierarchy of directories for Webpack to look for loaders.
    modules: [
      path.resolve(__dirname, '../src/ssg/loaders'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(md|markdown)$/,
        use: {
          loader: 'markdown-loader',
          options: {/*  */}
        }
      },
      {
        test: /seed\.toml/,
        use: {
          loader: 'seed-loader',
          options: {
            directory: path.resolve(__dirname, '../src/app'),
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: 'body',
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/app"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    modules: [
      path.resolve(__dirname, '../src/app'),
      path.resolve(__dirname, '../src/ssg/isomorphic'),
      'node_modules'
    ],
  },
};