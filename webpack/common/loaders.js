var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var lessOption = {
  "globalVars":{
    "base":750/10+"rem"
  }
};

module.exports=[
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'stage-0']
    }
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader?'+JSON.stringify(lessOption))
  },
  {
    test: /\.css$/,
    include: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader','css-loader')
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loader: 'json-loader',
  },
  {
    test: /\.(png|jpg|gif)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=8192&name=[name]_[hash].[ext]'
  },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    loader: 'html'
  }
];
