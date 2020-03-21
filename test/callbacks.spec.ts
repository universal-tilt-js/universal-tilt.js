import UniversalTilt from '../src';

describe('callbacks', () => {
  document.body.innerHTML = `
    <div class="tilt" />
    <div class="tilt" />
    <div class="tilt" />
  `;

  const elements = document.querySelectorAll('.tilt') as any;

  test('onInit', () => {
    let test = false;

    UniversalTilt.init({
      elements,
      callbacks: {
        onInit: () => (test = true)
      }
    });

    // Object.values(elements).map(element => {
    //   element.universalTilt.destroy();
    // });

    expect(test).toBe(true);
  });

  test('onDestroy', () => {
    let test = false;

    UniversalTilt.init({
      elements,
      callbacks: {
        onDestroy: () => {
          (test = true)}
      }
    });

    Object.values(elements).map(element => {
      // element.universalTilt.destroy();
    });

    expect(test).toBe(true);
  });
});
