import api from '../api';
import * as types from './mutation-types';

import Cookie from 'js-cookie';

export const initUser = ({ commit }) => {
    let _mokuai = Cookie.get('usr_mokuai') && Cookie.get('usr_mokuai').split(',') || [],
        mokuai = {};

    for (let m of _mokuai) {
        mokuai[m] = {};
    }

    commit(types.INIT_USER, {
        username: Cookie.get('usr_name') || '',
        isLogin: Cookie.get('usr_name') ? 1 : 0,
        mokuai: mokuai,
        isvip: !!Cookie.get('usr_isvip'),
    })
};

export const initSites = ({ commit }) => {
    if (window.localStorage && localStorage.getItem('constSites')) {
        commit(types.INIT_SITES, JSON.parse(localStorage.getItem('constSites')));
        return;
    }
    api.getSites((res) => {
        window.localStorage && localStorage.setItem('constSites', JSON.stringify(res));
        commit(types.INIT_SITES, res)
    }, {
        isConst: 1
    });

};

export const userLogout = ({ commit }) => {
    api.logout(res => {
        if (res.errno == 0) {
            commit(types.USER_LOGOUT);
        }
    });
};