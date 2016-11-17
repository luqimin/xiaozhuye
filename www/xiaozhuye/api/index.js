import Vue from 'vue';
import axios from 'axios';

export default {
    //获取新闻类addon列表
    addon(cb, name, force) {
        if (!force && window.localStorage && localStorage.getItem(name)) {
            cb(JSON.parse(localStorage.getItem(name)));
            return;
        }
        axios.get('/addons/fetch/' + name, '').then(res => {
            // 响应成功回调
            let list = res.data;
            if (list && list.length) {
                window.localStorage && localStorage.setItem(name, JSON.stringify(res.data));
                cb(list);
            }
        }, function(res) {
            // 响应错误回调
            cb(res.data);
        });
    },
    //用户登录
    login(cb, info) {
        axios.post('/webapi/useraccount/login', info).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res.data);
        });
    },
    //用户退出
    logout(cb) {
        axios.get('/webapi/useraccount/logout', '').then(res => {
            // 响应成功回调
            cb(res.data);
        }, function(res) {
            // 响应错误回调
            cb(res.data);
        });
    },
    //用户注册
    register(cb, info) {
        axios.post('/webapi/useraccount/register', info).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res.data);
        });

    },
    //获取网址们
    getSites(cb, opt) {
        //@param {string} type: const获取固定地址，user获取用户自定义网址
        axios.get('/webapi/site/get', { params: opt }).then(res => {
            // 响应成功回调
            cb(res.data.data);
        }, function(res) {
            // 响应错误回调
            cb(res.data);
        });
    },
    //获取用户网址
    mySites(cb, opt) {
        //@param {string} type: const获取固定地址，user获取用户自定义网址
        axios.get('/webapi/site/my', { params: opt }).then(res => {
            // 响应成功回调
            cb(res.data.data);
        }, function(res) {
            // 响应错误回调
            cb(res.data);
        });
    },
    //模糊查询网址
    searchSites(cb, opt) {
        //@param {string} type: const获取固定地址，user获取用户自定义网址
        axios.get('/webapi/site/search', { params: opt }).then(res => {
            // 响应成功回调
            cb(res.data.data);
        }, function(res) {
            // 响应错误回调
            cb(res.data);
        });
    },
    //编辑模块配置
    editMokuai(cb, mokuai) {
        axios.post('/webapi/useraccount/editmokuai', mokuai).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res.data);
        });
    },
    //编辑模块配置
    editSites(cb, sites) {
        axios.post('/webapi/useraccount/editsites', sites).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res.data);
        });
    },
    //用户添加网址入库
    addUserSite(cb, site) {
        axios.post('/webapi/site/add', site).then(res => {
            // 响应成功回调
            cb(res.data);
        }, res => {
            // 失败回调
            cb(res.data);
        });
    }
}