/*!
* universal-tilt.js v1.0.6
* Created 2018 by Jakub Biesiada
* Original idea: https://github.com/gijsroge/tilt.js
* MIT License
*/

class UniversalTilt {
  constructor(elements, settings = {}) {
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

    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.timeout = null;

    // set settings
    this.settings = this.settings(settings);

    // reverse change
    this.reverse = this.settings.reverse ? -1 : 1;

    // call shine function if shine setting enabled
    if (this.settings.shine) this.shine();

    this.element.style.transform = `perspective(${this.settings.perspective}px)`;

    // call events function
    this.addEventListeners();
  }

  init(elements, settings) {
    // split parallax elements
    for (let i = 0; i < elements.length; i++) {
      this.universalTilt = new UniversalTilt(elements[i], settings);
    }
  }

  isMobile() {
    if (window.DeviceMotionEvent && 'ontouchstart' in document.documentElement && this.settings.mobile) return true;
  }

  addEventListeners() {
    // if is mobile device
    if (this.isMobile()) {
      // devicemotion event
      window.addEventListener('devicemotion', event => this.onDeviceMove(event));

    // if is desktop
    } else {
      if (this.settings['position-base'] === 'element')
       this.base = this.element;
      else if (this.settings['position-base'] === 'window')
       this.base = window;

      // mouseenter event
      this.base.addEventListener('mouseenter', event => this.onMouseEnter(event));

      // mousemove event
      this.base.addEventListener('mousemove', event => this.onMouseMove(event));

      // mouseleave event
      this.base.addEventListener('mouseleave', event => this.onMouseLeave(event));
    }
  }

  onMouseEnter(event) {
    this.updateElementPosition();

    this.transitions();

    if (typeof this.settings.onMouseEnter === 'function')
     this.settings.onMouseEnter(this.element);
  }

  onMouseMove(event) {
    // set event
    this.event = event;
    this.updateElementPosition();

    window.requestAnimationFrame(() => this.update());

    if (typeof this.settings.onMouseMove === 'function')
     this.settings.onMouseMove(this.element);
  }

  onMouseLeave(event) {
    this.transitions();

    window.requestAnimationFrame(() => this.reset());

    if (typeof this.settings.onMouseLeave === 'function')
     this.settings.onMouseLeave(this.element);
  }

  onDeviceMove(event) {
    this.update();
    this.updateElementPosition();

    this.transitions();

    if (typeof this.settings.onDeviceMove === 'function')
     this.settings.onDeviceMove(this.element);
  }

  reset() {
    this.event = {
      pageX: this.left + this.width / 2,
      pageY: this.top + this.height / 2
    };

    if (this.settings.reset)
     this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    // reset shine effect
    if (this.settings.shine && !this.settings['shine-save']) {
      Object.assign(this.shineElement.style, {
        'transform': 'rotate(180deg) translate3d(-50%, -50%, 0)',
        'opacity': '0'
      });
    }
  }

  getValues() {
    let x;
    let y;

    // if is mobile device
    if (this.isMobile()) {

      // revert axis (device rotation)
      x = event.accelerationIncludingGravity.x / 4;
      y = event.accelerationIncludingGravity.y / 4;

      let stateX;
      let stateY;

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

    // if desktop
    } else {

      // find element vertical & horizontal center
      if (this.settings['position-base'] === 'element') {
        x = (this.event.clientX - this.left) / this.width;
        y = (this.event.clientY - this.top) / this.height;
      } else if (this.settings['position-base'] === 'window') {
        x = (this.event.clientX) / window.innerWidth;
        y = (this.event.clientY) / window.innerHeight;
      }
    }

    // set movement for axis
    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    const tiltX = ((this.settings.max / 2) - (x * this.settings.max)).toFixed(2);
    const tiltY = ((y * this.settings.max) - (this.settings.max / 2)).toFixed(2);

    // set angle
    const angle = Math.atan2(x - 0.5, 0.5 - y) * (180 / Math.PI);

    // return values
    return {
      tiltX: this.reverse * tiltX,
      tiltY: this.reverse * tiltY,
      angle: angle
    };
  }

