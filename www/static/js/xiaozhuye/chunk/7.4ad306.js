webpackJsonp([7],{

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(123)

	/* template */
	var __vue_template__ = __webpack_require__(124)
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
	__vue_options__.__file = "/Users/lqm/xiaozhuye/www/xiaozhuye/components/yule.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-33970e51", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-33970e51", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] yule.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _store = __webpack_require__(2);

	var _store2 = _interopRequireDefault(_store);

	var _api = __webpack_require__(28);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	exports.default = {
		created: function created() {
			var _this = this;

			this.init();
			if (window.localStorage && localStorage.getItem('yule')) {
				setTimeout(function () {
					_this.refresh();
				}, 1000);
			}
		},

		data: function data() {
			return {
				lists: [],
				ing: 0
			};
		},
		methods: {
			init: function init() {
				var _this2 = this;

				_api2.default.addon(function (res) {
					_this2.lists = res;
				}, 'yule');
			},
			refresh: function refresh() {
				var _this3 = this;

				if (this.ing) {
					return;
				}
				this.ing = 1;
				_api2.default.addon(function (res) {
					if (res) {
						_this3.lists = res;
					}
					_this3.ing = 0;
				}, 'yule', 1);
			}
		}
	};

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "addon panel panel-info"
	  }, [_h('div', {
	    staticClass: "panel-heading refresh-header clearfix"
	  }, [_m(0), " ", _h('img', {
	    staticClass: "pull-right btn-refresh",
	    class: {
	      ing: ing
	    },
	    attrs: {
	      "src": "/static/img/refresh.png",
	      "alt": "刷新"
	    },
	    on: {
	      "click": refresh
	    }
	  })]), " ", _h('div', {
	    staticClass: "list-group"
	  }, [_l((lists), function(addon) {
	    return _h('div', {
	      key: addon.pubDate,
	      staticClass: "list-group-item",
	      attrs: {
	        "track-by": "$index"
	      }
	    }, [_h('a', {
	      staticClass: "text-info",
	      attrs: {
	        "href": addon.link,
	        "target": "_blank"
	      }
	    }, [_s(addon.title)]), " ", (addon.imageurls[0]) ? _h('div', {
	      staticClass: "panel-body"
	    }, [(addon.imageurls[0]) ? _h('p', [_h('img', {
	      directives: [{
	        name: "lazy",
	        rawName: "v-lazy",
	        value: (addon.imageurls[0].url),
	        expression: "addon.imageurls[0].url"
	      }],
	      staticClass: "addonimg img-thumbnail",
	      attrs: {
	        "alt": "image"
	      }
	    })]) : _e()]) : _e()])
	  })])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', {
	    staticClass: "pill-left"
	  }, ["娱乐新闻"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-33970e51", module.exports)
	  }
	}

/***/ }

});