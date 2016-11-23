// webpack.config.js
var path = require('path');
var webpack = require('webpack');
var prod = process.env.NODE_ENV === 'production' ? true : false;

var plugins = [];
if (prod) {
    plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'yule',
        //     chunks: ["yule"]
        // })
    ]
}

module.exports = {
    entry: {
        index: path.join(__dirname)
    },
    // 输出配置
    output: {
        path: path.join(__dirname, '../static/js'),
        publicPath: path.join('/static/js/'),
        filename: "xiaozhuye/[name].[hash:6].js",
        chunkFilename: 'xiaozhuye/chunk/[id].[chunkhash:6].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', 'jsx'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },
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
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }
};