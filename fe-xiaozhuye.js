const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const webpackConfig = require('./www/xiaozhuye/webpack.config.js');
let compiler = webpack(webpackConfig);

const jsPath = './www/static/js/xiaozhuye';
const chunkPath = './www/static/js/xiaozhuye/chunk';
const indexHtmlPath = './view/home/index_index.html';
const manifestPath = './www/tiny.appcache';

// 清空js文件夹内所有文件
// 删除chunk文件夹
console.log('\033[91m 清理js文件夹... \033[0m' + '\n');
if (fs.existsSync(chunkPath)) {
    let chunkFolder = fs.readdirSync(chunkPath);
    chunkFolder.forEach(fileName => {
        fs.unlinkSync(chunkPath + '/' + fileName);
    });
    fs.rmdirSync(chunkPath);
}
// 删除js文件夹
if (fs.existsSync(jsPath)) {
    let jsFolder = fs.readdirSync(jsPath);
    jsFolder.forEach(fileName => {
        fs.unlinkSync(jsPath + '/' + fileName);
    });
}

// webpack打包
console.log('\033[91m 开始打包js... \033[0m');
compiler.run((err, stats) => {
    if (stats.hasErrors()) {
        return console.log(stats.toJson().errorDetail);
    }
    if (stats.hasWarnings()) {
        return console.log(stats.hasWarnings());
    }

    let chunksArr = stats.toJson('minimal').chunks;
    // console.log(chunksArr);
    // 获取index.js
    let indexJs = _.find(chunksArr, ['names', ['index']]);
    let blogJs = _.find(chunksArr, ['names', ['blog']]);
    // 更新xiaozhuye index_html script标签
    fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
        if (err) throw err;
        // script标签
        let scriptExp = /\/static\/js\/\w*.*[\d\w]*\.js/;
        let newScript = data.replace(scriptExp, '/static/js/' + indexJs.files[0]);
        // 更新文件
        fs.writeFile(indexHtmlPath, newScript, 'utf8', (err) => {
            if (err) throw err;
            console.log('\033[92m ' + indexHtmlPath + ' 更新成功 \033[0m' + '\n');
        });
    });

    // 获取当前文件夹下所有js文件
    let newJsCache = '';
    _.each(chunksArr, (value) => {
        newJsCache += '\n' + '/static/js/' + value.files[0];
        console.log('\033[92m 打包js => \033[0m' + value.files[0] + '\033[92m 大小: ' + value.size / 1000 + 'KB\033[0m');
    });

    // 更新manifest配置
    if (fs.existsSync(manifestPath)) {
        console.log('\n\033[91m 检测到: ' + manifestPath + ' 开始清理旧文件... \033[0m');
        fs.unlinkSync(manifestPath);
        console.log('\033[91m 已删除: ' + manifestPath + ' \033[0m');
    }
    if (!fs.existsSync(manifestPath)) {
        let verNum = '# ' + Date();
        let verText = 'CACHE MANIFEST\n' + verNum;
        let cssStatic = '\n/static/css/bootstrap.min.css\n' +
            '/static/css/style.css\n' +
            '/static/img/default.png\n' +
            '/static/img/refresh.png\n' +
            '/favicon.ico\n\n' +
            'NETWORK:\n*';
        let newFile = verText + newJsCache + cssStatic;

        fs.writeFile(manifestPath, newFile, 'utf8', (err) => {
            if (err) throw err;
            console.log('\033[92m 新建 ' + manifestPath + ' 成功 \033[0m' + '\n');
        });
    }
});