import service from '@/utils/service';

export const toGetTotal = (field, data) => {
	let count = 0;
	const reg = new RegExp(field);
	data.forEach((item) => {
		if (reg.test(item.id)) {
			count += item.field ? item.data[item.field] : item.data;
		}
	});
	return count;
};

export const toGetNumber = (data, id) => {
	if (data) {
		const item = data.filter(i => i.id === id)[0] || {};
		return item.field ? item.data[item.field] : item.data;
	}
	return 0;
};

export const toGetDefaultId = (data) => {
	const item = data.filter((i) => {
		const _data = i.field ? i.data[i.field] : i.data;
		return _data > 0;
	})[0];
	return item.id;
};

export const requestAll = (arrayApi) => {
	// eslint-disable-next-line no-unused-vars
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

	// eslint-disable-next-line no-shadow
	async function promiseAll(array) {
		const result = [];
		// console.log(array);
		return new Promise((resolve) => {
			let i = 0;
			// eslint-disable-next-line no-unused-vars
			const next = () => {
				// eslint-disable-next-line array-callback-return
				const item = array[i];
				item.api.then((res) => {
					i += 1;
					result.push(Object.assign(res, item.info, { data: res.data || 0 }));
					if (i === array.length) { resolve(result); } else { next(); }
				}).catch(() => {
					i += 1;
					if (i === array.length) { resolve(result); } else { next(); }
					result.push({
						code: 500,
						data: 0,
						message: '请求未成功，暂不做处理',
						...item.info,
					});
				});
			};
			next();
		});
	}
	return promiseAll(arrayApi);
};

// 简单定义promiseAll方法
export const promiseAll = (promiseAry = []) => {
	let index = 0;
	const result = [];
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promiseAry.length; i += 1) {
			// eslint-disable-next-line no-loop-func
			promiseAry[i].then((val) => {
				index += 1;
				result[i] = val;
				if (index === promiseAry.length) {
					resolve(result);
				}
			}, reject);
		}
	});
};
