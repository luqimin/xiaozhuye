'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        this.assign({
            title: "小主页 ---- 一只个性化大满足的个人首页",
            brand: "TINY",
            author: "luqimin"
        });

        //给页面写入csrf
        let _csrf = await this.session('__CSRF__');
        this.cookie('__CSRF__', _csrf);

        //auto render template file index_index.html
        return this.display();
    }
}