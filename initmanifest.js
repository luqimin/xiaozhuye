const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
let compiler = webpack(webpackConfig);

const jsPath = './www/static/js';
const manifestPath = './www/tiny.appcache';

// 清空js文件夹内所有文件
let jsFolder = fs.readdirSync(jsPath);
jsFolder.forEach(fileName => {
    fs.unlinkSync(jsPath + '/' + fileName);
});
console.log('\033[91m 清空js文件夹 \033[0m' + '\n');

// webpack打包
compiler.run((err, stats) => {
    if (stats.hasErrors()) {
        return console.log(stats.hasErrors());
    }
    if (stats.hasWarnings()) {
        return console.log(stats.hasWarnings());
    }

    // 获取当前文件夹下所有js文件
    let jsFolder = fs.readdirSync(jsPath),
        newJsCache = '';
    jsFolder.forEach(fileName => {
        newJsCache += '\n' + '/static/js/' + fileName;
    });
    console.log('\033[92m 打包js完成 \033[0m' + newJsCache + '\n');

    // 更新manifest配置
    fs.readFile(manifestPath, 'utf8', (err, data) => {
        if (err) throw err;

        let jsExp = /\/static\/js\/\d*\.*[\d\w]+\.js\n/g;
        let verExp = /#\s\d+\-\d+\-\d+\sv\d\.\d\.\d\b/;
        let verNumExp = /v\d\.\d\.\d\b/;

        // 修改版本号
        let currVer = data.match(verNumExp)[0];
        let verArr = currVer.split('.');
        let thirdArr = ++verArr[2];
        let secondArr = verArr[1];
        if (thirdArr >= 10) {
            thirdArr = 0;
            secondArr++;
        }
        let newVerNum = verArr[0] + '.' + secondArr + '.' + thirdArr;
        // 版本号添加日期
        let date = new Date();
        let newVer = '# ' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + newVerNum;

        // 删除原js文件
        let newFile = data.replace(jsExp, '');
        // 修改版本号,添加新js缓存
        newFile = newFile.replace(verExp, newVer + newJsCache);

        // 更新文件
        fs.writeFile(manifestPath, newFile, 'utf8', (err) => {
            if (err) throw err;
            console.log('\033[92m' + manifestPath + ' 更新成功: \033[0m' + '\n' + newFile);
        });
    });
});