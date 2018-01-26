const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/app/'),
    hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    port: 3000 // Change this for your project
  },
  entry: path.join(__dirname, 'app', 'index'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: ''
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('staging')
    }),
    new DashboardPlugin({ port: 3001 }) // Change this here and in the package.json start script if needed
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: [
        'babel-loader'
        // 'eslint-loader' uncomment if you want to use eslint while compiling
      ]
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  }
};