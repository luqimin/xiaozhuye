'use strict';

import Base from './base.js';
import { slugify } from 'transliteration';

slugify.config({
    replace: [
        ['微软', 'microsoftweiruan'],
        ['谷歌', 'googleguge'],
        ['新浪', 'sinaxinlang'],
        ['腾讯', 'qqtencenttengxun'],
        ['qq', 'tencenttengxunqq'],
        ['QQ', 'tencenttengxunqq'],
        ['邮箱', 'youxiangemail']
    ],
    lowercase: true,
    separator: ''
});



export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }
    async addAction() {
        let siteName = this.post('name');
        let siteUrl = this.post('url');
        let siteIcon = this.post('icon');
        let siteCat = this.post('category');
        let secret = this.post('secret');
        let isfocus = this.post('isfocus');
        let sitePy = slugify(siteName);
        let model = this.model('tiny_sites');

        if (secret) {
            secret = '1';
        }
        if (isfocus) {
            isfocus = '1';
        }
        //获取http-header token
        let userToken = this.cookie("usr_token");
        //调用tokenservice中间件
        let tokenService = think.service("token");
        let tokenServiceInstance = new tokenService();
        //验证token
        let verifyTokenResult = await tokenServiceInstance.verifyToken(userToken);
        //服务器错误时
        if (verifyTokenResult === "fail") {
            return this.fail("TOKEN_INVALID")
        }
        //获取用户信息
        let userId = verifyTokenResult.userInfo.id;
        let usermodel = this.model("useraccount");
        let userConf = await usermodel.findInfo({
            id: userId
        }, "isvip");

        //网址各种参数合法性判断
        let urlReg = /.+\.[a-zA-Z]{2,10}/;
        let iconReg = /.+\.[a-zA-Z]+\/[a-zA-Z]+(.png|.jpg|.gif|.ico)$/;

        if (!siteName) {
            return this.fail(1100, '请输入网站名');
        }
        if (!siteUrl || !urlReg.test(siteUrl)) {
            return this.fail(1101, '请输入合法的网址, 格式: http://www.xxx.com 或 www.xxx.com');
        }
        if (siteIcon && !iconReg.test(siteIcon)) {
            return this.fail(1102, '图标地址格式错误, 请以.png/.jpg/.gif/.ico结尾, 也可留空');
        }
        if (!siteCat) {
            return this.fail(1103, '请选择合适的网址分类');
        }

        //查看数据库是否有此站点
        let hasSites = await model.getSites({
            name: ["like", "%" + siteName + "%"]
        }, {
            id: 'ASC',
            isfocus: 'DESC'
        });

        if (hasSites.length) {
            return this.fail(1104, hasSites);
        }

        //各种权限判断
        if (!userConf.isvip) {
            this.fail(1000, '用户权限不够, 不允许添加网址');
        }

        //写入数据库
        try {
            let insertId = await model.add({
                name: siteName,
                py: sitePy,
                url: siteUrl,
                category: siteCat,
                secret: secret || 0,
                isfocus: isfocus || 0,
                icon: siteIcon || '',
                add_userid: userId,
                isactive: 1,
                addtime: think.datetime(),
                updatetime: think.datetime(),
                isconst: 0
            });
            return this.success('添加成功!');
        } catch (error) {
            return this.fail(500, '服务器响应错误，添加失败');
        }
    }
    async getAction() {
        let paramType = this.get('');
        let isConst = this.get('isConst');
        let num = this.get('number');
        let model = this.model('tiny_sites');
        let list = await model.getSites({
            isactive: 1,
            isconst: isConst || 0
        }, {
            id: 'ASC',
            isfocus: 'DESC'
        }, num);
        return this.success(list);
    }
    async searchAction() {
            let paramValue = this.get('value');
            if (!paramValue) {
                return this.fail('参数错误');
            }
            let valArr = paramValue.split('');
            let valLength = valArr.length;
            let _reg = ".*";
            for (let i = 0; i < valLength; i++) {
                _reg += valArr[i] + '+.*';

            }
            let num = this.get('number');

            //获取http-header token
            let userToken = this.cookie("usr_token");
            //调用tokenservice中间件
            let tokenService = think.service("token");
            let tokenServiceInstance = new tokenService();
            //验证token
            let verifyTokenResult = await tokenServiceInstance.verifyToken(userToken);
            //服务器错误时
            if (verifyTokenResult === "fail") {
                return this.fail("TOKEN_INVALID")
            }
            //获取用户信息
            let userId = verifyTokenResult.userInfo.id;

            let model = this.model('tiny_sites');

            let _where = "((name REGEXP '" + _reg + "') OR (py REGEXP '" + _reg + "') OR (url REGEXP '" + _reg + "')) AND (isconst = 0)";

            let _secretWhere = "";
            if (userId) {
                _secretWhere = " AND ((secret = 0) || ((secret = 1) AND add_userid = " + userId + "))";
            }

            let list = await model.getSites(_where + _secretWhere, {
                id: 'ASC',
                isfocus: 'DESC'
            }, num);

            return this.success(list);
        }
        //获取用户自己所配置的网址
    async myAction() {
        let num = this.get('number');

        //获取http-header token
        let userToken = this.cookie("usr_token");
        //调用tokenservice中间件
        let tokenService = think.service("token");
        let tokenServiceInstance = new tokenService();
        //验证token
        let verifyTokenResult = await tokenServiceInstance.verifyToken(userToken);
        //服务器错误时
        if (verifyTokenResult === "fail") {
            return this.fail("TOKEN_INVALID")
        }
        //获取用户信息
        let userId = verifyTokenResult.userInfo.id;

        //查找用户网址配置
        let usermodel = this.model("useraccount");
        let siteConf = await usermodel.getInfo({
            id: userId
        }, "sites");
        let userSites = siteConf[0].sites.split(',').join();


        let model = this.model('tiny_sites');
        let list = await model.getSites({
            id: ["IN", userSites],
            isactive: 1,
            isconst: 0
        }, {
            id: 'ASC',
            isfocus: 'DESC'
        }, num);

        return this.success(list);
    }
}