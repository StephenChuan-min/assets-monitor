import service from 'service';

/* 无形资产 */
const intangible = {
	10401: {
		id: 10401,
		name: '无形资产-排污权许可证',
		list: params => service.get('/yc/business/monitor/asset/intangible/emission/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/intangible/emission/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10402: {
		id: 10402,
		name: '无形资产-采矿权许可证',
		list: params => service.get('/yc/business/monitor/asset/intangible/mining/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/intangible/mining/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10403: {
		id: 10403,
		name: '无形资产-商标专利',
		list: params => service.get('/yc/business/monitor/asset/intangible/trademark/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/intangible/trademark/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10404: {
		id: 10404,
		name: '无形资产-建筑建造资质',
		list: params => service.get('/yc/business/monitor/asset/intangible/construct/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/intangible/construct/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
};

/* 债务人、业务详情- 资产 */
const assets = {
	10101: {
		id: 10101,
		name: '资产-资产拍卖-精准匹配',
		list: params => service.get('/yc/business/monitor/asset/auction/accurate/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/auction/accurate/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10102: {
		id: 10102,
		name: '资产-资产拍卖-模糊匹配',
		list: params => service.get('/yc/business/monitor/asset/auction/fuzzy/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/auction/fuzzy/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	...intangible,
	10201: {
		id: 10201,
		name: '资产-代位权-立案',
		list: params => service.get('/yc/business/monitor/asset/subrogation/trial/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/subrogation/trial/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10202: {
		id: 10202,
		name: '资产-代位权-开庭',
		list: params => service.get('/yc/business/monitor/asset/subrogation/court-notice/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/subrogation/court-notice/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10203: {
		id: 10203,
		name: '资产-代位权-裁判文书',
		list: params => service.get('/yc/business/monitor/asset/subrogation/judgment-document/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/subrogation/judgment-document/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10301: {
		id: 10301,
		name: '资产-土地信息-出让结果',
		list: params => service.get('/yc/business/monitor/asset/land/transfer/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/land/transfer/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10302: {
		id: 10302,
		name: '资产-土地信息-土地转让',
		list: params => service.get('/yc/business/monitor/asset/land/transaction/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/land/transaction/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10303: {
		id: 10303,
		name: '资产-土地信息-土地抵押',
		list: params => service.get('/yc/business/monitor/asset/land/mortgage/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/land/mortgage/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10501: {
		id: 10501,
		name: '资产-股权质押-出质',
		list: params => service.get('/yc/business/monitor/asset/pledgee/pledgor/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/pledgee/pledgor/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10502: {
		id: 10502,
		name: '资产-股权质押-质权',
		list: params => service.get('/yc/business/monitor/asset/pledgee/pledgee/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/pledgee/pledgee/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10601: {
		id: 10601,
		name: '资产-动产抵押-抵押物所有人',
		list: params => service.get('/yc/business/monitor/asset/mortgage/owner/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/mortgage/owner/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10602: {
		id: 10602,
		name: '资产-动产抵押-抵押权人',
		list: params => service.get('/yc/business/monitor/asset/mortgage/people/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/mortgage/people/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10701: {
		id: 10701,
		name: '资产-招标中标',
		list: params => service.get('/yc/business/monitor/asset/bidding/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/asset/bidding/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
};
export default assets;
