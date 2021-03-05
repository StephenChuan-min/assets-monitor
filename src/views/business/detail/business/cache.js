let source = {};

export const getSource = () => source;

export const setSource = (value, reset) => {
	try {
		if (reset)source = {};
		source = Object.assign({}, source, value);
		return true;
	} catch (e) {
		return false;
	}
};
