'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
      console.log(22222);
        this.assign({
            title: "TINY luqimin's Blog",
            brand: "TINY",
            author: "luqimin"
        });

        //auto render template file index_index.html
        return this.display();
    }
}