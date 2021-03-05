const fs =require('fs');
const path = require('path');
const cleanCSS = require('clean-css');
const minify = require('html-minifier').minify;
const UglifyJS = require("uglify-js");
const { exportCover, exportTemplate } = require("./dev");
const { cssResult,htmlResultStr,htmlCoverStr } = require('../src/str');

const imgData = require('../../_assets/img/index');
const { zgBgImgData, bgImgData, deIconData,	personData,	businessData,	disIconData,	disEdIconData,	accurateImgData } = imgData;

const root = path.resolve(__dirname,'../dist');

const minifyCss = new cleanCSS().minify(cssResult);
let htmlResult = htmlResultStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g, `<style>${minifyCss.styles}</style>`);

const html = minify(htmlResult, {
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

const htmlCover =minify(htmlCoverStr, {
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

var bgImgData= "${bgImgData}";
var zgBgImgData = "${zgBgImgData}";
var deIconData= "${deIconData}";
var personData= "${personData}";
var businessData= "${businessData}";
var disIconData= "${disIconData}";
var disEdIconData= "${disEdIconData}";
var accurateImgData= "${accurateImgData}";

${exportCover}
${exportTemplate}`;

fs.writeFileSync(root+"/downloadDetail.js",resultCode);
fs.writeFileSync(root+"/downloadDetail.min.js",UglifyJS.minify(resultCode).code);
