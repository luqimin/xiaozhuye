'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        this.cookie("theme", "default", {
            timeout: 7 * 24 * 3600 //设置 cookie 有效期为 7 天
        });
        this.end();
    }

    async getnoteAction() {

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

        let model = this.model('deadline');
        let list = await model.getInfo({
            userid: userId,
            isactive: 1,
            date: { '>': (new Date()).getTime() }
        }, 'date ASC');
        if (list) {
            return this.success(list);
        }
    }

    async addAction() {
        let noteTitle = this.post('noteTitle');
        let noteContent = this.post('noteContent');
        let noteDay = (new Date(this.post('noteDay'))).getTime();

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

        let model = this.model('deadline');
        let list = await model.addInfo({
            userid: userId,
            title: noteTitle,
            content: noteContent,
            isactive: 1,
            day: this.post('noteDay'),
            date: noteDay
        });

        return this.success('添加成功');
    }

    async deleteAction() {
        let noteId = this.post('id');
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

        let model = this.model('deadline');
        let list = await model.update({
            isactive: 0
        }, {
            where: {
                id: noteId
            }
        });
        if (list) {
            return this.success('删除成功');
        }
    }
}