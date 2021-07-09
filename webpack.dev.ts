import path from "path";

module.exports = {
  devtool: "eval-source-map",
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
};
