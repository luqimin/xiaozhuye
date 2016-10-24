webpackJsonp([1],{

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(94)

	/* template */
	var __vue_template__ = __webpack_require__(95)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/lqm/Desktop/think/www/app/components/siteconfig.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-221d019d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-221d019d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] siteconfig.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(85);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(22);

	var _jsCookie = __webpack_require__(81);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _api = __webpack_require__(79);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    created: function created() {
	        this.init();
	    },

	    props: ['type', 'title'],
	    data: function data() {
	        return {
	            userSitesId: [],
	            siteList: []
	        };
	    },
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['USERSITES', 'isShowSitesconfig'])),
	    methods: {
	        init: function init() {
	            var _length = this.USERSITES.length;
	            for (var i = 0; i < _length; i++) {
	                this.userSitesId.push(this.USERSITES[i].id);
	            }
	        },
	        search: function search(e) {
	            var _this = this;

	            var val = e.target.value;
	            _api2.default.searchSites(function (res) {
	                if (res) {
	                    _this.siteList = res;
	                }
	            }, {
	                value: val
	            });
	        },
	        hideModal: function hideModal() {
	            this.$store.commit('toggleSiteconfig');
	        },
	        addSite: function addSite(e) {
	            var siteId = parseInt(e.target.id);
	            var _userSites = this.USERSITES;
	            //设置用户网址配置
	            if (this.userSitesId.indexOf(siteId) != -1) {
	                return;
	            }
	            this.userSitesId.push(siteId);
	            //设置页面当前页面用户已添加网址
	            for (var i = 0; i < this.siteList.length; i++) {
	                if (this.siteList[i].id == siteId) {

	                    _userSites.push(this.siteList[i]);
	                    this.siteList.splice(i, 1);
	                }
	            }
	            //上传用户配置
	            this.$store.commit('updateParam', {
	                key: ['USERSITES'],
	                value: [_userSites]
	            });

	            if (_jsCookie2.default.get('usr_id')) {
	                _api2.default.editSites(function (res) {}, {
	                    sites: this.userSitesId.join(',')
	                });
	            }
	            _jsCookie2.default.set('usr_sites', this.userSitesId.join(','), { expires: 366, path: '/' });
	        },
	        deleteSite: function deleteSite(e) {
	            var siteId = parseInt(e.target.id);
	            var _userSites = this.USERSITES;
	            var index = this.userSitesId.indexOf(siteId);
	            //设置用户网址配置
	            if (index != -1) {
	                this.userSitesId.splice(index, 1);
	            }
	            //设置页面当前页面用户已添加网址
	            for (var i = 0; i < _userSites.length; i++) {
	                if (_userSites[i].id == siteId) {
	                    this.siteList.push(_userSites[i]);
	                    _userSites.splice(i, 1);
	                }
	            }
	            //上传用户配置
	            this.$store.commit('updateParam', {
	                key: ['USERSITES'],
	                value: [_userSites]
	            });

	            if (_jsCookie2.default.get('usr_id')) {
	                _api2.default.editSites(function (res) {}, {
	                    sites: this.userSitesId.join(',')
	                });
	            }
	            _jsCookie2.default.set('usr_sites', this.userSitesId.join(','), { expires: 366, path: '/' });
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "modal",
	    class: {
	      siteConfig: isShowSitesconfig
	    }
	  }, [_h('div', {
	    staticClass: "modal-dialog"
	  }, [_h('div', {
	    staticClass: "modal-content"
	  }, [_h('div', {
	    staticClass: "modal-header"
	  }, [_h('button', {
	    staticClass: "close",
	    attrs: {
	      "type": "button",
	      "data-dismiss": "modal",
	      "aria-hidden": "true"
	    },
	    on: {
	      "click": hideModal
	    }
	  }, ["×"]), " ", _h('h4', {
	    staticClass: "modal-title"
	  }, ["网址配置" + _s(title)])]), " ", _h('div', {
	    staticClass: "modal-body"
	  }, [_h('div', {
	    staticClass: "form-group"
	  }, [_h('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "点此搜索网址库，点击添加"
	    },
	    on: {
	      "input": search
	    }
	  })]), " ", _h('div', {
	    staticClass: "siteWrap"
	  }, [_l((siteList), function(site) {
	    return [_h('span', {
	      staticClass: "btn btn-default btn-sm",
	      attrs: {
	        "id": site.id
	      },
	      on: {
	        "click": addSite
	      }
	    }, [_s(site.name)])]
	  })]), " ", _h('div', {
	    staticClass: "siteWrap"
	  }, [_m(0), " ", _l((USERSITES), function(site) {
	    return [_h('span', {
	      staticClass: "btn btn-success btn-sm",
	      attrs: {
	        "id": site.id
	      },
	      on: {
	        "click": deleteSite
	      }
	    }, [_s(site.name)])]
	  })])]), " ", _h('div', {
	    staticClass: "modal-footer"
	  }, [_h('button', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": hideModal
	    }
	  }, ["关闭"]), " ", _h('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": hideModal
	    }
	  }, ["保存更改"])])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('p', ["已经添加的网址, 点击删除"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-221d019d", module.exports)
	  }
	}

/***/ }

});