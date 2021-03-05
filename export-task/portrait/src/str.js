const fs = require('fs');

let htmlEnterpriseStr = fs.readFileSync(__dirname + '/enterprise.html', 'utf8');
let htmlPersonalStr = fs.readFileSync(__dirname + '/personal.html', 'utf8');
let htmlCoverStr = fs.readFileSync(__dirname + '/cover.html', 'utf8');
let cssResult = fs.readFileSync(__dirname + '/index.css', 'utf8');

let htmlEnterprise = htmlEnterpriseStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g, `<style>${cssResult}</style>`);
htmlPersonal = htmlPersonalStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g, `<style>${cssResult}</style>`);
htmlEnterprise = htmlEnterprise.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`);
htmlPersonal = htmlPersonal.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`);
htmlCover = htmlCoverStr.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`);

const dev = {
	htmlCover: htmlCover,
	htmlEnterprise: htmlEnterprise,
	htmlPersonal: htmlPersonal,
};

module.exports = {
	dev,
	htmlEnterpriseStr,
	htmlPersonalStr,
	htmlCoverStr,
	cssResult
};
