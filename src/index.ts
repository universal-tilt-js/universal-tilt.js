import type { Settings, Callbacks, Options } from './types';

import { defaultSettings } from './defaults';

import { isMobile, excludePlatform } from './helpers';

declare global {
  interface Window {
    UniversalTilt: any;
    jQuery: any;
  }

  interface HTMLElement {
    universalTilt: any;
  }
}

export default class UniversalTilt {
  private element: HTMLElement;
  private settings: Settings;
  private callbacks: Callbacks;

  private reverse?: number;
  private listener?: HTMLElement | Window;
  private updateCall: any;

  private timeout?: number;
  private event: any;

  private left?: number;
  private top?: number;

  private shineWrapper?: HTMLElement;
  private shineElement?: HTMLElement;

  private width?: number;
  private height?: number;

  private x?: number;
  private y?: number;

  private axis?: 'X' | 'Y';

  constructor(
    element: HTMLElement,
    settings = {} as Settings,
    callbacks = {} as Callbacks
  ) {
    this.element = element;
    this.settings = this.extendSettings(settings);
    this.callbacks = callbacks;

    if (typeof this.callbacks.onInit === 'function') {
      this.callbacks.onInit(this.element);
    }

    this.reverse = this.settings.reverse ? -1 : 1;

    if (this.settings.shine) {
      this.prepareShine();
    }

    this.addEventListeners();
  }

  public async enableMovementAccess() {
    return await window.DeviceMotionEvent.requestPermission();
  }

  private getElementListener() {
    if (typeof this.settings.listener === 'string') {
      const listener = document.querySelector(this.settings.listener);

      if (listener) {
        return listener;
      }
    } else if (
      this.settings.listener instanceof HTMLElement ||
      this.settings.listener instanceof Window
    ) {
      return this.settings.listener;
    }
  }

  private async addEventListeners() {
    this.listener = this.getElementListener();

    if (!excludePlatform(this.settings.exclude)) {
      if (isMobile() && this.settings.gyroscope) {
        const permission = await this.enableMovementAccess();

        if (permission === 'granted') {
          window.addEventListener(
            'deviceorientation',
            this.onDeviceOrientation
          );
        }
      } else {
        this.listener.addEventListener('mouseenter', this.onMouseEnter);
        this.listener.addEventListener('mousemove', this.onMouseMove);
        this.listener.addEventListener('mouseleave', this.onMouseLeave);
      }
    }
  }

  private removeEventListeners() {
    this.listener.removeEventListener('mouseenter', this.onMouseEnter);
    this.listener.removeEventListener('mousemove', this.onMouseMove);
    this.listener.removeEventListener('mouseleave', this.onMouseLeave);

    if (this.settings.gyroscope) {
      window.removeEventListener('deviceorientation', this.onDeviceOrientation);
    }
  }

  public destroy() {
    clearTimeout(this.timeout);

    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    if (typeof this.callbacks.onDestroy === 'function') {
      this.callbacks.onDestroy(this.element);
    }

    this.reset();

    this.removeEventListeners();
    this.element.universalTilt = null;
    delete this.element.universalTilt;

    // this.element = null;
  }

  private onDeviceOrientation = (e: DeviceOrientationEvent) => {
    this.event = e;

    this.update();
    this.updateElementPosition();
    this.setTransition();

    if (typeof this.callbacks.onDeviceOrientation === 'function') {
      this.callbacks.onDeviceOrientation(this.element);
    }
  };

  private onMouseEnter = () => {
    this.updateElementPosition();
    this.setTransition();

    if (typeof this.callbacks.onMouseEnter === 'function') {
      this.callbacks.onMouseEnter(this.element);
    }
  };

  private onMouseMove = (e: any) => {
    if (this.updateCall !== null) cancelAnimationFrame(this.updateCall);

    this.event = e;

    this.updateElementPosition();
    this.updateCall = requestAnimationFrame(() => this.update());

    if (typeof this.callbacks.onMouseMove === 'function') {
      this.callbacks.onMouseMove(this.element);
    }
  };

  private onMouseLeave = () => {
    this.setTransition();
    requestAnimationFrame(() => this.reset());

    if (typeof this.callbacks.onMouseLeave === 'function') {
      this.callbacks.onMouseLeave(this.element);
    }
  };

  public reset() {
    this.event = {
      pageX: this.left + this.width / 2,
      pageY: this.top + this.height / 2,
    };

    const perspective = `perspective(${this.settings.perspective}px)`;
    const rotateX = `rotateX(${this.settings.startX}deg)`;
    const rotateY = `rotateY(${this.settings.startY}deg)`;
    const scale3d = 'scale3d(1, 1, 1)';

    if (this.settings.reset) {
      this.element.style.transform = `${perspective} ${rotateX} ${rotateY} ${scale3d}`;
    }

    this.resetShine();
  }

  private resetShine() {
    if (this.settings.shine && !this.settings['shine-save']) {
      Object.assign(this.shineElement.style, {
        transform: 'rotate(180deg) translate3d(-50%, -50%, 0)',
        opacity: 0,
      });
    }
  }

