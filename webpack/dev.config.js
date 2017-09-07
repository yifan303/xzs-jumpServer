var loaders = require('./common/loaders.js')

var {lib,resolve} = require('./common/config.js')
var {entry,htmlConfig} = require('./common/entry.js')

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool:'inline-source-map',
  entry:Object.assign({},entry,lib),
  module:{
    loaders
  },
  resolve,
  output:{
    filename: "[name]-[hash].js"
  },
  plugins:[
    new ExtractTextPlugin("[name]-[chunkhash].css"),
    new webpack.optimize.CommonsChunkPlugin({
       names: ['zzlib', 'manifest']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ].concat(htmlConfig)
};
