import service from 'service';


/*  监控信息=>破产监控相关接口 */

// 破产监控列表页
export const infoList = params => service.get('/yc/monitor/bankruptcy/list', { params })
	.then(res => res.data);

// 收藏列表
export const attentionList = params => service.get('/yc/monitor/bankruptcy/attentionList', { params })
	.then(res => res.data);

// 标记已读[批量]
export const readStatus = params => service.post('/yc/monitor/bankruptcy/markReadBatch', params)
	.then(res => res.data);

// 收藏 [批量]
export const follow = params => service.post('/yc/monitor/bankruptcy/followBatch', params)
	.then(res => res.data);

// 收藏 [单个]
export const followSingle = params => service.post('/yc/monitor/bankruptcy/follow', params)
	.then(res => res.data);

// 取消收藏 [单个]
export const unFollowSingle = params => service.post('/yc/monitor/bankruptcy/unfollow', params)
	.then(res => res.data);

// 导出excel
export const exportList = '/yc/monitor/bankruptcy/exportExcel';

// 立案弹窗
export const trialDetail = params => service.get('/yc/monitor/bankruptcy/trialDetail', { params })
	.then(res => res.data);

// 信息立案
export const infoTrialDetail = params => service.get('/yc/information/bankruptcy/trialDetail', { params })
	.then(res => res.data);
