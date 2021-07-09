const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: +process.env.PORT,
    // open: true,
    // historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[local]--[hash:base64:5]" },
            },
          },
          "sass-loader"
        ],
      },
    ],
  },
});
