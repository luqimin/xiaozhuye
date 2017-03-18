'use strict';

import Base from './base.js';
import xmlParse from 'htmlparser2';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }
    async postmsgAction() {
        let msg = this.http.request;
        console.log(msg);
        console.log(xmlParse(msg));
    }
}