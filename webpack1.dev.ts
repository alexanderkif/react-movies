import path from "path";

module.exports = {
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: +process.env.PORT,
    // open: true,
    // historyApiFallback: true,
  },
};
