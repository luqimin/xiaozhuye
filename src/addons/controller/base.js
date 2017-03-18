'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    async __before() {
        //给页面写入csrf
        // if (!this.cookie('__CSRF__')) {
        //     let _csrf = await this.session('__CSRF__');
        //     this.cookie('__CSRF__', _csrf);
        // }
    }
}