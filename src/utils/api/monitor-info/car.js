import service from 'service';

/**
 * 【车辆信息接口】
 * @returns {Promise<*>}
 * @param params
 */
// 车辆信息列表
export const getMortgageList = async (params) => {
	const response = await service.get('/yc/monitor/vehicle/vehicleList', { params });
	return response.data;
};

// 车辆信息数量
export const getMortgageCount = async (params) => {
	const response = await service.get('/yc/monitor/vehicle/vehicleListCount', { params });
	return response.data;
};

// 标记为已读
export const postMarkRead = async (params) => {
	const response = await service.post('/yc/monitor/vehicle/markRead', params);
	return response.data;
};

// 全部标记为已读
export const postMarkReadAll = async (params) => {
	const response = await service.post('/yc/monitor/vehicle/markReadAll', params);
	return response.data;
};

// 收藏
export const postFollow = async (params) => {
	const response = await service.post('/yc/monitor/vehicle/follow', params);
	return response.data;
};

// 收藏列表
export const postFollowList = async (params) => {
	const response = await service.get('/yc/monitor/vehicle/follow/list', { params });
	return response.data;
};

// 取消收藏
export const postUnFollow = async (params) => {
	const response = await service.post('/yc/monitor/vehicle/unFollow', params);
	return response.data;
};

// 导出excel
export const exportList = '/yc/monitor/vehicle/export';
