'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getSites(whereOpt, orderOpt, limitNum) {
        if (!limitNum) {
            limitNum = 166;
        }
        let data = this.where(whereOpt).order(orderOpt).limit(limitNum).select();
        return data;
    }
}