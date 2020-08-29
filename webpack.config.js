const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, options) => {
  const isProductionMode = (options.mode === 'production')

  const src = path.resolve('./src')

  let webpackConfig = {
    entry: {
      main: [
        src + '/index.js',
      ]
    },
    output: {
      library: 'SkillsMap',
      libraryTarget: 'umd',
      filename: 'skillsMap.js',
      path: path.resolve(__dirname, 'umd')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false
            }
          }
        },
        {
          test: /\.sass$/,
          use: [
            isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    optimization: {
      minimize: isProductionMode,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin(),
      ]
    }
  }

  return webpackConfig
};
