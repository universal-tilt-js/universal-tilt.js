export const isMobile = () => {
  return window.DeviceMotionEvent && 'ontouchstart' in document.documentElement;
};
