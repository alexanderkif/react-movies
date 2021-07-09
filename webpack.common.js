const path = require('path');
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "build.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      title: "React TS App",
      template: "./public/index.html",
    }),
    // DefinePlugin allows you to create global constants which can be configured at compile time
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    new ForkTsCheckerWebpackPlugin({
      // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
  ],
};
