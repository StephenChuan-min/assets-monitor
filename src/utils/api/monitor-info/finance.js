import service from 'service';


/*  监控信息 => 金融资产 => 竞价项目 [C.H Wong] 6 */
// 竞价项目 监控列表页
export const infoListBid = params => service.get('/yc/monitor/finance/auctionBidding/list', { params })
	.then(res => res.data);

// 竞价项目 收藏列表
export const attentionListBid = params => service.get('/yc/monitor/finance/auctionBidding/follow/list', { params })
	.then(res => res.data);

// 竞价项目 列表数量
export const infoListCountBid = params => service.get('/yc/monitor/finance/auctionBidding/listCount', { params })
	.then(res => ({ ...res.data, id: 1 }));

// 竞价项目 标记为已读
export const readStatusBid = async (params) => {
	const response = await service.post('/yc/monitor/finance/auctionBidding/markRead', params);
	return response.data;
};

// 竞价项目 全部标记为已读
export const readAllStatusBid = async (params) => {
	const response = await service.post('/yc/monitor/finance/auctionBidding/markReadAll', params);
	return response.data;
};

// 竞价项目 收藏 [批量]
export const followBid = params => service.post('/yc/monitor/finance/auctionBidding/follow', params)
	.then(res => res.data);

// 竞价项目 收藏 [单个]
export const followSingleBid = params => service.post('/yc/monitor/finance/auctionBidding/follow', params)
	.then(res => res.data);

// 竞价项目 收藏列表数量统计
export const attentionFollowBidCount = params => service.get('/yc/monitor/finance/auctionBidding/follow/listCount', { params })
	.then(res => ({ ...res.data, name: 'bid' }));

// 竞价项目 取消收藏 [单个]
export const unFollowSingleBid = params => service.post('/yc/monitor/finance/auctionBidding/unFollow', params)
	.then(res => res.data);

// 竞价项目 导出excel
export const exportListBid = '/yc/monitor/finance/auctionBidding/export';

/* V2.5 监控信息 =>金融资产 => 招商项目 [youyu] */

// 招商项目 列表
export const infoListMerchants = async (params) => {
	const response = await service.get('/yc/monitor/finance/investment/financeInvestmentList', { params });
	return response.data;
};

// 招商项目 列表数量
export const infoListCountMerchants = params => service.get('/yc/monitor/finance/investment/financeInvestmentCount', { params }).then(res => ({ ...res.data, id: 2 }));

// 招商项目 收藏/批量收藏
export const followMerchants = params => service.post('/yc/monitor/finance/investment/follow', params)
	.then(res => res.data);

// 招商项目 取消收藏/批量取消收藏
export const unFollowMerchants = params => service.post('/yc/monitor/finance/investment/unFollow', params)
	.then(res => res.data);

// 招商项目 收藏列表
export const attentionListMerchants = params => service.get('/yc/monitor/finance/investment/follow/list', { params })
	.then(res => res.data);

// 招商项目 收藏列表数量统计
export const attentionFollowCountMerchants = params => service.get('/yc/monitor/finance/investment/follow/list-count', { params }).then(res => ({ ...res.data, name: 'merchants' }));

// 招商项目 已读
export const readStatusMerchants = params => service.post('/yc/monitor/finance/investment/markRead', params)
	.then(res => res.data);

// 招商项目 全部标记为已读
export const readAllStatusMerchants = async (params) => {
	const response = await service.post('/yc/monitor/finance/investment/markReadAll', params);
	return response.data;
};

// 招商项目 导出excel
export const exportListMerchants = '/yc/monitor/finance/investment/export';

/* 监控信息 => 金融资产 => 公示项目 监控[C.H Wong] 9 */
// 公示项目 列表
export const infoListPub = params => service.get('/yc/monitor/finance/finance/list', { params })
	.then(res => res.data);

// 公示项目 列表数量
export const infoListCountPub = params => service.get('/yc/monitor/finance/finance/listCount', { params })
	.then(res => ({ ...res.data, id: 3 }));

// 公示项目 我的收藏列表
export const attentionListPub = params => service.get('/yc/monitor/finance/finance/follow/list', { params })
	.then(res => res.data);

// 招商项目 收藏列表数量统计
export const attentionFollowCountPub = params => service.get('/yc/monitor/finance/finance/follow/listCount', { params }).then(res => ({ ...res.data, name: 'pub' }));

// 公示项目 数量统计
export const attentionFollowPubCount = params => service.get('/yc/monitor/finance/finance/follow/listCount', { params })
	.then(res => res.data);

// 公示项目 已读
export const readStatus = params => service.post('/yc/monitor/finance/finance/markRead', params)
	.then(res => res.data);

// 公示项目 全部标记已读
export const readAllStatusPub = params => service.post('/yc/monitor/finance/finance/markReadAll', params)
	.then(res => res.data);

// 公示项目 批量标记已读
export const readStatusBatch = params => service.post('/yc/monitor/finance/finance/markReadBatch', params)
	.then(res => res.data);

// 公示项目 收藏 [批量]
export const followPub = params => service.post('/yc/monitor/finance/finance/follow', params)
	.then(res => res.data);

// 公示项目 收藏 [单个]
export const followSinglePub = params => service.post('/yc/monitor/finance/finance/follow', params)
	.then(res => res.data);

// 公示项目 取消收藏 [单个]
export const unFollowPub = params => service.post('/yc/monitor/finance/finance/unFollow', params)
	.then(res => res.data);

// 公示项目 导出excel
export const exportListPub = '/yc/monitor/finance/finance/export';


export default {
	infoListBid, // 竞价项目 列表
	infoListCountBid, // 竞价项目 列表数量
	attentionListBid, // 竞价项目 收藏列表
	followBid, // 竞价项目 批量收藏
	followSingleBid, // 竞价项目 收藏[单个]
	unFollowSingleBid, // 竞价项目 取消批量收藏
	attentionFollowBidCount, // 竞价项目 收藏列表数量
	exportListBid, // 竞价项目 导出

	infoListMerchants, // 招商项目 列表
	infoListCountMerchants, // 招商项目 列表数量
	attentionListMerchants, // 招商项目 收藏列表
	attentionFollowCountMerchants, // 招商项目 我的收藏列表数量
	followMerchants, 	// 招商项目 批量收藏
	unFollowMerchants, 	// 招商项目 取消批量收藏
	readAllStatusMerchants, // 招商项目 全部标记为已读
	exportListMerchants, // 招商项目 导出

	infoListPub, 	// 公示项目 列表
	infoListCountPub, // 公示项目 列表数量
	attentionListPub, // 公示项目 我的收藏列表
	attentionFollowCountPub, // 公示项目 我的收藏列表数量
	followPub, // 公示项目 批量收藏
	unFollowPub, // 公示项目 取消批量收藏
	followSinglePub, // 公示项目 收藏 [单个]
	attentionFollowPubCount, // 公示项目
	readAllStatusPub, // 公示项目 全部标记为已读
	exportListPub, // 公示项目 导出
};
