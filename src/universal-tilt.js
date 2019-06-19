import platform from 'platform';

export default class UniversalTilt {
  constructor(element, settings = {}, callbacks = {}) {
    this.element = element;
    this.callbacks = callbacks;

    this.settings = this.extendSettings(settings);

    if (typeof this.callbacks.onInit === 'function') {
      this.callbacks.onInit(this.element);
    }

    this.reverse = this.settings.reverse ? -1 : 1;

    if (this.settings.shine) this.shine();

    this.element.style.transform = `perspective(${this.settings.perspective}px)`;

    this.addEventListeners();
  }

  isMobile() {
    return (
      window.DeviceMotionEvent && 'ontouchstart' in document.documentElement
    );
  }

  addEventListeners() {
    this.base = this.settings.base;

    if (
      !platform.name.match(this.settings.exclude) &&
      !platform.product?.match(this.settings.exclude)
    ) {
      if (this.isMobile() && this.settings.gyroscope) {
        window.addEventListener('devicemotion', this.onDeviceMove);
      } else {
        this.base.addEventListener('mouseenter', this.onMouseEnter);
        this.base.addEventListener('mousemove', this.onMouseMove);
        this.base.addEventListener('mouseleave', this.onMouseLeave);
      }
    }
  }

  removeEventListeners() {
    window.removeEventListener('devicemotion', this.onDeviceMove);
    this.base.removeEventListener('mouseenter', this.onMouseEnter);
    this.base.removeEventListener('mousemove', this.onMouseMove);
    this.base.removeEventListener('mouseleave', this.onMouseLeave);
  }

