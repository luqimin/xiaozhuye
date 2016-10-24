<template>
    <div class="modal" :class="{siteConfig: isShowSitesconfig}">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button @click="hideModal" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">网址配置{{title}}</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input @input="search" type="text" class="form-control" placeholder="点此搜索网址库，点击添加">
                </div>
                <div class="siteWrap">
                    <template v-for="site in siteList">
                        <span @click="addSite" :id="site.id" class="btn btn-default btn-sm">{{site.name}}</span>
                    </template>
                </div>
                <div class="siteWrap">
                    <p>已经添加的网址, 点击删除</p>
                    <template v-for="site in USERSITES" track-by="id">
                        <span @click="deleteSite" :id="site.id" class="btn btn-success btn-sm">{{site.name}}</span>
                    </template>
                </div>
            </div>
            <div class="modal-footer">
                <button @click="hideModal" type="button" class="btn btn-default">关闭</button>
                <button @click="hideModal" type="button" class="btn btn-primary">保存更改</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cookie from 'js-cookie';
import api from '../api';

export default {
    created(){
        this.init();
    },
    props: [
        'type',
        'title',
    ],
    data: () => ({
        userSitesId: [],
		siteList: [],
    }),
    computed: {
        ...mapGetters([
            'USERSITES',
            'isShowSitesconfig'
        ]),
    },
    methods: {
        init(){
            let _length = this.USERSITES.length;
            for(let i = 0; i < _length; i++){
                this.userSitesId.push(this.USERSITES[i].id);
            }
        },
        search(e){
            let val = e.target.value;
            api.searchSites((res)=>{
                if (res) {
                    this.siteList = res;    
                }
            }, {
                value: val
            });
        },
        hideModal(){
            this.$store.commit('toggleSiteconfig');
        },
        addSite(e){
            let siteId = parseInt(e.target.id);
            let _userSites = this.USERSITES;
            //设置用户网址配置
            if (this.userSitesId.indexOf(siteId) != -1) {
                return;
            }
            this.userSitesId.push(siteId);
            //设置页面当前页面用户已添加网址
            for(let i = 0; i < this.siteList.length; i++){
                if (this.siteList[i].id == siteId) {
                    
                    _userSites.push(this.siteList[i]);
                    this.siteList.splice(i, 1);
                }
            }
            //上传用户配置
            this.$store.commit('updateParam', {
                key: ['USERSITES'],
                value: [_userSites]
            });

            if(Cookie.get('usr_id')){
                api.editSites((res) => {
                    
                }, {
                    sites: this.userSitesId.join(',')
                });
            }
            Cookie.set('usr_sites', this.userSitesId.join(','), { expires: 366, path: '/' });
        },
        deleteSite(e){
            let siteId = parseInt(e.target.id);
            let _userSites = this.USERSITES;
            let index = this.userSitesId.indexOf(siteId);
            //设置用户网址配置
            if (index != -1) {
                this.userSitesId.splice(index, 1);
            }
            //设置页面当前页面用户已添加网址
            for(let i = 0; i < _userSites.length; i++){
                if (_userSites[i].id == siteId) {
                    this.siteList.push(_userSites[i]);
                    _userSites.splice(i, 1);
                }
            }
            //上传用户配置
            this.$store.commit('updateParam', {
                key: ['USERSITES'],
                value: [_userSites]
            });

            if(Cookie.get('usr_id')){
                api.editSites((res) => {
                    
                }, {
                    sites: this.userSitesId.join(',')
                });
            }
            Cookie.set('usr_sites', this.userSitesId.join(','), { expires: 366, path: '/' });
        }
    }
}
</script>