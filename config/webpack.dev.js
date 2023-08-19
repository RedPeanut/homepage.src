const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    // contentBase: 'src/www',
    static: 'src/www',
    // open: true,
    compress: true,
    hot: true,
    liveReload: true,
    // stats: 'errors-only',
    // devMiddleware: {
    //   stats: 'errors-only',
    // },
    host: '0.0.0.0',
    port: 3000,
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, '../dev'),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
