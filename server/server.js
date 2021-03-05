const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const httpProxy = require('http-proxy-middleware');
const cors = require('koa-cors');
const koaBodyparser = require('koa-bodyparser');

const app = new Koa();

const column = '../docs';

// 跨域设置
app.use(cors());
// OPTION请求设置
app.use(async (ctx, next) => {
	console.log('step:', ctx);
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (ctx.method === 'OPTIONS') {
		ctx.body = 200;
	} else {
		await next();
	}
});
// 静态资源处理
app.use(koaStatic(path.resolve(__dirname, column)));

// 服务端接口转发
app.use(async (ctx, next) => {
	// console.log('cookies:', ctx.cookies.get());
	//
	// console.log('SESSION:', ctx.cookies.get('SESSION'));
	// console.log('token:', ctx.cookies.get('token'));

	// if (ctx.url.startsWith('/jms')) { // 以yc开头的异步请求接口都会被转发
	ctx.respond = false;
	return httpProxy({
		target: 'http://172.18.255.74:8080', // 服务器地址
		changeOrigin: true,
		secure: false,
		/* ^^^
			上面这个pathRewrite字段不是必须的，
			你的开发环境和生产环境接口路径不一致的话，才需要加这个。
			*/
	})(ctx.req, ctx.res, next);
	// }
	// // ...这里省略N个接口
	// return next();
});

app.use(koaBodyparser());

app.listen(8088);
