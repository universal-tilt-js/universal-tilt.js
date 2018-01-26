'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
* universal-tilt.js v0.5
* Created 2018 by Jakub Biesiada
* Original idea: https://github.com/gijsroge/tilt.js
* MIT License
*/

var UniversalTilt = function () {
  function UniversalTilt(elements) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, UniversalTilt);

    // call init function when tilt elements length > 0
    if (elements.length > 0) {
      this.init(elements, settings);
      return;

      // return when no tilt elements
    } else if (elements.length === 0) {
      return;

      // set tilt element
    } else {
      this.element = elements;
    }

    // set settings
    this.settings = this.settings(settings);

    // reverse change
    this.reverse = this.settings.reverse ? -1 : 1;

    // call shine function if shine setting enabled
    if (this.settings.shine) {
      this.shine();
    }

    this.element.style.transform = 'perspective(' + this.settings.perspective + 'px)';

    // call events function
    this.addEventListeners();
  }

  _createClass(UniversalTilt, [{
    key: 'init',
    value: function init(elements, settings) {
      // split parallax elements
      for (var element = 0; element < elements.length; element++) {
        new UniversalTilt(elements[element], settings);
      }
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      // if is mobile device
      if (window.DeviceMotionEvent && "ontouchstart" in document.documentElement) {
        this.onDeviceMoveBind = this.onDeviceMove.bind(this);

        // devicemotion event
        window.addEventListener('devicemotion', this.onDeviceMoveBind);

        // if is desktop
      } else {
        if (this.settings['position-base'] === 'element') {
          this.onMouseMoveBind = this.onMouseMove.bind(this);

          // mousemove event
          this.element.addEventListener('mousemove', this.onMouseMoveBind);

          // mouseleave event
          this.element.addEventListener('mouseleave', function () {
            return _this.onMouseLeave();
          });
        } else if (this.settings['position-base'] === 'window') {
          this.onMouseMoveBind = this.onMouseMove.bind(this);

          // mousemove event
          window.addEventListener('mousemove', this.onMouseMoveBind);

          // mouseleave event
          window.addEventListener('mouseleave', function () {
            return _this.onMouseLeave();
          });
        }
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var _this2 = this;

      // set event
      this.event = event;
      this.updateElementPosition();

      // optimize movement effect
      if (window.DeviceMotionEvent && "ontouchstart" in document.documentElement) {
        this.update();
      } else {
        window.requestAnimationFrame(function () {
          return _this2.update();
        });
      }
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      var _this3 = this;

      if (window.DeviceMotionEvent && "ontouchstart" in document.documentElement) {
        this.reset();
      } else {
        window.requestAnimationFrame(function () {
          return _this3.reset();
        });
      }
    }
  }, {
    key: 'onDeviceMove',
    value: function onDeviceMove(event) {
      this.movementEvent = event;
      this.update();
      this.updateElementPosition();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.event = {
        pageX: this.left + this.width / 2,
        pageY: this.top + this.height / 2
      };

      if (this.settings.reset) {
        this.element.style.transform = 'perspective(' + this.settings.perspective + 'px) rotateX(0deg) rotateY(0deg) scale(1)';
      }

      // set animation when is enabled
      if (this.settings.animation) {
        this.element.style.transition = 'all 500ms ease';
      }

      // reset shine effect
      if (this.settings.shine && !this.settings['shine-save']) {
        this.shineElement.style.transition = 'all 500ms ease';
        this.shineElement.style.transform = 'rotate(180deg) translate3d(-50%, -50%, 0)';
        this.shineElement.style.opacity = '0';
      }

      // reset box shadow
      if (this.settings.shadow && !this.settings['shadow-save']) {
        this.element.style.boxShadow = '0 45px 100px rgba(0, 0, 0, 0)';
      }
    }
  }, {
    key: 'getValues',
    value: function getValues() {
      var x;
      var y;

      // if is mobile device (touch screen + gyroscope)
      if (window.DeviceMotionEvent && "ontouchstart" in document.documentElement) {

        // revert axis (device rotation)
        x = Math.round(event.accelerationIncludingGravity.x) / 6;
        y = Math.round(event.accelerationIncludingGravity.y) / 6;

        var stateX;
        var stateY;

        if (window.orientation === 90) {
          stateX = 1.0 + x;
          stateY = 1.0 - y;

          y = stateX / 2;
          x = stateY / 2;
        } else if (window.orientation === -90) {
          stateX = 1.0 - x;
          stateY = 1.0 + y;

          y = stateX / 2;
          x = stateY / 2;
        } else if (window.orientation === 0) {
          stateY = 1.0 + y;
          stateX = 1.0 + x;

          y = stateY / 2;
          x = stateX / 2;
        } else if (window.orientation === 180) {
          stateY = 1.0 - y;
          stateX = 1.0 - x;

          y = stateY / 2;
          x = stateX / 2;
        }

        // if desktop
      } else {

        // find element vertical & horizontal center
        if (this.settings['position-base'] === 'element') {
          x = (this.event.clientX - this.left) / this.width;
          y = (this.event.clientY - this.top) / this.height;
        } else {
          x = this.event.clientX / window.innerWidth;
          y = this.event.clientY / window.innerHeight;
        }

        // set movement for axis
        x = Math.min(Math.max(x, 0), 1);
        y = Math.min(Math.max(y, 0), 1);
      }

      var tiltX = (this.settings.max / 2 - x * this.settings.max).toFixed(2);
      var tiltY = (y * this.settings.max - this.settings.max / 2).toFixed(2);

      // set angle
      var angle = Math.atan2(0.5 - x, y - 0.5) * (180 / Math.PI);

      // return values
      return {
        tiltX: this.reverse * tiltX,
        tiltY: this.reverse * tiltY,
        percentageX: x * 100,
        percentageY: y * 100,
        angle: angle
      };
    }
  }, {
    key: 'updateElementPosition',
    value: function updateElementPosition() {
      var rect = this.element.getBoundingClientRect();

      this.width = this.element.offsetWidth;
      this.height = this.element.offsetHeight;
      this.left = rect.left;
      this.top = rect.top;
    }
  }, {
    key: 'update',
    value: function update() {
      var values = this.getValues();

      if (this.settings.animation) {
        this.element.style.transition = 'all 100ms ease';
      }

      if (this.settings.shadow) {
        this.boxShadow = '0 45px 100px rgba(0, 0, 0, 0.4)';
      }

      this.element.style.transform = 'perspective(' + this.settings.perspective + 'px)\n    rotateX(' + (this.settings.disabled === "X" || this.settings.disabled === "x" ? 0 : values.tiltY) + 'deg)\n    rotateY(' + (this.settings.disabled === "Y" || this.settings.disabled === "y" ? 0 : values.tiltX) + 'deg)\n    scale(' + this.settings.scale + ')';

      if (this.settings.shine) {
        this.shineElement.style.transition = 'all 0ms ease';
        this.shineElement.style.transform = 'rotate(' + -values.angle + 'deg) translate3d(-50%, -50%, 0)';
        this.shineElement.style.opacity = '' + this.settings["shine-opacity"];
      }

      if (this.settings.shadow) {
        this.element.style.boxShadow = this.boxShadow;
      }

      // tilt position change event
      this.element.dispatchEvent(new CustomEvent("tiltChange", {
        "detail": {
          'X': values.tiltX,
          'Y': values.tiltY
        }
      }));
    }
  }, {
    key: 'shine',
    value: function shine() {
      var createShine = document.createElement("div");
      createShine.classList.add("shine");

      var createShineInner = document.createElement("div");
      createShineInner.classList.add("shine-inner");

      createShine.appendChild(createShineInner);
      this.element.appendChild(createShine);

      this.shineElementWrapper = this.element.querySelector(".shine");
      this.shineElement = this.element.querySelector(".shine-inner");

      Object.assign(this.shineElementWrapper.style, {
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'height': '100%',
        'width': '100%',
        'overflow': 'hidden'
      });

      // set style for shine element
      Object.assign(this.shineElement.style, {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'pointer-events': 'none',
        'background-image': 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        'width': this.element.offsetWidth * 2 + 'px',
        'height': this.element.offsetWidth * 2 + 'px',
        'transform': 'rotate(180deg) translate3d(-50%, -50%, 0)',
        'transform-origin': '0% 0%',
        'opacity': '0'
      });
    }
  }, {
    key: 'settings',
    value: function settings(_settings) {

      // defaults
      var defaults = {
        'position-base': 'element', // element or window
        reset: true,
        shadow: false,
        'shadow-save': false,
        shine: false,
        'shine-opacity': 0,
        'shine-save': false,
        max: 35,
        perspective: 1000,
        scale: 1.0,
        disabled: null,
        reverse: false,
        animation: true
      };

      var custom = {};

      // apply settings and get values from data-*
      for (var setting in defaults) {
        if (setting in _settings) {
          custom[setting] = _settings[setting];
        } else if (this.element.getAttribute('data-' + setting)) {
          var attribute = this.element.getAttribute('data-' + setting);
          try {
            custom[setting] = JSON.parse(attribute);
          } catch (e) {
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
}();

// jQuery


if (window.jQuery) {
  var $ = window.jQuery;

  $.fn.UniversalTilt = function (options) {
    for (var element = 0; element < this.length; element++) {
      new UniversalTilt(this[element], options);
    }
  };
}