import Vue from './vue.min';

let by = (name, minor) => {
    return (o, p) => {
        let a, b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw ("error");
        }
    }
}

Vue.filter('orderBy', (arr, param1, param2) => {
    return '1111';
})