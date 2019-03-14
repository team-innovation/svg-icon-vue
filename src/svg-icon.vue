<script>
/* global require */
import lz from 'lz-string';

// Create context to load all svg icon files - https://webpack.js.org/guides/dependency-management/#require-context
const requireSVG = require.context('./icons', true, /.*\.svg$/);

// Extract svg contents from svg icon files...
const icons = {};
requireSVG.keys().forEach((fileName) => {
	// Get the svg contents
	const svg = requireSVG(fileName);
	const name = fileName.toLowerCase().replace(/^.*\/(.*).svg$/, '$1');
	const decompressed = lz.decompressFromBase64(svg);
	if (svg && decompressed) {
		const svgData = JSON.parse(decompressed);
		icons[name] = {
			viewBox: svgData.viewBox ? svgData.viewBox : '0 0 32 32', // Default viewbox
			content: svgData.content.replace(/\\"/g, '"'), // Remove escaping from quotes
		};
	}
});

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
	},
};
</script>

<template>
	<svg xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:viewBox="icons[name].viewBox"
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
