var webpack = require('webpack')
var path = require('path')

module.exports = {
    // entry : [
    // 	'./main-a.js',
    // 	'./main-b.js'
    // ],

    node: {
        fs: 'empty'
    },

    entry: {
        app: [
            // 'webpack/hot/dev-server',
            // 'webpack-dev-server/client?http://localhost:3000',
            './js/init.jsx'
        ],
        vendor: [
            'react', 'pixi.js'
        ]
    },

    //devtool: '#inline-source-map',

    output: {
        path: __dirname, //path.join(__dirname, 'build'),
        filename: 'bundle.[name].js'
    },

    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin(['vendor'], 'vendor.out.js')
    ],

    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader?stage=1&optional=runtime']
            },

            {
                test: /\.json?$/,
                loader: 'json-loader'
            }
        ]
    }
}
