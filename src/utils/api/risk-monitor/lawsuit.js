import s from 'service';

// (新)监控信息 => 代位权 => 立案监控 [ZhouSai]11
const Trial = {
	// POST收藏
	attention: params => s.post('/yc/monitor/trial/lawsuit/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/trial/lawsuit/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/trial/lawsuit/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/trial/lawsuit/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/trial/lawsuit/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/trial/lawsuit/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/trial/lawsuit/list', { params }).then(res => Object.assign(res.data,
		{ selectType: params.selectType })),
	// GET列表count
	listCount: params => s.get('/yc/monitor/trial/lawsuit/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/trial/lawsuit/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/trial/lawsuit/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/trial/lawsuit/un-attention', params).then(res => res.data),
	// GET列表数据，含未读已读
	listReadCount: (data) => {
		const result = {};
		const count = params => s.get('/yc/monitor/trial/lawsuit/list-count', { params }).then(res => res.data);
		return count(data).then((res) => {
			if (res.code === 200) result.count = res.data;
			return count(Object.assign({}, { isRead: false }));
		}).then((res) => {
			if (res.code === 200) result.unRead = res.data;
			return result;
		});
	},
};
// (新)监控信息 => 代位权 => 开庭公告 [ZhouSai]11
const Court = {
	// POST收藏
	attention: params => s.post('/yc/monitor/court/lawsuit/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/court/lawsuit/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/court/lawsuit/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/court/lawsuit/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/court/lawsuit/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/court/lawsuit/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/court/lawsuit/list', { params }).then(res => Object.assign(res.data,
		{ selectType: params.selectType })),
	// GET列表count
	listCount: params => s.get('/yc/monitor/court/lawsuit/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/court/lawsuit/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/court/lawsuit/read-all', { }).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/court/lawsuit/un-attention', params).then(res => res.data),
	// GET列表数据，含未读已读
	listReadCount: (data) => {
		const result = {};
		const count = params => s.get('/yc/monitor/court/lawsuit/list-count', { params }).then(res => res.data);
		return count(data).then((res) => {
			if (res.code === 200) result.count = res.data;
			return count(Object.assign({}, { isRead: false }));
		}).then((res) => {
			if (res.code === 200) result.unRead = res.data;
			return result;
		});
	},
};
// (新)监控信息 => 代位权 => 裁判文书 [ZhouSai]11
const Judgment = {
	// POST收藏
	attention: params => s.post('/yc/monitor/judgment/lawsuit/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/judgment/lawsuit/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/judgment/lawsuit/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/judgment/lawsuit/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/judgment/lawsuit/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/judgment/lawsuit/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/judgment/lawsuit/list', { params }).then(res => Object.assign(res.data,
		{ selectType: params.selectType })),
	// GET列表count
	listCount: params => s.get('/yc/monitor/judgment/lawsuit/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/judgment/lawsuit/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/judgment/lawsuit/read-all', { }).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/judgment/lawsuit/un-attention', params).then(res => res.data),
	// GET列表数据，含未读已读
	listReadCount: (data) => {
		const result = {};
		const count = params => s.get('/yc/monitor/judgment/lawsuit/list-count', { params }).then(res => res.data);
		return count(data).then((res) => {
			if (res.code === 200) result.count = res.data;
			return count(Object.assign({}, { isRead: false }));
		}).then((res) => {
			if (res.code === 200) result.unRead = res.data;
			return result;
		});
	},
};
// 获取不同类型的 api 接口
const Api = (type, res) => {
	if (type === 1) return Trial[res];
	if (type === 2) return Court[res];
	if (type === 3) return Judgment[res];
	return Trial[res];
};
export { Court, Trial, Judgment };
export default Api;
