import service from 'service';


/*  监控信息 => 代位权/涉诉监控 */

// 收藏/取消收藏
export const attention = (params, star) => service.post(`/yc/monitor/early/warning/attention?isAttention=${star}`, params)
	.then(res => res.data);

// 导出
export const exportList = '/yc/monitor/early/warning/export';

// 统计
export const infoCount = params => service.get('/yc/monitor/early/warning/infoCount', { params })
	.then(res => res.data);

// 代位权/涉诉监控列表
export const infoList = params => service.get('/yc/monitor/early/warning/infoList', { params })
	.then(res => res.data);

// 标记已读
export const readStatus = params => service.post('/yc/monitor/early/warning/read', params)
	.then(res => res.data);

// 案件详情
export const caseDetail = params => service.get('/yc/monitor/early/warning/caseDetail', { params })
	.then(res => res.data);

// 原告被告列表
export const infoObligorList = params => service.get('/yc/monitor/early/warning/infoObligorList', { params })
	.then(res => res.data);

// 收藏列表
export const attentionList = params => service.get('/yc/monitor/focus/attentionList', { params })
	.then(res => res.data);
