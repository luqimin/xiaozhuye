'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {

        this.assign({
            title: "小主页 ---- 一只个性化大满足的个人首页",
            brand: "TINY",
            author: "luqimin"
        });

        //auto render template file index_index.html
        return this.display();
    }
    testAction() {

        this.assign({
            title: "测试test",
            brand: "TINY",
            author: "luqimin"
        });

        //auto render template file index_index.html
        return this.display();
    }

}