  destroy() {
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

  onMouseEnter = () => {
    this.updateElementPosition();
    this.transitions();

    if (typeof this.callbacks.onMouseEnter === 'function') {
      this.callbacks.onMouseEnter(this.element);
    }
  };

  onMouseMove = e => {
    if (this.updateCall !== null) cancelAnimationFrame(this.updateCall);

    this.event = e;

    this.updateElementPosition();
    this.updateCall = requestAnimationFrame(() => this.update());

    if (typeof this.callbacks.onMouseMove === 'function') {
      this.callbacks.onMouseMove(this.element);
    }
  };

  onMouseLeave = () => {
    this.transitions();
    requestAnimationFrame(() => this.reset());

    if (typeof this.callbacks.onMouseLeave === 'function') {
      this.callbacks.onMouseLeave(this.element);
    }
  };

  onDeviceMove = e => {
    this.event = e;

    this.update();
    this.updateElementPosition();
    this.transitions();

    if (typeof this.callbacks.onDeviceMove === 'function') {
      this.callbacks.onDeviceMove(this.element);
    }
  };

  reset() {
    this.event = {
      pageX: this.left + this.width / 2,
      pageY: this.top + this.height / 2
    };

    if (this.settings.reset) {
      this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(${this.settings.startX}deg) rotateY(${this.settings.startY}deg) scale3d(1, 1, 1)`;
    }

    if (this.settings.shine && !this.settings['shine-save']) {
      Object.assign(this.shineElement.style, {
        transform: 'rotate(180deg) translate3d(-50%, -50%, 0)',
        opacity: '0'
      });
    }
  }

  getValues() {
    let x, y;

    if (this.isMobile()) {
      x = this.event.accelerationIncludingGravity.x / 4;
      y = this.event.accelerationIncludingGravity.y / 4;

      let stateX, stateY;

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
    } else {
      x = (this.event.clientX - this.left) / this.width;
      y = (this.event.clientY - this.top) / this.height;
    }

    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    const tiltX = (this.settings.max / 2 - x * this.settings.max).toFixed(2);
    const tiltY = (y * this.settings.max - this.settings.max / 2).toFixed(2);

    const angle = Math.atan2(x - 0.5, 0.5 - y) * (180 / Math.PI);

    return {
      tiltX: this.reverse * tiltX,
      tiltY: this.reverse * tiltY,
      angle
    };
  }

  updateElementPosition() {
    this.width = this.base.offsetWidth || this.base.innerWidth;
    this.height = this.base.offsetHeight || this.base.innerWidth;

    if (this.base.getBoundingClientRect) {
      const rect = this.base.getBoundingClientRect();

      this.left = rect.left;
      this.top = rect.top;
    } else {
      this.left = 0;
      this.top = 0;
    }
  }

  update() {
    const values = this.getValues();

    this.element.style.transform = `perspective(${this.settings.perspective}px)
      rotateX(${
        this.settings.disabled && this.settings.disabled.toUpperCase() === 'X'
          ? 0
          : values.tiltY
      }deg)
      rotateY(${
        this.settings.disabled && this.settings.disabled.toUpperCase() === 'Y'
          ? 0
          : values.tiltX
      }deg)
      scale3d(${this.settings.scale}, ${this.settings.scale}, ${
      this.settings.scale
    })`;

    if (this.settings.shine) {
      Object.assign(this.shineElement.style, {
        transform: `rotate(${values.angle}deg) translate3d(-50%, -50%, 0)`,
        opacity: `${this.settings['shine-opacity']}`
      });
    }

    this.element.dispatchEvent(
      new CustomEvent('tiltChange', {
        detail: values
      })
    );

    this.updateCall = null;
  }

  shine() {
    const shineOuter = document.createElement('div');
    const shineInner = document.createElement('div');

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
      'background-image': `radial-gradient(circle at top center, rgba(252,253,255,1) 20%,rgba(255,255,255,0) 60%)`,
      width: `${this.element.offsetWidth * 2}px`,
      height: `${this.element.offsetWidth * 2}px`,
      transform: 'rotate(180deg) translate3d(-50%, -50%, 0)',
      'transform-origin': '0% 0%',
      opacity: '0'
    });
  }

  transitions() {
    clearTimeout(this.timeout);

    this.element.style.transition = `all ${this.settings.speed}ms ${this.settings.easing}`;

    if (this.settings.shine) {
      this.shineElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
    }

    this.timeout = setTimeout(() => {
      this.element.style.transition = '';
      if (this.settings.shine) this.shineElement.style.transition = '';
    }, this.settings.speed);
  }

  extendSettings(settings) {
    const defaultSettings = {
      base: this.element, // DOM element
      disabled: null, // disable axis (X or Y)
      easing: 'cubic-bezier(.03, .98, .52, .99)', // transition easing
      exclude: null, // enable/disable tilt effect on selected user agents
      gyroscope: true, // enable/disable gyroscope control on mobile devices
      max: 35, // max tilt value
      perspective: 1000, // tilt effect perspective
      reset: true, // enable/disable element position reset after mouseout
      reverse: false, // reverse tilt effect directory
      scale: 1.0, // element scale on mouseover
      shine: false, // add/remove shine effect on mouseover
      'shine-opacity': 0, // shine opacity (0-1) (shine value must be true)
      'shine-save': false, // save/reset shine effect on mouseout (shine value must be true)
      speed: 300, // transition speed
      startX: 0, // startup X axis value
      startY: 0 // startup Y axis value
    };

    const newSettings = {};

    for (const property in defaultSettings) {
      if (property in settings) {
        newSettings[property] = settings[property];
      } else if (this.element.getAttribute(`data-${property}`)) {
        const attribute = this.element.getAttribute(`data-${property}`);

        try {
          newSettings[property] = JSON.parse(attribute);
        } catch {
          newSettings[property] = attribute;
        }
      } else {
        newSettings[property] = defaultSettings[property];
      }
    }

    return newSettings;
  }

  static init(data = {}) {
    let { elements, settings, callbacks } = data;

    if (elements instanceof Node) elements = [elements];
    if (elements instanceof NodeList) elements = [].slice.call(elements);

    for (const element of elements) {
      if (!('universalTilt' in element)) {
        return (element.universalTilt = new UniversalTilt(
          element,
          settings,
          callbacks
        ));
      }
    }
  }
}

if (typeof document !== 'undefined') {
  window.UniversalTilt = UniversalTilt;

  const elements = document.querySelectorAll('[data-tilt]');

  elements.length && UniversalTilt.init({ elements });
}

if (window.jQuery) {
  const $ = window.jQuery;

  $.fn.universalTilt = function(data = {}) {
    return UniversalTilt.init({
      elements: this,
      settings: data.settings || {},
      callbacks: data.callbacks || {}
    });
  };
}
