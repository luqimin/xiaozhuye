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

export const userLogin = ({ commit, state }) => {
    api.login(res => {
        if (typeof res != 'object') { return };
        commit(types.USER_LOGIN, res);
    }, {
        username: state.username,
        password: state.password
    });
}

export const userRegister = ({ commit, state }, inviteCode) => {
    api.register(res => {
        if (typeof res != 'object') { return };
        commit(types.USER_REGISTER, res);
    }, {
        username: state.username,
        password: state.password,
        inviteCode: inviteCode
    });
}

export const userLogout = ({ commit, state }) => {
    Cookie.remove('usr_id');
    Cookie.remove('usr_name');
    Cookie.remove('usr_token');
    Cookie.remove('usr_mokuai');
    commit(types.USER_LOGOUT);
}