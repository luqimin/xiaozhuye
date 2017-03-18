'use strict';
//定义用户数据变量
let user = {};
export default class extends think.controller.base {

    /**
     *@description action请求验证用户token 
     */
    async __before(action) {
        //登录、注册不验证token
        if (this.http.action === 'login' ||
            this.http.action === 'register' ||
            this.http.action === 'get' ||
            this.http.action === 'sendemailcode' ||
            this.http.action === 'test' ||
            this.http.action === 'testt') {
            return;
        }
        //获取http-header token
        let userToken = this.cookie("usr_token");
        if (!userToken) {
            return this.fail('请登录');
        }
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
        user = verifyTokenResult.userInfo;
        if (!user) {
            return this.fail('用户信息无效，请重新登录');
        }
        //写入新token
        let newToken = await tokenServiceInstance.createToken({
            userInfo: verifyTokenResult.userInfo
        });
        this.cookie("usr_token", newToken, {
            timeout: 366 * 24 * 3600,
            httponly: true
        });
        this.http.header("token", newToken);
    }

    __call() {
        this.fail("接口不存在");
    }

    //用户信息
    userInfo() {
        return user;
    }
}