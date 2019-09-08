import platform from 'platform';

export const excludePlatform = (exclude: RegExp) => {
  return (
    (platform.name && platform.name.match(exclude)) ||
    (platform.product && platform.product.match(exclude))
  );
};
