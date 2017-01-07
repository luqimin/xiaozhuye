'use strict';

import Base from './base.js';
import axios from 'axios';
import _ from 'lodash';
import {slugify} from 'transliteration';
slugify.config({
    lowercase: true,
    separator: ''
});

const CITY = [
    {cn: '北京', en: 'beijing', idx: '3303'},
    {cn: '上海', en: 'shanghai', idx: '1437'}
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

    async delcacheAction() {
        let Memcached = this.model("webapi/memcached");
        let res = await Memcached.flush();
        if (res) {
            this.success({
                msg: '清除memcached成功'
            });
        }
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

    async getcityAction() {
        let name = this.get('city');
        let forceNear = this.get('forceNear');
        if (!name) {
            return this.fail('请输入城市名');
        }

        //检查缓存是否有当前城市数据
        let Memcached = this.model("webapi/memcached");
        if (!forceNear) {
            let cityCache = await Memcached.get('city#' + encodeURIComponent(name));
            if (cityCache) {
                return this.json(cityCache);
            }
        } else {
            let cityCache = await Memcached.get('nearcity#' + encodeURIComponent(name));
            if (cityCache) {
                return this.json(cityCache);
            }
        }

        let model = this.model('city');

        let list = [];
        if (!forceNear) {
            list = await model.getInfo({
                "cn|en": ["like", `%${name}%`]
            }, {
                en: 'ASC'
            });
        }

        let succData = {};

        if (!list.length) {
            let loc = await axios.get(`https://api.map.baidu.com/geocoder/v2/?output=json&address=${encodeURIComponent(name)}&ak=6fd470666614aa24ae93d4f61463050c`).catch(err => {
                console.log(err.code);
            });
            if (loc && loc.data && loc.data.status == 0) {
                loc = loc.data.result.location;
                let lat = loc.lat;
                let lng = loc.lng;
                let nearbyCity = await model.nearBy({lat, lng}, 0.1, 0.05);
                succData = {
                    errno: 201,
                    errmsg: '附近的地点',
                    data: nearbyCity
                };
                !forceNear && Memcached.set('city#' + encodeURIComponent(name), succData, 0);
                forceNear && Memcached.set('nearcity#' + encodeURIComponent(name), succData, 0);
                return this.json(succData);
            }
        }
        succData = {
            errno: 0,
            errmsg: 'cities from usEmbassy',
            data: list
        };
        !forceNear && Memcached.set('city#' + encodeURIComponent(name), succData, 0);
        forceNear && Memcached.set('nearcity#' + encodeURIComponent(name), succData, 0);
        return this.json(succData);
    }

    //pm2.5
    async pm25Action() {
        let idx = this.get('idx');
        let _city = CITY[0];

        let getAqi = async city => {
            //检查缓存是否有当前地点PM25数据
            let Memcached = this.model("webapi/memcached");
            let pmCache = await Memcached.get('pm25#' + city.idx);

            if (pmCache) {
                return this.success(pmCache);
            }

            let res = await axios.get(`https://waqi.info/api/feed/@${city.idx}/now.json`, {
                timeout: 5000,
            }).catch(err => {
                console.log(err.code);
            });

            if (res && res.data.rxs && res.data.rxs.status == 'ok') {
                let result = res.data.rxs.obs[0].msg;
                let data = {
                    pos: city.cn,
                    aqi: result.aqi,
                    time: result.time.s || result.time
                };
                Memcached.set('pm25#' + city.idx, data, 30 * 60);
                return this.success(data);
            } else {
                console.log('pm2.5接口错误，启用备用接口');
                res = await axios.get(`https://api.waqi.info/api/feed/@${city.idx}/obs.cn.json`);
                if (res.data.rxs && res.data.rxs.status == 'ok') {
                    let result = res.data.rxs.obs[0].msg;
                    let data = {
                        pos: city.cn,
                        aqi: result.aqi,
                        time: result.time.s.cn,
                        note: 'beiyong'
                    };
                    Memcached.set('pm25#' + city.idx, data, 30 * 60);
                    return this.success(data);
                }
            }
            return this.fail({
                status: 'fail'
            });
        };

        if (!idx) {
            // if (1 + 1) {
            let ip = this.ip();
            //判断ua
            let isH5 = () => {
                let sUserAgent = this.userAgent();
                let reg = new RegExp('Silk|Kindle|MIDP|WAP|(UP\.Browser)|Smartphone|Obigo|(AU\.Browser)|(wxd\.Mms)|(WxdB\.Browser)|CLDC|(UP\.Link)|(KM\.Browser)|UCWEB|(SEMC-Browser)|Mini|Symbian|Palm|Nokia|Panasonic|MOT|SonyEricsson|NEC|Alcatel|Ericsson|BENQ|BenQ|Amoisonic|Amoi|Capitel|PHILIPS|SAMSUNG|Lenovo|Mitsu|Motorola|SHARP|WAPPER|LG|EG900|CECT|Compal|kejian|Bird|(BIRD|G900/V1\.0)|Arima|CTL|TDG|Daxian|DAXIAN|DBTEL|Eastcom|EASTCOM|PANTECH|Dopod|Haier|HAIER|KONKA|KEJIAN|LENOVO|Soutec|SOUTEC|SAGEM|SEC|SED|EMOL|INNO55|ZTE|iPhone|Android|(Windows\sCE)|(Opera\sMini)|iPod|(Googlebot-Mobile)|IEMobile|(Windows\sPhone)');
                return reg.test(sUserAgent);
            };
            let client = isH5() ? 'mb' : 'pc';

            //百度地图api，ip精确查找
            let lat = this.get('lat') || 0,
                lng = this.get('lng') || 0;

            //判断是否能精确获取lat/lng,如果不能则通过ip获取pos
            if (!lat || !lng) {
                let loc = await axios.get(`https://api.map.baidu.com/highacciploc/v1?qcip=${ip}&qterm=${client}&ak=6fd470666614aa24ae93d4f61463050c&coord=bd09ll&extensions=1`).catch(err => {
                    console.log(err.code);
                });
                if (loc && loc.data && loc.data.result && loc.data.result.error == '161') {
                    loc = loc.data.content;
                    lat = loc.location.lat;
                    lng = loc.location.lng;
                } else {
                    //百度地图api，ip模糊查找
                    let secLoc = await axios.get(`https://api.map.baidu.com/location/ip?ip=${ip}&ak=6fd470666614aa24ae93d4f61463050c&coor=bd09ll`).catch(err => {
                        console.log(err.code);
                    });
                    if (secLoc && secLoc.data && secLoc.data.content) {
                        secLoc = secLoc.data.content;
                        lat = secLoc.point.y;
                        lng = secLoc.point.x;
                    }
                }
            }

            let model = this.model('city');
            //从数据库获取距离当前地点最近的city
            let _city = await model.nearBy({lat, lng}, 0.1, 0.1, 1);

            //将地区信息写入cookie
            this.cookie("city_id", _city.idx);
            this.cookie("city_name", _city.cn);
            await getAqi(_city);
        } else {
            let model = this.model('city');
            let _city = await model.findInfo({
                'idx': idx
            }, 'cn');

            await getAqi({
                cn: _city.cn,
                idx: idx
            });
        }
    }

    //天气
    async weatherAction() {
        let ip = this.ip();
        let res = await axios.get('https://route.showapi.com/9-4?ip=' + ip + '&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617').catch(err => {
            console.log(err.code);
            return '';
        });
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
        let res = await axios.get('http://v.juhe.cn/toutiao/index?type=top&key=1cbcc9bbbced658f6c56e7fa695e4fa3').catch(err => {
            console.log(err.code);
            return '';
        });
        let result = res && res.data.result.data;
        if (result) {
            this.end(_.dropRight(result, 21));
        } else {
            this.end('');
        }
    }

    //国内焦点
    async gnfocusAction() {
        let res = await axios.get('https://route.showapi.com/109-35?channelId=5572a108b3cdc86cf39001cd&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617').catch(err => {
            console.log(err.code);
            return '';
        });
        let result = res && res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }

    //国外焦点
    async gwfocusAction() {
        let res = await axios.get('https://route.showapi.com/109-35?channelId=5572a108b3cdc86cf39001ce&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617').catch(err => {
            console.log(err.code);
            return '';
        });
        let result = res && res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }

    //娱乐焦点
    async yuleAction() {
        let res = await axios.get('https://route.showapi.com/109-35?channelId=5572a10ab3cdc86cf39001eb&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617').catch(err => {
            console.log(err.code);
            return '';
        });
        let result = res && res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }

    //段子
    async duanziAction() {
        let res = await axios.get('https://route.showapi.com/255-1?page=&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617').catch(err => {
            console.log(err.code);
            return '';
        });
        let result = res && res.data.showapi_res_body.pagebean.contentlist;
        this.end(result);
    }

    //搜索关键词
    async sugAction() {
        let name = this.get('name');
        let word = encodeURIComponent(this.get('word'));
        let url = `https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json&word=${word}`;
        if (['taobao', 'tmall', '淘宝搜', '天猫搜', '淘宝', '天猫'].indexOf(name) != -1) {
            url = `https://suggest.taobao.com/sug?code=utf-8&q=${word}`;
        }
        let res = await axios.get(url).catch(err => {
            console.log(err.code);
            return '';
        });
        let result = res && res.data && res.data.result;
        let resArray = [];
        if (result.length) {
            if (Array.isArray(result[0])) {
                for (let i of result) {
                    resArray.push(i[0])
                }
            } else {
                for (let i of result) {
                    resArray.push(i.word)
                }
            }
        }
        this.success(resArray);
    }
}