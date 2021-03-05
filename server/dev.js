const shell = require('shelljs');
const path = require('path');
const del = require('del');

del.sync([path.join(`${__dirname}/../docs/**`)]);
console.log('正在删除目录');

shell.exec('node ./server/server.js --env=development', { async: true }, (code, stdout, stderr) => {});
shell.exec('webpack --config ./scripts/index.js --watch', { async: true }, (code, stdout, stderr) => {});
