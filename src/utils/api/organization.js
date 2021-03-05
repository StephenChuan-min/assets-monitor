import service from 'service';


/**
 * 【机构管理接口】
 * @returns {Promise<*>}
 * @param params
 */
// 推送设置列表[C.H Wong]
export const pushManagerList = async (params) => {
	const response = await service.get('/yc/pushManager/list', { params });
	return response.data;
};

// 删除[C.H Wong]
export const deleteList = async (params) => {
	const response = await service.post('/yc/pushManager/delete', params);
	return response.data;
};

// 修改及保存
export const saveList = async (params) => {
	const response = await service.post('/yc/pushManager/save', params);
	return response.data;
};

// 账号列表
export const userManageList = async (params) => {
	const response = await service.get('/yc/userManage/userList', { params });
	return response.data;
};

// 推荐操作
export const operateTypeList = async (params) => {
	const response = await service.get('/yc/userManage/operateTypeList', { params });
	return response.data;
};

// 操作记录列表
export const userOperateList = async (params) => {
	const response = await service.get('/yc/userManage/userOperateList', { params });
	return response.data;
};
// 用户角色列表
export const RoleList = async (params) => {
	const response = await service.get('/yc/userManage/listRole', { params });
	return response.data;
};
