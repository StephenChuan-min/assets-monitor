import service from 'service';

/* 无形资产 */
const intangible = {
	10401: {
		id: 10401,
		name: '无形资产-排污权许可证',
		list: params => service.get('/yc/obligor/monitor/asset/intangible/emission/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/intangible/emission/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10402: {
		id: 10402,
		name: '无形资产-采矿权许可证',
		list: params => service.get('/yc/obligor/monitor/asset/intangible/mining/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/intangible/mining/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10403: {
		id: 10403,
		name: '无形资产-商标专利',
		list: params => service.get('/yc/obligor/monitor/asset/intangible/trademarkRight/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/intangible/trademarkRight/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10404: {
		id: 10404,
		name: '无形资产-建筑建造资质',
		list: params => service.get('/yc/obligor/monitor/asset/intangible/construct/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/intangible/construct/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
};

/* 债务人、业务详情- 资产 */
const assets = {
	10101: {
		id: 10101,
		name: '资产-资产拍卖-精准匹配',
		list: params => service.get('/yc/obligor/monitor/asset/auction/list?important=1', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/auction/list-count?important=1', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10102: {
		id: 10102,
		name: '资产-资产拍卖-模糊匹配',
		list: params => service.get('/yc/obligor/monitor/asset/auction/list?important=0', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/auction/list-count?important=0', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	...intangible,
	10201: {
		id: 10201,
		name: '资产-代位权-立案',
		list: params => service.get('/yc/obligor/monitor/asset/subrogation/trial/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/subrogation/trial/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10202: {
		id: 10202,
		name: '资产-代位权-开庭',
		list: params => service.get('/yc/obligor/monitor/asset/subrogation/court-notice/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/subrogation/court-notice/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10203: {
		id: 10203,
		name: '资产-代位权-裁判文书',
		list: params => service.get('/yc/obligor/monitor/asset/subrogation/judgment-document/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/subrogation/judgment-document/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10301: {
		id: 10301,
		name: '资产-土地信息-出让结果',
		list: params => service.get('/yc/obligor/monitor/asset/land/transfer/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/land/transfer/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10302: {
		id: 10302,
		name: '资产-土地信息-土地转让',
		list: params => service.get('/yc/obligor/monitor/asset/land/transaction/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/land/transaction/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10303: {
		id: 10303,
		name: '资产-土地信息-土地抵押',
		list: params => service.get('/yc/obligor/monitor/asset/land/mortgage/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/land/mortgage/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10501: {
		id: 10501,
		name: '资产-股权质押-出质',
		list: params => service.get('/yc/obligor/monitor/asset/pledgee/pledgor/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/pledgee/pledgor/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10502: {
		id: 10502,
		name: '资产-股权质押-质权',
		list: params => service.get('/yc/obligor/monitor/asset/pledgee/pledgee/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/pledgee/pledgee/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10601: {
		id: 10601,
		name: '资产-动产抵押-抵押物所有人',
		list: params => service.get('/yc/obligor/monitor/asset/mortgage/owner/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/mortgage/owner/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10602: {
		id: 10602,
		name: '资产-动产抵押-抵押权',
		list: params => service.get('/yc/obligor/monitor/asset/mortgage/people/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/mortgage/people/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10701: {
		id: 10701,
		name: '资产-招标中标',
		list: params => service.get('/yc/obligor/monitor/asset/bidding/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/bidding/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10801: {
		id: 10801,
		name: '资产-金融资产-竞价项目',
		list: params => service.get('/yc/obligor/monitor/asset/finance/auctionBidding/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/finance/auctionBidding/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10802: {
		id: 10802,
		name: '资产-金融资产-招商项目',
		list: params => service.get('/yc/obligor/monitor/asset/finance/financeInvestment/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/finance/financeInvestment/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10803: {
		id: 10803,
		name: '资产-金融资产-公示项目',
		list: params => service.get('/yc/obligor/monitor/asset/finance/finance/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/finance/finance/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	10901: {
		id: 10901,
		name: '资产-查/解封资产',
		list: params => service.get('/yc/obligor/monitor/asset/unseal/unsealList', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/unseal/unsealListCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	11001: {
		id: 11001,
		name: '资产-不动产登记',
		list: params => service.get('/yc/obligor/monitor/asset/estateRegister/estateRegisterList?matchType=1', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/estateRegister/estateRegisterListCount?matchType=1', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	11002: {
		id: 11002,
		name: '资产-不动产登记',
		list: params => service.get('/yc/obligor/monitor/asset/estateRegister/estateRegisterList?matchType=2', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/estateRegister/estateRegisterListCount?matchType=2', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	11101: {
		id: 11101,
		name: '资产-车辆信息',
		list: params => service.get('/yc/obligor/monitor/asset/vehicle/vehicleList', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/vehicle/vehicleListCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	11201: {
		id: 11201,
		name: '资产-在建工程-建设单位',
		list: params => service.get('/yc/obligor/monitor/asset/onBuildProjectInfo/onBuildProjectInfoList', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/onBuildProjectInfo/onBuildProjectInfoListCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	11202: {
		id: 11202,
		name: '资产-在建工程-中标单位',
		list: params => service.get('/yc/obligor/monitor/asset/onBuildBid/onBuildBidList', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/onBuildBid/onBuildBidListCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	11203: {
		id: 11203,
		name: '资产-在建工程-施工单位',
		list: params => service.get('/yc/obligor/monitor/asset/onBuildLicence/onBuildLicenceList', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/asset/onBuildLicence/onBuildLicenceListCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
};
export default assets;
