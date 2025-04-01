const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/global.js",
    index: "./src/login.js",
    mainscreen: "./src/mainscreen.js",
  },
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/img/[name][ext]",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/mainscreen.html",
      inject: true,
      chunks: ["mainscreen"],
      filename: "mainscreen.html",
    }),

    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/img/**",
          to() {
            return "assets/img/[name][ext]";
          },
        },
      ],
    }),
  ],
};
