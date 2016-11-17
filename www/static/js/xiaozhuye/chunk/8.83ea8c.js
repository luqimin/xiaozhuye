webpackJsonp([8],{

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(126)

	/* script */
	__vue_exports__ = __webpack_require__(130)

	/* template */
	var __vue_template__ = __webpack_require__(131)
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
	__vue_options__.__file = "/Users/lqm/xiaozhuye/www/xiaozhuye/components/notepad.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-cebe3b56", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-cebe3b56", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] notepad.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(127);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(129)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-cebe3b56!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./notepad.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-cebe3b56!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./notepad.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(128)();
	// imports


	// module
	exports.push([module.id, "\n.notepad {\n    position: fixed;\n    top: 0;\n    z-index: 166;\n    width: 50%;\n    transition: top .5s;\n}\n.notepad .panel-body {\n    position: relative;\n}\n.notepad .note-switch {\n    width: 32px;\n    height: 50px;\n    border-radius: 0 0 3px 3px;\n    background: #fff url(\"/static/img/notepad.png\") no-repeat 50% 90%;\n    background-size: 90%;\n    cursor: pointer;\n    opacity: .5;\n    transition: all .5s;\n}\n.notepad:hover .note-switch {\n    opacity: 1;\n}\n.notepad.show-notepad {\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n}\n.notepad.hide-notepad {\n    top: -2px;\n    right: 20px;\n    width: auto;\n}\n.notepad.show-notepad .panel {\n    display: block;\n}\n.notepad.show-notepad .note-switch {\n    display: none;\n}\n.notepad.hide-notepad .panel {\n    display: none;\n}\n.notepad.hide-notepad .note-switch {\n    display: block;\n}\n.notepad.hide-notepad .note-switch:hover {\n    height: 60px;\n}\n.editwrap {\n    max-height: 500px;\n    overflow-y: auto;\n    transition: all .5s;\n}\n.editwrap:focus {\n    padding: 1px 6px;\n    outline: 0;\n    border: 1px solid #eee;\n    border-radius: 3px;\n    box-shadow: 0px 0px 6px #eee inset;\n}\n.msg {\n    position: absolute;\n    top: 0;\n    right: 15px;\n}\n", ""]);

	// exports


/***/ },

/***/ 128:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(59);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(22);

	var _axios = __webpack_require__(29);

	var _axios2 = _interopRequireDefault(_axios);

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

	exports.default = {
	    created: function created() {
	        this.getNote();
	    },

	    data: function data() {
	        return {
	            isHide: true,
	            msg: '',
	            num: 0,
	            notes: []
	        };
	    },
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['isLogin']), {
	        text: function text() {
	            return this.notes.length > 0 && this.notes[this.num].content || '点此开始编辑';
	        }
	    }),
	    methods: {
	        getNote: function getNote() {
	            var _this = this;

	            _axios2.default.get('/webapi/notepad/get', '').then(function (res) {
	                if (!res.data.errno) {
	                    if (res.data.data.length) {
	                        _this.notes = res.data.data;
	                    }
	                }
	            });
	        },
	        hide: function hide() {
	            this.isHide = true;
	        },
	        show: function show(e) {
	            this.isHide = false;
	        },
	        init: function init(e) {
	            if (e.target.innerText == '点此开始编辑') {
	                e.target.innerHTML = '';
	            }
	        },
	        update: function update(e) {
	            if (!this.isLogin) {
	                return this.msg = '请登录';
	            }
	            if (e.target.innerText == '') {
	                e.target.innerHTML = '点此开始编辑';
	            }
	            var that = this;
	            var value = e.target.innerHTML;

	            if (this.notes.length > 0 && value == this.notes[this.num].content) {
	                return;
	            }

	            this.msg = '正在更新...';

	            var noteId = this.notes.length > 0 && this.notes[this.num].id || '';

	            _axios2.default.post('/webapi/notepad/update', {
	                noteId: noteId,
	                noteContent: value
	            }).then(function (res) {
	                if (!res.data.errno) {
	                    that.msg = '更新成功';
	                    if (!noteId) {
	                        that.getNote();
	                    } else {
	                        that.notes[that.num].content = value;
	                    }
	                }
	            });
	        }
	    },
	    watch: {
	        msg: function msg() {
	            var _this2 = this;

	            if (this._timeOut) clearTimeout(this._timeOut);
	            this._timeOut = setTimeout(function () {
	                _this2.msg = '';
	            }, 2000);
	        }
	    }
	};

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "notepad",
	    class: {
	      'hide-notepad': isHide, 'show-notepad': !isHide
	    }
	  }, [_h('div', {
	    staticClass: "note-switch",
	    attrs: {
	      "title": "点击打开记事本"
	    },
	    on: {
	      "click": show
	    }
	  }), " ", _h('div', {
	    staticClass: "panel panel-primary"
	  }, [_h('div', {
	    staticClass: "panel-heading"
	  }, [_h('div', {
	    staticClass: "clearfix"
	  }, [_m(0), " ", _h('div', {
	    staticClass: "pull-right"
	  }, [_h('span', {
	    staticClass: "funicon",
	    on: {
	      "click": hide
	    }
	  }, ["×"])])])]), " ", _h('div', {
	    staticClass: "panel-body"
	  }, [_h('div', {
	    staticClass: "editwrap",
	    attrs: {
	      "contenteditable": "true"
	    },
	    domProps: {
	      "innerHTML": _s(text)
	    },
	    on: {
	      "blur": update,
	      "focus": init
	    }
	  }), " ", _h('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(msg) ? _h('span', {
	    staticClass: "msg text-success"
	  }, [_s(msg)]) : _e()])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', {
	    staticClass: "panel-title pull-left"
	  }, ["记事本"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-cebe3b56", module.exports)
	  }
	}

/***/ }

});