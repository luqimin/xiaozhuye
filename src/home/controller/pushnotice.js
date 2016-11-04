'use strict';

import Base from './base.js';

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
        let list = await deadlineModel.getInfo({
            isactive: 1,
            date: {
                '>': (new Date()).getTime(),
                '<': (new Date()).getTime() + 24 * 3600 * 1000,
            }
        }, '', ['userid', 'title', 'content', 'day']);
        if (!list) {
            return;
        }
        let userModel = this.model('webapi/useraccount');
        for (let i = 0, _length = list.length; i < _length; i++) {
            let userInfo = await userModel.findInfo({
                id: list[i].userid
            }, ['email', 'nickName']);
            if (userInfo.email) {
                global.sendEmail({
                    to: userInfo.email,
                    subject: '[小主页] 您的倒计时 【' + list[i].title + '】 快到期啦',
                    html: '<h4>倒计时详情:</h4><h2>' + list[i].content + '</h2><h2>到期时间: ' + list[i].day + '</h2><p>来自<a href="xiaozhye.com" target="_blank">小主页</a></p>'
                });
            }
        }
    }
}