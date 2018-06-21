const path = require('path');

module.exports = {
  entry: __dirname + "/core/index.js", //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/demo/lib", //打包后的文件存放的地方
    filename: "jQuery-SPA.min.js" //打包后输出文件的文件名
  },
  module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        /*exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件*/
        /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
      }]
    }
}