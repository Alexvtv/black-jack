let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
    entry: './src/index.js',
    output: {
    	path: path.resolve(__dirname, './dist/'),
    	filename: 'main.js',
    	publicPath: 'dist/'
    },
    devServer: {
    	overlay: true
    },
    module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      options: {
        presets: ['@babel/preset-env',
          '@babel/react',{
          'plugins': ['@babel/plugin-proposal-class-properties']}]
      }
    },
    {
      test: /\.scss$/,
         use: ['style-loader', 'css-loader', 'sass-loader']

    }
    ]
},
plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './index.html',
      filename: 'index.html'
    })
]
};

module.exports = (env, options) => {
	let production = options.mode === 'production';

	conf.devtool = production 
	                ? false
	                : 'eval-sourcemap';

	return conf;
}