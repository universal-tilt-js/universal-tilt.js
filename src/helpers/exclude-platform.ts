import platform from 'platform';

export const excludePlatform = (exclude: RegExp) => {
  return platform.name?.match(exclude) || platform.product?.match(exclude);
};
