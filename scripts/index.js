const path = require('path');

const ROOT = path.resolve(__dirname, '../');
const ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ENV_VALUE =process.env.ENV;
module.exports = {
	mode: ENV || 'production',
	devtool: ENV === 'development' ? 'source-map' : undefined,
	context: ROOT,
	entry: `${ROOT}/src/index.jsx`,
	output: {
		path: `${ROOT}/${ENV_VALUE?"dist":"docs"}`,
		filename: 'index.[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
	},
	resolve: {
		alias: {
			react: 'anujs/dist/ReactIE',
			'react-dom': 'anujs/dist/ReactIE',
			reactPropTypes: 'anujs/lib/ReactPropTypes',
			'create-react-class': 'anujs/lib/createClass',
			rematch: 'anujs/dist/Rematch',
			'@reach/router': `${ROOT}/patchs/Router`,
			redux: `${ROOT}/patchs/redux`,
			'@': `${ROOT}/src`,
			'service': `${ROOT}/src/utils/service`,
			antd: `${ROOT}/patchs/antd`,
			api: `${ROOT}/src/utils/api`,
			img: `${ROOT}/src/assets/img`,
		},
		extensions: ['.js', '.jsx','.scss'],
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							loose: true,
							modules: 'commonjs',
						}],
					],
					plugins: [
						['@babel/plugin-proposal-class-properties', {
							loose: true,
						}],
						['@babel/plugin-syntax-dynamic-import'],
					],
				},
			}],
		}, {
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							loose: true,
							modules: 'commonjs',
						}],
						['@babel/preset-react', {
							loose: true,
						}],
					],
					plugins: [
						['@babel/plugin-proposal-class-properties', {
							loose: true,
						}],
						['@babel/plugin-syntax-dynamic-import'],
					],
				},
			}],
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: true,
						localIdentName: '[local]-_-[hash:base64]',
					},
				},
			],
		}, {
			// .sass 解析
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
				options: {
					// you can specify a publicPath here
					// by default it uses publicPath in webpackOptions.output
					publicPath: '../',
					hmr: process.env.NODE_ENV === 'development',
				},
			}, 'css-loader', 'sass-loader',
				{
					loader: 'sass-resources-loader',
					options: {
						resources: [
							// resolve方法第二个参数为scss配置文件地址，如果有多个，就进行依次添加即可
							path.resolve(__dirname, '../src/assets/css/configuration.scss'),
						],
					}
				},

			],
		}, {
			// 文件解析
			test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
			include: path.resolve(__dirname, 'src'),
			use: ['file-loader?name=assets/[name].[ext]'],
		},
			{
				// 图片解析
				test: /\.(png|jpg|gif)(\?|$)/,
				// include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: ENV === 'development' ? 20840 : 2084,
							name: 'assets/[name].[ext]'
						}
					}
				],
			},],
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					ie8: true,
				},
			}),
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			ENV:JSON.stringify(ENV_VALUE)
		}),
		new webpack.DllReferencePlugin({
			context: ROOT,
			manifest: `${ROOT}/src/base.manifest.json`,
		}),
		new HtmlWebpackPlugin({
			template: `${ROOT}/src/index.html`,
		}),
		new UglifyJsPlugin({	// development
			uglifyOptions: {
				ie8: true,
				compress: false,
				mangle: false,
				output: {
					beautify: true,
				},
			},
		}),
		new CopyWebpackPlugin([{
			context: ROOT,
			from: 'src/static',
			to: 'static',
		},{
			context: ROOT,
			from: 'src/not-found.html',
			to: '',
		}], {}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: 'main.[hash].css',
			chunkFilename: '[id].[hash].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				safe: true,
				discardComments: { removeAll: true }
			},
			canPrint: true
		}),
		// new BundleAnalyzerPlugin({ analyzerPort: 9988 }),
	],
	devServer: {	// didn't work on IE8
		contentBase: `${ROOT}/docs`,
		// proxy: {
		// 	"/yc": {
		// 		target: "http://172.18.255.251:18080",
		// 		pathRewrite: { "^/yc": "" }
		// 	},
		// 	"/api": {
		// 		target: "http://172.18.255.251:18080",
		// 		pathRewrite: { "^/api": "" }
		// 	},
		// }
	},
};
