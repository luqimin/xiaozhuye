'use strict';

import Base from './base.js';
import child_process from 'child_process';
import path from 'path';

let currPath = path.dirname(__dirname);
let shPath = path.resolve(currPath, '../../rebuild.sh');

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        const execFile = child_process.execFile;
        let child = execFile(shPath, [''], (err, stdout, tderr) => {
            if (err) throw err;
            console.log(stdout);
        });
        return this.success('heh');
    }
}