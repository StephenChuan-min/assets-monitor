import service from 'service';


/**
 * 【消息中心接口】
 * @returns {Promise<*>}
 * @param params
 */
// 消息中心列表
export const centerList = async (params) => {
	const response = await service.get('/yc/message/station/list', { params });
	return response.data;
};


// 消息提醒
export const notify = async (params) => {
	const response = await service.get('/yc/message/station/notify', { params });
	return response.data;
};

// 站内信已读
export const isRead = async (params) => {
	const response = await service.post('/yc/message/station/read', params);
	return response.data;
};

// 站内信删除
export const getDelete = async (params) => {
	const response = await service.post('/yc/message/station/delete', params);
	return response.data;
};

// 未读消息数量提醒 [zhouSai]
export const unreadCount = async (params) => {
	const response = await service.get('/yc/message/station/notify/unreadCount', { params });
	return response.data;
};
