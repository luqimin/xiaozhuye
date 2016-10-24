'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {

    this.assign({
      title: "小主页",
      brand: "TINY",
      author: "based on thinkjs"
    });

    //auto render template file index_index.html
    return this.display();
  }

}