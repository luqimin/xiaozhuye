import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as getters from './getters';
import * as actions from './actions';

import api from '../api';

import {MODCONF} from '../const';

Vue.use(Vuex);

const state = {
    isLogin: 0,
    username: '',
    password: '',
    isvip: false,
    mokuai: [], //包含：sites,gnnews,gwnews,duanzi,yule
    SITES: [],
    USERSITES: [],
    isShowAlert: 0
};

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
    updateParam(state, param) {
        for (let i in param.key) {
            state[param.key[i]] = param.value[i];
        }
    },
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})