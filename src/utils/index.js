import React from 'react';
import { navigate } from '@reach/router';
import ruleMethods from './rule';

export default {
	thousandBitSeparator(val) {
		let num = val;
		if (typeof (num) === 'number') {
			num = num.toString().split('.'); // 分隔小数点
			const arr = num[0].split('').reverse(); // 转换成字符数组并且倒序排列
			let res = [];
			for (let i = 0, len = arr.length; i < len; i += 1) {
				if (i % 3 === 0 && i !== 0) {
					res.push(','); // 添加分隔符
				}
				res.push(arr[i]);
			}
			res.reverse(); // 再次倒序成为正确的顺序
			// 如果有小数的话添加小数部分
			res = num[1] ? res.join('').concat(`.${num[1]}`) : res.join('');
			return `${res}元`;
		}
		return num;
	},
	/*  */
	// 校验名称，最多不超过10个字符
	rule_checkName: (rule, value, callback) => {
		if (!value) {
			callback(new Error('名称不能为空'));
		} else if (value.length > 10) {
			callback(new Error('名称长度不能超过10个字符'));
		} else {
			callback();
		}
	},
	// 手机号码校验
	rule_checkMobile: (rule, value, callback) => {
		const reg = /^1[34578][0-9]\d{8}$/;
		if (!value) {
			callback(new Error('账号不能为空'));
		} else if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('请输入正确的手机号'));
		}
	},
	// 密码校验 长度6 - 20位
	rule_checkPassword: (rule, value, callback) => {
		if (!value) {
			callback(new Error('密码不能为空'));
		} else if (value.length < 6 || value.length > 20) {
			callback(new Error('密码长度为 6 - 20 个字符'));
		} else {
			callback();
		}
	},
	// 小写字母校验
	rule_checkLowerCase: (rule, value, callback) => {
		const reg = /^[a-z]*$/;
		if (!value) {
			callback(new Error('字符不能为空'));
		} else if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('只能输入小写字母'));
		}
	},
	// 截取 url 里面 ？后面的参数
	parseQuery: (url) => {
		const queryObj = {};
		const reg = /[?&]([^=&#]+)=([^&#]*)/g;
		const _query = url.match(reg);
		if (_query) {
			for (let i = 0; i < _query.length; i += 1) {
				const query = _query[i].split('=');
				const key = query[0].substr(1);
				const value = query[1];
				if (queryObj[key]) {
					queryObj[key] = [].concat(queryObj[key], window.decodeURI(value));
				} else {
					queryObj[key] = window.decodeURI(value);
				}
			}
		}
		return queryObj;
	},


};
/**
 * 有效无效，字段状态统一
 * @param val
 * @returns {{color: string, text: string, status: boolean}}
 */
export const toGetStatusText = (val) => {
	const res = {
		text: '-',
		status: true,
		color: '#3DBD7D',
	};
	if (typeof val === 'string') {
		res.text = val;
		res.status = val === '有效';
	}
	if (typeof val === 'number') {
		res.text = val ? '有效' : '无效';
		res.status = Boolean(val);
	}
	res.color = res.status ?	'#3DBD7D' : '#7D8699';
	return res;
};

export const toGetUnStatusText = (val) => {
	const res = {
		text: '-',
		status: true,
		color: '#3DBD7D',
	};
	if (typeof val === 'string') {
		res.text = val;
		res.status = val === '有效';
	}
	if (typeof val === 'number') {
		res.text = !val ? '有效' : '无效';
		res.status = !val;
	}
	res.color = res.status ?	'#3DBD7D' : '#7D8699';
	return res;
};

/* 填写数据
 * 如果没有填写默认值 */
export const w = (v = '', option) => {
	const { prefix = '', suffix = '', mark = '' } = option || {};
	if (v === null) return mark || '-';
	if (typeof v === 'number') {
		const value = v;
		if (value && value !== '-' && value !== '-') return `${prefix}${value}${suffix}`;
		return `${prefix}${value || mark || '-'}`;
	}
	const value = (`${v}`).trim();
	if (value && value !== '-' && value !== '-') return `${prefix}${value}${suffix}`;
	return value || mark || '-';
};

export const parseQuery = (url) => {
	const queryObj = {};
	const reg = /[?&]([^=&#]+)=([^&#]*)/g;
	const _query = url.match(reg);
	if (_query) {
		for (let i = 0; i < _query.length; i += 1) {
			const query = _query[i].split('=');
			const key = query[0].substr(1);
			const value = query[1];
			if (queryObj[key]) {
				queryObj[key] = [].concat(queryObj[key], window.decodeURI(value));
			} else {
				queryObj[key] = window.decodeURI(value);
			}
		}
	}
	return queryObj;
};

// 获得输入框中字符长度
export const getByteLength = (val) => {
	const str = String(val);
	let bytesCount = 0;
	for (let i = 0, n = str.length; i < n; i += 1) {
		const c = str.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
			bytesCount += 1;
		} else {
			bytesCount += 2;
		}
	}
	return bytesCount;
};

/**
 * 截取前N个字节的字符串
 * @param str
 * @param len
 * @param suffix
 * @returns {*}
 */
export const toCutString = (str, len, suffix) => {
	if (!str) return '';
	if (len <= 0) return '';
	if (getByteLength(str) <= len) return str;
	const _suffix = suffix || '';
	let template = 0;
	for (let i = 0; i < str.length; i += 1) {
		if (str.charCodeAt(i) > 255) {
			template += 2;
		} else {
			template += 1;
		}
		if (template === len) {
			return str.substring(0, i + 1) + _suffix;
		} if (template > len) {
			return str.substring(0, i) + _suffix;
		}
	}
	return str;
};


/**
 * 截取 url 里面 指定的参数
 * @param url
 * @param name
 * @returns {null}
 */
export const getQueryByName = (url, name) => {
	const reg = new RegExp(`[?&]${name}=([^&#]+)`);
	const query = url.match(reg);
	try {
		return query ? window.decodeURI(query[1]) : null;
	} catch (e) {
		return query ? query[1] : null;
	}
};

export const getHrefQuery = (name) => {
	if (name) {
		return getQueryByName(window.location.href, name);
	}
	return null;
};


/**
 * 对象里面有需要过滤的属性的时候调用
 * @param obj
 * @param predicate 需要排除属性的条件函数
 */
export const keyFilter = (obj, predicate) => {
	const result = {};
	Object.keys(obj).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(obj, key) && !predicate(obj[key])) {
			result[key] = obj[key];
		}
	});
	return result;
};

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
export const urlEncode = (param, key, encode) => {
	if (param == null) return '';
	let paramStr = '';
	const t = typeof (param);
	if (t === 'string' || t === 'number' || t === 'boolean') {
		paramStr += `&${key}=${(encode == null || encode) ? encodeURIComponent(param) : param}`;
	} else {
		Object.keys(param).forEach((i) => {
			const k = key == null ? i : key + (param instanceof Array ? '' : `.${i}`);
			paramStr += urlEncode(param[i], k, encode);
		});
	}
	return paramStr;
};

