const lz = require('lz-string');

module.exports = function stripSVG(source) {
	// wrap in single quotes instead of double quotes - requires unescaping
	let newsrc = source
		.replace(/export default "(.*)"/gi, '$1')
		.replace(/\\"/g, '"');
	newsrc = newsrc
		.replace(/<svg[^><]*>(.*)<.svg>/gi, '$1');
	return lz.compressToBase64(newsrc);
};
