import service, { serviceFile } from 'service';

/**
 * 【业务管理接口】
 * @returns {Promise<*>}
 * @param params
 */
// 业务列表[C.H Wong]
export const businessList = async (params) => {
	const response = await service.get('/yc/business/list', { params });
	return response.data;
};

// 开启推送[C.H Wong]
export const openPush = async (params) => {
	const response = await service.post('/yc/business/openPush', params);
	return response.data;
};

// 关闭推送[C.H Wong]
export const closePush = async (params) => {
	const response = await service.post('/yc/business/closePush', params);
	return response.data;
};

// 删除一条记录[C.H Wong]
export const postDelete = async (params) => {
	const response = await serviceFile.post('/yc/business/delete', params);
	return response.data;
};

// 批量删除记录[C.H Wong]
export const postDeleteBatch = async (params) => {
	const response = await serviceFile.post('/yc/business/deleteBatch', params);
	return response.data;
};

// 获取业务基本详情[C.H Wong]
export const getDetail = async (id) => {
	const response = await service.get(`/yc/business/detail/${id}`);
	return response.data;
};

// 列表页导出excel[C.H Wong]
export const exportExcel = '/yc/business/exportExcel';

// 获取担保人列表[C.H Wong]
export const postGuaranteeList = async (businessId) => {
	const response = await service.post(`/yc/obligor/getGuaranteeList/${businessId}`);
	return response.data;
};

// 债务人详情页[C.H Wong]
export const detail = async (id) => {
	const response = await service.post(`/yc/obligor/detail/${id}`);
	return response.data;
};

// 编辑业务[C.H Wong]
export const save = async (id, params) => {
	const response = await serviceFile.post(`/yc/business/save/${id}`, params);
	return response.data;
};

// 业务修改记录列表[C.H Wong]
export const businessChange = async (businessId, params) => {
	const response = await service.get(`/yc/businessChange/list/${businessId}`, { params });
	return response.data;
};

// 机构未读数量统计总览[C.H Wong]
export const viewCount = businessId => service.get(`/yc/business/monitor/overview/${businessId}`, { })
	.then(res => res.data);

// 导出业务视图pdf
export const exportListBusiness = '/yc/business/monitor/download';

// 导出债务人pdf
export const exportListDebtor = '/yc/obligor/monitor/download';
