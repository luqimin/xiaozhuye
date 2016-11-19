<template>
    <li><a v-html="pmLevel" href="javascript:void(0)"></a></li>
</template>

<script>
    import axios from 'axios';

    export default {
        created () {
            this.init();
        },
        data: () => ({
            pm25: '初始化...',
            pos: ''
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
            }
        },
        methods: {
            init(){
                axios.get('/addons/fetch/pm25', '').then(res => {
                    // 响应成功回调
                    if (!res.data.errno) {
                        let msg = res.data.data.msg;
                        this.pm25 = msg.aqi;
                        this.pos = '(' + msg.city.name + ')';
                    }
                });
            }
        }
    }
</script>