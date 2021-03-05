import service from 'service';


/*   监控信息=>司法拍卖监控[C.H Wong] */

// 列表
export const infoList = params => service.get('/yc/monitor/auction/list', { params })
	.then(res => res.data);
// 已读
export const readStatus = params => service.post('/yc/monitor/auction/read', params)
	.then(res => res.data);

// 收藏 [批量]
export const follow = params => service.post('/yc/monitor/auction/followBatch', params)
	.then(res => res.data);

// 收藏 [单个]
export const followSingle = params => service.post('/yc/monitor/auction/follow', params)
	.then(res => res.data);

// 取消收藏 [单个]
export const unFollowSingle = params => service.post('/yc/monitor/auction/unfollow', params)
	.then(res => res.data);

// 收藏列表
export const attentionList = params => service.get('/yc/monitor/auction/attentionList', { params })
	.then(res => res.data);
// 导出
export const exportList = '/yc/monitor/auction/exportExcel';

// 司法拍卖监控搜索统计数字
export const infoCount = params => service.get('/yc/monitor/auction/processCount', { params })
	.then(res => res.data);
// 首页重要信息提醒列表已读
export const markReadStatus = params => service.post('/yc/monitor/auction/markRead', params)
	.then(res => res.data);
