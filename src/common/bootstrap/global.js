/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *     
 * }
 */
import crypto from 'crypto';
import axios from 'axios';
import querystring from 'querystring';
import nodemailer from 'nodemailer';

global.sendEmail = (opt) => {
    let smtpConfig = {
        host: 'smtp.mxhichina.com',
        port: 465,
        secure: true,
        auth: {
            user: 'notice@xiaozhuye.com',
            pass: 'Gu3pVvfQ64'
        }
    };

    let transporter = nodemailer.createTransport(smtpConfig);

    if (!opt || !opt.to) {
        return;
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: {
                name: '小主页通知',
                address: 'notice@xiaozhuye.com'
            },
            to: opt.to,
            subject: opt.subject || '来自【小主页】的邮件',
            text: opt.text || '------小主页',
            html: opt.html || '<br><p>来自<a href="xiaozhye.com" target="_blank">小主页</a></p>'
        }, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        })
    });
};

global.sendSMS = opt => {
    "use strict";
    let req_param = {
        'Action': 'SingleSendSms',
        'SignName': '值班室',                         //短信签名名称
        'TemplateCode': 'SMS_33655107',
        'RecNum': '18610566229',                  //手机号
        'ParamString': JSON.stringify({"addr": "弥陀", "time": "今天下午两点", "detail": "火势较大", "tel": "4168888"}),//验证码模板里的变量
        'Format': 'JSON',
        'Version': '2016-09-27',
        'AccessKeyId': 'PynGmlQQmMQ3a5TP',
        'SignatureMethod': 'HMAC-SHA1',
        'SignatureVersion': '1.0',
        'SignatureNonce': Math.round(Math.random() * 10000000000),                   //随机数
        'Timestamp': new Date().toISOString(),
    };

    /*签名方法*/
    let signForAliMessage = function (src_sign, access_key_secret) {
        let param = {}, qstring = [], oa = Object.keys(src_sign).sort();

        for (let i of oa) {
            param[i] = src_sign[i];
        }
        for (let key in param) {
            qstring.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
        }
        qstring = qstring.join('&');
        let StringToSign = 'POST' + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(qstring);
        access_key_secret = access_key_secret + '&';
        return crypto.createHmac('sha1', access_key_secret).update(new Buffer(StringToSign, 'utf-8')).digest('base64');
    };


    let secret = signForAliMessage(req_param, '2MEoG1NSGO88Hq0871nuSm6mANxHan');
    console.log(secret);

    let aliSMS_api_url = 'https://sms.aliyuncs.com/';

    return axios.post(aliSMS_api_url, querystring.stringify(Object.assign(req_param, {Signature: secret})), {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        timeout: 10000,
    });

};