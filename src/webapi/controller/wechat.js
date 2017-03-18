'use strict';

import Base from './base.js';
import xml2js from 'xml2js';

let parser = new xml2js.Parser();
let builder = new xml2js.Builder();

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
        console.log(2222222);
        let msg = this.post();

        console.log(msg);

        parser.parseString(msg, (err, result) => {
            console.log(result);

            this.end(result);
        });

        // let xml = builder.buildObject(obj);
    }
}