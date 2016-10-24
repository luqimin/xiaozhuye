webpackJsonp([3],{

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(116)

	/* template */
	var __vue_template__ = __webpack_require__(117)
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
	__vue_options__.__file = "/Users/lqm/Desktop/think/www/app/components/toutiao.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-30f46119", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-30f46119", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] toutiao.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _api = __webpack_require__(79);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TOUTIAO = {
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

	            _api2.default.toutiao(function (res) {
	                _this.lists = res;
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

	exports.default = TOUTIAO;

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "panel panel-primary"
	  }, [_h('div', {
	    staticClass: "panel-heading"
	  }, [_h('h3', {
	    staticClass: "panel-title",
	    on: {
	      "click": init
	    }
	  }, ["新闻头条"])]), " ", _h('div', {
	    staticClass: "list-group"
	  }, [_l((lists), function(item) {
	    return _h('a', {
	      staticClass: "list-group-item",
	      attrs: {
	        "href": item.url,
	        "target": "_blank"
	      }
	    }, ["\n                " + _s(item.title) + "\n                ", _h('span', {
	      staticClass: "badge"
	    }, [_s(item.realtype)])])
	  })])])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-30f46119", module.exports)
	  }
	}

/***/ }

});