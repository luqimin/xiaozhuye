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

    async getAction() {
        //获取http-header token
        let userToken = this.cookie("usr_token");
        //调用tokenservice中间件
        let tokenService = think.service("token");
        let tokenServiceInstance = new tokenService();
        //验证token
        let verifyTokenResult = await tokenServiceInstance.verifyToken(userToken);
        //服务器错误时
        if (verifyTokenResult === "fail") {
            return this.fail("TOKEN_INVALID");
        }
        //获取用户信息
        let userId = verifyTokenResult.userInfo.id;

        let model = this.model('notepad');
        let list = await model.getInfo({
            userid: userId
        }, 'updatetime DESC');
        if (list) {
            return this.success(list);
        }
    }
    async updateAction() {
        let noteId = this.post('noteId');
        let noteContent = this.post('noteContent');
        let currDate = think.datetime();
        //获取http-header token
        let userToken = this.cookie("usr_token");
        //调用tokenservice中间件
        let tokenService = think.service("token");
        let tokenServiceInstance = new tokenService();
        //验证token
        let verifyTokenResult = await tokenServiceInstance.verifyToken(userToken);
        //服务器错误时
        if (verifyTokenResult === "fail") {
            return this.fail("TOKEN_INVALID");
        }
        //获取用户信息
        let userId = verifyTokenResult.userInfo.id;

        let model = this.model('notepad');

        let isHasNote = await model.where({
            id: noteId
        }).find();

        let list = '';
        if (noteId && isHasNote) {
            list = await model.updateInfo({
                content: noteContent,
                updatetime: currDate
            }, {
                where: {
                    id: noteId
                }
            });
        } else {
            list = await model.addInfo({
                userid: userId,
                content: noteContent,
                addtime: currDate,
                updatetime: currDate
            }, {
                where: {
                    id: noteId
                }
            });
        }

        if (list) {
            return this.success('添加成功');
        } else {
            return this.fail('添加失败');
        }
    }
}