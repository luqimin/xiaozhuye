<style>
.weatherDetail {
    min-width: 100%;
}

.weatherIcon {
    margin-top: -4px;
    height: 20px;
}

.pm25 span.pm {
    margin-right: 2px;
    background: #b2dbfb;
    border-radius: 5px;
    padding: 0 2px;
    transition: background .2s;
}

.pmForcast span.pm {
    display: inline-block;
    width: 26px;
    background: #fff;
    text-align: center;
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
        <li>
            <a class="pm25"
               title="点击查看附近情况">
                <span>PM2.5: </span>
                <span v-if="pm25"
                      class="pm"
                      :class="getPMClass(pm25)">{{pm25}}</span> [
                <span @click="changePos"
                      class="pos">{{pos}}</span> ]</a>
        </li>
        <li v-if="weather.city"
            class="dropdown"
            :class="showWeatherClass"
            @mouseenter="showWeatherDetail"
            @mouseleave="hideWeatherDetail">
            <a class="btn btn-link dropdown-toggle"
               title="查看天气详情"
               @click="toggleWeatherDetail">
                <span>{{city.name}}: {{condition.temp}}°<img class="weatherIcon" :src="'https://www.moji.com/templets/mojichina/images/weather/weather/w' + condition.icon + '.png'"></span>
                <span>{{weather.shortforecast}}</span>
                <span class="caret"></span>
            </a>
            <div class="dropdown-menu weatherDetail">
                <li><a>小提醒: {{condition.tips}}</a></li>
                <li class="divider"></li>
                <li><a>{{condition.temp}}° {{condition.condition}} {{condition.windDir}} {{condition.windLevel}} 级</a></li>
                <li class="divider"></li>
                <li><a>近期天气情况</a></li>
                <li class="pm25 pmForcast"
                    v-for="(day, index) in weather.aqiForecast">
                    <a>
                        <span style="display:inline-block;width:43px;">{{day.date.split('-')[1] + '/' + day.date.split('-')[2]}}: </span>
                        <img class="weatherIcon"
                             :title="forecast && forecast[index].conditionDay"
                             :src="'https://www.moji.com/templets/mojichina/images/weather/weather/w' + (forecast && forecast[index].conditionIdDay) + '.png'">
                        <span style="display:inline-block;width:20px;">{{forecast && forecast[index].tempDay}}°</span>
                        <span class="pm"
                              :class="getPMClass(day.value)">{{day.value}}</span>
                        <span>{{forecast && forecast[index].windDirDay}} {{forecast && forecast[index].windLevelDay}} 级</span>
                    </a>
                </li>
            </div>
        </li>
        <transition name="fade">
            <component v-bind:is="posComp"
                       v-on:setPosSucc="setPosSucc"
                       v-on:closeSetPos="closePos"></component>
        </transition>
    </ul>
</template>

<script>
import axios from 'axios';
import Cookie from 'js-cookie';
import defmod from '../default';

import { mapGetters } from 'vuex';

let getPMClass = pm => {
    let pmClass = 'text-primary';
    if (pm >= 0 && pm < 50) {
        pmClass = 'text-success';
    } else if (pm >= 50 && pm < 150) {
        pmClass = 'text-warning';
    } else if (pm >= 150 && pm < 200) {
        pmClass = 'text-danger';
    } else if (pm >= 200 && pm < 300) {
        pmClass = 'text-info';
    } else if (pm >= 300) {
        pmClass = 'text-terrible';
    }
    return pmClass;
};

export default {
    created() {
        this.initPM();
        this.initWeather();
    },
    data: () => ({
        pm25: '',
        pos: '定位中...',
        showWeatherClass: '',
        getPMClass: getPMClass,
        setPos: false
    }),
    computed: {
        ...mapGetters([
            'weather'
        ]),
        posComp() {
            return this.setPos ? 'position' : 'defmod';
        },
        city() {
            return this.weather.city || {};
        },
        condition() {
            return this.weather.condition || {};
        },
        forecast() {
            return this.weather.forecast;
        },
        weatherHtml() {
            return this.weather.shortforecast;
        }
    },
    methods: {
        initPM() {
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
                }).catch(() => {
                    this.pm25 = this.weather.aqi && this.weather.aqi.value;
                    this.pos = this.city.name;
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
        initWeather() {
            axios.get('/addons/fetch/moji').then(res => {
                // 响应成功回调
                if (res.data.errno == 0) {
                    this.$store.commit('updateParam', {
                        key: ['weather'],
                        value: [res.data.data]
                    });
                }
            });
        },
        showWeatherDetail() {
            this.showWeatherClass = 'open';
        },
        hideWeatherDetail() {
            this.showWeatherClass = '';
        },
        toggleWeatherDetail() {
            this.showWeatherClass == 'open' ? this.showWeatherClass = '' : this.showWeatherClass = 'open';
        },
        changePos() {
            if (!this.pm25) {
                return;
            }
            this.setPos = true;
        },
        setPosSucc(city) {
            this.pos = city.cn;
            this.pm25 = '获取中...';
            axios.get('/addons/fetch/pm25', {
                params: { idx: city.idx }
            }).then(res => {
                // 响应成功回调
                if (res.data.status != 'fail') {
                    let msg = res.data.data;
                    this.pm25 = msg.aqi;
                    this.pos = msg.pos;
                }
            });
        },
        closePos() {
            this.setPos = false;
        }
    },
    components: {
        defmod,
        position: (resolve) => {
            require(['./position'], (component) => {
                resolve(component);
            });
        }
    }
}
</script>