var fs = require('fs');
const path = require('path');
var cleanCSS = require('clean-css');
var minify = require('html-minifier').minify;
var UglifyJS = require("uglify-js");
const { exportCover, exportTemplate } = require("./dev");
const { cssResult, htmlEnterpriseStr, htmlPersonalStr, htmlCoverStr } = require('../src/str');
const imgData = require('../../_assets/img/index');
const { zgBgImgData,bgImgData, deIconData,	personData,	businessData,	disIconData,	disEdIconData,	accurateImgData } = imgData;
const root = path.resolve(__dirname,'../dist');

// 转换为 data:image/jpeg;base64,***** 格式的字符串
const defaultIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAA+xJREFUeAHtndtO20AQQMeXJISLAAFNkYBCkfpSVZV46De0P9KP6n/0tR9QXkrV0gfUC20aWkWkpBBIcGx3xsTgbnHi1cbejTqDrN3ZnbHXx2PvxRaxjtrhs9CHFwCwhhtLdgJ1y4HnVqMVfkMfhpcdXNKyTgDDZAnn5QjYcuZsLRJggCIRSZ0BSgITzRmgSERSZ4CSwERzBigSkdQZoCQw0ZwBikQkdQYoCUw0Z4AiEUmdAUoCE80ZoEhEUmeAksBEcwYoEpHUGaAkMNGcAYpEJHUGKAlMNGeAIhFJnQFKAhPNXbEgL333oAv1Zh9C/AvwIPQmJt6C6K0M1mBK+bg8SsljUBbXra+48HRnJq+mSu23MIBvPvUIm1Tj0oy/Nb20qsLLCwMYw7u/UgJrcJrWIBMlA8UiyFhAZXF5lA70/aPLwiENO2CBAK+aMVWKcaQ1a1R9mp+ecu5EFLkzQEWAhd/CyfZ+Pvbg9IL65HSZq9qwtVRKN9BcY3wEWuPpuHPDrDUCTY6srMSNj8CsJ6LLjgEqkmeADFCRgKK71k6EhzGKVy+LOw9jhlBSGca83O3AwowNC7NOlC5iOl0pfh6t9RYewnZkVaPlQaP1t1nJtRDmFdCtu2W4h+uGecvE9sIbSy7U5h1YRGAUeY5tgdcPodnuw0HjEl7tdfJmF+0//0uU02nMVmyYrcQ7d6KMj0vWPVxr/YJz7L5fzBxwYgHG6JIpReH0NdRkTX55IwD2MXLef+/Br9OA3oDA/LQDD9cqUMFnmulixDOQ4DXbPhBIH1e3Wmc+7H3tms4uap92gPTG7fjU/wfW7/MAetgpmC7aAVLUBSlrqtSrmi7aAZYcC1x8+N8mo19A3eZVbJl2gHS6tYWrYUjy1JfnXHARruliBMDtO2Wolm9glRHcg1Vz34MkL6oRw5iuF8LOZhV+tL3oeVibd7E3Nv/5RyC1AaTet3HiwSF+L3N+GcDMlA2PNyrRtzFvD7tYFuJMw4aN5RKsLrrXXzMkr74JeW0A39W78BPHfrF0ugG8/ohjPyTbH/TKZ70A9nGMeIzjwkfrBU8x4oaNSLUBbOM4T5S0+etJ5wa06KNb1wbwyXYVLvA2zSI61vmytItstAEs4zyXtkkXbQBVwVEnZIIUDnAfFzvHIR8M+U6wsIH0On5YOQ6hm56+xaS1v2HbZq08jsON3Af/35iRiIYbFBaBw5sxubUMUPHaMUAGqEhA0Z0jkAEqElB05whkgIoEFN05AhmgIgFFd45ABqhIQNGdI5ABKhJQdOcIZICKBBTdOQIZoCIBRXeOwDEArCvu4392r9v0kw5IgCHKh0H0cxh/AGhL8KPsv+MKAAAAAElFTkSuQmCC";


const minifyCss = new cleanCSS().minify(cssResult);
let htmlEnterpriseTxt = htmlEnterpriseStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___", minifyCss.styles);
let htmlPersonalTxt = htmlPersonalStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___", minifyCss.styles);

var html_E = minify(htmlEnterpriseTxt, {
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

var html_P = minify(htmlPersonalTxt, {
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
var html_cover = minify(htmlCoverStr, {
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
const resultCode = `"use strict";

var htmlCover = ${JSON.stringify(html_cover)};
var htmlEnterprise = ${JSON.stringify(html_E)};
var htmlPersonal = ${JSON.stringify(html_P)};
var bgImgData = "${bgImgData}";
var zgBgImgData = "${zgBgImgData}";
var accurateImgData = "${accurateImgData}";
var disIconData = "${disIconData}";
var defaultIcon = "${defaultIcon}";
var deIconData= "${deIconData}";
var personData= "${personData}";
var businessData= "${businessData}";
var disEdIconData= "${disEdIconData}";

${exportCover}
${exportTemplate}`;

fs.writeFileSync(root + "/outputHtml.js", resultCode);
fs.writeFileSync(root + "/outputHtml.min.js",UglifyJS.minify(resultCode).code);

