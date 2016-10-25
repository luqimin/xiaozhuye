import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    //获取国内焦点
    toutiao(cb) {
        Vue.http.get('/addons/fetch/toutiao', '').then(res => {
            // 响应成功回调
            cb(JSON.parse(res.body));
        }, function(res) {
            // 响应错误回调
            cb(JSON.parse(res.body));
        });
    },
    //获取国内焦点
    guonei(cb) {
        Vue.http.get('/addons/fetch/gnfocus', '').then(res => {
            // 响应成功回调
            cb(JSON.parse(res.body));
        }, function(res) {
            // 响应错误回调
            cb(JSON.parse(res.body));
        });
    },
    //获取国外焦点
    guowai(cb) {
        Vue.http.get('/addons/fetch/gwfocus', '').then(res => {
            // 响应成功回调
            cb(JSON.parse(res.body));
        }, function(res) {
            // 响应错误回调
            cb(JSON.parse(res.body));
        });
    },
    //获取段子
    duanzi(cb) {
        Vue.http.get('/addons/fetch/duanzi', '').then(res => {
            // 响应成功回调
            cb(JSON.parse(res.body));
        }, function(res) {
            // 响应错误回调
            cb(JSON.parse(res.body));
        });
    },
    //获取花边新闻
    yule(cb) {
        Vue.http.get('/addons/fetch/yule', '').then(res => {
            // 响应成功回调
            cb(JSON.parse(res.body));
        }, function(res) {
            // 响应错误回调
            cb(res);
        });
    },
    //用户登录
    login(cb, info) {
        Vue.http.post('/webapi/useraccount/login', info).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res);
        });

    },
    //用户注册
    register(cb, info) {
        Vue.http.post('/webapi/useraccount/register', info).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res);
        });

    },
    //获取网址们
    getSites(cb, opt) {
        //@param {string} type: const获取固定地址，user获取用户自定义网址
        Vue.http.get('/webapi/site/get', { params: opt }).then(res => {
            // 响应成功回调
            cb(res.body.data);
        }, function(res) {
            // 响应错误回调
            // cb(JSON.parse(res.body));
        });
    },
    //获取用户网址
    mySites(cb, opt) {
        //@param {string} type: const获取固定地址，user获取用户自定义网址
        Vue.http.get('/webapi/site/my', { params: opt }).then(res => {
            // 响应成功回调
            cb(res.body.data);
        }, function(res) {
            // 响应错误回调
            // cb(JSON.parse(res.body));
        });
    },
    //模糊查询网址
    searchSites(cb, opt) {
        //@param {string} type: const获取固定地址，user获取用户自定义网址
        Vue.http.get('/webapi/site/search', { params: opt }).then(res => {
            // 响应成功回调
            cb(res.body.data);
        }, function(res) {
            // 响应错误回调
            // cb(JSON.parse(res.body));
        });
    },
    //编辑模块配置
    editMokuai(cb, mokuai) {
        Vue.http.post('/webapi/useraccount/editmokuai', mokuai).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res);
        });
    },
    //编辑模块配置
    editSites(cb, sites) {
        Vue.http.post('/webapi/useraccount/editsites', sites).then(res => {
            // 响应成功回调
            cb(res);
        }, res => {
            // 失败回调
            cb(res);
        });
    },
    //用户添加网址入库
    addUserSite(cb, site) {
        Vue.http.post('/webapi/site/add', site).then(res => {
            // 响应成功回调
            cb(res.body);
        }, res => {
            // 失败回调
            cb(res.body);
        });
    }
}