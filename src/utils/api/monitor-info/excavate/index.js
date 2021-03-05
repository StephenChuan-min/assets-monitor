import service from 'service';
/*
* 2.0 信息概览资产挖掘卡片接口
*
*/

// 资产拍卖
export const auctionCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/auction', { params });
	return Object.assign(response.data, { name: 'asset' });
};

// 土地数据
export const landCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/land', { params });
	return Object.assign(response.data, { name: 'land' });
};

// 无形资产
export const intangibleCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/intangible', { params });
	return Object.assign(response.data, { name: 'intangible' });
};

// 代位权
export const subrogationCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/subrogation', { params });
	return Object.assign(response.data, { name: 'subrogation' });
};

// 股权质押
export const stockCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/stock', { params });
	return Object.assign(response.data, { name: 'stock' });
};

// 动产抵押
export const mortgageCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/mortgage', { params });
	return Object.assign(response.data, { name: 'mortgage' });
};

// 金融资产
export const financeCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/finance', { params });
	return Object.assign(response.data, { name: 'finance' });
};

// 招标中标
export const biddingCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/bidding', { params });
	return Object.assign(response.data, { name: 'bidding' });
};

// 不动产
export const realEstateCardApi = async (params) => {
	const response = await service.get('/yc/index/information/overview/estateRegister', { params });
	return Object.assign(response.data, { name: 'estateRegisterCount' });
};

// 车辆信息
export const carCardApi = async (params) => {
	const response = await service.get('/yc/index/information/overview/vehicleInformation', { params });
	return Object.assign(response.data, { name: 'vehicleInformationCount' });
};

// 查解封资产
export const unsealCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/unseal', { params });
	return Object.assign(response.data, { name: 'unseal' });
};

// 在建工程
export const constructApi = async (params) => {
	const response = await service.get('/yc/index/information/overview/onBuild', { params });
	return Object.assign(response.data, { name: 'build' });
};
