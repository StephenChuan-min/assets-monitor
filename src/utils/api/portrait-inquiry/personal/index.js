import service from 'service';

const collection = {
	auction: {
		id: 10101,
		name: '资产-资产拍卖-精准匹配',
		params: { companyId: 3280438 },
		list: params => service.get('/yc/search/portrait/company/asset/auction/precision/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/auction/precision/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	judgment: {
		id: 10203,
		name: '资产-代位权-裁判文书',
		params: { partiesName: '中国民生银行股份有限公司', caseNumber: '苏' },
		list: params => service.get('/yc/search/portrait/personal/asset/subrogation/judgment-document/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/personal/asset/subrogation/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},

	judgmentL: {
		id: 20101,
		name: '风险-涉诉文书',
		params: {},
		list: params => service.get('/yc/search/portrait/company/lawsuit/judgment-document/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	dishonest: {
		id: 20201,
		name: '风险-失信记录',
		params: {},
		list: params => service.get('/yc/search/portrait/company/lawsuit/dishonest/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/dishonest/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	tax: {
		id: 20301,
		name: '风险-税收违法',
		params: { obName: '贸易' },
		list: params => service.get('/yc/search/portrait/company/management/tax/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/tax/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
};
export default collection;
