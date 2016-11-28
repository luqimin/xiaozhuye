'use strict';

import Base from './base.js';
import axios from 'axios';
import fs from 'fs';
import _ from 'lodash';
import { slugify } from 'transliteration';
slugify.config({
    lowercase: true,
    separator: ''
});

const CITY = [
    { cn: '北京', en: 'beijing', idx: '3303' },
    { cn: '上海', en: 'shanghai', idx: '1437' },
    { cn: '合肥', en: 'hefei', idx: '1497' },
    { cn: '安庆', en: 'anqing', idx: '7900' },
    { cn: '芜湖', en: 'wuhu', idx: '1498' },
    { cn: '南京', en: 'nanjing', idx: '1485' },
    { cn: '武汉', en: 'wuhan', idx: '1529' },
    { cn: '济南', en: 'jinan', idx: '1505' },
    { cn: '临沂', en: 'linyi', idx: '1517' }
];

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    //获取美国大使馆pm接口所有数据
    // async getcityfAction() {
    //     let city = [];
    //     for (let i = 446; i < 10000; i++) {
    //         let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
    //         if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
    //             let result = res.data.rxs.obs[0].msg;
    //             if (!result.city || !result.city.name || !result.city.geo) {
    //                 continue;
    //             }

    //             if (result.city.geo[0] >= 3.84 && result.city.geo[0] <= 53.56 && result.city.geo[1] >= 73.54 && result.city.geo[1] <= 135.1) {
    //                 let singleCity = {
    //                     id: i,
    //                     cn: result.city.name,
    //                     en: slugify(result.city.name),
    //                     geo: result.city.geo
    //                 };
    //                 city.push(singleCity);
    //                 fs.appendFileSync('./cityall.js', JSON.stringify(singleCity) + ',\n', { encoding: 'utf8' });
    //                 console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi + ' == ' + result.city.geo);
    //             } else {
    //                 console.log(i + ': 不是大中国 == ' + result.city.name);
    //             }
    //         }
    //     }
    // }
    // async filtercityAction() {
    //     let oriPath = './cityall.js';
    //     let distPath = './cityres.js';
    //     let cityHtml = fs.readFileSync(oriPath, { encoding: 'utf8' });
    //     let city = JSON.parse(cityHtml);
    //     for (let i = 0; i < city.length; i++) {
    //         let res = await axios.get(`http://api.map.baidu.com/geocoder/v2/?location=${city[i].geo[0]},${city[i].geo[1]}&output=json&pois=0&ak=6fd470666614aa24ae93d4f61463050c`);
    //         if (res && res.data.result.addressComponent.country_code == 0) {
    //             let singleCity = {
    //                 id: city[i].id,
    //                 cn: city[i].cn,
    //                 en: city[i].en,
    //                 geo: city[i].geo
    //             };
    //             fs.appendFileSync(distPath, JSON.stringify(singleCity) + ',\n', { encoding: 'utf8' });
    //             console.log('add ==> ' + city[i].id + ': ' + city[i].cn);
    //         } else {
    //             console.log('FILTER ==> ' + city[i].id + ': ' + city[i].cn);
    //         }
    //     }
    // }
    // async creattableAction() {
    //     let model = this.model('city');
    //     let distPath = './cityres.js';
    //     let cityHtml = fs.readFileSync(distPath, { encoding: 'utf8' });
    //     let city = JSON.parse(cityHtml);
    //     for (let i = 0; i < city.length; i++) {
    //         let list = await model.addInfo({
    //             idx: city[i].id,
    //             cn: city[i].cn,
    //             en: city[i].en,
    //             geo: city[i].geo[0] + ',' + city[i].geo[1]
    //         });
    //     }
    // }
    // async fucktableAction() {
    //     let model = this.model('city');
    //     let distPath = './cityres.js';
    //     let cityHtml = fs.readFileSync(distPath, { encoding: 'utf8' });
    //     let city = JSON.parse(cityHtml);
    //     for (let i = 0; i < city.length; i++) {
    //         let list = await model.updateInfo({
    //             lat: city[i].geo[0],
    //             lng: city[i].geo[1]
    //         }, {
    //             where: {
    //                 idx: city[i].id
    //             }
    //         });
    //     }
    // }

    //pm2.5
    async pm25Action() {
        if (this.cookie('city_id') && !this.cookie('city_name')) {
            this.cookie('city_id', null);
        }

        let cityCookie = this.cookie('city_id');
        let _city = CITY[0];
        if (!cityCookie) {
            let ip = this.ip();
            //判断ua
            let isH5 = () => {
                var sUserAgent = this.userAgent();
                var reg = new RegExp('Silk|Kindle|MIDP|WAP|(UP\.Browser)|Smartphone|Obigo|(AU\.Browser)|(wxd\.Mms)|(WxdB\.Browser)|CLDC|(UP\.Link)|(KM\.Browser)|UCWEB|(SEMC-Browser)|Mini|Symbian|Palm|Nokia|Panasonic|MOT|SonyEricsson|NEC|Alcatel|Ericsson|BENQ|BenQ|Amoisonic|Amoi|Capitel|PHILIPS|SAMSUNG|Lenovo|Mitsu|Motorola|SHARP|WAPPER|LG|EG900|CECT|Compal|kejian|Bird|(BIRD|G900/V1\.0)|Arima|CTL|TDG|Daxian|DAXIAN|DBTEL|Eastcom|EASTCOM|PANTECH|Dopod|Haier|HAIER|KONKA|KEJIAN|LENOVO|Soutec|SOUTEC|SAGEM|SEC|SED|EMOL|INNO55|ZTE|iPhone|Android|(Windows\sCE)|(Opera\sMini)|iPod|(Googlebot-Mobile)|IEMobile|(Windows\sPhone)');
                return reg.test(sUserAgent);
            }
            let client = isH5() ? 'mb' : 'pc';

            //百度地图api，ip精确查找
            let loc = await axios.get(`https://api.map.baidu.com/highacciploc/v1?qcip=${ip}&qterm=${client}&ak=6fd470666614aa24ae93d4f61463050c&coord=bd09ll&extensions=1`);
            let lat = 0,
                lng = 0;
            if (loc && loc.data && loc.data.result && loc.data.result.error == '161') {
                loc = loc.data.content;
                lat = loc.location.lat;
                lng = loc.location.lng;
            } else {
                //百度地图api，ip模糊查找
                let secLoc = await axios.get(`https://api.map.baidu.com/location/ip?ip=${ip}&ak=6fd470666614aa24ae93d4f61463050c&coor=bd09ll`);
                if (secLoc && secLoc.data && secLoc.data.content) {
                    secLoc = secLoc.data.content;
                    lat = secLoc.point.y;
                    lng = secLoc.point.x;
                }
            }

            let span = 0.1;
            let model = this.model('city');
            for (let i = 0; i < 100; i++) {
                let whereSql = `lat > (${lat} - ${span}) AND lat < (${lat} + ${span}) AND lng > (${lng} - ${span}) AND lng < (${lng} + ${span})`;
                let list = await model.getInfo(whereSql, {
                    lat: 'ASC',
                    lng: 'ASC'
                });
                if (list.length) {
                    //如果查询到结果，计算结果中距离最短的地点
                    for (let j = 0; j < list.length; j++) {
                        list[j].distance = Math.pow((lat - list[j].lat), 2) + Math.pow((lng - list[j].lng), 2);
                    }
                    _city = _.minBy(list, 'distance');
                    break;
                } else {
                    span += 0.1;
                }
            }

            //将地区信息写入cookie
            this.cookie("city_id", _city.idx);
            this.cookie("city_name", _city.cn);
        } else {
            _city.idx = cityCookie;
            _city.cn = this.cookie('city_name');
        }
        let res = await axios.get(`https://waqi.info/api/feed/@${_city.idx}/now.json`);
        // let res = await axios.get(`https://waqi.info/api/feed/@${_city.id}/obs.cn.json`);
        // console.log(res);
        if (res.data.rxs && res.data.rxs.status == 'ok') {
            let result = res.data.rxs.obs[0].msg;
            let data = {
                pos: _city.cn,
                aqi: result.aqi,
                time: result.time.s
            }
            return this.success(data);
        }
        return this.fail({
            status: 'fail'
        });
    }

    //天气
    async weatherAction() {
        let ip = this.ip();
        let res = await axios.get('https://route.showapi.com/9-4?ip=' + ip + '&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617');
        let data = res.data;
        if (data.showapi_res_body.ret_code != '-1') {
            data = {
                pos: data.showapi_res_body.cityInfo.c5,
                now: {
                    temperature: data.showapi_res_body.now.temperature,
                    weather: data.showapi_res_body.now.weather,
                    wind_power: data.showapi_res_body.now.wind_power
                },
                f1: {
                    day_weather: data.showapi_res_body.f1.day_weather,
                    night_weather: data.showapi_res_body.f1.night_weather,
                    day_air_temperature: data.showapi_res_body.f1.day_air_temperature,
                    night_air_temperature: data.showapi_res_body.f1.night_air_temperature
                }
            };
            return this.success(data);
        }
        return this.fail({
            status: 'fail'
        });
    }

    //新闻头条
    async toutiaoAction() {
        let res = await axios.get('http://v.juhe.cn/toutiao/index?type=top&key=1cbcc9bbbced658f6c56e7fa695e4fa3');
        let result = res.data.result.data;
        this.end(_.dropRight(result, 21));
    }

    //国内焦点
    async gnfocusAction() {
        let res = await axios.get('https://route.showapi.com/109-35?channelId=5572a108b3cdc86cf39001cd&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617');
        let result = res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }

    //国外焦点
    async gwfocusAction() {
        let res = await axios.get('https://route.showapi.com/109-35?channelId=5572a108b3cdc86cf39001ce&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617');
        let result = res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }

    //娱乐焦点
    async yuleAction() {
        let res = await axios.get('https://route.showapi.com/109-35?channelId=5572a10ab3cdc86cf39001eb&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617');
        let result = res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }

    async duanziAction() {
        let res = await axios.get('https://route.showapi.com/255-1?page=&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617');
        let result = res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }
}