import service from 'service';


const manage = {
	30201: {
		id: 30201,
		name: '经营-破产重组',
		params: {
			obligorName: '杭州',
			title: '2015',
		},
		list: params => service.get('/yc/business/monitor/risk/bankruptcy/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/business/monitor/risk/bankruptcy/listCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20401: {
		id: 20401,
		name: '风险-失信记录-列入',
		params: {},
		list: params => service.get('/yc/business/monitor/risk/dishonest/list?removeStatus=false', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/business/monitor/risk/dishonest/listCount?removeStatus=false', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20402: {
		id: 20402,
		name: '风险-失信记录-已移除',
		params: {},
		list: params => service.get('/yc/business/monitor/risk/dishonest/list?removeStatus=true', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/business/monitor/risk/dishonest/listCount?removeStatus=true', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20601: {
		id: 20601,
		name: '风险-涉诉-立案',
		list: params => service.get('/yc/business/monitor/risk/lawsuit/trial/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/lawsuit/trial/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20602: {
		id: 20602,
		name: '风险-涉诉-开庭',
		list: params => service.get('/yc/business/monitor/risk/lawsuit/court-notice/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/lawsuit/court-notice/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20603: {
		id: 20603,
		name: '风险-涉诉-裁判文书',
		list: params => service.get('/yc/business/monitor/risk/lawsuit/judgment-document/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/lawsuit/judgment-document/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30301: {
		id: 30301,
		name: '经营-经营异常',
		list: params => service.get('/yc/business/monitor/risk/abnormal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/abnormal/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30401: {
		id: 30401,
		name: '经营-严重违法',
		list: params => service.get('/yc/business/monitor/risk/illegal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/illegal/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30501: {
		id: 30501,
		name: '经营-税收违法',
		list: params => service.get('/yc/business/monitor/risk/tax/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/tax/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30601: {
		id: 30601,
		name: '经营-行政处罚',
		list: params => service.get('/yc/business/monitor/risk/punishment/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/punishment/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30701: {
		id: 30701,
		name: '经营-环保处罚',
		list: params => service.get('/yc/business/monitor/risk/epb/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/business/monitor/risk/epb/listCount', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
};

export default manage;
export const brokenCount = {
	20403: {
		id: 20403,
		name: '失信列表 => 已失信债务人',
		list: params => service.get('/yc/business/monitor/risk/dishonest/obligor?status=1', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/business/monitor/risk/dishonest/obligorCount?status=1', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20404: {
		id: 20404,
		name: '失信列表 => 曾失信债务人',
		list: params => service.get('/yc/business/monitor/risk/dishonest/obligor?status=2', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/business/monitor/risk/dishonest/obligorCount?status=2', { params })
			.then(res => Object.assign(res.data, { id })),
	},
};
