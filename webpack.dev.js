const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', './src/client/index.tsx'],
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    hot: false,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: process.env.API_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      '@domain': path.resolve(__dirname, 'server/modules/domain/'),
      '@services': path.resolve(__dirname, 'src/client/services/'),
      '@api': path.resolve(__dirname, 'src/client/api/'),
      '@pages': path.resolve(__dirname, 'src/client/pages/'),
      '@routes': path.resolve(__dirname, 'src/client/routes/'),
      '@components': path.resolve(__dirname, 'src/client/components/'),
      '@constants': path.resolve(__dirname, 'src/client/constants/'),
      '@contexts': path.resolve(__dirname, 'src/client/contexts/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            babelrc: true,
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
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     configFile: 'tsconfig.client.json',
    //   },
    //   eslint: {
    //     files: './src/client/**/*.{ts,tsx,js,jsx}',
    //   },
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      base: '/',
      template: './src/client/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
