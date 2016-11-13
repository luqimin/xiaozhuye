// webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    // entry: path.join(__dirname, '/www/app/index.js'),
    entry: {
        index: path.join(__dirname, '/www/app/index')
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.join(__dirname, '/www/static/js'),
        publicPath: path.join('/static/js/'),
        filename: "[name].js",
        chunkFilename: '[id].[chunkhash:6].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     comments: false
        // })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'yule',
        //     chunks: ["yule"]
        // })
    ],
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
}