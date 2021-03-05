import service from 'service';

/**
 * 【概况接口】
 * @returns {Promise<*>}
 * @param params
 */
// 资产概况 => 相关资产拍卖
export const getAuction = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/overview/asset/auction', { params });
	return response.data;
};

// 资产概况 => 代位权信息(裁判文书)
export const getSubrogation = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/overview/asset/subrogation', { params });
	return response.data;
};

// 风险情况 => 涉诉信息（涉诉文书）
export const getLitigation = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/overview/risk/litigation', { params });
	return response.data;
};

// 风险情况 => 失信记录
export const getDishonest = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/overview/risk/dishonest', { params });
	return response.data;
};

// 风险情况 => 税收违法
export const getTaxIllegal = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/overview/risk/tax-illegal', { params });
	return response.data;
};

// 个人信息
export const getInfo = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/info', { params });
	return response.data;
};

// 个人失信状态
export const getDishonestStatus = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/dishonest-status', { params });
	return response.data;
};
