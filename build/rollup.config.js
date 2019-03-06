// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import requireContext from 'rollup-plugin-require-context';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { string as rollupString } from 'rollup-plugin-string';
import svgo from 'rollup-plugin-svgo';
import minimist from 'minimist';

const svgoOpts = require('./svgo-opts');
const stripSvg = require('./strip-svg-loader');

const argv = minimist(process.argv.slice(2));

const baseConfig = {
	input: 'src/entry.js',
	plugins: [
		// Optimize svg files
		svgo(svgoOpts),
		// Strip svg tag, only path is used
		(_options => ({ // eslint-disable-line no-unused-vars
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
		vue({
			css: true,
			compileTemplate: true,
			template: {
				isProduction: true,
			},
		}),
		requireContext(),
		resolve(),
		buble(),
	],
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
	const esConfig = {
		...baseConfig,
		output: {
			file: 'dist/svg-icon.esm.js',
			format: 'esm',
			exports: 'named',
			banner: '/* eslint-disable */', // Disable eslint in minified prod files
		},
		plugins: [
			...baseConfig.plugins,
			terser({
				output: {
					ecma: 6,
					comments: (node, comment) => {
						// Keep eslint disable comment at top
						return (comment.value === ' eslint-disable ');
					},
				},
			}),
		],
	};
	buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'umd') {
	const umdConfig = {
		...baseConfig,
		output: {
			compact: true,
			file: 'dist/svg-icon.umd.js',
			format: 'umd',
			name: 'SvgIcon',
			exports: 'named',
		},
		plugins: [
			...baseConfig.plugins,
			terser({
				output: {
					ecma: 6,
				},
			}),
		],
	};
	buildFormats.push(umdConfig);
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
			...baseConfig.plugins,
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
