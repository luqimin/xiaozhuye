'use strict';
/**
 * model
 */

import Memcached from 'memcached';

let memcached = new Memcached('127.0.0.1:11211', {
    retries: 10,
    retry: 10000,
    remove: true
});

export default class extends think.model.base {
    get(key) {
        return new Promise((resolve, reject) => {
            memcached.get(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })

    }

    set(key, value, lifetime) {
        return new Promise((resolve, reject) => {
            memcached.set(key, value, lifetime, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}