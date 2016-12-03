'use strict';
/**
 * model
 */
import _ from 'lodash';
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

    updateInfo(data, opt) {
        let updId = this.update(data, opt);
        return updId;
    }

    async nearBy(pos, span, range, single) {
        let lat = pos.lat, lng = pos.lng, _city = [];
        //从数据库获取距离当前地点最近的city
        for (let i = 0; i < 100; i++) {
            let whereSql = `lat > (${lat} - ${span}) AND lat < (${lat} + ${span}) AND lng > (${lng} - ${span}) AND lng < (${lng} + ${span})`;
            let list = await this.getInfo(whereSql, {
                lat: 'ASC',
                lng: 'ASC'
            });
            if (list.length) {
                //如果single=1，则计算最近的城市，返回obj，其他返回array,并按照距离排序
                //如果查询到结果，计算结果中距离最短的地点
                for (let j = 0; j < list.length; j++) {
                    list[j].distance = Math.pow((lat - list[j].lat), 2) + Math.pow((lng - list[j].lng), 2);
                }
                if (single) {
                    _city = _.minBy(list, 'distance');
                    break;
                } else if (list.length >= 5) {
                    _city = _.orderBy(list, ['distance'], ['asc']);
                    break;
                } else {
                    span += range;
                }
            } else {
                span += range;
            }
        }
        return _city;
    }
}