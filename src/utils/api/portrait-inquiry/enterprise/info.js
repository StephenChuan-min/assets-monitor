import service from 'service';

/**
 * 【工商基本信息接口】
 * @returns {Promise<*>}
 * @param params
 */
// 基本信息
export const getBaseInfo = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/baseInfo', { params });
	return response.data;
};

// 主要人员
export const getMainPerson = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/mainPerson', { params });
	return response.data;
};

// 股东信息
export const getStockholder = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/stockholder', { params });
	return response.data;
};

// 分支机构
export const getBranch = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/branch', { params });
	return response.data;
};

// 对外投资
export const getInvestment = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/investment', { params });
	return response.data;
};

// 工商变更
export const getChange = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/change', { params });
	return response.data;
};

// 数量统计
export const getCount = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/count', { params });
	return response.data;
};

// 股权穿透图
export const stockChart = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/stockChart', { params });
	return response.data;
};
