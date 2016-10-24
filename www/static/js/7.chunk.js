webpackJsonp([7],{

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(128)

	/* template */
	var __vue_template__ = __webpack_require__(129)
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
	__vue_options__.__file = "/Users/lqm/Desktop/think/www/app/components/yule.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-869ce62e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-869ce62e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] yule.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 128:
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

				_api2.default.yule(function (res) {
					_this.lists = res;
				});
			}
		}
	};

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', [_l((lists), function(addon) {
	    return _h('div', {
	      key: addon.pubDate,
	      staticClass: "addon panel panel-info",
	      attrs: {
	        "track-by": "$index"
	      }
	    }, [_h('div', {
	      staticClass: "panel-heading"
	    }, [_h('a', {
	      attrs: {
	        "href": addon.link,
	        "target": "_blank"
	      }
	    }, [_s(addon.title)])]), " ", (addon.imageurls[0]) ? _h('div', {
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
	  })])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-869ce62e", module.exports)
	  }
	}

/***/ }

});