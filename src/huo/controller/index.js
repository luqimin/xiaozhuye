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

    async smsAction() {
        // let res = await global.sendSMS();
        // console.log(res);
        // if(res && res.data){
        //     return this.success('发送成功')
        // }
    }
}