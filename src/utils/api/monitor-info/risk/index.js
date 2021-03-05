import service from 'service';
/*
* 2.0 信息概览风险监控卡片接口
*
*/

// 破产重组
export const bankruptcyCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/bankruptcy', { params });
	return Object.assign(response.data, { name: 'bankruptcy' });
};

// 失信
export const dishonestCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/dishonest', { params });
	return Object.assign(response.data, { name: 'dishonest' });
};

// 涉诉
export const litigationCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/litigation', { params });
	return Object.assign(response.data, { name: 'litigation' });
};

// 经营风险
export const riskCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/risk', { params });
	return Object.assign(response.data, { name: 'risk' });
};

// 限制高消费
export const limitHeightCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/limitHeight', { params });
	return Object.assign(response.data, { name: 'limitHeight' });
};
