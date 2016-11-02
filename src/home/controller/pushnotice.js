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
        }, '', ['userid', 'day']);
        console.log(list);
        global.sendEmail();
    }
}