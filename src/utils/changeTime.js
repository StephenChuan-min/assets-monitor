// 转时间戳方法
const add0 = m => (m < 10 ? `0${m}` : m);

const format = (shijianchuo) => {
	if (shijianchuo) {
		const time = new Date(shijianchuo);
		const y = time.getFullYear();
		const m = time.getMonth() + 1;
		const d = time.getDate();
		// const h = time.getHours();
		// const mm = time.getMinutes();
		// const s = time.getSeconds();
		return `${y}-${add0(m)}-${add0(d)}`;
	}
	return null;
};

// 转成20200506这样的格式
const formatEight = (shijianchuo) => {
	if (shijianchuo) {
		const time = new Date(shijianchuo);
		const y = time.getFullYear();
		const m = time.getMonth() + 1;
		const d = time.getDate();
		return `${y}${add0(m)}${add0(d)}`;
	}
	return null;
};


// 标准时间转年月日
const formatDateTime = (date, onlyYear) => {
	if (typeof date === 'string') return date;
	if (date === 0) return onlyYear ? '1970-01-01' : '1970-01-01 00:00';
	if (!date) return '-';
	const data = new Date(date && date * 1000);
	const y = data.getFullYear();
	let m = data.getMonth() + 1;
	m = m < 10 ? (`0${m}`) : m;
	let d = data.getDate();
	d = d < 10 ? (`0${d}`) : d;
	let h = data.getHours();
	h = h < 10 ? (`0${h}`) : h;
	let minute = data.getMinutes();
	minute = minute < 10 ? (`0${minute}`) : minute;
	return onlyYear ? `${y}-${m}-${d}` : `${y}-${m}-${d} ${h}:${minute}`;
	// return `${y}-${m}-${d}`;
};

// 金额三位添加小数点
const toThousands = (value) => {
	const number = Number(value);
	return number.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

// 转JSON
const strToJson = str => JSON.parse(str);

/**
 * 动画垂直滚动到页面指定位置
 * @param { Number } currentY 当前位置
 * @param { Number } targetY 目标位置
 */

const ScrollAnimation = (currentY, targetY) => {
	// 获取当前位置方法
	// const currentY = document.documentElement.scrollTop || document.body.scrollTop
	const targetX = 0;
	// 计算需要移动的距离
	const needScrollTop = targetY - currentY;
	let _currentY = currentY;

	if (Math.abs(needScrollTop) > 10) {
		const step = (needScrollTop / 30);
		_currentY += step;
		const scrollInt = setInterval(() => {
			if (Math.abs(targetY - _currentY) < 10) {
				clearInterval(scrollInt);
				window.scrollTo(targetX, targetY);
			} else {
				window.scrollTo(targetX, _currentY);
				_currentY += step;
			}
		}, 10);
	} else {
		window.scrollTo(targetX, targetY);
	}

	//
	// setTimeout(() => {
	// 	// 一次调用滑动帧数，每次调用会不一样
	// 	// const dist = Math.ceil(needScrollTop / 10);
	//
	// 	const dist = (needScrollTop / 30);
	// 	_currentY += dist;
	// 	window.scrollTo(0, _currentY);
	// 	// 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
	// 	if (needScrollTop > 10 || needScrollTop < -10) {
	// 		ScrollAnimation(_currentY, targetY);
	// 	} else {
	// 		window.scrollTo(0, _currentY);
	// 	}
	// }, 1);
};
export {
	format, toThousands, formatDateTime, strToJson, ScrollAnimation, formatEight,
};
