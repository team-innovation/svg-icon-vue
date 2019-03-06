const path = require('path');
const svgoOpts = require('./build/svgo-opts');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	lintOnSave: process.env.NODE_ENV !== 'production',
	chainWebpack: (config) => {
		// Look for custom loaders in build directory
		config.resolveLoader.modules.add(resolve('build'));

		// Get path to icons
		const iconDir = resolve('src/icons');

		// Exclude icons from standard svg processing
		config.module.rule('svg')
			.exclude.add(iconDir)
			.end();

		// Add new rule to process icons separately
		config.module.rule('svg-icon')
			.test(/\**\/.*\.svg/)
			.include.add(iconDir)
			.end()

			// Load these svg files as raw text
			.use('raw-loader')
			.loader('raw-loader')
			.end()

			// Unwrap SVG returned by svgo, only paths are required
			.use('strip-svg-loader')
			.loader('strip-svg-loader')
			.end()

			// Optimize svg files
			.use('svgo-loader')
			.loader('svgo-loader')
			.options(svgoOpts)
			.end();
	},
};
