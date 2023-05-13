const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [ path.join(__dirname, 'src', 'index.js'), path.join(__dirname, 'src', 'sass/main.scss')],
  output: {
    path: path.join(__dirname),
    filename: 'index.js',
 
  },
  module: {
    rules: [
      {
       test: /\.(scss|css)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
           
        },
        {
            loader: "css-loader"
        },
        {
            loader: "sass-loader"
        },
           ],
     },
     {
                 test: /\.(png|jpg|jpeg|gif)$/i,
                 type: 'asset/resource',
                 
               },
               {
                 test: /\.svg$/,
                 type: 'asset/resource',
                 generator: {
                   filename: path.join('icons', '[name][ext]'),
                 },
               },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.html'),
      filename: 'index.html',
    }),
    new FileManagerPlugin({
               events: {
                 onStart: {
                   delete: ['dist'],
                 },
               },
             }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        }),
  ],
    devServer: {
       watchFiles: path.join(__dirname, 'src'),
        port: 9000,
      },
};