/**
 * 去除对象中空值
 * @param obj
 * @returns {*}
 */
export const clearEmpty = (obj) => {
	if (typeof obj === 'object') {
		const l = Object.keys(obj);
		const _obj = Object.assign({}, obj);
		l.forEach((item) => {
			if (_obj[item] === '' || _obj[item] === undefined || _obj[item] === null) delete _obj[item];
			else if (typeof _obj[item] === 'string')_obj[item] = _obj[item].replace(/^\s+|\s+$/g, '');
		});
		return _obj;
	}
	return obj;
};

/**
 * 去除对象中值为0和空值的对象
 * @param obj
 * @returns {*}
 */
export const clearZero = (obj) => {
	if (typeof obj === 'object') {
		const l = Object.keys(obj);
		const _obj = Object.assign({}, obj);
		l.forEach((item) => {
			if (_obj[item] === 0 || _obj[item] === '' || _obj[item] === undefined) delete _obj[item];
			else if (typeof _obj[item] === 'string')_obj[item] = _obj[item].replace(/^\s+|\s+$/g, '');
		});
		return _obj;
	}
	return obj;
};

// 去除头尾空格
if (!String.prototype.trim) {
	String.prototype.trim = function trim(val) {
		return val.replace(/^\s+|\s+$/g, '');
	};
}

// 时间戳格式替换
Date.prototype.format = function method(format) {
	const o = {
		'M+': this.getMonth() + 1, // 月份
		'd+': this.getDate(), // 日
		'h+': this.getHours(), // 小时
		'm+': this.getMinutes(), // 分
		's+': this.getSeconds(), // 秒
		'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
		S: this.getMilliseconds(), // 毫秒
	};
	let fmt = format;
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
	Object.keys(o).forEach((k) => {
		if (new RegExp(`(${k})`).test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
				? (o[k])
				: ((`00${o[k]}`).substr((`${o[k]}`).length)));
		}
	});
	return fmt;
};
export const timeStandard = (text, mark, format) => {
	const _format = typeof format === 'string' ? format : '';
	if (text === null || text === undefined) return mark || '-';
	if (typeof text === 'number' && text === 0) return '-';
	if (typeof text === 'number') return (text ? new Date(text * 1000).format(_format || 'yyyy-MM-dd') : mark || '-');
	return text;
};

