import service from 'service';

/**
 * 【概况接口】
 * @returns {Promise<*>}
 * @param params
 */
// 资产概况 => 相关资产拍卖
export const getAuction = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/auction', { params });
	return response.data;
};

// [V2.3] 资产概览 => 无形资产信息 [youyu]
export const getIntangible = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/intangible', { params });
	return response.data;
};

// 资产概览 => 代位权信息
export const getSubrogation = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/subrogation', { params });
	return response.data;
};

// 资产概览 => 金融资产信息
export const getFinancial = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/finance', { params });
	return response.data;
};

// 资产概览 => 金融资产信息
export const getConstruct = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/onBuild', { params });
	return response.data;
	// return Object.assign(response.data, {
	// 	field: 'Construct',
	// 	code: 200,
	// 	data: {
	// 		gmtModified: '2020-11-11',
	// 		onBuildCount: 22211,
	// 		obligorUnitTypeVOList: [
	// 			{
	// 				gmtModified: '2020-11-11',
	// 				obligorUnitCount: 22,
	// 				obligorUnitType: 1,
	// 				projectInfoTypeVoList: [
	// 					{
	// 						projectType: 1,
	// 						projectTypeCount: 22,
	// 					},
	// 					{
	// 						projectType: 2,
	// 						projectTypeCount: 21,
	// 					},
	// 					{
	// 						projectType: 3,
	// 						projectTypeCount: 51,
	// 					},
	// 				],
	// 				yearDistributions: [
	// 					{
	// 						year: 2001,
	// 						count: 21,
	// 					},
	// 					{
	// 						year: 2002,
	// 						count: 21,
	// 					},
	// 					{
	// 						year: 2003,
	// 						count: 1211,
	// 					},
	// 				],
	// 			},
	// 			{
	// 				gmtModified: '2020-11-11',
	// 				obligorUnitCount: 22,
	// 				obligorUnitType: 2,
	// 				projectInfoTypeVoList: [],
	// 				yearDistributions: [
	// 					{
	// 						year: 2020,
	// 						count: 21,
	// 					},
	// 					{
	// 						year: 2008,
	// 						count: 21,
	// 					},
	// 					{
	// 						year: 2009,
	// 						count: 1211,
	// 					},
	// 				],
	// 			},
	// 			{
	// 				gmtModified: '2020-11-11',
	// 				obligorUnitCount: 22,
	// 				obligorUnitType: 3,
	// 				projectInfoTypeVoList: [],
	// 				yearDistributions: [
	// 					{
	// 						year: 2020,
	// 						count: 21,
	// 					},
	// 					{
	// 						year: 2011,
	// 						count: 21,
	// 					},
	// 					{
	// 						year: 2015,
	// 						count: 1211,
	// 					},
	// 				],
	// 			},
	//
	// 		],
	// 	},
	// });
};

// 资产概况 => 土地信息
export const getLand = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/land', { params });
	return response.data;
};

// 资产概况 => 股权质押
export const getStock = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/stock', { params });
	return response.data;
};

// 资产概况 => 动产抵押
export const getMortgage = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/mortgage', { params });
	return response.data;
};

// [2.3] 资产概况 => 相关招投标信息 [youyu]
export const getBidding = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/bidding', { params });
	return response.data;
};

// [2.6] 资产概况 => 查解封资产 [youyu]
export const getUnBlock = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/unseal', { params });
	return response.data;
	// return {
	// 	...response.data,
	// 	data: {
	// 		unsealCount: 13,
	// 		yearDistributions: [
	// 			{ count: 5, year: 2020 },
	// 			{ count: 22, year: 2019 },
	// 			{ count: 22, year: 2018 },
	// 			{ count: 22, year: 2010 },
	// 			{ count: 22, year: 2011 },
	// 		],
	// 	},
	// };
};

// [2.6] 资产概况 => 限制高消费 [youyu]
export const getLimitHeight = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/limitHeight', { params });
	return response.data;
	// return {
	// 	...response.data,
	// 	data: {
	// 		limitHeightCount: 13,
	// 		yearDistributions: [
	// 			{ count: 6, year: 2020 },
	// 			{ count: 66, year: 2019 },
	// 			{ count: 6, year: 2018 },
	// 			{ count: 6, year: 2010 },
	// 			{ count: 66, year: 2011 },
	// 		],
	// 	},
	// };
};

// [2.4] 资产概况 => 破产信息 [youyu]
export const getBankruptcy = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/bankruptcy', { params });
	return response.data;
};

// 风险情况
export const getRisk = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/risk', { params });
	return response.data;
};

// 涉诉情况
export const getLitigation = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/litigation', { params });
	return response.data;
};

// 工商基本情况
export const getBusiness = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/business', { params });
	return response.data;
};

// 车辆信息
export const getVehicleInformation = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/vehicleInformation', { params });
	return response.data;
};

// 不动产登记
export const getEstateRegister = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/estateRegister', { params });
	return response.data;
};
