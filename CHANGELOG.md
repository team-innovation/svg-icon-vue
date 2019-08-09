# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2019-08-09

### Added/Fixed
- Optimized SSR Builds
- Prevent SVGO from creating conflicting IDs
- Shorten/clean up module names output by require.context

### Changed
- Replace 'umd' build with CommonJS 'ssr' build
  - Browsers still get iife
  - Modern bundlers get esm
  - Node.JS/Legacy get ssr
  - Any scenarios not covered above can transpile esm or raw .vue files directly
- Update dependencies
  - @vue/eslint-config-airbnb - 4.0.1
  - babel-eslint - 10.0.2
  - eslint - 6.1.0
  - eslint-config-airbnb-base - 13.2.0
  - eslint-plugin-import - 2.18.2
  - eslint-plugin-vue - 5.2.3
  - raw-loader - 3.1.0
  - rollup - 1.19.4
  - rollup-plugin-buble - 0.19.8
  - rollup-plugin-commonjs - 10.0.2
  - rollup-plugin-modify - 3.0.0
  - rollup-plugin-node-resolve - 5.2.0
  - rollup-plugin-replace - 2.2.0
  - rollup-plugin-require-context - .0.0
  - rollup-plugin-terser - 5.1.1
  - rollup-plugin-vue - 5.0.1
  - svgo - 1.3.0
  - svgo-loader - 2.2.1
  - vue - 2.6.10
  - vue-template-compiler - 2.6.10

## [1.0.0] - 2019-03-06

### Added
- Initial release
