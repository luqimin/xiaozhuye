<style>
    .pm25 span.pm {
        margin-right: 2px;
        background: #b2dbfb;
        border-radius: 5px;
        padding: 0 2px;
        transition: background .2s;
    }

    span.pos {
        cursor: pointer;
    }

    span.pos:hover {
        text-decoration: underline;
    }

    .pm25:hover span.pm {
        background: #fff;
    }
</style>
<template>
    <ul class="nav navbar-nav">
        <li v-if="">
            <a class="pm25">
                PM2.5: <span v-if="pm25" class="pm" :class="pmClass">{{pm25}}</span>
                [<span @click="changePos" class="pos">{{pos}}</span>]
            </a>
        </li>
        <li><a v-html="nowWeather"></a></li>
        <li><a v-html="f1Weather"></a></li>
        <transition name="fade">
            <component v-bind:is="posComp" v-on:setPosSucc="setPosSucc" v-on:closeSetPos="closePos"></component>
        </transition>
    </ul>
</template>

<script>
    import axios from 'axios';
    import Cookie from 'js-cookie';
    import defmod from '../default';

    export default {
        created () {
            this.initPM();
            this.initWeather();
//            if (navigator.geolocation) {
//                navigator.geolocation.getCurrentPosition(pos => {
//                    Cookie.set('lat', pos.coords.latitude);
//                    Cookie.set('lng', pos.coords.longitude);
//                }, err => {}, {
//                    enableHighAccuracy: true,
//                    maximumAge: 3600 * 1000
//                });
//            }
        },
        data: () => ({
            pm25: '',
            pos: '定位中...',
            weaPos: '',
            nowTemp: '',
            nowWea: '',
            nowWind: '',
            f1Temp: '',
            f1Wea: '',
            setPos: false
        }),
        computed: {
            posComp(){
                return this.setPos ? 'position' : 'defmod';
            },
            pmClass(){
                let pm = this.pm25, pmClass = 'text-primary';
                if (pm >= 0 && pm <= 50) {
                    pmClass = 'text-success';
                } else if (pm > 50 && pm <= 150) {
                    pmClass = 'text-warning';
                } else if (pm > 150 && pm <= 200) {
                    pmClass = 'text-danger';
                } else if (pm > 200) {
                    pmClass = 'text-info';
                }
                return pmClass;
            },
            nowWeather(){
                if (this.nowWea && this.nowTemp && this.nowWind) {
                    return this.weaPos + ': ' + this.nowWea + ', ' + this.nowTemp + '℃, ' + '风力' + this.nowWind;
                } else {
                    return ''
                }

            },
            f1Weather(){
                if (this.f1Wea && this.f1Temp) {
                    return '明: ' + this.f1Wea + ', ' + this.f1Temp;
                } else {
                    return ''
                }
            }
        },
        methods: {
            initPM(){
                let getData = pos => {
                    let opt = '';
                    if (pos) {
                        opt = {
                            params: pos
                        };
                    }
                    axios.get('/addons/fetch/pm25', opt).then(res => {
                        // 响应成功回调
                        if (res.data.status != 'fail') {
                            let msg = res.data.data;
                            this.pm25 = msg.aqi;
                            this.pos = msg.pos;
                        }
                    });
                };
                let cookieIdx = Cookie.get('city_id');
                let cookieLat = Cookie.get('lat');
                let cookieLng = Cookie.get('lng');
                if (cookieIdx) {
                    getData({
                        idx: cookieIdx
                    });
                } else if (cookieLat && cookieLng) {
                    getData({
                        lat: cookieLat,
                        lng: cookieLng
                    });
                } else {
                    getData();
                }
            },
            initWeather(){
                axios.get('/addons/fetch/weather').then(res => {
                    // 响应成功回调
                    if (res.data.status != 'fail') {
                        let msg = res.data.data;
                        this.weaPos = msg.pos;
                        this.nowTemp = msg.now.temperature;
                        this.nowWea = msg.now.weather;
                        this.nowWind = msg.now.wind_power;
                        this.f1Temp = msg.f1.day_air_temperature + '℃' + '~' + msg.f1.night_air_temperature + '℃';
                        this.f1Wea = msg.f1.day_weather + '~' + msg.f1.night_weather;
                    }
                });
            },
            changePos(){
                if (!this.pm25) {
                    return;
                }
                this.setPos = true;
            },
            setPosSucc(city){
                this.pos = city.cn;
                axios.get('/addons/fetch/pm25', {
                    params: {idx: city.idx}
                }).then(res => {
                    // 响应成功回调
                    if (res.data.status != 'fail') {
                        let msg = res.data.data;
                        this.pm25 = msg.aqi;
                        this.pos = msg.pos;
                    }
                });
            },
            closePos(){
                this.setPos = false;
            }
        },
        components: {
            defmod,
            position: (resolve) => {
                require(['./position'], (component) => {
                    resolve(component);
                });
            },
        }
    }
</script>