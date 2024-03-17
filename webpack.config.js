const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mainCwd = (...rest) => path.resolve(__dirname, ...rest);

module.exports = {
  entry: mainCwd("src/js/index.js"),
  output: {
    path: mainCwd("dist"),
    filename: "[name].[contenthash:12].js",
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: mainCwd("index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:12].css", // Specify the output CSS filename
    }),
  ],
};
