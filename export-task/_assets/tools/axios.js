const axios = require('axios');
const fs = require('fs');
const dd = require('../result/dd-buiness.json');

const axiosPromiseArr = []; // 储存cancel token
/* 请求拦截前的处理 */
const requestMethods = {
	onFulfilled: (config) => {
		// 在请求发出之前做拦截工作
		// 这块需要做一些用户验证的工作，需要带上用户凭证
		const configNew = Object.assign({}, config);
		// 在发送请求设置cancel token
		configNew.cancelToken = new axios.CancelToken((cancel) => {
			axiosPromiseArr.push({ cancel });
		});
		if (config.cancelToken) {
			configNew.cancelToken = config.cancelToken;
		}
		console.log(configNew);
		// configNew.headers['Access-Control-Allow-Origin'] = '*';
		return configNew;
	},
	onRejected: (error) => {
		// 请求错误之后可以统一处理
		console.debug(`request error :${error}`);
		// return Promise.reject(error);
	},
};
/* 请求返回后的处理 */
const responseMethods = {
	onFulfilled:	(response) => {
		console.log(response);
		/**
		 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
		 * 如通过 xmlHttpRequest 状态码标识 逻辑可写在下面error中
		 */
		const res = response.data;
		// 在login界面不弹弹框
		if ((res.code === 5002)) {
			// 把其余的请求取消掉
			axiosPromiseArr.forEach((ele, index) => {
				ele.cancel('请求取消');
				delete axiosPromiseArr[index];
			});
			return Promise.reject(new Error('token失效'));
		}
		return response;
	},
	onRejected: (error) => {
		// 如果没有token直接返回到登陆界面
		if (axios.isCancel(error)) {
			console.log('isCancel error:', error);
		} else {
			console.log('error:', error.message);
		}
	},
};

/* =========  常规请求   ========= */
const service = axios.create({
	baseURL: 'http://ywgl.yczcjk.com',
	timeout: 5000 * 4,
	withCredentials: true,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip,compress,deflate,identity',
	},
});
service.__proto__ = axios;

// request拦截  请求之前拦截
service.interceptors.request.use(requestMethods.onFulfilled, requestMethods.onRejected);
service.interceptors.response.use(responseMethods.onFulfilled, responseMethods.onRejected);

async function toRequest(array) {
	/* eslint-disable no-return-await */
	return await service.all(
		array.map(promise => promise.api
			.then(res => Object.assign(res, promise.info, { data: res.data || 0 }))
			.catch(() => ({
				code: 500,
				data: 0,
				message: '请求未成功，暂不做处理',
				...promise.info,
			}))),
	);
	/* eslint-enable */
}

const handleDD = function (id, type) {
	const keyReg = new RegExp(type ? 'BA' : 'BB');
	const resultList = {};
	(Object.keys(dd)).forEach((item) => {
		if (keyReg.test(item)) {
			const apiUrl = dd[item].replace(/{(id|(obligor|business)Id)}/g, id);
			resultList[item] = () => service.get(`${apiUrl}?page=1&num=10&token=${global.token}`, {})
				.then(res => Object.assign(res.data, { id: item }));
		}
	});
	return resultList;
};

const test = function () {
 	console.log(global.token);
	 return service.get(`/yc/business/monitor/lawsuit/court-notice/21029?page=2&num=10&token=${global.token}`, {})
		 .then(res => Object.assign(res.data));
};

global.token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MDciLCJzdWIiOiIxNTE2ODI3MTkwMiIsImlhdCI6MTU3NzA2NjUyNiwicm9sZXMiOlsi566h55CG5ZGY55So5oi3Il0sImF1dGhvcml0aWVzIjpbXSwiaG9zdCI6Inl3Z2wueWN6Y2prLmNvbTo4MCIsInV1aWQiOiI2ZGNmOTYzZC00ZjU2LTRiY2ItOTcyOS0wNjBkOTM2ZTYwODciLCJleHBpcmUiOjE1ODI5MDU1OTksImV4cCI6MTU3NzMyNTcyNn0.Msr-mIZE66ujy_TSv3VURFQxSjtci5wxyyo0FtWaVaM';


test().then((res) => {
	console.log(res);
}).catch((res) => {
	console.log('error');
});
console.log(handleDD(21029));
