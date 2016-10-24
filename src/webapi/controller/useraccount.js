'use strict';

import Base from './base.js';
import _ from 'lodash';

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

    async registerAction() {
        //定义接收参数
        let paramName = this.post("username");
        let parmPassword = this.post("password");
        let inviteCode = this.post("inviteCode");
        let isVip = 0;
        if (inviteCode == 'xiaozhuyetiny') {
            isVip = 1;
        } else if (inviteCode == 'fuckxiaozhuye') {
            isVip = 0;
        } else {
            return this.fail("邀请码无效");
        }
        //定义数据模型
        let model = this.model("useraccount");
        //定义个人id
        let ID;
        //查询数据库是否有当前用户名
        let isHasName = await model.where({
            name: paramName
        }).find();
        if (!think.isEmpty(isHasName)) {
            return this.fail(1001, "用户名已存在");
        }
        //数据库写入记录
        try {
            let insertId = await model.add({
                name: paramName,
                password: think.md5(parmPassword),
                isvip: isVip,
                registerDate: think.datetime() // new Date()
            });
            ID = insertId;
            //调用tokenservice中间件
            let tokenService = think.service("token");
            let tokenServiceInstance = new tokenService();
            //写入token信息
            let token = await tokenServiceInstance.createToken({
                userInfo: {
                    id: ID,
                    name: paramName
                }
            });
            //传输客户端token
            this.http.header("token", token);

            let userInfo = {
                username: paramName
            };

            this.cookie("usr_id", ID, {
                timeout: 366 * 24 * 3600
            });
            this.cookie("usr_name", paramName, {
                timeout: 366 * 24 * 3600
            });
            this.cookie("usr_token", token, {
                timeout: 366 * 24 * 3600,
                httponly: true
            });

            return this.success(userInfo);
        } catch (err) {
            think.log(err);
            return this.fail("SERVER_INVALID");
        }
    }

    async loginAction() {
        //获取post参数
        let paramName = this.post("username");
        let paramPassword = this.post("password");
        let model = this.model("useraccount");
        let data = await model.where({
            name: paramName,
            password: think.md5(paramPassword)
        }).find();
        if (!think.isEmpty(data)) {
            //调用tokenservice中间件
            let tokenService = think.service("token");
            let tokenServiceInstance = new tokenService();
            //写入token
            let token = await tokenServiceInstance.createToken({
                userInfo: {
                    id: data.id,
                    name: data.name
                }
            });
            //传输客户端token
            this.http.header("token", token);
            //写入cookie
            this.cookie("usr_id", data.id, {
                timeout: 366 * 24 * 3600
            });
            this.cookie("usr_name", data.name, {
                timeout: 366 * 24 * 3600
            });
            this.cookie("usr_nickname", data.nickname, {
                timeout: 366 * 24 * 3600
            });
            this.cookie("usr_mokuai", data.mokuai, {
                timeout: 366 * 24 * 3600
            });
            this.cookie("usr_sites", data.sites, {
                timeout: 366 * 24 * 3600
            });
            this.cookie("usr_token", token, {
                timeout: 366 * 24 * 3600,
                httponly: true
            });

            data = _.omit(data, ['password', 'pwdMix']);
            return this.success(data);

        } else {
            return this.fail("LOGIN_ERROR");
        }
    }

    //修改用户模块配置
    async editmokuaiAction() {
        let mokuai = this.post('mokuai');
        let model = this.model("useraccount");

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
        let user = verifyTokenResult.userInfo;
        if (!user) {
            return this.fail('用户信息无效，请重新登录');
        }

        let affectedRows = await model.where({
            id: user.id
        }).update({
            mokuai: mokuai
        });

        if (affectedRows) {
            return this.success('更新成功');
        } else {
            return this.fail('找不到数据');
        }
    }

    //修改用户网址配置
    async editsitesAction() {
        let sites = this.post('sites');
        let model = this.model("useraccount");

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
        let user = verifyTokenResult.userInfo;
        if (!user) {
            return this.fail('用户信息无效，请重新登录');
        }

        let affectedRows = await model.where({
            id: user.id
        }).update({
            sites: sites
        });

        if (affectedRows) {
            return this.success('更新成功');
        } else {
            return this.fail('找不到数据');
        }
    }
}