'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getInfo(opt, field) {
        let data = this.field(field).where(opt).select();
        return data;
    }
}