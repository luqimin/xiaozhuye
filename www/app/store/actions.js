import api from '../api';
import * as types from './mutation-types';

import Cookie from 'js-cookie';

export const initUser = ({ commit }) => {
    commit(types.INIT_USER, {
        username: Cookie.get('usr_name') || '',
        isLogin: Cookie.get('usr_name') ? 1 : 0,
        mokuai: Cookie.get('usr_mokuai') && Cookie.get('usr_mokuai').split(',') || [],
        isvip: Cookie.get('usr_isvip') ? true : false,
    })
}

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

}

export const userLogout = ({ commit }) => {
    api.logout(res => {
        if (res.errno == 0) {
            commit(types.USER_LOGOUT);
        }
    });
}