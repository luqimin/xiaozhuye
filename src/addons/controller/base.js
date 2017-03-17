'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    async __before() {

        let _csrf = await this.session('__CSRF__');
        if (!_csrf) {
            return this.fail('suck it');
        }
    }
}