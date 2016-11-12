import Vue from 'vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import store from './store';

import indexApp from './components/indexApp';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1,
    error: 'static/img/default.png',
    loading: 'static/img/default.png',
    attempt: 1
});

new Vue({
    el: '#app',
    store,
    render: h => h(indexApp)
});

store.dispatch('initUser');