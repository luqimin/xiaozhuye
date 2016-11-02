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
import nodemailer from 'nodemailer';



global.sendEmail = (opt) => {
    let smtpConfig = {
        host: 'smtp.mxhichina.com',
        port: 465,
        secure: true,
        auth: {
            user: 'notice@xiaozhuye.com',
            pass: ''
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
}