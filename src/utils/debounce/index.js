import _ from 'lodash';


// fun为要进行防抖的函数， e填this， timeout为防抖延迟时间默认200毫秒
const debounce = (fun, e, timeout) => {
	if (!e) {
		return;
	}
	const obj = {
		getThis() {
			if (this.debounce) {
				this.debounce.cancel();
			}
			this.debounce = _.debounce(fun, timeout || 200);
			this.debounce();
		},
	};
	obj.getThis.call(e);
};

export default debounce;
