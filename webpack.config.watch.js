const configBase = require('./webpack.config.js');

module.exports = Object.assign({}, configBase, {
  mode: 'development',
  watch: true,
  devtool: 'eval-source-map',
});