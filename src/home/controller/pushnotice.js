'use strict';

import Base from './base.js';
import Memcached from 'memcached';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    async deadlineAction() {
        //禁止 URL 访问该 Action
        if (!this.isCli()) {
            this.fail("不是命令行别玩");
        }
        //获取deadline模型
        let deadlineModel = this.model('webapi/deadline');
        let userModel = this.model('webapi/useraccount');
        let cacheModel = this.model("webapi/memcached");

        let list = await deadlineModel.getInfo({
            isactive: 1,
            date: {
                '>': (new Date()).getTime(),
                '<': (new Date()).getTime() + 24 * 3600 * 1000,
            }
        }, '', ['id', 'userid', 'title', 'content', 'day']);
        if (!list) {
            return;
        }

        let _length = list.length;
        for (let i = 0; i < _length; i++) {
            let userInfo = await userModel.findInfo({
                id: list[i].userid
            }, ['email', 'nickName']);

            let notiCache = await cacheModel.get('notiMail#' + list[i].id);
            if (notiCache) {
                return;
            }

            if (userInfo.email) {
                let sendMailRes = await global.sendEmail({
                    to: userInfo.email,
                    subject: '[小主页] 您的倒计时 【' + list[i].title + '】 快到期啦',
                    html: '<h4>倒计时详情:</h4><h2>' + list[i].content + '</h2><h2>到期时间: ' + list[i].day + '</h2><p>来自<a href="xiaozhye.com" target="_blank">小主页</a></p>'
                }).catch(err => { console.log(err) });
                if (sendMailRes) {
                    cacheModel.set('notiMail#' + list[i].id, 1, 30 * 60);
                    console.log(sendMailRes.envelope.from + ' ==> ' + sendMailRes.envelope.to.toString());
                }
            }
        }
    }
}