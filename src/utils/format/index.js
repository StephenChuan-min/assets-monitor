export const numberFormat = function method(num) {
	if (num.length <= 3) {
		return num;
	}
	const str = `${num}`;
	const arr = str.split('');
	const arr1 = arr.slice(0);
	let i = 1;
	for (let j = 0; j <= i; j += 1) {
		if ((i * 3) < arr.length) {
			arr1.splice(arr.length - (3 * i), 0, ',');
			i += 1;
		}
	}
	return arr1.join('');
};

export const floatFormat = (item) => {
	let result = null;
	if (!item && item !== 0) {
		return '-';
	}
	const type = Number.parseFloat(item);
	const bol = Number.isNaN(type);
	if (bol) {
		result = item;
		return result;
	}
	const num1 = type.toFixed(2);
	const str = `${num1}`;
	if (str.length <= 3) {
		return str;
	}
	const pointer = str.split('.')[1];
	const str1 = str.split('.')[0];
	const arr = str1.split('');
	const arr1 = arr.slice(0);
	let i = 1;
	for (let j = 0; j <= i; j += 1) {
		if ((i * 3) < arr.length) {
			arr1.splice(arr.length - (3 * i), 0, ',');
			i += 1;
		}
	}
	if (pointer) {
		arr1.push('.');
		arr1.push(pointer);
	}
	result = arr1.join('');
	return result;
};
