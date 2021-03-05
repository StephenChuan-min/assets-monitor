"use strict";
const fs = require('fs');

const toBase64 = (fileName, size) => 'data:image/png;base64,' +
	new Buffer.alloc(size, fs.readFileSync( __dirname + '/' + fileName )).toString('base64');

const bgImgData = toBase64('watermark.png', 65 * 1024);
const zgBgImgData = toBase64('zhongguanpdfbg.png', 65 * 1024);
const deIconData = toBase64('debtor.png', 2 * 1024);
const personData = toBase64('person.png', 2 * 1024);
const businessData = toBase64('business.png', 2 * 1024);
const disIconData = toBase64('icon_shixin.png', 4 * 1024);
const disEdIconData = toBase64('icon_dishonest_ed.png', 4 * 1024);
const accurateImgData = toBase64('icon-accurate.png', 3 * 1024);

module.exports = {
	bgImgData,
	deIconData,
	personData,
	businessData,
	disIconData,
	disEdIconData,
	accurateImgData,
	zgBgImgData,
};
