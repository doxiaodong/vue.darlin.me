const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function webpackConfig() {
  const config = {
    devtool: '#eval-source-map',

    entry: {
      lib: './src/lib.js',
      main: './src/index.js'
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      // publicPath: '//static.darlin.me/',
      filename: '[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style!css!postcss' },
        { test: /\.less$/, loader: 'style!css!postcss!less' },
        { test: /\.vue$/, loader: 'vue' }
      ]
    },

    postcss: [
      Autoprefixer({
        browsers: ['last 1 version', '> 10%']
      })
    ],

    plugins: [
      new webpack.ProvidePlugin({
        marked: 'marked',
        hljs: 'highlight.js',
        md5: 'crypto-js/md5',
        emojione: 'emojione',
        base64: 'js-base64',
        sha512: 'crypto-js/sha512'
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
          minifyCSS: true,
          collapseWhitespace: true,
          removeComments: true
        },
        chunksSortMode: 'dependency'
      }),

      // new ExtractTextPlugin('main.[hash].css'),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['lib', 'main'].reverse()
      }),

      new webpack.DefinePlugin({
        Name: 'vue.darlin.me'
      }),

    ],

    devServer: {
      port: 5000,
      host: 'localhost',
      historyApiFallback: true,
      noInfo: true
    }

  }

  if (true) {
    config.devtool = '#source-map'
    config.plugins.concat([
      new webpack.DefinePlugin({
        ENV: 'prod'
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false, //prod

        mangle: {
          screw_ie8: true
        }, //prod
        compress: {
          screw_ie8: true
        }, //prod
        comments: false //prod
      })
    ])
  }

  return config
}

module.exports = webpackConfig
