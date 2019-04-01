const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      { 
        test: /\.css$|\.scss$/,
        //use: ExtractTextPlugin.extract({
          //fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        //})
      } /*,
       { 
        test: /\.css$/,
        //exclude: /node_modules/,
        //use: ExtractTextPlugin.extract({
          //fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        //})
       }*/
    ]
  }
};