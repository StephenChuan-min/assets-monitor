import service from 'service';

const lawsuits = {
	trial: {
		id: 20101,
		name: '涉诉-立案',
		params: { },
		list: params => service.get('/yc/search/portrait/company/lawsuit/trial/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/trial/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	court: {
		id: 20201,
		name: '涉诉-开庭',
		params: { partiesName: '椰树集团有限公司' },
		list: params => service.get('/yc/search/portrait/company/lawsuit/court-notice/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/court-notice/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	judgment: {
		id: 20301,
		name: '涉诉-文书',
		params: {},
		list: params => service.get('/yc/search/portrait/company/lawsuit/judgment-document/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	dishonest: {
		id: 20401,
		name: '涉诉-失信记录',
		params: {},
		list: params => service.get('/yc/search/portrait/company/lawsuit/dishonest/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/dishonest/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
};


export default lawsuits;
