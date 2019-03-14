const lz = require('lz-string');

module.exports = function stripSVG(source) {
	// wrap in single quotes instead of double quotes - requires unescaping
	const newsrc = source
		.replace(/export default "(.*)"/gi, '$1')
		.replace(/\\"/g, '"');
	const found = newsrc.match(/<svg\b(?:(?=(\s+(?:viewBox="([^"]*)")|[^\s>]+|\s+))\1)*>(.*)<.svg>/i);
	const jsonData = JSON.stringify({
		viewBox: found[2],
		content: found[3],
	});
	return lz.compressToBase64(jsonData);
};
