<template>
    <li><a href="javascript:void(0)">pm2.5: {{pm25}} {{pos}}</a></li>
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