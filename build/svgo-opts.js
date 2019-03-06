module.exports = {
	plugins: [
		{ removeViewBox: false },
		{ removeTitle: true },
		{ removeDimensions: true },
		{ removeXMLNS: true },
		{ removeComments: true },
		{
			convertPathData: {
				floatPrecision: 4,
			},
		},
	],
};
