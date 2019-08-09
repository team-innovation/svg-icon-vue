const prefixes = {};

module.exports = {
	plugins: [
		{ removeViewBox: false },
		{ removeTitle: true },
		{ removeDimensions: true },
		{ removeXMLNS: true },
		{ removeComments: true },
		{
			prefixIds: {
				prefix(_el, filepath) {
					const { path } = filepath;
					if (!prefixes[path]) {
						prefixes[path] = Object.keys(prefixes).length;
					}
					return `svg-${prefixes[path]}`;
				},
			},
		},
		{
			convertPathData: {
				floatPrecision: 4,
			},
		},
	],
};
