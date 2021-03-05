import service from 'service';
// =============== 股权质押 ==============

// 股权质押 列表
export const infoListResult = async (params) => {
	const response = await service.get('/yc/monitor/pledge/list', { params });
	return response.data;
};
// 股权质押 收藏列表
export const attentionFollowListResult = async (params) => {
	const response = await service.get('/yc/monitor/pledge/follow/list', { params });
	return response.data;
};

// 收藏list数量
export const attentionFollowResultCount = async (params) => {
	const response = await service.get('/yc/monitor/pledge/follow/list-count', { params });
	return response.data;
};

// 标记为已读
export const readStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/pledge/markRead', params);
	return response.data;
};

// 全部标记为已读
export const readAllStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/pledge/markReadAll', params);
	return response.data;
};

// 收藏
export const followResult = async (params) => {
	const response = await service.post('/yc/monitor/pledge/follow', params);
	return response.data;
};

// 取消收藏
export const unFollowResult = async (params) => {
	const response = await service.post('/yc/monitor/pledge/unFollow', params);
	return response.data;
};

// 导出excel
export const exportListResult = '/yc/monitor/pledge/export';


export default {
	infoListResult,
	attentionFollowListResult,
	attentionFollowResultCount,
	readStatusResult,
	readAllStatusResult,
	followResult,
	unFollowResult,
	exportListResult,
};
