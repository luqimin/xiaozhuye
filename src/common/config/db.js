'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'xiaozhuye',
      user: 'root',
      password: '',
      prefix: '',
      encoding: 'UTF8MB4_GENERAL_CI'
    },
    mongo: {

    }
  }
};