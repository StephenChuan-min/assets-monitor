const fs = require('fs');

let htmlResultStr = fs.readFileSync(__dirname + '/index.html', 'utf8');
let htmlCoverStr = fs.readFileSync(__dirname + '/cover.html', 'utf8');
let cssResult = fs.readFileSync(__dirname + '/index.css', 'utf8');


let htmlResult = htmlResultStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g, `<style>${cssResult}</style>`);
htmlResult = htmlResult.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`);

const dev ={
	cover:htmlCoverStr.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`),
	main:htmlResult,
};

module.exports = {
	dev,
	htmlResultStr,
	htmlCoverStr,
	cssResult
};
