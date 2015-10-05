module.exports = {
	devtool: 'source-map',
	
	entry: './src/bootstrap.js',
	output: {
		path: __dirname + '/build',
		filename: '[name].bundle.js',
	},
	
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel?optional[]=runtime',
			},
			{
				test: /\.js$/,
				loader: 'babel?optional[]=runtime',
				exclude: /(node_modules)/,
			},
		],
	},
	
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ 'vendor', 'node_modules' ],
	},
	
	devServer: {
		contentBase: './build',
		stats: {
			modules: false,
			cached: false,
			colors: true,
			chunk: false,
		},
	},
};