  updateElementPosition() {
    const rect = this.element.getBoundingClientRect();

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  }

  update() {
    const values = this.getValues();

    this.element.style.transform = `perspective(${this.settings.perspective}px)
     rotateX(${this.settings.disabled && this.settings.disabled.toUpperCase() === 'X' ? 0 : values.tiltY}deg)
     rotateY(${this.settings.disabled && this.settings.disabled.toUpperCase() === 'Y' ? 0 : values.tiltX}deg)
     scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`;

    if (this.settings.shine) {
      Object.assign(this.shineElement.style, {
        'transform': `rotate(${values.angle}deg) translate3d(-50%, -50%, 0)`,
        'opacity': `${this.settings['shine-opacity']}`
      });
    }

    // tilt position change event
    this.element.dispatchEvent(new CustomEvent('tiltChange', {
      'detail': values
    }));
  }

  shine() {
    const shineOuter = document.createElement('div');
    shineOuter.classList.add('shine');

    const shineInner = document.createElement('div');
    shineInner.classList.add('shine-inner');

    shineOuter.appendChild(shineInner);
    this.element.appendChild(shineOuter);

    this.shineWrapper = this.element.querySelector('.shine');
    this.shineElement = this.element.querySelector('.shine-inner');

    Object.assign(this.shineWrapper.style, {
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
      'width': `${this.element.offsetWidth * 2}px`,
      'height': `${this.element.offsetWidth * 2}px`,
      'transform': 'rotate(180deg) translate3d(-50%, -50%, 0)',
      'transform-origin': '0% 0%',
      'opacity': '0'
    });
  }

  transitions() {
    clearTimeout(this.timeout);
    this.element.style.transition = `all ${this.settings.speed}ms ${this.settings.easing}`;
    if (this.settings.shine) this.shineElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;

    this.timeout = setTimeout(() => {
      this.element.style.transition = '';
      if (this.settings.shine) {
        this.shineElement.style.transition = '';
      }
    }, this.settings.speed);
  }

  settings(settings) {
    // defaults
    const defaults = {
      'position-base': 'element', // element or window
      reset: true, // enable/disable element position reset after mouseout
      mobile: true, // enable/disable tilt effect on mobile devices with gyroscope (tilt effect on touch is always enabled)

      shine: false, // add/remove shine effect on mouseover
      'shine-opacity': 0, // shine opacity (0-1) (shine value must be true)
      'shine-save': false, // save/reset shine effect on mouseout (shine value must be true)

      max: 35, // max tilt value
      perspective: 1000, // tilt effect perspective
      scale: 1.0, // element scale on mouseover
      disabled: null, // disable axis (X or Y)
      reverse: false, // reverse tilt effect directory

      speed: 300, // transition speed
      easing: 'cubic-bezier(.03, .98, .52, .99)', // transition easing

      onMouseEnter: null, // call function on mouse enter
      onMouseMove: null, // call function on mouse move
      onMouseLeave: null, // call function on mouse leave
      onDeviceMove: null // call function on device move
    };

    const custom = {};

    // apply settings and get values from data-*
    for (let setting in defaults) {
      if (setting in settings) {
        custom[setting] = settings[setting];
      } else if (this.element.getAttribute(`data-${setting}`)) {
        const attribute = this.element.getAttribute(`data-${setting}`);
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
}

// autoinit
if (typeof document !== 'undefined') {
  new UniversalTilt(document.querySelectorAll('[data-tilt]'));
}

// jQuery
let scope;

if (typeof window !== 'undefined')
 scope = window;
else if (typeof global !== 'undefined')
 scope = global;

if (scope && scope.jQuery) {
  const $ = scope.jQuery;

  $.fn.universalTilt = function(options) {
    new UniversalTilt(this, options);
  }
}

// AMD
if (typeof define === 'function' && define.amd) {
  define('UniversalTilt', [], function() {
    return UniversalTilt;
  });

// CommonJS
} else if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = UniversalTilt;
  }
  exports.default = UniversalTilt;
}
