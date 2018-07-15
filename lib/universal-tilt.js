(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("UniversalTilt", [], factory);
	else if(typeof exports === 'object')
		exports["UniversalTilt"] = factory();
	else
		root["UniversalTilt"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _universalTilt = _interopRequireDefault(__webpack_require__(/*! ./universal-tilt */ "./src/universal-tilt.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _universalTilt.default;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/universal-tilt.js":
/*!*******************************!*\
  !*** ./src/universal-tilt.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UniversalTilt =
/*#__PURE__*/
function () {
  function UniversalTilt(elements) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, UniversalTilt);

    // call init function when tilt elements length > 0
    if (elements.length > 0) {
      this.init(elements, settings);
      return; // return when no tilt elements
    } else if (elements.length === 0) {
      return; // set tilt element
    } else {
      this.element = elements;
    }

    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.timeout = null; // set settings

    this.settings = this.settings(settings); // reverse change

    this.reverse = this.settings.reverse ? -1 : 1; // call shine function if shine setting enabled

    if (this.settings.shine) this.shine();
    this.element.style.transform = "perspective(".concat(this.settings.perspective, "px)"); // call events function

    this.addEventListeners();
  }

  _createClass(UniversalTilt, [{
    key: "init",
    value: function init(elements, settings) {
      // split parallax elements
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;
          this.universalTilt = new UniversalTilt(element, settings);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      if (window.DeviceMotionEvent && 'ontouchstart' in document.documentElement && this.settings.mobile) return true;
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this = this;

      // if is mobile device
      if (this.isMobile()) {
        // devicemotion event
        window.addEventListener('devicemotion', function (e) {
          return _this.onDeviceMove(e);
        }); // if is desktop
      } else {
        if (this.settings['position-base'] === 'element') this.base = this.element;else if (this.settings['position-base'] === 'window') this.base = window; // mouseenter event

        this.base.addEventListener('mouseenter', function (e) {
          return _this.onMouseEnter(e);
        }); // mousemove event

        this.base.addEventListener('mousemove', function (e) {
          return _this.onMouseMove(e);
        }); // mouseleave event

        this.base.addEventListener('mouseleave', function (e) {
          return _this.onMouseLeave(e);
        });
      }
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(e) {
      this.updateElementPosition();
      this.transitions();
      if (typeof this.settings.onMouseEnter === 'function') this.settings.onMouseEnter(this.element);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var _this2 = this;

      // set event
      this.event = e;
      this.updateElementPosition();
      window.requestAnimationFrame(function () {
        return _this2.update();
      });
      if (typeof this.settings.onMouseMove === 'function') this.settings.onMouseMove(this.element);
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(e) {
      var _this3 = this;

      this.transitions();
      window.requestAnimationFrame(function () {
        return _this3.reset();
      });
      if (typeof this.settings.onMouseLeave === 'function') this.settings.onMouseLeave(this.element);
    }
  }, {
    key: "onDeviceMove",
    value: function onDeviceMove(e) {
      this.update();
      this.updateElementPosition();
      this.transitions();
      if (typeof this.settings.onDeviceMove === 'function') this.settings.onDeviceMove(this.element);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.event = {
        pageX: this.left + this.width / 2,
        pageY: this.top + this.height / 2
      };
      if (this.settings.reset) this.element.style.transform = "perspective(".concat(this.settings.perspective, "px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"); // reset shine effect

      if (this.settings.shine && !this.settings['shine-save']) {
        Object.assign(this.shineElement.style, {
          transform: 'rotate(180deg) translate3d(-50%, -50%, 0)',
          opacity: '0'
        });
      }
    }
  }, {
    key: "getValues",
    value: function getValues() {
      var x;
      var y; // if is mobile device

      if (this.isMobile()) {
        // revert axis (device rotation)
        x = event.accelerationIncludingGravity.x / 4;
        y = event.accelerationIncludingGravity.y / 4;
        var stateX;
        var stateY;

        if (window.orientation === 90) {
          stateX = (1.0 + x) / 2;
          stateY = (1.0 - y) / 2;
          y = stateX;
          x = stateY;
        } else if (window.orientation === -90) {
          stateX = (1.0 - x) / 2;
          stateY = (1.0 + y) / 2;
          y = stateX;
          x = stateY;
        } else if (window.orientation === 0) {
          stateY = (1.0 + y) / 2;
          stateX = (1.0 + x) / 2;
          y = stateY;
          x = stateX;
        } else if (window.orientation === 180) {
          stateY = (1.0 - y) / 2;
          stateX = (1.0 - x) / 2;
          y = stateY;
          x = stateX;
        } // if desktop

      } else {
        // find element vertical & horizontal center
        if (this.settings['position-base'] === 'element') {
          x = (this.event.clientX - this.left) / this.width;
          y = (this.event.clientY - this.top) / this.height;
        } else if (this.settings['position-base'] === 'window') {
          x = this.event.clientX / window.innerWidth;
          y = this.event.clientY / window.innerHeight;
        }
      } // set movement for axis


      x = Math.min(Math.max(x, 0), 1);
      y = Math.min(Math.max(y, 0), 1);
      var tiltX = (this.settings.max / 2 - x * this.settings.max).toFixed(2);
      var tiltY = (y * this.settings.max - this.settings.max / 2).toFixed(2); // set angle

      var angle = Math.atan2(x - 0.5, 0.5 - y) * (180 / Math.PI); // return values

      return {
        tiltX: this.reverse * tiltX,
        tiltY: this.reverse * tiltY,
        angle: angle
      };
    }
  }, {
    key: "updateElementPosition",
    value: function updateElementPosition() {
      var rect = this.element.getBoundingClientRect();
      this.width = this.element.offsetWidth;
      this.height = this.element.offsetHeight;
      this.left = rect.left;
      this.top = rect.top;
    }
  }, {
    key: "update",
    value: function update() {
      var values = this.getValues();
      this.element.style.transform = "perspective(".concat(this.settings.perspective, "px)\n      rotateX(").concat(this.settings.disabled && this.settings.disabled.toUpperCase() === 'X' ? 0 : values.tiltY, "deg)\n      rotateY(").concat(this.settings.disabled && this.settings.disabled.toUpperCase() === 'Y' ? 0 : values.tiltX, "deg)\n      scale3d(").concat(this.settings.scale, ", ").concat(this.settings.scale, ", ").concat(this.settings.scale, ")");

      if (this.settings.shine) {
        Object.assign(this.shineElement.style, {
          transform: "rotate(".concat(values.angle, "deg) translate3d(-50%, -50%, 0)"),
          opacity: "".concat(this.settings['shine-opacity'])
        });
      } // tilt position change event


      this.element.dispatchEvent(new CustomEvent('tiltChange', {
        detail: values
      }));
    }
  }, {
    key: "shine",
    value: function shine() {
      var shineOuter = document.createElement('div');
      var shineInner = document.createElement('div');
      shineOuter.classList.add('shine');
      shineInner.classList.add('shine-inner');
      shineOuter.appendChild(shineInner);
      this.element.appendChild(shineOuter);
      this.shineWrapper = this.element.querySelector('.shine');
      this.shineElement = this.element.querySelector('.shine-inner');
      Object.assign(this.shineWrapper.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      }); // set style for shine element

      Object.assign(this.shineElement.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        'pointer-events': 'none',
        'background-image': 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        width: "".concat(this.element.offsetWidth * 2, "px"),
        height: "".concat(this.element.offsetWidth * 2, "px"),
        transform: 'rotate(180deg) translate3d(-50%, -50%, 0)',
        'transform-origin': '0% 0%',
        opacity: '0'
      });
    }
  }, {
    key: "transitions",
    value: function transitions() {
      var _this4 = this;

      clearTimeout(this.timeout);
      this.element.style.transition = "all ".concat(this.settings.speed, "ms ").concat(this.settings.easing);
      if (this.settings.shine) this.shineElement.style.transition = "opacity ".concat(this.settings.speed, "ms ").concat(this.settings.easing);
      this.timeout = setTimeout(function () {
        _this4.element.style.transition = '';
        if (_this4.settings.shine) _this4.shineElement.style.transition = '';
      }, this.settings.speed);
    }
  }, {
    key: "settings",
    value: function settings(_settings) {
      // defaults
      var defaults = {
        'position-base': 'element',
        // element or window
        reset: true,
        // enable/disable element position reset after mouseout
        mobile: true,
        // enable/disable tilt effect on mobile devices with gyroscope (tilt effect on touch is always enabled)
        shine: false,
        // add/remove shine effect on mouseover
        'shine-opacity': 0,
        // shine opacity (0-1) (shine value must be true)
        'shine-save': false,
        // save/reset shine effect on mouseout (shine value must be true)
        max: 35,
        // max tilt value
        perspective: 1000,
        // tilt effect perspective
        scale: 1.0,
        // element scale on mouseover
        disabled: null,
        // disable axis (X or Y)
        reverse: false,
        // reverse tilt effect directory
        speed: 300,
        // transition speed
        easing: 'cubic-bezier(.03, .98, .52, .99)',
        // transition easing
        onMouseEnter: null,
        // call function on mouse enter
        onMouseMove: null,
        // call function on mouse move
        onMouseLeave: null,
        // call function on mouse leave
        onDeviceMove: null // call function on device move

      };
      var custom = {}; // apply settings and get values from data-*

      for (var setting in defaults) {
        if (setting in _settings) {
          custom[setting] = _settings[setting];
        } else if (this.element.getAttribute("data-".concat(setting))) {
          var attribute = this.element.getAttribute("data-".concat(setting));

          try {
            custom[setting] = JSON.parse(attribute);
          } catch (err) {
            custom[setting] = attribute;
          }
        } else {
          custom[setting] = defaults[setting];
        }
      }

      return custom;
    }
  }]);

  return UniversalTilt;
}(); // autoinit


exports.default = UniversalTilt;
if (typeof document !== 'undefined') new UniversalTilt(document.querySelectorAll('[tilt]')); // jQuery

var scope;
if (typeof window !== 'undefined') scope = window;else if (typeof global !== 'undefined') scope = global;

if (scope && scope.jQuery) {
  var $ = scope.jQuery;

  $.fn.universalTilt = function (options) {
    new UniversalTilt(this, options);
  };
}

module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
});
//# sourceMappingURL=universal-tilt.js.map