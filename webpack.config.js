'use strict'

const webpack = require('webpack')
const debug = process.env.NODE_ENV !== 'production'
const cfg = require('./config')

const entry = [
  __dirname + '/client/index.js'
]

const debugEntry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://0.0.0.0:' + cfg.webpackPort,
  'webpack/hot/only-dev-server',
  ...entry
]

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
]

module.exports = {
  context: __dirname,
  devtool: debug && 'inline-source-map',
  entry: debug ? debugEntry : entry,
  output: {
    path: __dirname + '/dist',
    filename: 'app.js',
    publicPath: `http://0.0.0.0:${cfg.webpackPort}/`
  },
  plugins: debug ? [
    ...basePlugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ] : [
    ...basePlugins,
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}, output: {comments: false}})
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  devServer: {
    hot: true,
    port: cfg.webpackPort,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
