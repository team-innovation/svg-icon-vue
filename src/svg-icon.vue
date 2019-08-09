<script>
import lz from 'lz-string';

// Create context to load all svg icon files - https://webpack.js.org/guides/dependency-management/#require-context
const requireSVG = require.context('./icons', true, /.*\.svg$/);

// Extract svg contents from svg icon files...
const icons = {};
requireSVG.keys()
	.forEach((fileName) => {
		// Get the svg contents
		const svg = requireSVG(fileName);
		const name = fileName.toLowerCase()
			.replace(/^.*\/(.*).svg$/, '$1');
		// Depending on bundler, requireSVG could return string or module with string as 'default'.
		// Decompress proper string based on requireSVG return value
		const decompressed = svg ? lz.decompressFromBase64(svg.default ? svg.default : svg) : null;
		if (decompressed) {
			const svgData = JSON.parse(decompressed);
			icons[name] = {
				viewBox: svgData.viewBox,
				content: svgData.content.replace(/\\"/g, '"'), // Remove escaping from quotes
			};
		}
	});

export const iconList = Object.keys(icons).sort();

export default {
	name: 'SvgIcon', // vue component name
	props: {
		name: {
			type: String,
		},
		size: {
			type: [Number, String, Array],
			default: 32,
		},
		color: {
			type: String,
			default: 'currentColor',
		},
	},
	data() {
		return {
			icons,
		};
	},
	computed: {
		width() {
			if (Array.isArray(this.size)) return this.size[0];
			return this.size;
		},
		height() {
			if (Array.isArray(this.size)) return (this.size.length > 1) ? this.size[1] : this.size[0];
			return this.size;
		},
		viewBox() {
			// Return attrs viewbox if passed
			if (this.$attrs.viewBox) return this.$attrs.viewBox;

			// Return icon viewbox if found
			const iconData = this.icons[this.name];
			if (iconData && iconData.viewBox) return iconData.viewBox;

			// If icons/attrs aren't found, return default
			return '0 0 32 32';
		},
	},
};
</script>

<template>
	<svg xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:viewBox="viewBox"
		:aria-labelledby="name"
		role="presentation"
		class="svg-icon"
	>
		<title
			:id="`${name}-icon`"
			lang="en"
		>{{ name }} icon</title>
		<g
			v-if="icons[name]"
			:fill="color"
			v-html="icons[name].content"
		/>
		<g v-else :fill="color">
			<slot />
		</g>
	</svg>
</template>

<style scoped>
.svg-icon {
	display: inline-block;
	vertical-align: middle;
}
</style>
