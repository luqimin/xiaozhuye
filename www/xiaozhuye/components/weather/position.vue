<style>

</style>
<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button @click="close" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">设置城市</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <input @change="search" @keyup.enter="search" type="text" class="form-control" placeholder="输入城市名搜索">
                    </div>
                    <p v-if="errCity==201" class="text-primary">对不起哦，找不到当前地点，小主页为您推荐以下地点</p>
                    <p v-if="errCity==301" class="text-info">小主页猜您附近还有这些地点, 点击设置哦:</p>
                    <p v-if="errCity==404" class="text-warning">对不起哦，找不到当前地点，试试搜索详细地址，例如: 安徽省安庆市太湖县</p>
                    <p v-if="errCity==100" class="text-success">玩命计算中...</p>
                    <div class="siteWrap">
                        <template v-for="city in cityList">
                            <span @click="setPos" :id="city.idx" :lat="city.lat" :lng="city.lng" class="btn btn-success btn-sm">{{city.cn}}</span>
                        </template>
                    </div>
                    <div class="well well-sm submitSiteWrap">
                        <div><span>1. 目前仅收录美国驻华大使馆数据库中所有中国城市，如果搜索不到您的城市，请尝试搜索附近城市或手动定位</span></div>
                        <div><span>2. 拼音字母搜索仅支持美国驻华大使馆数据库，请尽量使用汉字搜索</span></div>
                        <div><span>3. 尽量输入详细地址，例如: 安徽省安庆市太湖县</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="close" type="button" class="btn btn-primary">保存更改</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Cookie from 'js-cookie';

    export default {
        created(){
            let city = Cookie.get('city_name');
            if (city) {
                this.search({
                    target: {value: city, forceNear: 1}
                });
            }
        },
        data: () => ({
            cityList: [],
            errCity: 0
        }),
        methods: {
            search(e){
                this.errCity = 100;
                axios.get('/addons/fetch/getcity', {
                    params: {
                        city: e.target.value,
                        forceNear: e.target.forceNear
                    }
                }).then(res => {
                    if (res.data.errno == 0) {
                        if (res.data.data.length) {
                            this.cityList = res.data.data;
                            this.errCity = 0;
                        } else {
                            this.cityList = [];
                            this.errCity = 404;
                        }
                    } else if (res.data.errno == 201) {
                        this.cityList = res.data.data;
                        if (e.target.forceNear) {
                            this.errCity = 301;
                        } else {
                            this.errCity = 201
                        }
                    } else {
                        this.errCity = 404;
                    }
                }).catch(err => {
                    this.errCity = 404;
                });
            },
            setPos(e){
                Cookie.set('lat', e.target.attributes.lat.value, {expires: 366, path: '/'});
                Cookie.set('lng', e.target.attributes.lng.value, {expires: 366, path: '/'});
                Cookie.set('city_id', e.target.id, {expires: 366, path: '/'});
                Cookie.set('city_name', e.target.innerText, {expires: 366, path: '/'});
                this.$emit('setPosSucc', {
                    idx: e.target.id,
                    cn: e.target.innerText,
                    lat: e.target.attributes.lat.value,
                    lng: e.target.attributes.lng.value
                });
            },
            close(){
                this.$emit('closeSetPos');
            }
        }
    }
</script>