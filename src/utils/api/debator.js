import service from 'service';

/**
 * 【业务管理接口】
 * @returns {Promise<*>}
 * @param params
 */
// 债务人列表[C.H Wong]
export const obligorList = async (params) => {
	const response = await service.get('/yc/obligor/list', { params });
	return response.data;
};

// 开启推送[C.H Wong]
export const openPush = async (params) => {
	const response = await service.post('/yc/obligor/openPush', params);
	return response.data;
};

// 关闭推送[C.H Wong]
export const closePush = async (params) => {
	const response = await service.post('/yc/obligor/closePush', params);
	return response.data;
};

// 列表页导出excel[C.H Wong]
export const exportExcel = '/yc/obligor/exportExcel';
