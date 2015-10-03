'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function makeWebpackConfig (options) {
	/**
	 * Environment type
	 * BUILD is for generating minified builds
	 */
	var BUILD = !!options.BUILD;
	
	/**
	 * Config
	 * Reference: http://webpack.github.io/docs/configuration.html
	 * This is the object where all configuration gets set
	 */
	var config = {};
	
	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	if (BUILD) {
		config.devtool = 'source-map';
	}
	
	else {
		config.devtool = 'eval';
	}
	
	/**
	 * Entry
	 * Reference: http://webpack.github.io/docs/configuration.html#entry
	 */
	config.entry = {
		app: './src/bootstrap.js',
	};
	
	/**
	 * Output
	 * Reference: http://webpack.github.io/docs/configuration.html#output
	 */
	config.output = {
		// Absolute output directory
		path: __dirname + '/build',
		
		// Output path from the view of the page
		// Uses webpack-dev-server in development
		publicPath: BUILD ? '/' : 'http://localhost:8080/',
		
		// Filename for entry points
		// Only adds hash in build mode
		filename: '[name].bundle.js',
		
		// Filename for non-entry points
		// Only adds hash in build mode
		chunkFilename: '[name].bundle.js',
	};
	
	/**
	 * Resolve
	 * Reference: http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
	 * An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
	 */
	config.resolve = {
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ 'vendor', 'node_modules' ],
	};
	
	/**
	 * Loaders
	 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
	 * List: http://webpack.github.io/docs/list-of-loaders.html
	 * This handles most of the magic responsible for converting modules
	 */
	
	config.module = {
		preLoaders: [],
		loaders: [
			{
				// ES6 JS LOADER
				// Reference: https://github.com/babel/babel-loader
				// Transpile .js files using babel-loader
				// Compiles ES6 and ES7 into ES5 code
				test: /\.jsx$/,
				loader: 'babel?optional[]=runtime',
			},
			{
				// ES6 JS LOADER
				// Reference: https://github.com/babel/babel-loader
				// Transpile .js files using babel-loader
				// Compiles ES6 and ES7 into ES5 code
				test: /\.js$/,
				loader: 'babel?optional[]=runtime',
				exclude: /(node_modules)/,
			},
			{
				// ASSET LOADER
				// Reference: https://github.com/webpack/file-loader
				// Copy png, jpg, gif, svg, woff, ttf files to output
				// Rename the file using the asset hash
				// Pass along the updated reference to your code
				// You can add here any file extension you want to get copied to your output
				test: /\.(png|jpg|gif|svg|woff|ttf)$/,
				loader: 'file',
			},
			{
				test: /\.glsl$/,
				exclude: /(node_modules)/,
				loader: 'hedra/loader-webpack-glsl',
			},
			{
				test: /Spec\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'mocha',
			},
		],
	};
	
	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 * List: http://webpack.github.io/docs/list-of-plugins.html
	 */
	config.plugins = [
		
		// Reference: https://github.com/ampedandwired/html-webpack-plugin
		// Render index.html
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			minify: BUILD,
		}),
	];
	
	// Add build specific plugins
	if (BUILD) {
		// Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
		// Only emit files when there are no errors
		config.plugins.push(new webpack.NoErrorsPlugin());
		
		// Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
		// Dedupe modules in the output
		config.plugins.push(new webpack.optimize.DedupePlugin());
		
		// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
		// Minify all javascript, switch loaders to minimizing mode
		config.plugins.push(new webpack.optimize.UglifyJsPlugin());
		
		config.plugins.push(new webpack.BannerPlugin('Copyright 2015 HMU Design. All Rights Reserved.'));
	}
	
	/**
	 * Dev server configuration
	 * Reference: http://webpack.github.io/docs/configuration.html#devserver
	 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
	 */
	config.devServer = {
		contentBase: './public',
		stats: {
			modules: false,
			cached: false,
			colors: true,
			chunk: false,
		},
	};
	
	return config;
};
