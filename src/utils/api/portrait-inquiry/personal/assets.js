import service from 'service';

const personalAssets = {
	personalAuction: {
		id: 10101,
		name: '资产-资产拍卖-精准匹配',
		params: { personalId: 3280438 },
		list: params => service.get('/yc/search/portrait/personal/asset/auction/precision/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/personal/asset/auction/precision/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	personalJudgment: {
		id: 10203,
		name: '资产-代位权-裁判文书',
		params: { partiesName: '中国民生银行股份有限公司', caseNumber: '苏' },
		list: params => service.get('/yc/search/portrait/personal/asset/subrogation/judgment-document/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/personal/asset/subrogation/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
};
export default personalAssets;
