<template>
    <ul class="nav navbar-nav">
        <li><a v-html="pmLevel"></a></li>
        <li><a v-html="nowWeather"></a></li>
        <li><a v-html="f1Weather"></a></li>
    </ul>
</template>

<script>
    import axios from 'axios';

    export default {
        created () {
            this.initPM();
            this.initWeather();
        },
        data: () => ({
            pm25: '初始化...',
            pos: '(北京美国大使馆)',
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
                let res = 'pm2.5: ' + pm;
                if (this.pm25 <= 50) {
                    res = 'pm2.5: <span class="text-success">' + pm + '</span> ' + pos;
                } else if (this.pm25 > 51 && this.pm25 <= 150) {
                    res = 'pm2.5: <span class="text-warning">' + pm + '</span> ' + pos;
                } else if (this.pm25 > 151 && this.pm25 <= 200) {
                    res = 'pm2.5: <span class="text-danger">' + pm + '</span> ' + pos;
                } else if (this.pm25 > 200) {
                    res = 'pm2.5: <span class="text-info">' + pm + '</span> ' + pos;
                }
                return res;
            },
            nowWeather(){
                if (this.nowWea && this.nowTemp && this.nowWind) {
                    return this.nowWea + ', ' + this.nowTemp + '℃, ' + '风力' + this.nowWind;
                } else {
                    return ''
                }

            },
            f1Weather(){
                if (this.f1Wea && this.f1Temp) {
                    return '明日: ' + this.f1Wea + ', ' + this.f1Temp;
                } else {
                    return ''
                }
            }
        },
        methods: {
            initPM(){
                axios.get('/addons/fetch/pm25', '').then(res => {
                    // 响应成功回调
                    if (res.data.status != 'fail') {
                        let msg = res.data.data.msg;
                        this.pm25 = msg.aqi;
                    }
                });
            },
            initWeather(){
                axios.get('/addons/fetch/weather', '').then(res => {
                    // 响应成功回调
                    if (res.data.status != 'fail') {
                        let msg = res.data.data;
                        this.weaPos = msg.pos;
                        this.nowTemp = msg.now.temperature;
                        this.nowWea = msg.now.weather;
                        this.nowWind = msg.now.wind_power;
                        this.f1Temp = msg.f1.day_air_temperature + '℃' + '~' + msg.f1.night_air_temperature + '℃';
                        this.f1Wea = msg.f1.day_weather + '~' + msg.f1.night_weather;
                        console.log(msg);
                    }
                });
            }
        }
    }
</script>