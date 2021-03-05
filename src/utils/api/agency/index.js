import service from 'service';

// 添加下级机构 [youyu]
export const addNextOrg = async (params) => {
	const response = await service.post('/yc/agent/addNextOrg', params);
	return response.data;
};

// 编辑机构
export const editOrg = async (params) => {
	const response = await service.post('/yc/agent/editOrg', params);
	return response.data;
};

// 删除机构
export const deleteOrg = async (params) => {
	const response = await service.post(`/yc/agent/deleteOrg?orgId=${params.orgId}`);
	return response.data;
};

// 获取机构树
export const orgTree = async (params) => {
	const response = await service.get('/yc/agent/orgTree', params);
	return response.data;
};

// 获取机构数
export const getOrgTree = async (params) => {
	const response = await service.get('/yc/agent/orgTree', params);
	return response.data;
};

// 添加新账号
export const addUser = async (params) => {
	const response = await service.post('/yc/agent/user/addUser', params);
	return response.data;
};

// 重置密码
export const resetPassword = async (params) => {
	const response = await service.post(`/yc/agent/user/changePassword?userId=${params.userId}`);
	return response.data;
};

// 删除账号
export const deleteUser = async (params) => {
	const response = await service.post(`/yc/agent/user/deleteUser?userId=${params.userId}`);
	return response.data;
};

// 获取当前机构账户列表
export const getUserList = async (params) => {
	const response = await service.get(`/yc/agent/orgUser?id=${params.id}`);
	return response.data;
};

// 编辑账号
export const modifyUser = async (params) => {
	const response = await service.post('/yc/agent/user/modifyUser', params);
	return response.data;
};
