var fs =require('fs');
var cleanCSS = require('clean-css');
var minify = require('html-minifier').minify;
var UglifyJS = require("uglify-js");
var methods = require("./db-dev");

const minifyCss = new cleanCSS().minify(methods.cssResult);
let htmlResult = methods.htmlResultStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g, `<style>${minifyCss.styles}</style>`);

var html =minify(htmlResult, {
	processScripts: ['text/html'],
	collapseWhitespace: true,
	minifyJS: {
		compress: {
			warnings: false,
			drop_debugger: true,
			drop_console: true
		}
	},
	minifyCSS: true,
	removeComments: true, //删除注释
	removeCommentsFromCDATA: true,
});

var htmlCover =minify(methods.htmlCoverStr, {
	processScripts: ['text/html'],
	collapseWhitespace: true,
	minifyJS: {
		compress: {
			warnings: false,
			drop_debugger: true,
			drop_console: true
		}
	},
	minifyCSS: true,
	removeComments: true, //删除注释
	removeCommentsFromCDATA: true,
});
// bgImgData, deIconData, disIconData, disEdIconData
const resultCode = `"use strict";

var htmlCover = ${JSON.stringify(htmlCover)};
var htmlResult = ${JSON.stringify(html)};

var bgImgData= "${methods.bgImgData}";
var deIconData= "${methods.deIconData}";
var personData= "${methods.personData}";
var businessData= "${methods.businessData}";
var disIconData= "${methods.disIconData}";
var disEdIconData= "${methods.disEdIconData}";
var accurateImgData= "${methods.accurateImgData}";

${methods.exportCover}
${methods.exportTemplate}`;

fs.writeFileSync("./template/result/db/downloadDetail.js",resultCode);
fs.writeFileSync("./template/result/db/downloadDetail.min.js",UglifyJS.minify(resultCode).code);
