const path = require("path");

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./src/app.js"],
    vendor: "./src/vendor.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                quality: 80,
                progressive: true,
              },
              optipng: {
                optimizationLevel: 2,
              },
            },
          },
        ],
      },
    ],
  },
};
