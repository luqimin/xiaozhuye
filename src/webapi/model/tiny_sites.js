'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async getSites(whereOpt, orderOpt, limitNum) {
        if (!limitNum) {
            limitNum = 166;
        }

        if (whereOpt.isconst) {
            let cacheModel = this.model('memcached');
            let originSites = await cacheModel.get('originSites');

            if (!originSites) {
                let originSites = await this.where(whereOpt).order(orderOpt).limit(limitNum).select();
                let setSitesCache = await cacheModel.set('originSites', originSites, 30 * 24 * 60 * 60);
                return setSitesCache && originSites;
            } else {
                return originSites;
            }

        } else {
            return this.where(whereOpt).order(orderOpt).limit(limitNum).select();
        }

    }
}