import s from 'service'; // axios

//  在建工程 - 建设单位
const ConstructApi = {
	// POST收藏
	attention: params => s.post('/yc/monitor/onBuild/projectInfo/follow', params).then(res => res.data),
	// 导出
	exportList: '/yc/monitor/onBuild/projectInfo/export',
	// POST收藏 => 收藏
	followAttention: params => s.post('/yc/monitor/onBuild/projectInfo/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/onBuild/projectInfo/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/onBuild/projectInfo/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/onBuild/projectInfo/follow/unFollow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/onBuild/projectInfo/projectInfoList', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/onBuild/projectInfo/projectInfoCount', { params }).then(res => Object.assign(res.data, { id: 'YC021201' })),
	// POST已读
	read: params => s.post('/yc/monitor/onBuild/projectInfo/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/onBuild/projectInfo/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/onBuild/projectInfo/unFollow', params).then(res => res.data),
};

//  在建工程 - 中标单位
const WinbidApi = {
	// GET导出
	exportList: '/yc/monitor/onBuild/bidding/export',
	// GET列表
	list: params => s.get('/yc/monitor/onBuild/bidding/projectBiddingList', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/onBuild/bidding/projectBiddingCount', { params }).then(res => Object.assign(res.data, { id: 'YC021202' })),
	// POST已读
	read: params => s.post('/yc/monitor/onBuild/bidding/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/onBuild/bidding/markReadAll', {}).then(res => res.data),
	// POST收藏
	attention: params => s.post('/yc/monitor/onBuild/bidding/follow', params).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/onBuild/bidding/unFollow', params).then(res => res.data),
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/onBuild/bidding/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/onBuild/bidding/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/onBuild/bidding/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/onBuild/bidding/follow/unFollow', params).then(res => res.data),
};

//  在建工程 - 施工单位
const UnderwayApi = {
	// POST收藏
	attention: params => s.post('/yc/monitor/onBuild/constructionLicence/follow', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/onBuild/constructionLicence/export',
	// POST收藏 => 收藏
	followAttention: params => s.post('/yc/monitor/onBuild/constructionLicence/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/onBuild/constructionLicence/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/onBuild/constructionLicence/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/onBuild/constructionLicence/follow/unFollow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/onBuild/constructionLicence/constructionLicenceList', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/onBuild/constructionLicence/constructionLicenceCount', { params }).then(res => Object.assign(res.data, { id: 'YC021203' })),
	// POST已读
	read: params => s.post('/yc/monitor/onBuild/constructionLicence/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/onBuild/constructionLicence/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/onBuild/constructionLicence/unFollow', params).then(res => res.data),
};

// 获取不同类型的 api 接口
const Api = (type, res) => {
	if (type === 'YC021201') return ConstructApi[res];
	if (type === 'YC021202') return WinbidApi[res];
	if (type === 'YC021203') return UnderwayApi[res];
	return ConstructApi[res];
};
export {
	ConstructApi, WinbidApi, UnderwayApi,
};
export default Api;
