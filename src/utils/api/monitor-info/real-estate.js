import service from 'service';

/**
 * 【不动产接口】
 * @returns {Promise<*>}
 * @param params
 */
// 不动产列表
export const getMortgageList = async (params) => {
	const response = await service.get('/yc/monitor/estateRegister/estateRegisterList', { params });
	return response.data;
};

// 标记为已读
export const postMarkRead = async (params) => {
	const response = await service.post('/yc/monitor/estateRegister/markRead', params);
	return response.data;
};

// 全部标记为已读
export const postMarkReadAll = async (params) => {
	const response = await service.post('/yc/monitor/estateRegister/markReadAll', params);
	return response.data;
};

// 收藏
export const postFollow = async (params) => {
	const response = await service.post('/yc/monitor/estateRegister/follow', params);
	return response.data;
};

// 收藏列表
export const postFollowList = async (params) => {
	const response = await service.get('/yc/monitor/estateRegister/follow/list', { params });
	return response.data;
};

// 取消收藏
export const postUnFollow = async (params) => {
	const response = await service.post('/yc/monitor/estateRegister/unFollow', params);
	return response.data;
};
// 收藏列表
export const attentionFollowListResult = async (params) => {
	const response = await service.get('/yc/monitor/estateRegister/follow/list', { params });
	return response.data;
};

// 导出excel
export const exportList = '/yc/monitor/estateRegister/export';
