import $ from 'jquery';

import UniversalTilt from '../src';

describe('core functions', () => {
  document.body.innerHTML = `
    <div class="tilt" />
    <div class="tilt" />
    <div class="tilt" />
  `;

  const elements = document.querySelectorAll('.tilt') as any;

  test('shine', () => {
    UniversalTilt.init({
      elements,
      settings: {
        shine: true
      }
    });

    // Object.values(elements).map(element => {
    //   console.log(element);

    //   element.universalTilt.destroy();
    // });
  });

  test('reverse', () => {
    UniversalTilt.init({
      elements,
      settings: {
        reverse: true
      }
    });

    // Object.values(elements).map(element => {
    //   element.universalTilt.destroy();
    // });
  });

  test('element base', () => {
    UniversalTilt.init({
      elements,
      settings: {
        listener: window
      }
    });

    // Object.values(elements).map(element => {
    //   element.universalTilt.destroy();
    // });
  });
});

describe('single node', () => {
  document.body.innerHTML = `
    <div class="tilt" />
  `;

  const element = document.querySelector('.tilt') as any;

  test('init', () => {
    UniversalTilt.init({
      elements: element
    });
  });
});

describe('empty node', () => {
  test('init', () => {
    UniversalTilt.init();
  });
});
