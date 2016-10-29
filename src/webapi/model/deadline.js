'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getInfo(opt, order, field) {
        let data = this.field(field).where(opt).order(order).select();
        return data;
    }
    findInfo(opt, field) {
        let data = this.field(field).where(opt).find();
        return data;
    }
    addInfo(opt) {
        let insertId = this.add(opt);
        return insertId;
    }
}