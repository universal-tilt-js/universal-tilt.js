# universal-tilt.js Changelog

## Next
#### Bug Fix
- fix animation performance

## 2.0.0 beta 2 (Soon)
#### Breaking Changes
- splitted `options` prop into `settings` and `methods`
- renamed option `position-base` to `base`

#### Repository Changes
- updated npm scripts
- cleaned up Webpack config
- removed unused dependencies

#### Bug Fix
## 2.0.0 beta 1 (2018-12-10)
#### New Feature
- added destroy method
- added new callbacks: `onInit`, `onDestroy`

#### Breaking Changes
- improved plugin init process

#### Internal
- renamed method `settings()` to `extendSettings()` to avoid conflict with variable `settings`

#### Repository Changes
- added Travis CI config
- added Prettier config
- added ESLint config

## 1.2.1 (2018-11-11)
#### Bug Fix
- fixed bug with `window` global variable in Node.js

## 1.2.0 beta 1 / 1.2.0 (2018-10-15)
#### Breaking Changes
- replaced `mobile` option with `exclude` (disable tilt effect on selected user agents)

#### Bug Fix
- fixed bug with tilt effect on devices with gyroscope

## 1.1.1 (2018-09-04)
#### Documentation
- updated README.md

## 1.1.1 beta 1 (2018-09-02)
#### Dependencies
- updated Babel to `^7.0.0` stable
- updated babel-plugin-add-module-exports to `^0.3.3`
- updated Webpack to `^4.17.1`
- updated babel-loader to `^8.0.0` stable

#### Repository Changes
- removed map for production version

## 1.1.0 (2018-07-16)
#### Repository Changes
- switched from Gulp to Webpack
- updated Babel to v7
- only 2 dist version
- changed main file from universal-tilt.js to universal-tilt.min.js
- moved demo to gh-pages branch

## 1.0.7 (2018-07-06)
#### Documentation
- updated README.md

#### More
- Internal updates & improvements

## 1.0.6 (2018-04-30)
#### Improvement
- improved events performance

## 1.0.5 (2018-04-14)
#### Bug Fix
- fixed bug with jQuery and Node.js compatibility

## 1.0.3 (2018-04-14)
#### Bug Fix
- fixed bug with autoinit in Node.js

## 1.0.1 (2018-04-14)
#### New Feature
- added mobile option (enable or disable tilt effect on mobile devices)

## 1.0.0 (2018-04-01)
#### Bug Fix
- fixed bug with callbacks (when value is `null`)

## 1.0.0 beta 3 (2018-03-29)
#### New Feature
- added callbacks on mouse enter, move, leave and device move

## 1.0.0 beta 2 (2018-03-15)
#### New Feature
- added autoinit

#### Bug Fix
- fixed performance of shine effect
- fixed performance on mobile devices

## 1.0.0 beta 1 (2018-03-03)
#### New Feature
- npm added
- AMD & CommonJS support added

#### Change
- renamed jQuery plugin from UniversalTilt() to universalTilt()

## 0.5.0 (2018-01-26)
#### New Feature
- Position Base option
- mobile support (devices with gyroscope)
