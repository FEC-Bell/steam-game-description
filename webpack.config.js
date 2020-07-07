const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/': 'http://localhost:3005'
    },
    contentBase: path.resolve(__dirname, 'public'),
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client'),
        ],
        loader: 'babel-loader'
      }
    ]
  }
};