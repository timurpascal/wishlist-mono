const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: './src/client/index.tsx',
  target: 'browserslist',
  devtool: false,
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        include: [path.resolve(__dirname, 'src/client')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            babelrc: true,
            compact: true,
            sourceMaps: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      base: '/',
      template: './src/client/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
