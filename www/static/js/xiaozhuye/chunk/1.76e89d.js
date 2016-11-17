webpackJsonp([1],{

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(89)

	/* template */
	var __vue_template__ = __webpack_require__(90)
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
	__vue_options__.__file = "/Users/lqm/xiaozhuye/www/xiaozhuye/components/siteconfig.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-cab455f6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-cab455f6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] siteconfig.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(59);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(22);

	var _jsCookie = __webpack_require__(55);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _api = __webpack_require__(28);

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
	            siteList: [],
	            siteName: '',
	            siteUrl: '',
	            siteIcon: '',
	            siteCategory: '',
	            siteIssecret: false,
	            siteIsfocus: false,
	            error: ''
	        };
	    },
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['isvip', 'USERSITES', 'isShowSitesconfig']), {
	        errorClass: function errorClass() {
	            return {
	                'text-danger': this.error && this.error != '提交成功',
	                'text-success': this.error == '提交成功'
	            };
	        }
	    }),
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
	            var siteId = parseInt(e.target.id || e.target.parentNode.id);
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
	        },
	        changIsfocus: function changIsfocus() {
	            if (this.siteIsfocus && this.siteIssecret == false) {
	                this.siteIssecret = true;
	                this.error = '只有非公开网址可以设置默认高亮';
	            } else if (this.error == '只有非公开网址可以设置默认高亮') {
	                this.error = '';
	            }
	        },
	        addUserSite: function addUserSite() {
	            var _this2 = this;

	            var urlReg = /.+\.[a-zA-Z]{2,10}/;
	            var iconReg = /.+\.[a-zA-Z]+\/[a-zA-Z]+(.png|.jpg|.gif|.ico)$/;
	            if (!this.siteName) {
	                return this.error = '请输入网站名';
	            }
	            if (!this.siteUrl || !urlReg.test(this.siteUrl)) {
	                return this.error = '请输入合法的网址, 格式: http://www.xxx.com 或 www.xxx.com';
	            }
	            if (this.siteIcon && !iconReg.test(this.siteIcon)) {
	                return this.error = '图标地址格式错误, 请以.png/.jpg/.gif/.ico结尾, 也可留空';
	            }
	            if (!this.siteCategory) {
	                return this.error = '请选择合适的网址分类';
	            }

	            this.error = '';

	            _api2.default.addUserSite(function (res) {
	                console.log(res);
	                if (res.errno == 0) {
	                    return _this2.error = '提交成功';
	                } else if (res.errno == 1104) {
	                    return _this2.error = '该网址已存在, 您可以直接添加';
	                } else {
	                    return _this2.error = res.errmsg;
	                }
	            }, {
	                name: this.siteName,
	                url: this.siteUrl,
	                icon: this.siteIcon,
	                category: this.siteCategory,
	                secret: this.siteIssecret,
	                isfocus: this.siteIsfocus
	            });
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

/***/ 90:
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
	  }, [_l((USERSITES), function(site) {
	    return [_h('span', {
	      staticClass: "btn btn-success btn-sm",
	      attrs: {
	        "id": site.id
	      },
	      on: {
	        "click": deleteSite
	      }
	    }, [_s(site.name), _m(0, true)])]
	  })]), " ", (isvip) ? _h('div', {
	    staticClass: "well well-sm submitSiteWrap"
	  }, [_m(1), " ", _h('div', [_h('span', {
	    staticClass: "error",
	    class: errorClass
	  }, [_s(error)])]), " ", _h('div', {
	    staticClass: "form-inline row"
	  }, [_h('div', {
	    staticClass: "form-group col-md-4"
	  }, [_h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (siteName),
	      expression: "siteName"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "网站名",
	      "required": "required"
	    },
	    domProps: {
	      "value": _s(siteName)
	    },
	    on: {
	      "change": search,
	      "input": function($event) {
	        if ($event.target.composing) return;
	        siteName = $event.target.value
	      }
	    }
	  })]), " ", _h('div', {
	    staticClass: "form-group col-md-4"
	  }, [_h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (siteUrl),
	      expression: "siteUrl"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "网址",
	      "required": "required"
	    },
	    domProps: {
	      "value": _s(siteUrl)
	    },
	    on: {
	      "change": search,
	      "input": function($event) {
	        if ($event.target.composing) return;
	        siteUrl = $event.target.value
	      }
	    }
	  })]), " ", _h('div', {
	    staticClass: "form-group col-md-4"
	  }, [_h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (siteIcon),
	      expression: "siteIcon"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "图标"
	    },
	    domProps: {
	      "value": _s(siteIcon)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        siteIcon = $event.target.value
	      }
	    }
	  })])]), " ", _h('div', {
	    staticClass: "form-inline row addSiteLineTwo"
	  }, [_h('div', {
	    staticClass: "checkbox col-md-4"
	  }, [_h('label', [_h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (siteIssecret),
	      expression: "siteIssecret"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "id": "isSecret"
	    },
	    domProps: {
	      "checked": Array.isArray(siteIssecret) ? _i(siteIssecret, null) > -1 : _q(siteIssecret, true)
	    },
	    on: {
	      "change": [function($event) {
	        var $$a = siteIssecret,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = null,
	            $$i = _i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (siteIssecret = $$a.concat($$v))
	          } else {
	            $$i > -1 && (siteIssecret = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          siteIssecret = $$c
	        }
	      }, changIsfocus]
	    }
	  }), " 是否公开网址\n                        "])]), " ", _h('div', {
	    staticClass: "checkbox col-md-4"
	  }, [_h('label', [_h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (siteIsfocus),
	      expression: "siteIsfocus"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "id": "isDefFocus"
	    },
	    domProps: {
	      "checked": Array.isArray(siteIsfocus) ? _i(siteIsfocus, null) > -1 : _q(siteIsfocus, true)
	    },
	    on: {
	      "change": [function($event) {
	        var $$a = siteIsfocus,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = null,
	            $$i = _i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (siteIsfocus = $$a.concat($$v))
	          } else {
	            $$i > -1 && (siteIsfocus = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          siteIsfocus = $$c
	        }
	      }, changIsfocus]
	    }
	  }), " 是否默认高亮\n                        "])]), " ", _h('div', {
	    staticClass: "checkbox col-md-4"
	  }, [_h('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (siteCategory),
	      expression: "siteCategory"
	    }],
	    staticClass: "col-md-4",
	    on: {
	      "change": function($event) {
	        siteCategory = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          return "_value" in o ? o._value : o.value
	        })[0]
	      }
	    }
	  }, [_m(2), " ", _m(3), " ", _m(4), " ", _m(5), " ", _m(6), " ", _m(7), " ", _m(8), " ", _m(9), " ", _m(10), " ", _m(11), " ", _m(12), " ", _m(13), " ", _m(14), " ", _m(15)])])]), " ", _h('div', {
	    staticClass: "form-inline row addSiteLineTwo"
	  }, [_h('div', {
	    staticClass: "submitSiteBtn col-md-4"
	  }, [_h('button', {
	    staticClass: "btn btn-default btn-block",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": addUserSite
	    }
	  }, ["提交入库"])])])]) : _e()]), " ", _h('div', {
	    staticClass: "modal-footer"
	  }, [_h('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": hideModal
	    }
	  }, ["保存更改"])])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', {
	    staticClass: "badge"
	  }, ["×"])
	}},function (){with(this) {
	  return _h('div', [_h('span', ["上面没有想要的网站? 那就帮我添加网址入库吧!"])])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": ""
	    }
	  }, ["请选择合适的分类"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "sj"
	    }
	  }, ["社交"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "gw"
	    }
	  }, ["购物"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "xw"
	    }
	  }, ["新闻"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "sp"
	    }
	  }, ["视频"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "yy"
	    }
	  }, ["音乐"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "zp"
	    }
	  }, ["招聘"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "yx"
	    }
	  }, ["邮箱"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "js"
	    }
	  }, ["技术"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "ty"
	    }
	  }, ["体育"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "rj"
	    }
	  }, ["软件"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "sh"
	    }
	  }, ["生活"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "game"
	    }
	  }, ["游戏"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "qt"
	    }
	  }, ["其他"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-cab455f6", module.exports)
	  }
	}

/***/ }

});