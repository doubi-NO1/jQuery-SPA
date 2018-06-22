const path = require('path');

module.exports = {
  entry: __dirname + "/core/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "jQuery-SPA.min.js"
  },
  module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader'
      }]
    }
}