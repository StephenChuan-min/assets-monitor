import s from 'service';

// (新)监控信息 => 代位权 => 立案监控 [ZhouSai]11
const Trial = {
	// POST收藏
	attention: params => s.post('/yc/monitor/trial/subrogation/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/trial/subrogation/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/trial/subrogation/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/trial/subrogation/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/trial/subrogation/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/trial/subrogation/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/trial/subrogation/list', { params }).then(res => Object.assign(res.data,
		{ selectType: params.selectType })),
	// GET列表count
	listCount: params => s.get('/yc/monitor/trial/subrogation/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/trial/subrogation/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/trial/subrogation/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/trial/subrogation/un-attention', params).then(res => res.data),
	// GET列表数据，含未读已读
	listReadCount: (data) => {
		const result = {};
		const count = params => s.get('/yc/monitor/trial/subrogation/list-count', { params }).then(res => res.data);
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
	attention: params => s.post('/yc/monitor/court/subrogation/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/court/subrogation/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/court/subrogation/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/court/subrogation/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/court/subrogation/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/court/subrogation/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/court/subrogation/list', { params }).then(res => Object.assign(res.data,
		{ selectType: params.selectType })),
	// GET列表count
	listCount: params => s.get('/yc/monitor/court/subrogation/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/court/subrogation/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/court/subrogation/read-all', { }).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/court/subrogation/un-attention', params).then(res => res.data),
	// GET列表数据，含未读已读
	listReadCount: (data) => {
		const result = {};
		const count = params => s.get('/yc/monitor/court/subrogation/list-count', { params }).then(res => res.data);
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
	attention: params => s.post('/yc/monitor/judgment/subrogation/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/judgment/subrogation/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/judgment/subrogation/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/judgment/subrogation/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/judgment/subrogation/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/judgment/subrogation/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/judgment/subrogation/list', { params }).then(res => Object.assign(res.data,
		{ selectType: params.selectType })),
	// GET列表count
	listCount: params => s.get('/yc/monitor/judgment/subrogation/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/judgment/subrogation/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/judgment/subrogation/read-all', { }).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/judgment/subrogation/un-attention', params).then(res => res.data),
	// GET列表数据，含未读已读
	listReadCount: (data) => {
		const result = {};
		const count = params => s.get('/yc/monitor/judgment/subrogation/list-count', { params }).then(res => res.data);
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
