const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = (env, argv) => {
  const isDevMode = argv.mode !== 'production';

  return {
    entry: ['@babel/polyfill', './src/index.jsx'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'eslint-loader',
              options: {
                failOnWarning: !isDevMode,
                failOnError: true,
              }
            }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '',
      filename: '[name].js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        hash: true,
        inject: 'body',
        template: './src/index.html',
        filename: 'index.html'
        //favicon:
      }),
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      historyApiFallback: true,
    },
    devtool: 'source-map'
  }
};
