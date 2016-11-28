const fs = require('fs');
const path = require('path');
const _ = require('lodash');


const jsPath = './city.js';

// 更新xiaozhuye index_html script标签
fs.readFile(jsPath, 'utf8', (err, data) => {
    if (err) throw err;
    // script标签
    let scriptExp = /\}\,/g;
    let newScript = data.replace(scriptExp, '},\n');
    // 更新文件
    fs.writeFile(jsPath, newScript, 'utf8', (err) => {
        if (err) throw err;
        console.log('gengxinwancheng');
    });
});