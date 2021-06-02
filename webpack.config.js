const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:'development',
  devtool:'source-map',
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js',
    publicPath:'/'
  },
  module:{
    rules:[
      {
        test:/\.js?$/,
        use:{
          loader: 'babel-loader',
          options:{
            presets:[['@babel/preset-env'],'@babel/preset-react'],
            plugins:[
              ['@babel/plugin-proposal-decorators',{legacy:true}],
              ['@babel/plugin-proposal-class-properties',{loose:true}]
            ]
          }
        },
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({template:'./public/index.html'})
  ]
}