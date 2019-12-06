const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const config = {
  // Указываем что бы webpack игнорировал встроенные в node js модули при сборке (path, fs)
  target: 'node',

  mode: 'production',

  // Указываем точку входа для webpack
  entry: './src/index.js',
  // Для ускорения сборки, подтягиваем все зависимости из вне а не из node_modules
  externals: [webpackNodeExternals()],

  // Указываем куда сохранять билд файл
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
};

module.exports = merge(baseConfig, config);
