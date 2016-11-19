const _ = require('lodash');
const webpack = require('webpack');
const webpackConfig = require('./www/blog/webpack.config.js');
let compiler = webpack(webpackConfig);

// webpack打包
console.log('\033[91m 开始打包js... \033[0m');
compiler.run((err, stats) => {
    if (stats.hasErrors()) {
        console.log(1);
        return console.log(stats.toJson().errorDetails);
    }
    if (stats.hasWarnings()) {
        console.log(12);
        return console.log(stats.hasWarnings());
    }

    let chunksArr = stats.toJson('minimal').chunks;

    // 获取当前文件夹下所有js文件
    _.each(chunksArr, (value) => {
        console.log('\033[92m 打包js => \033[0m' + value.files[0] + '\033[92m 大小: ' + value.size / 1000 + 'KB\033[0m');
    });
});