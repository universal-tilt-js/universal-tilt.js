(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("UniversalTilt", [], factory);
	else if(typeof exports === 'object')
		exports["UniversalTilt"] = factory();
	else
		root["UniversalTilt"] = factory();
})(typeof window !== "object" ? global.window = global : window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/universal-tilt.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/universal-tilt.js":
/*!*******************************!*\
  !*** ./src/universal-tilt.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UniversalTilt; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UniversalTilt =
/*#__PURE__*/
function () {
  function UniversalTilt(element) {
    var _this = this;

    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, UniversalTilt);

    _defineProperty(this, "onMouseEnter", function () {
      _this.updateElementPosition();

      _this.transitions();

      if (typeof _this.callbacks.onMouseEnter === 'function') {
        _this.callbacks.onMouseEnter(_this.element);
      }
    });

    _defineProperty(this, "onMouseMove", function (e) {
      if (_this.updateCall !== null) cancelAnimationFrame(_this.updateCall);
      _this.event = e;

      _this.updateElementPosition();

      _this.updateCall = requestAnimationFrame(function () {
        return _this.update();
      });

      if (typeof _this.callbacks.onMouseMove === 'function') {
        _this.callbacks.onMouseMove(_this.element);
      }
    });

    _defineProperty(this, "onMouseLeave", function () {
      _this.transitions();

      requestAnimationFrame(function () {
        return _this.reset();
      });

      if (typeof _this.callbacks.onMouseLeave === 'function') {
        _this.callbacks.onMouseLeave(_this.element);
      }
    });

    _defineProperty(this, "onDeviceMove", function (e) {
      _this.event = e;

      _this.update();

      _this.updateElementPosition();

      _this.transitions();

      if (typeof _this.callbacks.onDeviceMove === 'function') {
        _this.callbacks.onDeviceMove(_this.element);
      }
    });

    this.element = element;
    this.callbacks = callbacks;
    this.settings = this.extendSettings(settings);

    if (typeof this.callbacks.onInit === 'function') {
      this.callbacks.onInit(this.element);
    }

    this.reverse = this.settings.reverse ? -1 : 1;
    if (this.settings.shine) this.shine();
    this.element.style.transform = "perspective(".concat(this.settings.perspective, "px)");
    this.addEventListeners();
  }

  _createClass(UniversalTilt, [{
    key: "isMobile",
    value: function isMobile() {
      return window.DeviceMotionEvent && 'ontouchstart' in document.documentElement;
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      if (!navigator.userAgent.match(this.settings.exclude)) {
        if (this.isMobile()) {
          window.addEventListener('devicemotion', this.onDeviceMove);
        } else {
          if (this.settings.base === 'element') {
            this.base = this.element;
          } else if (this.settings.base === 'window') {
            this.base = window;
          }

          this.base.addEventListener('mouseenter', this.onMouseEnter);
          this.base.addEventListener('mousemove', this.onMouseMove);
          this.base.addEventListener('mouseleave', this.onMouseLeave);
        }
      }
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      window.removeEventListener('devicemotion', this.onDeviceMove);
      this.base.removeEventListener('mouseenter', this.onMouseEnter);
      this.base.removeEventListener('mousemove', this.onMouseMove);
      this.base.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      clearTimeout(this.timeout);
      if (this.updateCall !== null) cancelAnimationFrame(this.updateCall);

      if (typeof this.callbacks.onDestroy === 'function') {
        this.callbacks.onDestroy(this.element);
      }

      this.reset();
      this.removeEventListeners();
      this.element.universalTilt = null;
      delete this.element.universalTilt;
      this.element = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.event = {
        pageX: this.left + this.width / 2,
        pageY: this.top + this.height / 2
      };

      if (this.settings.reset) {
        this.element.style.transform = "perspective(".concat(this.settings.perspective, "px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
      }

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
      var x, y;

      if (this.isMobile()) {
        x = this.event.accelerationIncludingGravity.x / 4;
        y = this.event.accelerationIncludingGravity.y / 4;
        var stateX, stateY;

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
        }
      } else if (this.settings.base === 'element') {
        x = (this.event.clientX - this.left) / this.width;
        y = (this.event.clientY - this.top) / this.height;
      } else if (this.settings.base === 'window') {
        x = this.event.clientX / window.innerWidth;
        y = this.event.clientY / window.innerHeight;
      }

      x = Math.min(Math.max(x, 0), 1);
      y = Math.min(Math.max(y, 0), 1);
      var tiltX = (this.settings.max / 2 - x * this.settings.max).toFixed(2);
      var tiltY = (y * this.settings.max - this.settings.max / 2).toFixed(2);
      var angle = Math.atan2(x - 0.5, 0.5 - y) * (180 / Math.PI);
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
      }

      this.element.dispatchEvent(new CustomEvent('tiltChange', {
        detail: values
      }));
      this.updateCall = null;
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
      });
      Object.assign(this.shineElement.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        'pointer-events': 'none',
        'background-image': 'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
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
      var _this2 = this;

      clearTimeout(this.timeout);
      this.element.style.transition = "all ".concat(this.settings.speed, "ms ").concat(this.settings.easing);

      if (this.settings.shine) {
        this.shineElement.style.transition = "opacity ".concat(this.settings.speed, "ms ").concat(this.settings.easing);
      }

      this.timeout = setTimeout(function () {
        _this2.element.style.transition = '';
        if (_this2.settings.shine) _this2.shineElement.style.transition = '';
      }, this.settings.speed);
    }
  }, {
    key: "extendSettings",
    value: function extendSettings(settings) {
      var defaultSettings = {
        base: 'element',
        // element or window
        disabled: null,
        // disable axis (X or Y)
        easing: 'cubic-bezier(.03, .98, .52, .99)',
        // transition easing
        exclude: null,
        // enable/disable tilt effect on selected user agents
        max: 35,
        // max tilt value
        perspective: 1000,
        // tilt effect perspective
        reset: true,
        // enable/disable element position reset after mouseout
        reverse: false,
        // reverse tilt effect directory
        scale: 1.0,
        // element scale on mouseover
        shine: false,
        // add/remove shine effect on mouseover
        'shine-opacity': 0,
        // shine opacity (0-1) (shine value must be true)
        'shine-save': false,
        // save/reset shine effect on mouseout (shine value must be true)
        speed: 300 // transition speed

      };
      var newSettings = {};

      for (var property in defaultSettings) {
        if (property in settings) {
          newSettings[property] = settings[property];
        } else if (this.element.getAttribute("data-".concat(property))) {
          var attribute = this.element.getAttribute("data-".concat(property));

          try {
            newSettings[property] = JSON.parse(attribute);
          } catch (_unused) {
            newSettings[property] = attribute;
          }
        } else {
          newSettings[property] = defaultSettings[property];
        }
      }

      return newSettings;
    }
  }], [{
    key: "init",
    value: function init() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var elements = data.elements,
          settings = data.settings,
          callbacks = data.callbacks;
      if (elements instanceof Node) elements = [elements];
      if (elements instanceof NodeList) elements = [].slice.call(elements);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          if (!('universalTilt' in element)) {
            element.universalTilt = new UniversalTilt(element, settings, callbacks);
          }
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
  }]);

  return UniversalTilt;
}();



if (typeof document !== 'undefined') {
  window.UniversalTilt = UniversalTilt;
  var elements = document.querySelectorAll('[data-tilt]');
  elements.length && UniversalTilt.init({
    elements: elements
  });
}

if (window.jQuery) {
  var $ = window.jQuery;

  $.fn.universalTilt = function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    UniversalTilt.init({
      elements: this,
      settings: data.settings || {},
      callbacks: data.callbacks || {}
    });
  };
}

/***/ })

/******/ });
});
//# sourceMappingURL=universal-tilt.js.map