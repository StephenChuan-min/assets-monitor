import axios from 'axios';
import { message, Modal } from 'antd';
import Cookies from 'universal-cookie';
import { navigate } from '@reach/router';
import BASE_URL_INDEX from '../api/config';
import BASE_URL_LOCAL from '../api/config/local';
// import interceptorsConfig from './interceptors';

function closeWindow() {
	if (navigator.userAgent.indexOf('MSIE') > 0) {
		if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
			window.opener = null;
			window.close();
		} else {
			window.open('', '_top');
			window.top.close();
		}
	} else if (navigator.userAgent.indexOf('Firefox') > 0) {
		window.location.href = 'about:blank ';
	} else {
		window.opener = null;
		window.open('', '_self', '');
		window.close();
	}
}

// eslint-disable-next-line no-undef
const BASE_URL = ENV === 'local' ? BASE_URL_LOCAL : BASE_URL_INDEX;

/* 获取当前token */
const cookies = new Cookies();
const axiosPromiseArr = []; // 储存cancel token

/* 请求拦截前的处理 */
const requestMethods = {
	onFulfilled: (config) => {
		// 在请求发出之前做拦截工作
		// 这块需要做一些用户验证的工作，需要带上用户凭证
		const _params = Object.assign({}, config.params);
		// eslint-disable-next-line radix
		if (_params.page)_params.page = parseInt(_params.page);
		const configNew = Object.assign({}, config, { params: _params });
		// 在发送请求设置cancel token
		configNew.cancelToken = new axios.CancelToken((cancel) => {
			axiosPromiseArr.push({ cancel });
		});
		if (config.cancelToken) {
			configNew.cancelToken = config.cancelToken;
		}

		const path = configNew.url.split('jms')[1];
		const _token = cookies.get('token') || '';
		if (configNew.url.match(/\?/)) {
			configNew.url = `${configNew.url}${_token ? `&token=${_token}` : ''}`;
		} else if (path !== '/open/login') {
			configNew.url = `${config.url}${_token ? `?token=${_token}` : ''}`;
		}
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
		const res = response.data;
		const reqUrl = response.request.responseURL;
		// 在login界面不弹弹框
		const hash = window.location.hash.slice(1);
		const isSpecial = cookies.get('isSpecial');

		if (isSpecial) {
			if (res.code === 401 || res.code === 403 || res.code === 15002 || res.code === 5002 || res.code === 15003 || res.code === 20039) {
				axiosPromiseArr.forEach((ele, index) => {
					ele.cancel('请求取消');
					delete axiosPromiseArr[index];
				});
				let titleText = '';
				global.REQ_STATUS = 'stop';
				if (res.code === 401) { titleText = '没有访问权限，即将退出登录。'; }
				if (res.code === 403) { titleText = res.message; }
				if (res.code === 15002) { titleText = '账号已过期，即将退出登录，如有疑问，请联系管理员'; }
				if (res.code === 5002 || res.code === 15003) { titleText = '本次登录已失效，请重新登录监控平台。'; }
				if (res.code === 20039) { titleText = '账号与当前域名对应机构不匹配，请切换到对应机构二级域名下登录'; }
				Modal.warning({
					title: '提示',
					className: 'yc-close-waring',
					content: titleText,
					okText: '我知道了',
					onOk() {
						closeWindow();
					},
				});
				return Promise.reject(new Error(null));
			}
			return response;
		}
		if (res.code === 401) {
			navigate('/login');
			window.location.reload();
			return response;
		}
		if (res.code === 403) {
			navigate('/');
			window.location.reload();
			return response;
		}
		if ((res.code === 15002 || res.code === 5002 || res.code === 15003 || res.code === 20039) && hash !== '/login') {
			axiosPromiseArr.forEach((ele, index) => {
				ele.cancel('请求取消');
				delete axiosPromiseArr[index];
			});
			let titleText = '';
			global.REQ_STATUS = 'stop';
			if (res.code === 15002) { titleText = '您的账号已过期，请联系客服'; }
			if (res.code === 5002 || res.code === 15003) { titleText = '登录失效，请重新登录'; }
			if (res.code === 20039) { titleText = '账号与当前域名对应机构不匹配，请切换到对应机构二级域名下登录'; }
			if (/api\/auth\/logout/.test(reqUrl)) {
				navigate('/login');
				return Promise.reject(new Error(null));
			}
			if (/api\/auth\/authRule/.test(reqUrl)) {
				//	权限接口
				navigate('/login');
				Modal.warning({
					title: titleText,
					onOk() {},
				});
			} else {
				// 非权限接口
				Modal.warning({
					title: titleText,
					onOk() { navigate('/login'); },
				});
			}
			return Promise.reject(new Error(null));
		}
		return response;
	},
	onRejected: (error) => {
		const notShow = (error.config.params || {}).event === 'loop';
		const isSpecial = cookies.get('isSpecial');
		// 如果没有token直接返回到登陆界面
		if (cookies.get('token') === undefined) {
			if (isSpecial) {
				Modal.warning({
					title: '提示',
					className: 'yc-close-waring',
					content: '本次登录已失效，请重新登录监控平台。',
					okText: '我知道了',
					onOk() {
						closeWindow();
					},
				});
			} else {
				navigate('/login');
			}
		} else if (axios.isCancel(error)) {
			console.log('isCancel error:', error);
		} else if (error && !notShow) {
			message.error(error.message);
		}
	},
};


/* =========  常规请求   ========= */
const service = axios.create({
	baseURL: BASE_URL || process.env.BASE_URL,
	timeout: 1000 * 30,
	withCredentials: true,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip',
	},
});

/* eslint-disable no-proto */
service.__proto__ = axios;
/* eslint-enable */
// request拦截  请求之前拦截
service.interceptors.request.use(requestMethods.onFulfilled, requestMethods.onRejected);
service.interceptors.response.use(responseMethods.onFulfilled, responseMethods.onRejected);

/* =========  文件服务请求   ========= */
const serviceFile = axios.create({
	baseURL: BASE_URL || process.env.BASE_URL,
	timeout: 1000 * 5 * 60,
	withCredentials: true,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip,compress,deflate,identity',
		'Axios-Request-Type': 'export,files',
	},
});
// request拦截  请求之前拦截
serviceFile.interceptors.request.use(requestMethods.onFulfilled, requestMethods.onRejected);
serviceFile.interceptors.response.use(responseMethods.onFulfilled, responseMethods.onRejected);
// serviceFile.interceptors.request.use(interceptorsConfig('request').onFulfilled, interceptorsConfig('request').onRejected);
// serviceFile.interceptors.response.use(interceptorsConfig('response').onFulfilled, interceptorsConfig('response').onRejected);

export { serviceFile };
export default service;
