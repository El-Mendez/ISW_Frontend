module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
    ],
  },
  {
    test: /\.(svg|png|jpg|gif)$/i,
    use: {
      loader: 'file-loader',
      options: {
        esModule: false,
        name: '[name].[ext]',
        outputPath: 'imgs',
      },
    },
  },
  {
    test: /\.(svg|woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },
    ],
  },
];
