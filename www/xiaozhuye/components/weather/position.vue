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
                        <input @change="search" @keyup.enter="search" type="text" class="form-control" placeholder="搜索城市名或拼音">
                    </div>
                    <div class="siteWrap">
                        <template v-for="city in cityList">
                            <span @click="setPos" :id="city.idx" :lat="city.lat" :lng="city.lng" class="btn btn-success btn-sm">{{city.cn}}</span>
                        </template>
                    </div>
                    <div class="well well-sm submitSiteWrap">
                        <div><span>目前仅收录美国驻华大使馆数据库中所有中国城市，如果搜索不到您的城市，请尝试搜索附近城市或手动定位。</span></div>
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
        data: () => ({
            cityList: []
        }),
        computed: {
            isShow(res){
                return this.show;
            }
        },
        methods: {
            search(e){
                axios.get('/addons/fetch/getcity', {
                    params: {city: e.target.value}
                }).then(res => {
                    console.log(res);
                    if (!res.data.errno) {
                        if (res.data.data.length) {
                            this.cityList = res.data.data;
                        } else {
                            this.cityList = [];
                        }
                    }
                });
            },
            setPos(e){
                Cookie.remove('nogps');
                Cookie.set('lat', e.target.attributes.lat.value, {expires: 366, path: '/'});
                Cookie.set('lat', e.target.attributes.lat.value, {expires: 366, path: '/'});
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