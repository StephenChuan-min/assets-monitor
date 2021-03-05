//  监控信息->经营风险->查解封资产
import service from 'service';

const seizedUnblock = {
	// 导出
	exportList: '/yc/monitor/unseal/export',
	// 收藏/批量收藏
	follow: params => service.post('/yc/monitor/unseal/follow', params).then(res => res.data),
	// 取消收藏/批量取消收藏
	unFollow: params => service.post('/yc/monitor/unseal/unFollow', params).then(res => res.data),
	 // 收藏列表
	followList: params => service.get('/yc/monitor/unseal/follow/list', params).then(res => res.data),
	// GET列表
	list: params => service.get('/yc/monitor/unseal/unsealList', { params }).then(res => res.data),
	// 列表数量
	listCount: params => service.get('/yc/monitor/unseal/unsealListCount', { params }).then(res => res.data),
	// 已读
	read: params => service.post('/yc/monitor/unseal/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: params => service.post('/yc/monitor/unseal/markReadAll', params).then(res => res.data),
};
export default seizedUnblock;
