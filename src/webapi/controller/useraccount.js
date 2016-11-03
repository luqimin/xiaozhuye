'use strict';

import Base from './base.js';
import _ from 'lodash';
import Memcached from 'memcached';
import http from 'http';

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

    async testAction() {
        memcached.set('foo', 'bar', 1000, (err, res) => {
            console.log(err + '   ======err');
            console.log(res + '   ======res');
        });
    }

    async testtAction() {
        let memcached = this.model('memcached');
        let aaa = await memcached.get('qilu@163.com#code');
        console.log(aaa);
    }

    async sendemailcodeAction() {
        let email = this.post('email');
        if (!email) {
            return this.fail('请输入邮箱');
        }

        let clientIp = this.ip();

        let userModel = this.model("useraccount");
        //查询数据库是否有当前用户名
        let isHasEmail = await userModel.where({
            email: email
        }).find();

        if (!think.isEmpty(isHasEmail)) {
            return this.fail(1002, "邮箱已存在");
        }

        let cacheModel = this.model('memcached');

        //csrf检验
        let csrf = await this.session('__CSRF__');
        let clientCsrf = this.cookie('__CSRF__');
        if (!clientCsrf || clientCsrf != csrf) {
            return this.fail(1005, "csrf verification failed");
        }

        //判断邮箱发送次数
        let emailCountCache = await cacheModel.get(email + '#email') || 0;
        if (emailCountCache >= 3) {
            return this.fail(1003, "同一个邮箱5分钟内只允许发3封邮件");
        } else {
            emailCountCache++;
        }

        //判断ip发送次数
        let ipCountCache = await cacheModel.get(clientIp + '#ip') || 0;
        if (ipCountCache >= 10) {
            return this.fail(1004, "同一个ip5分钟内只允许发10封邮件");
        } else {
            ipCountCache++;
        }

        let code = Math.round(Math.random() * 1000000);

        let emailRes = await global.sendEmail({
            to: email,
            subject: '[小主页] 注册验证码',
            html: '<h4>验证码如下</h4><h2>' + code + '</h2><p>来自<a href="xiaozhye.com" target="_blank">小主页</a></p>'
        });

        if (emailRes) {
            let setCache = await cacheModel.set(email + '#code', code, 10 * 60);
            let setEmailCache = await cacheModel.set(email + '#email', emailCountCache, 5 * 60);
            let setIpCache = await cacheModel.set(clientIp + '#ip', ipCountCache, 5 * 60);
            if (setCache && setEmailCache && setIpCache) {
                this.success('发送成功');
                console.log('写入memcache成功=== ' + email + '#code' + ' ===' + code);
            } else {
                return this.fail(1005, "系统错误");
            }
        }
    }

    async registerAction() {


        //定义接收参数
        let paramName = this.post("username");
        let parmPassword = this.post("password");
        let parmEmail = this.post("email");
        let parmCode = this.post("code");
        let inviteCode = this.post("inviteCode");
        let isVip = 0;

        if (inviteCode == 'xiaozhuyetiny') {
            isVip = 1;
        }

        if (!parmEmail) {
            return this.fail(1006, "请输入邮箱");
        }
        if (!parmCode) {
            return this.fail(1007, "请输入验证码");
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

        //验证码邮件/手机验证码是否正确
        let cacheModel = this.model('memcached');
        let code = await cacheModel.get(parmEmail + '#code');

        if (code != parmCode) {
            return this.fail(1005, '验证码不正确');
        }

        //数据库写入记录
        try {
            let insertId = await model.add({
                name: paramName,
                password: think.md5(parmPassword),
                email: parmEmail,
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
                    name: paramName,
                    isvip: isVip
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
            this.cookie("usr_isvip", isVip, {
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
                    name: data.name,
                    isvip: data.isvip
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
            this.cookie("usr_isvip", data.isvip, {
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

    logoutAction() {
        this.cookie("usr_id", null);
        this.cookie("usr_name", null);
        this.cookie("usr_isvip", null);
        this.cookie("usr_nickname", null);
        this.cookie("usr_mokuai", null);
        this.cookie("usr_sites", null);
        this.cookie("usr_token", null);
        return this.success('退出成功');
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