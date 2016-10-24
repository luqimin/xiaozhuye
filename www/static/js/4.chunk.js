webpackJsonp([4],{

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(119)

	/* template */
	var __vue_template__ = __webpack_require__(120)
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
	__vue_options__.__file = "/Users/lqm/Desktop/think/www/app/components/gnnews.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6782da0e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6782da0e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] gnnews.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _store = __webpack_require__(2);

	var _store2 = _interopRequireDefault(_store);

	var _api = __webpack_require__(79);

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

	exports.default = {
		created: function created() {
			this.init();
		},

		data: function data() {
			return {
				lists: []
			};
		},
		methods: {
			init: function init() {
				var _this = this;

				_api2.default.guonei(function (res) {
					_this.lists = res;
				});
			}
		}
	};

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "panel panel-primary"
	  }, [_m(0), " ", _h('div', {
	    staticClass: "list-group"
	  }, [_l((lists), function(news) {
	    return _h('a', {
	      staticClass: "list-group-item",
	      attrs: {
	        "href": news.link,
	        "target": "_blank"
	      }
	    }, [_s(news.title)])
	  })])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('div', {
	    staticClass: "panel-heading"
	  }, [_h('h3', {
	    staticClass: "panel-title"
	  }, ["国内焦点"])])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6782da0e", module.exports)
	  }
	}

/***/ }

});