const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
 mode: 'development',
 entry: {
  bundle: path.resolve(__dirname, 'src/index.tsx'),
 },
 output:{
  path: path.resolve(__dirname,'dist'),
  filename: '[name][contenthash].js',
  clean: true,
  assetModuleFilename: '[name][ext]',
 },
 devtool: 'source-map',
 devServer: {
  static: {
    directory: path.resolve(__dirname,'dist')
  },
  port: 3000,
  open: true,
  hot: true,
  compress: true,
  historyApiFallback: true,
 },
 module: {
  rules: [
    {
     test: /\.(scss|css)$/,
     use: [
      'style-loader',
      'css-loader',
      'sass-loader',
     ],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      }
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      }
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    }
   ]
 },
 plugins: [
  new htmlWebpackPlugin({
    title: 'Webpack App',
    filename: 'index.html',
    template: 'src/index.html'
  })
 ],
 resolve: {
  extensions: ['.ts', '.tsx', '.js', '.json']
  }
}