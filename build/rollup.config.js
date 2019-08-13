// rollup.config.js
import path from 'path';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import requireContext from 'rollup-plugin-require-context';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { string as rollupString } from 'rollup-plugin-string';
import modify from 'rollup-plugin-modify';
import minimist from 'minimist';

const svgo = require('./rollup-plugin-svgo-with-path');
const svgoOpts = require('./svgo-opts');
const stripSvg = require('./strip-svg-loader');

const argv = minimist(process.argv.slice(2));

const baseConfig = {
	input: 'src/entry.js',
	plugins: {
		preVue: [
			// Optimize svg files
			svgo(svgoOpts),
			// Convert optimized svg to json with viewbox/paths
			((_options) => ({ // eslint-disable-line no-unused-vars
				name: 'stripSVG',
				transform(code, id) {
					if (!id.endsWith('.svg')) return null;
					return {
						map: { mappings: '' },
						code: stripSvg(code),
					};
				},
			}))(),
			// Import svg icons as strings
			rollupString({
				include: '**/src/icons/*.svg',
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			commonjs(),
		],
		vue: {
			css: true,
			template: {
				isProduction: true,
			},
		},
		postVue: [
			requireContext(),
			resolve(),
			modify({
				find: path.resolve(__dirname, '../src'),
				replace: '.',
			}),
			buble(),
		],
	},
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
	const esConfig = {
		...baseConfig,
		output: {
			file: 'dist/svg-icon.esm.js',
			format: 'esm',
			banner: '/* eslint-disable */', // Disable eslint in dist files
		},
		plugins: [
			...baseConfig.plugins.preVue,
			vue(baseConfig.plugins.vue),
			...baseConfig.plugins.postVue,
		],
	};
	buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
	const cjsConfig = {
		...baseConfig,
		output: {
			compact: true,
			file: 'dist/svg-icon.ssr.js',
			format: 'cjs',
			banner: '/* eslint-disable */', // Disable eslint in dist files
			name: 'SvgIcon',
			exports: 'named',
		},
		plugins: [
			...baseConfig.plugins.preVue,
			vue({
				...baseConfig.plugins.vue,
				template: {
					...baseConfig.plugins.vue.template,
					optimizeSSR: true,
				},
			}),
			...baseConfig.plugins.postVue,
		],
	};
	buildFormats.push(cjsConfig);
}

if (!argv.format || argv.format === 'iife') {
	const unpkgConfig = {
		...baseConfig,
		output: {
			compact: true,
			file: 'dist/svg-icon.min.js',
			format: 'iife',
			name: 'SvgIcon',
			exports: 'named',
		},
		plugins: [
			...baseConfig.plugins.preVue,
			vue(baseConfig.plugins.vue),
			...baseConfig.plugins.postVue,
			terser({
				output: {
					ecma: 5,
				},
			}),
		],
	};
	buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