  private updateInitialPosition() {
    if (this.settings.startX === 0 && this.settings.startY === 0) {
      return;
    }

    this.onMouseEnter();

    // if (this.listener instanceof Window) {
    //   this.event = {
    //     clientX: (this.settings.startX! + this.settings.max!) / (2 * this.settings.max!) * this.element.clientWidth,
    //     clientY: (this.settings.startY! + this.settings.max!) / (2 * this.settings.max!) * this.element.clientHeight
    //   }
    // } else if (this.listener instanceof HTMLElement) {
    // this.event = {
    //   clientX: this.element.left + ((this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.element.width),
    //   clientY: this.element.top + ((this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.element.height)
    // };
    // }
  }

  public getValues() {
    let x: number;
    let y: number;

    x = this.event.clientX / this.element.clientWidth;
    y = this.event.clientY / this.element.clientHeight;

    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    // console.log(this.settings.max!, x!, this.settings.max!);

    const tiltX = (
      this.reverse *
      (this.settings.max / 2 - x * this.settings.max)
    ).toFixed(2);

    const tiltY = (
      this.reverse *
      (y * this.settings.max - this.settings.max / 2)
    ).toFixed(2);

    const angle = Math.atan2(x - 0.5, 0.5 - y) * (180 / Math.PI);

    return {
      tiltX,
      tiltY,
      percentageX: x * 100,
      percentageY: y * 100,
      angle,
    };
  }

  private updateElementPosition() {
    this.width =
      this.listener instanceof Window
        ? this.listener.innerWidth
        : this.listener.offsetWidth;

    this.height =
      this.listener instanceof Window
        ? this.listener.innerWidth
        : this.listener.offsetHeight;

    if (this.listener instanceof HTMLElement) {
      const rect = this.listener.getBoundingClientRect();

      this.left = rect.left;
      this.top = rect.top;
    } else {
      this.left = 0;
      this.top = 0;
    }
  }

  private update() {
    const values = this.getValues();

    // console.log(values.tiltY);

    const perspective = `perspective(${this.settings.perspective}px)`;

    const rotateX = `rotateX(${
      this.settings.axis?.toUpperCase() === 'X' ? 0 : values.tiltY
    }deg)`;

    const rotateY = `rotateY(${
      this.settings.axis?.toUpperCase() === 'Y' ? 0 : values.tiltX
    }deg)`;

    const scale3d = `scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`;

    this.element.style.transform = `${perspective} ${rotateX} ${rotateY} ${scale3d}`;

    if (this.settings.shine) {
      Object.assign(this.shineElement.style, {
        transform: `rotate(${values.angle}deg) translate3d(-50%, -50%, 0)`,
        opacity: `${this.settings['shine-opacity']}`,
      });
    }

    this.element.dispatchEvent(
      new CustomEvent('tiltChange', {
        detail: values,
      })
    );

    this.updateCall = null;
  }

  public setValues(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private prepareShine() {
    if (!this.settings['shine-prerender']) {
      const shineOuter = document.createElement('div');
      const shineInner = document.createElement('div');

      shineOuter.classList.add('shine');
      shineInner.classList.add('shine-inner');

      shineOuter.appendChild(shineInner);
      this.element.appendChild(shineOuter);
    }

    this.shineWrapper = this.element.querySelector('.shine') as HTMLElement;
    this.shineElement = this.element.querySelector(
      '.shine-inner'
    ) as HTMLElement;

    if (this.settings['shine-prerender']) {
      return;
    }

    Object.assign(this.shineWrapper.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    });

    Object.assign(this.shineElement.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      pointerEvents: 'none',
      backgroundImage: `radial-gradient(circle at top center, rgba(252, 253, 255, 1) 20%, rgba(255, 255, 255, 0) 60%)`,
      width: `${this.element.offsetWidth * 2}px`,
      height: `${this.element.offsetWidth * 2}px`,
      transform: 'rotate(180deg) translate3d(-50%, -50%, 0)',
      transformOrigin: '0% 0%',
      opacity: '0',
    });
  }

  private setTransition() {
    clearTimeout(this.timeout);

    this.element.style.transition = `${this.settings.speed}ms ${this.settings.easing}`;

    if (this.settings.shine) {
      this.shineElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
    }

    this.timeout = setTimeout(() => {
      this.element.style.transition = '';

      if (this.settings.shine) {
        this.shineElement.style.transition = '';
      }
    }, this.settings.speed) as any;
  }

  private extendSettings(settings: Settings): Settings {
    const newSettings = {} as any;

    let property: keyof Settings;

    for (property in defaultSettings) {
      if (property in settings) {
        newSettings[property] = settings[property];
      } else if (this.element.getAttribute(`data-tilt-${property}`)) {
        const attribute = this.element.getAttribute(
          `data-tilt-${property}`
        ) as string;

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

  public static init(data = {} as Options) {
    let { elements, settings, callbacks } = data;

    if (elements instanceof Node) {
      elements = [elements];
    }

    if (elements instanceof NodeList) {
      elements = [...elements] as HTMLElement[];
    }

    if (!(elements instanceof Array)) {
      return;
    }

    for (const element of elements) {
      if (!('universalTilt' in element)) {
        return ((element as HTMLElement).universalTilt = new UniversalTilt(
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

  if (elements.length) {
    UniversalTilt.init({ elements } as any);
  }
}

if (window.jQuery) {
  const $ = window.jQuery;

  $.fn.universalTilt = function (data = {} as Options) {
    return UniversalTilt.init({
      elements: this,
      settings: data.settings || ({} as Settings),
      callbacks: data.callbacks || ({} as Callbacks),
    });
  };
}
