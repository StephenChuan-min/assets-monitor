import s from 'service';
/* 所有无形资产的子接口，按类别分好写入对象中 */
// 无形资产=》排污权
const Dump = {
	attention: params => s.post('/yc/monitor/intangible/emission/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/intangible/emission/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/intangible/emission/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/intangible/emission/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/intangible/emission/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/intangible/emission/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/intangible/emission/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/intangible/emission/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/intangible/emission/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/intangible/emission/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/intangible/emission/un-attention', params).then(res => res.data),
};
// 无形资产=》矿业权
const Mining = {
	attention: params => s.post('/yc/monitor/intangible/mining/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/intangible/mining/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/intangible/mining/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/intangible/mining/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/intangible/mining/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/intangible/mining/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/intangible/mining/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/intangible/mining/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/intangible/mining/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/intangible/mining/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/intangible/mining/un-attention', params).then(res => res.data),

};
// 无形资产=》商标专利
const Copyright = {
// POST收藏
	attention: params => s.post('/yc/monitor/intangible/trademarkRight/follow', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/intangible/trademarkRight/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/intangible/trademarkRight/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/intangible/trademarkRight/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/intangible/trademarkRight/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/intangible/trademarkRight/follow/unFollow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/intangible/trademarkRight/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/intangible/trademarkRight/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/intangible/trademarkRight/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/intangible/trademarkRight/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/intangible/trademarkRight/unFollow', params).then(res => res.data),
};
// 无形资产=》建筑建造资质
const Construction = {
	attention: params => s.post('/yc/monitor/intangible/construct/follow', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/intangible/construct/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/intangible/construct/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/intangible/construct/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/intangible/construct/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/intangible/construct/follow/unFollow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/intangible/construct/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/intangible/construct/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/intangible/construct/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/intangible/construct/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/intangible/construct/unFollow', params).then(res => res.data),

};

// 获取不同类型的 api 接口
const Api = (type, res) => {
	if (type === 'YC020701') return Dump[res];
	if (type === 'YC020702') return Mining[res];
	if (type === 'YC020703') return Copyright[res];
	if (type === 'YC020704') return Construction[res];
	return Dump[res];
};
export {
	Dump, Mining, Copyright, Construction,
};
export default Api;
