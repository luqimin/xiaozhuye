// webpack.config.js
var path = require('path');
var webpack = require('webpack');
console.log(__dirname);
module.exports = {
    entry: {
        index: path.join(__dirname),
        vendor: ['react','react-dom']
    },
    // 输出配置
    output: {
        path: path.join(__dirname, '../static/js'),
        publicPath: path.join('/static/js/'),
        filename: "blog/[name].js",
        chunkFilename: 'blog/chunk/[id].[chunkhash:6].js'
    },
    resolve: {
        extensions: ['', '.js', 'jsx']
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     comments: false
        // })
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            filename: "blog/vendor.js"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'react'],
        plugins: ['transform-runtime']
    }
};