<template>
	<div class="panel">
		<div class="panel-body">
            <div class="input-group">
                <input @input="searchSite" @keyup.enter="gotoSite" type="text" class="form-control" placeholder="智能筛选 Enter跳转" :autofocus="mokuai.indexOf('baidu')==-1" tabindex="2">
                <span class="input-group-btn">
                    <button @click="addSite" class="addSiteBtn btn btn-link" type="button">配置</button>
                </span>
            </div>
			<transition-group name="site-list" tag="div" class="siteWrap">
				<a v-for="site in ALLSITES" v-bind:key="site.id" track-by="id" class="btn btn-sm siteBtn" v-bind:class="{ 'btn-default': !site.isfocus,'btn-primary': site.isfocus}"
					v-bind:href="site.url" target="_blank">
					<img v-if="site.icon" v-lazy="site.icon" alt="" class="site-icon"> {{site.name}}
				</a>
			</transition-group>
		</div>
        <transition name="fade">
            <component v-bind:is="siteModal"></component>
        </transition>
        <transition name="fade">
            <alert show="isShowAlert" :type="alertType" :title="alertTitle" :content="alertContent"></alert>
        </transition>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Cookie from 'js-cookie';
import api from '../api';
import firstBy from '../plugin/firstby';
import alert from './alert';

export default {
    created () {
        this.initSites();
        if (Cookie.get('usr_id')) {
            this.initUsersites();
        }
    },
    components:{
        alert,
        siteconfig :(resolve) => {
			setTimeout(()=>{
				require(['./siteconfig'], (component) => {
					resolve(component);
				});
			},100);
		}
    },
    data: () => ({
		clickFlag: 0,
        alertType: 'fail',
        alertTitle: '请登录',
        alertContent: '小主页部分功能需要用户登录后方能使用'
    }),
    computed: {
        ...mapGetters([
            'SITES',
            'USERSITES',
            'mokuai',
            'isShowSitesconfig',
            'isLogin',
            'isShowAlert'
        ]),
        siteModal(){
			return this.clickFlag
		},
        ALLSITES(){
            let _arr = this.SITES.concat(this.USERSITES);
            _arr.sort(
                firstBy('isfocus', -1)
                .thenBy('id')
            );
            return _arr;
        }
    },
    methods: {
        ...mapActions([
			'initSites'
		]),
        initUsersites () {
            api.mySites((res) => {
                this.$store.commit('updateParam', {
                    key: ['USERSITES'],
                    value: [res]
                })
            });
        },
        searchSite (event) {
            let sites = this.SITES, _userSites = this.USERSITES, _val = event.target.value.toLowerCase();
            let _length = sites.length, _ulength = _userSites.length, valLength = _val.length;
            let _regStr = ".*";
            for (let i = 0; i < valLength; i++) {
                _regStr += _val[i] + '+.*';
            }
            let _reg = new RegExp(_regStr);
            for (let i = 0; i < _length; i++) {
                if (!event.target.value) {
                    sites[i].isfocus = 0;
                } else if (
                    !_reg.test(sites[i].py.toLowerCase()) && !_reg.test(sites[i].name.toLowerCase())) {
                    sites[i].isfocus = 0;
                } else {
                    sites[i].isfocus = 1;
                }
            }
            for (let i = 0; i < _ulength; i++) {
                if (!event.target.value) {
                    _userSites[i].isfocus = 0;
                } else if (
                    !_reg.test(_userSites[i].py.toLowerCase()) && !_reg.test(_userSites[i].name.toLowerCase())) {
                    _userSites[i].isfocus = 0;
                } else {
                    _userSites[i].isfocus = 1;
                }
            }
            this.$store.commit('updateParam', {
                key: ['SITES', 'USERSITES'],
                value: [sites, _userSites]
            });
        },
        gotoSite (event) {
            if (event.target.value && this.ALLSITES[0].isfocus) {
                window.location.href = this.ALLSITES[0].url;
            }
        },
        addSite () {
            if(!this.isLogin){
                this.$store.commit('updateParam', {
                    key:['isShowAlert'],
                    value: [1]
                });
                return;
            }
            this.$store.commit('toggleSiteconfig');
			this.clickFlag = 'siteconfig';
		},
    }
}
</script>