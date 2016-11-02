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
    api.getSites((res) => {
        commit(types.INIT_SITES, res)
    }, {
        isConst: 1
    });

}

export const userLogout = ({ commit, state }) => {
    api.logout(res => {
        if (res.errno == 0) {
            commit(types.USER_LOGOUT);
        }
    });
}