export const DownloadFile = (url, target) => {
	if (url) {
		const download = window.parent.document.createElement('a');
		download.id = Math.floor(Math.random() * 5000);
		download.rel = 'noopener noreferrer';
		download.href = url;
		if (target) download.target = '_blank';
		if (global.GLOBAL_MEIE_BROWSER) {
			window.parent.document.body.appendChild(download);
			download.click();
		} else {
			document.body.appendChild(download);
			const e = document.createEvent('MouseEvent');
			e.initEvent('click', false, false);
			download.dispatchEvent(e);
		}
		// setTimeout(() => {
		// 	document.body.removeChild(download);
		// }, 1000);
	}
};


//	返回a标签，可点击链接
export const linkDom = (url, text, target, className, style, click) => (url ? React.createElement(
	'a',
	{
		href: url,
		className: `click-link${className ? ` ${className}` : ''}`,
		rel: 'noopener noreferrer',
		target: target || '_blank',
		style,
		onClick: click,
		dangerouslySetInnerHTML: { __html: text },
	},
) : text);
//	返回a标签，可点击链接 => 债务人详情
export const linkDetail = (id, text, target, className, style) => React.createElement(
	'a',
	{
		href: `#/business/debtor/detail?id=${id}`,
		className: `click-link${className ? ` ${className}` : ''}`,
		rel: 'noopener noreferrer',
		target: target || '_blank',
		style,
	},
	text,
);
//	返回a标签，可点击链接 => 业务详情
export const linkBusiness = (id, text, target, className, style) => React.createElement(
	'a',
	{
		href: `#/business/detail?id=${id}`,
		className: `click-link${className ? ` ${className}` : ''}`,
		rel: 'noopener noreferrer',
		target: target || '_blank',
		style,
	},
	text,
);

/**
 * 拼接修改url后的get参数
 * @param url
 * @param arg [参数名]
 * @param _argVal
 * @returns {*}
 */
export const changeURLArg = function method(url, arg, _argVal) {
	const replaceText = _argVal ? `${arg}=${_argVal}` : '';
	const argMatchRes = url.match(`${arg}=([^&]*)`);
	if (argMatchRes) {
		const regExp = replaceText ? `(${arg}=)([^&]*)` : `[&|?](${arg}=)([^&]*)`;
		return url.replace(new RegExp(regExp, 'gi'), replaceText);
	}
	const mark = url.match('[?]') ? '&' : '?';
	return replaceText ? `${url}${mark}${replaceText}` : url;
};

// 将输入内容拼接到url上
export const generateUrlWithParams = (url, params) => {
	const urlParams = [];
	let urlList = url;
	// console.log(Object.keys(params).length, 3);

	for (let i = 0; i < Object.keys(params).length; i += 1) {
		const key = Object.keys(params)[i];

		if (params[key]) {
			urlParams.push(`${key}=${params[key]}`);
		}
	}
	if (urlParams.length > 0) {
		urlList += `?${urlParams.join('&')}`;
	}
	return urlList;
};


/**
 * 跳转资产的ele节点ID
 * @param ele
 */
export const navigateDetail = (ele) => {
	const id = getHrefQuery('id');
	if (id) {
		const { hash } = window.location;
		const base = /business\/debtor\/detail/.test(hash) ? '/business/debtor/detail' : '/business/detail';
		navigate(generateUrlWithParams(`${base}/info/102`, {
			id,
			ele,
		}));
	}
};

/**
 * 跳转风险的ele节点ID
 * @param ele
 */
export const navigateDetailRisk = (ele) => {
	const id = getHrefQuery('id');
	if (id) {
		const { hash } = window.location;
		const base = /business\/debtor\/detail/.test(hash) ? '/business/debtor/detail' : '/business/detail';
		navigate(generateUrlWithParams(`${base}/info/103`, {
			id,
			ele,
		}));
	}
};

// 判断对象内属性是否为空
export const objectKeyIsEmpty = (obj) => {
	let empty;
	// key === 'type'  限制涉诉信息中的信息类型切换
	// eslint-disable-next-line no-restricted-syntax
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (obj[key] === undefined || obj[key] === '' || key === 'type') {
				empty = true;
			} else {
				empty = false;
				break;
			}
		}
	}
	return empty;
};

