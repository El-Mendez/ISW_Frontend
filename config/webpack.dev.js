const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,

  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },

  devServer: {
    contentBase: path.outputPath,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
