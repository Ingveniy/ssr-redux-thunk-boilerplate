const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  // Указываем точку входа для webpack(index.js файл для обычного приложения)
  entry: './src/client.js',

  // Указываем путь и название для build файла
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'inline-source-map'
};

module.exports = merge(baseConfig, config);
