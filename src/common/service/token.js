'use strict';

//引入jwt
let jwt = require('jsonwebtoken');
//读取secret标记码
let secret = think.config("xzy.secret");
//读取token有效期
let expiresIn = think.config("xzy.expiresIn");

export default class extends think.service.base {
    /**
     * @description 创建token
     * @param {Object} userinfo 用户信息
     * @return 返回token
     */
    createToken(userinfo) {
        let result = jwt.sign(userinfo, secret);
        return result;
    }


    /**
     * @description 验证票据
     * @param {Object} token 用户请求token
     * @return 返回 错误或者解密过的token
     */
    verifyToken(token) {
        if (token) {
            try {
                let result = jwt.verify(token, secret);
                return result;
            } catch (err) {
                //票据验证失败,需要提示需要重新登录
                return "fail";
            }
        }
        return "fail";
    }

}