var loaders = require('./common/loaders.js')

var {lib,resolve} = require('./common/config.js')
var {entry,htmlConfig} = require('./common/entry.js')

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry:Object.assign({},entry,lib),
  module:{
    loaders
  },
  output:{
    filename: "[name]-[chunkHash].js",
    path: path.resolve(__dirname,'../dist'),
  },
  resolve,
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
       names: ['zzlib', 'manifest']
    }),
    new ExtractTextPlugin("[name]-[chunkhash].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      output: {
        comments: false,  // remove all comments
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("qa")
      }
    })
  ].concat(htmlConfig)
};
