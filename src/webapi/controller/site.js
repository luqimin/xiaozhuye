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
        let sitePy = slugify(siteName);
        let model = this.model('tiny_sites');
        //写入数据库
        try {
            let insertId = await model.add({
                name: siteName,
                py: sitePy,
                url: siteUrl,
                category: siteCat,
                icon: siteIcon || siteUrl + '/favicon.ico',
                add_userid: '1',
                isactive: 1,
                addtime: think.datetime(),
                updatetime: think.datetime(),
                isconst: 0
            });
            return this.success('添加成功!');
        } catch (error) {
            return this.fail('服务器响应错误，添加失败');
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
            let model = this.model('tiny_sites');
            let _where = "(name REGEXP '"+ _reg +"') OR (py REGEXP '"+ _reg +"') OR (url REGEXP '"+ _reg +"')";
            let list = await model.getSites(_where, {
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