webpackJsonp([6],{

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(125)

	/* template */
	var __vue_template__ = __webpack_require__(126)
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
	__vue_options__.__file = "/Users/lqm/Desktop/think/www/app/components/duanzi.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-32bffc81", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-32bffc81", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] duanzi.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vuex = __webpack_require__(22);

	var _store = __webpack_require__(2);

	var _store2 = _interopRequireDefault(_store);

	var _api = __webpack_require__(79);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	            _api2.default.duanzi(function (res) {
	                _this.lists = res;
	            });
	        },
	        zoomImg: function zoomImg(event) {
	            if (event.target.className.indexOf('imgauto') == -1) {
	                event.target.className += ' imgauto';
	            } else {
	                event.target.className = event.target._prevClass;
	            }
	        },
	        zoomVideo: function zoomVideo(event) {
	            if (event.target.className.indexOf('embed-responsive-item') == -1) {
	                event.target.className = 'embed-responsive-item';
	                event.target.parentNode.className = 'embed-responsive embed-responsive-16by9';
	            } else {
	                event.target.className = event.target._prevClass;
	                event.target.parentNode.className = event.target.parentNode._prevClass;
	            }
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

/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', [_l((lists), function(addon) {
	    return _h('div', {
	      key: addon.id,
	      staticClass: "addon panel panel-danger",
	      attrs: {
	        "track-by": "id"
	      }
	    }, [_h('div', {
	      staticClass: "panel-heading"
	    }, [_h('a', {
	      attrs: {
	        "href": addon.weixin_url,
	        "target": "_blank"
	      }
	    }, [_s(addon.text)])]), " ", (addon.image0 || addon.video_uri) ? _h('div', {
	      staticClass: "panel-body"
	    }, [(addon.image0) ? _h('p', [_h('img', {
	      directives: [{
	        name: "lazy",
	        rawName: "v-lazy",
	        value: (addon.image0),
	        expression: "addon.image0"
	      }],
	      staticClass: "addonimg img-thumbnail",
	      attrs: {
	        "alt": "image"
	      },
	      on: {
	        "click": zoomImg
	      }
	    })]) : _e(), " ", (addon.video_uri) ? _h('p', {
	      staticClass: "addon-video-wrap"
	    }, [_h('video', {
	      staticClass: "addon-video img-thumbnail",
	      attrs: {
	        "controls": ""
	      },
	      on: {
	        "click": zoomVideo
	      }
	    }, [_h('source', {
	      attrs: {
	        "src": addon.video_uri,
	        "type": "video/mp4"
	      }
	    }), " 浏览器不支持\n\t\t\t\t"])]) : _e()]) : _e()])
	  })])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-32bffc81", module.exports)
	  }
	}

/***/ }

});