/**
 * 处理路由数据,对默认数据转换为可以使用的数据对象
 * @param source
 */
export const handleRule = source => ruleMethods.handleRule(source);

/**
 * 返回默认对应rule数据结构，包含二级三级
 * @param rule
 * @param moduleID
 * @returns {Array}
 */
export const { toGetRuleSource } = ruleMethods;

export const toEmpty = (data) => {
	if (data) {
		if (typeof data === 'string') return data.trim();
		if (typeof data === 'number') return data.toString().trim();
		return JSON.toString(data);
	}
	return '';
};

/* 案件类型 */
export const getCaseType = (caseType) => {
	if (caseType === 1) return '普通案件';
	if (caseType === 2) return '破产案件';
	if (caseType === 3) return '执行案件';
	if (caseType === 4) return '终本案件';
	return '';
};

/* 去除小数点后，非正规数值 */
export const reviseNum = (value) => {
	if (value) {
		const RegStr = new RegExp(/\.[\d,]+(?=[^\d,]|)/g);
		const e = (value.match(RegStr) || [])[0];
		if (e) {
			let replaceStr = '';
			if (/,/.test(e)) {
				const _e = e.replace(',', '');
				replaceStr = _e * 1 === 0 ? '' : (_e * 1).toString().slice(1);
			} else {
				replaceStr = e * 1 === 0 ? '' : (e * 1).toString().slice(1);
			}
			return value.replace(RegStr, replaceStr);
		}
		return value;
	}
	return value;
};

// 防抖
export const debounce = (fn, delay) => {
	// 定时器；
	let timer = null;
	// eslint-disable-next-line func-names
	return function () {
		// 保存上下文的this
		const context = this;
		// 保存传入的参数
		// eslint-disable-next-line prefer-rest-params
		const args = arguments;
		// 每次调用前都清空定时器
		if (timer) {
			clearTimeout(timer);
		}
		// 去设立一个新的定时器
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};
};

// 节流
export const throttle = (fn, Interval) => {
	// 定时器；
	let last = 0;
	// eslint-disable-next-line func-names
	return function () {
		// 保存上下文的this
		const context = this;
		// 保存传入的参数
		// eslint-disable-next-line prefer-rest-params
		const args = arguments;
		// 保存调用时的时间;
		const now = +new Date();
		// 判断上一次调用时间和当前调用时间对比
		if (now - last > Interval) {
			// 更新最后一次调用时间;
			last = now;
			fn.apply(context, args);
		}
	};
};

/**
 * 获取指定模块高度，仅业务详情页有效
 * @param id
 * @param number
 * @param portrait
 */
export const toGetModuleHeight = (id = 0, number = 0, portrait = '') => {
	const paginationHeight = 76;
	if (/business|debtor_(enterprise|personal)/.test(portrait) && number && id) {
		const isD = portrait !== 'business';
		let sH = 0;
		switch (id) {
		case 10101:
		case 10102: sH = 102; break;
		case 10401: sH = 90; break;
		case 10402: sH = 89; break;
		case 10403: sH = isD ? 45 : 67; break;
		case 10404: sH = isD ? 89 : 112; break;
		case 10301: sH = isD ? 91 : 113; break;
		case 10302: sH = isD ? 89 : 112; break;
		case 10303: sH = isD ? 89 : 112; break;
		case 10201:
		case 10202:
		case 10203: sH = 91; break;
		case 10501:
		case 10502: sH = 89; break;
		case 10601:
		case 10602: sH = 111; break;
		case 10701: sH = isD ? 48 : 70; break;
		case 30201: sH = 69; break;
		case 20401: sH = 89; break;
		case 20402: sH = 89; break;
		case 20501: sH = 99; break;
		case 20601:
		case 20602:
		case 20603: sH = 91; break;
		case 30301: sH = 113; break;
		case 30401: sH = isD ? 91 : 113; break;
		case 30501: sH = isD ? 91 : 113; break;
		case 30601: sH = isD ? 91 : 113; break;
		case 30701: sH = isD ? 48 : 70; break;
		default: sH = 0;
		}
		return sH ? (number >= 5 ? 5 : number) * sH + paginationHeight : null;
	}
	return null;
};

/**
 * 将一个字符串转换成数组，用逗号隔开，删除最后一个逗号
 */
export const toFormatArrayToString = (arr) => {
	if (!Array.isArray(arr)) return '';
	const str = arr.toString();
	if (arr.length > 1) {
		return str.substr(0, str.length - 1);
	}
	return str;
};
