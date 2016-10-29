import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as getters from './getters';
import * as actions from './actions';

import api from '../api';

import { MODCONF } from '../const';

Vue.use(Vuex)

const state = {
    isLogin: 0,
    loginSuccess: 0,
    registerSuccess: 0,
    loginFail: 0,
    registerFail: 0,
    username: '',
    password: '',
    isvip: false,
    mokuai: MODCONF, //包含：sites,gnnews,gwnews,duanzi,yule
    SITES: [],
    USERSITES: [],
    isShowSitesconfig: 0,
    isShowAlert: 0
}

const mutations = {
    [types.INIT_USER](state, info) {
        state.isLogin = info.isLogin;
        state.username = info.username;
        state.isvip = info.isvip;
        if (info.mokuai.length == 0) {
            state.mokuai = MODCONF;
        } else {
            state.mokuai = info.mokuai;
        }
    },
    [types.INIT_SITES](state, list) {
        state.SITES = list.concat(state.SITES);
    },
    [types.USER_LOGIN](state, result) {
        if (!result.body.errno) {
            state.mokuai = result.body.data.mokuai.split(',');
            state.loginSuccess = 1;
            state.loginFail = 0;
            state.isvip = result.body.data;
            setTimeout(() => {
                state.isLogin = 1;
                api.mySites((res) => {
                    state.USERSITES = res;
                });
            }, 666);
        } else {
            state.loginFail = result.body.errmsg;
        }
    },
    [types.USER_REGISTER](state, result) {
        console.log(result);
        if (!result.body.errno) {
            state.registerSuccess = 1;
            state.registerFail = 0;
            setTimeout(() => {
                state.isLogin = 1;
                state.isvip = result.body.data;
                api.mySites((res) => {
                    state.USERSITES = res;
                });
            }, 666);
        } else {
            state.registerFail = result.body.errmsg;
        }
    },
    [types.USER_LOGOUT](state) {
        state.username = '';
        state.password = '';
        state.loginSuccess = 0;
        state.registerSuccess = 0;
        state.isLogin = 0;
        state.USERSITES = [];
        state.mokuai = MODCONF;
    },
    updateUsername(state, name) {
        state.username = name;
    },
    updatePassword(state, pwd) {
        state.password = pwd;
    },
    updateSites(state, list) {
        state.SITES = list;
    },
    updateParam(state, param) {
        for (let i in param.key) {
            state[param.key[i]] = param.value[i];
        }
    },
    toggleSiteconfig(state) {
        state.isShowSitesconfig = !state.isShowSitesconfig;
    }
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})