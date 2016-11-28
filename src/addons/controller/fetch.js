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
    { cn: '北京', en: 'beijing', id: '3303' },
    { cn: '上海', en: 'shanghai', id: '1437' },
    { cn: '合肥', en: 'hefei', id: '1497' },
    { cn: '安庆', en: 'anqing', id: '7900' },
    { cn: '芜湖', en: 'wuhu', id: '1498' },
    { cn: '南京', en: 'nanjing', id: '1485' },
    { cn: '武汉', en: 'wuhan', id: '1529' },
    { cn: '济南', en: 'jinan', id: '1505' },
    { cn: '临沂', en: 'linyi', id: '1517' }
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
    async usembassyAction() {
        let city = [];
        let idArr = [
                [1238, 1661],
                [3303, 3309],
                [3410, 3546],
                [3579, 3682],
                [3721, 3730],
                [3785, 3792],
                [3864, 3869],
                [],
            ]
            // for (let i = 1238; i <= 1661; i++) {3303 3309  3410 3546  3579 3682  3721 3730  37854147
            //     let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
            //     if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
            //         let result = res.data.rxs.obs[0].msg;
            //         if (!result.city) {
            //             return;
            //         }
            //         let singleCity = {
            //             id: i,
            //             cn: result.city.name,
            //             en: slugify(result.city.name),
            //             geo: result.city.geo
            //         };
            //         city.push(singleCity);
            //         console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi);
            //     }
            // }
        for (let i = 3881; i <= 9999; i++) {
            let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
            if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
                let result = res.data.rxs.obs[0].msg;
                if (!result.city || !result.city.name) {
                    continue;
                }
                let singleCity = {
                    id: i,
                    cn: result.city.name,
                    en: slugify(result.city.name),
                    geo: result.city.geo
                };
                city.push(singleCity);
                console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi);
            }
        }

        fs.writeFile('./city2.js', JSON.stringify(city), 'utf8', (err) => {
            if (err) throw err;
            console.log('新建 city2.js 成功');
        });
    }

    //获取美国大使馆pm接口所有数据
    async getcityaAction() {
        let city = [];
        for (let i = 446; i < 2000; i++) {
            let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
            if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
                let result = res.data.rxs.obs[0].msg;
                if (!result.city || !result.city.name || !result.city.geo) {
                    continue;
                }

                if (result.city.geo[0] >= 3.84 && result.city.geo[0] <= 53.56 && result.city.geo[1] >= 73.54 && result.city.geo[1] <= 135.1) {
                    let singleCity = {
                        id: i,
                        cn: result.city.name,
                        en: slugify(result.city.name),
                        geo: result.city.geo
                    };
                    city.push(singleCity);
                    console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi + ' == ' + result.city.geo);
                } else {
                    console.log(i + ': 不是大中国 == ' + result.city.name);
                }
            }
        }

        fs.writeFile('./citya.js', JSON.stringify(city), 'utf8', (err) => {
            if (err) throw err;
            console.log('新建 citya.js 成功');
        });
    }
    async getcitybAction() {
        let city = [];
        for (let i = 2000; i < 4000; i++) {
            let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
            if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
                let result = res.data.rxs.obs[0].msg;
                if (!result.city || !result.city.name || !result.city.geo) {
                    continue;
                }

                if (result.city.geo[0] >= 3.84 && result.city.geo[0] <= 53.56 && result.city.geo[1] >= 73.54 && result.city.geo[1] <= 135.1) {
                    let singleCity = {
                        id: i,
                        cn: result.city.name,
                        en: slugify(result.city.name),
                        geo: result.city.geo
                    };
                    city.push(singleCity);
                    console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi + ' == ' + result.city.geo);
                } else {
                    console.log(i + ': 不是大中国 == ' + result.city.name);
                }
            }
        }

        fs.writeFile('./cityb.js', JSON.stringify(city), 'utf8', (err) => {
            if (err) throw err;
            console.log('新建 cityb.js 成功');
        });
    }
    async getcitycAction() {
        let city = [];
        for (let i = 4000; i < 6000; i++) {
            let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
            if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
                let result = res.data.rxs.obs[0].msg;
                if (!result.city || !result.city.name || !result.city.geo) {
                    continue;
                }

                if (result.city.geo[0] >= 3.84 && result.city.geo[0] <= 53.56 && result.city.geo[1] >= 73.54 && result.city.geo[1] <= 135.1) {
                    let singleCity = {
                        id: i,
                        cn: result.city.name,
                        en: slugify(result.city.name),
                        geo: result.city.geo
                    };
                    city.push(singleCity);
                    console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi + ' == ' + result.city.geo);
                } else {
                    console.log(i + ': 不是大中国 == ' + result.city.name);
                }
            }
        }

        fs.writeFile('./cityc.js', JSON.stringify(city), 'utf8', (err) => {
            if (err) throw err;
            console.log('新建 cityc.js 成功');
        });
    }
    async getcitydAction() {
        let city = [];
        for (let i = 6000; i < 8000; i++) {
            let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
            if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
                let result = res.data.rxs.obs[0].msg;
                if (!result.city || !result.city.name || !result.city.geo) {
                    continue;
                }

                if (result.city.geo[0] >= 3.84 && result.city.geo[0] <= 53.56 && result.city.geo[1] >= 73.54 && result.city.geo[1] <= 135.1) {
                    let singleCity = {
                        id: i,
                        cn: result.city.name,
                        en: slugify(result.city.name),
                        geo: result.city.geo
                    };
                    city.push(singleCity);
                    console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi + ' == ' + result.city.geo);
                } else {
                    console.log(i + ': 不是大中国 == ' + result.city.name);
                }
            }
        }

        fs.writeFile('./cityd.js', JSON.stringify(city), 'utf8', (err) => {
            if (err) throw err;
            console.log('新建 cityd.js 成功');
        });
    }
    async getcityeAction() {
        let city = [];
        for (let i = 8000; i < 10000; i++) {
            let res = await axios.get(`https://waqi.info/api/feed/@${i}/obs.cn.json`);
            if (res.data.rxs && res.data.rxs.status == 'ok' && res.data.rxs.obs[0] && res.data.rxs.obs[0].msg) {
                let result = res.data.rxs.obs[0].msg;
                if (!result.city || !result.city.name || !result.city.geo) {
                    continue;
                }

                if (result.city.geo[0] >= 3.84 && result.city.geo[0] <= 53.56 && result.city.geo[1] >= 73.54 && result.city.geo[1] <= 135.1) {
                    let singleCity = {
                        id: i,
                        cn: result.city.name,
                        en: slugify(result.city.name),
                        geo: result.city.geo
                    };
                    city.push(singleCity);
                    console.log(i + ': ' + result.city.name + ' ==> ' + result.aqi + ' == ' + result.city.geo);
                } else {
                    console.log(i + ': 不是大中国 == ' + result.city.name);
                }
            }
        }

        fs.writeFile('./citye.js', JSON.stringify(city), 'utf8', (err) => {
            if (err) throw err;
            console.log('新建 citye.js 成功');
        });
    }

    //pm2.5
    async pm25Action() {
        //获取ip
        let cityCookie = this.cookie('city_id');
        let _city = CITY[0];
        if (!cityCookie) {
            let ip = this.ip();
            let loc = await axios.get(`http://apis.juhe.cn/ip/ip2addr?ip=${ip}&key=7b941499afc9d7283f6e5eef2407eb8e`);
            if (loc && loc.data && loc.data.result) {
                loc = loc.data.result.area;
                for (let i = 0; i < CITY.length; i++) {
                    if (loc.indexOf(CITY[i].cn) != -1 || CITY[i].cn.indexOf(loc) != -1) {
                        _city = CITY[i];
                    }
                }
            }
            this.cookie("city_id", _city.id, {
                timeout: 30 * 24 * 3600
            });
        } else {
            _city.id = cityCookie;
        }

        // let res = await axios.get('https://waqi.info/api/feed/@3303/now.json');
        let res = await axios.get(`https://waqi.info/api/feed/@${_city.id}/obs.cn.json`);
        if (res.data.rxs && res.data.rxs.status == 'ok') {
            let result = res.data.rxs.obs[0].msg;
            let data = {
                pos: result.city.name,
                url: result.city.url,
                aqi: result.aqi,
                time: result.time.v
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