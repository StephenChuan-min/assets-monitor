const express = require('express');
const httpProxy = require('http-proxy-middleware');
// const path = require('path');

const app = express();

app.use(express.static('dist'));// 静态资源

app.use('/', httpProxy({
	target: 'http://172.18.255.251:18080', // 服务器地址
	changeOrigin: true,
	secure: false,
	autoRewrite: true,
	onProxyReq(proxyReq, req) {
		proxyReq.setHeader('Access-Control-Allow-Origin', '*');
		proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
		Object.keys(req.headers).forEach((key) => {
			proxyReq.setHeader(key, req.headers[key]);
		});
		// if (proxyReq.method === 'POST' || req.method === 'POST') {
		// 	// proxyReq.set('Content-Type', 'application/json;charset=utf-8');
		// 	console.log(proxyReq);
		// 	// 代理的host 设置成被代理服务的，解决跨域访问
		// }
	},
	onProxyRes(proxyRes, req, res) {
		// 将服务器返回的头信息，复制一遍给本地请求的响应。
		// 这样就能实现 执行完登录后，本地的返回请求中也有相关cookie，从而实现登录功能代理。
		Object.keys(proxyRes.headers).forEach((key) => {
			res.append(key, proxyRes.headers[key]);
		});
	},
}));

app.listen('8088', () => {
	console.log('running express');
});
