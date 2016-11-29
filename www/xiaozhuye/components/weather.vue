<style>
    .pm25 span {
        background: #b2dbfb;
        border-radius: 5px;
        padding: 0 2px;
        transition: background .2s;
    }

    .pm25:hover span {
        background: #fff;
    }
</style>
<template>
    <ul class="nav navbar-nav">
        <li><a v-html="pmLevel" class="pm25"></a></li>
        <li><a v-html="nowWeather"></a></li>
        <li><a v-html="f1Weather"></a></li>
    </ul>
</template>

<script>
    import axios from 'axios';
    import Cookie from 'js-cookie';

    export default {
        created () {
            this.initPM();
            this.initWeather();
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(pos => {
                    Cookie.set('lat', pos.coords.latitude);
                    Cookie.set('lng', pos.coords.longitude);
                    Cookie.remove('nogps');
                }, err => {
                    Cookie.set('nogps', 1);
                },{
                    enableHighAccuracy: true,
                    maximumAge: 3600 * 1000
                });
            } else {
                Cookie.set('nogps', 1);
            }
        },
        data: () => ({
            pm25: '初始化...',
            pos: '',
            weaPos: '',
            nowTemp: '',
            nowWea: '',
            nowWind: '',
            f1Temp: '',
            f1Wea: '',
        }),
        computed: {
            pmLevel(){
                let pos = this.pos;
                let pm = this.pm25;
                let res = 'PM2.5: ' + pm;
                if (this.pm25 <= 50) {
                    res = 'PM2.5: <span class="text-success">' + pm + '</span> ' + pos;
                } else if (this.pm25 > 51 && this.pm25 <= 150) {
                    res = 'PM2.5: <span class="text-warning">' + pm + '</span> ' + pos;
                } else if (this.pm25 > 151 && this.pm25 <= 200) {
                    res = 'PM2.5: <span class="text-danger">' + pm + '</span> ' + pos;
                } else if (this.pm25 > 200) {
                    res = 'PM2.5: <span class="text-info">' + pm + '</span> ' + pos;
                }
                return res;
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
                    if(pos){
                        opt = {
                            params:{
                                lat: pos.lat || '',
                                lng: pos.lng || ''
                            }
                        };
                    }
                    axios.get('/addons/fetch/pm25', opt).then(res => {
                        // 响应成功回调
                        if (res.data.status != 'fail') {
                            let msg = res.data.data;
                            this.pm25 = msg.aqi;
                            this.pos = '('+ msg.pos +')';
                        }
                    });
                };
                let cookieLat = Cookie.get('lat');
                let cookieLng = Cookie.get('lng');
                if(cookieLat && cookieLng){
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
            }
        }
    }
</script>