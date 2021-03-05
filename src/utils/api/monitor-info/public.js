import service from 'service';


/*  监控信息 => 公示公告 */

/* 招标中标 */
// 列表
export const infoListBid = params => service.get('/yc/monitor/bulletin/bidding/list', { params })
	.then(res => res.data);
// 收藏列表
export const focusListBid = params => service.get('/yc/bulletin/focus/bidding/list', { params })
	.then(res => res.data);
// 已读
export const readStatusBid = params => service.post('/yc/monitor/bulletin/bidding/read', params)
	.then(res => res.data);
// 收藏/取消收藏
export const attentionBid = (params, isAttention) => service
	.post(`/yc/monitor/bulletin/bidding/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListBid = '/yc/monitor/bulletin/bidding/exportExcel';

/* 重大税收违法 */
// 列表
export const infoListIllegal = params => service.get('/yc/monitor/bulletin/tax/list', { params })
	.then(res => res.data);
// 已读
export const readStatusIllegal = params => service.post('/yc/monitor/bulletin/tax/read', params)
	.then(res => res.data);
// 收藏/取消收藏
export const attentionIllegal = (params, isAttention) => service
	.post(`/yc/monitor/bulletin/tax/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListIllegal = '/yc/monitor/bulletin/tax/exportExcel';

// 收藏列表
export const focusListIllegal = params => service.get('/yc/bulletin/focus/tax/list', { params })
	.then(res => res.data);


/* 环境行政处罚 */
// 列表
export const infoListPunish = params => service.get('/yc/monitor/bulletin/epb/list', { params })
	.then(res => res.data);
// 已读
export const readStatusPunish = params => service.post('/yc/monitor/bulletin/epb/read', params)
	.then(res => res.data);
// 收藏/取消收藏
export const attentionPunish = (params, isAttention) => service
	.post(`/yc/monitor/bulletin/epb/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListPunish = '/yc/monitor/bulletin/epb/exportExcel';

// 收藏列表
export const focusListPunish = params => service.get('/yc/bulletin/focus/epb/list', { params })
	.then(res => res.data);

// 统计
export const infoCount = params => service.get('/yc/monitor/bulletin/unreadCountList', { params })
	.then(res => res.data);

/* 土地数据 */
// 出让结果列表 ===========
export const infoListResult = async (params) => {
	const response = await service.get('/yc/monitor/land/transfer/list', { params });
	return response.data;
};

// 标记为已读
export const readStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/land/transfer/markRead', params);
	return response.data;
};

// 全部标记为已读
export const readAllStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/land/transfer/markReadAll', params);
	return response.data;
};

// 收藏
export const attentionFollowResult = async (params) => {
	const response = await service.post('/yc/monitor/land/transfer/follow', params);
	return response.data;
};


// 收藏list
export const attentionFollowResultList = async (params) => {
	const response = await service.get('/yc/monitor/land/transfer/follow/list', { params });
	return response.data;
};

// 收藏list数量
export const attentionFollowListCount = async (params) => {
	const response = await service.get('/yc/monitor/land/transfer/follow/list-count', { params });
	return response.data;
};

// 取消收藏
export const attentionUnFollowResult = async (params) => {
	const response = await service.post('/yc/monitor/land/transfer/unFollow', params);
	return response.data;
};

// 导出excel
export const exportListResult = '/yc/monitor/land/transfer/export';

// 土地转让列表 ===========
export const infoListTransfer = async (params) => {
	const response = await service.get('/yc/monitor/land/transaction/list', { params });
	return response.data;
};
// 标记为已读
export const readStatusTransfer = async (params) => {
	const response = await service.post('/yc/monitor/land/transaction/markRead', params);
	return response.data;
};

// 全部标记为已读
export const readAllStatusTransfer = async (params) => {
	const response = await service.post('/yc/monitor/land/transaction/markReadAll', params);
	return response.data;
};

// 收藏
export const attentionFollowTransfer = async (params) => {
	const response = await service.post('/yc/monitor/land/transaction/follow', params);
	return response.data;
};

// 取消收藏
export const attentionUnFollowTransfer = async (params) => {
	const response = await service.post('/yc/monitor/land/transaction/unFollow', params);
	return response.data;
};

// 收藏list
export const attentionFollowTransferList = async (params) => {
	const response = await service.get('/yc/monitor/land/transaction/follow/list', { params });
	return response.data;
};

// 收藏list数量
export const transferFollowListCount = async (params) => {
	const response = await service.get('/yc/monitor/land/transaction/follow/list-count', { params });
	return response.data;
};

// 导出excel
export const exportListTransfer = '/yc/monitor/land/transaction/export';

// 土地抵押列表 ===========
export const infoListMortgage = async (params) => {
	const response = await service.get('/yc/monitor/land/mortgage/list', { params });
	return response.data;
};
// 标记为已读
export const readStatusMortgage = async (params) => {
	const response = await service.post('/yc/monitor/land/mortgage/markRead', params);
	return response.data;
};

// 全部标记为已读
export const readAllStatusMortgage = async (params) => {
	const response = await service.post('/yc/monitor/land/mortgage/markReadAll', params);
	return response.data;
};

// 收藏
export const attentionFollowMortgage = async (params) => {
	const response = await service.post('/yc/monitor/land/mortgage/follow', params);
	return response.data;
};

// 取消收藏
export const attentionUnFollowMortgage = async (params) => {
	const response = await service.post('/yc/monitor/land/mortgage/unFollow', params);
	return response.data;
};

// 收藏list
export const attentionFollowMortgageList = async (params) => {
	const response = await service.get('/yc/monitor/land/mortgage/follow/list', { params });
	return response.data;
};

// 收藏list数量
export const mortgageFollowListCount = async (params) => {
	const response = await service.get('/yc/monitor/land/mortgage/follow/list-count', { params });
	return response.data;
};

// 导出excel
export const exportListMortgage = '/yc/monitor/land/mortgage/export';
// =======================
export default {
	infoListBid,
	readStatusBid,
	attentionBid,
	exportListBid,
	focusListBid,
	infoListIllegal,
	readStatusIllegal,
	attentionIllegal,
	exportListIllegal,
	focusListIllegal,
	infoListPunish,
	readStatusPunish,
	attentionPunish,
	exportListPunish,
	focusListPunish,
	infoCount,
	infoListResult,
	readStatusResult,
	readAllStatusResult,
	attentionFollowResult,
	attentionUnFollowResult,
	attentionFollowResultList,
	attentionFollowListCount,
	exportListResult,
	infoListTransfer,
	readStatusTransfer,
	readAllStatusTransfer,
	attentionFollowTransfer,
	attentionFollowTransferList,
	transferFollowListCount,
	attentionUnFollowTransfer,
	exportListTransfer,
	infoListMortgage,
	readStatusMortgage,
	readAllStatusMortgage,
	attentionFollowMortgage,
	attentionUnFollowMortgage,
	attentionFollowMortgageList,
	mortgageFollowListCount,
	exportListMortgage,
};
