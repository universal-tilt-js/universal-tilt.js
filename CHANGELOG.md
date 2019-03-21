# universal-tilt.js Changelog

### [CHANGELOG.md for v1 here](https://github.com/JB1905/universal-tilt.js/blob/v1/CHANGELOG.md)

## 2.0.1 / 2.0.2 / 2.0.3 (2019-03-21)
#### Bug Fix
- fixed CDN undefined bug

## 2.0.0 (2019-03-05)
#### Repository Changes
- moved Changelog for v1 to branch
- updated dependencies

## 2.0.0 beta 2 (2019-01-18)
#### Breaking Changes
- splitted `options` prop into `settings` and `methods`
- renamed option `position-base` to `base`

#### Repository Changes
- updated npm scripts
- cleaned up Webpack config
- removed unused dependencies

#### Bug Fix
- fixed `window is not defined`
- fixed `global` error (CDN)

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
