const eData = {
	name: '浙江天赐生态科技',
	companyStatus: 1, // 企业状态,注销，存续等
	amount: '7000万人民币', // 认缴金额
	isHoldingCompany: true, // 是否控股
	id: 101000, // 公司id or 个人id
	hasNode: true,
	percent: '70%', // 份额 箭头
	type: 2, // 2 公司 or 1 个人
	isFHolder: false, // 最终受益人
	holderPercent: '39%', // 最终受益人份额
	isHolder: false, // 控制人
	// 股东
	holderList: [
		{
			name: '浙江禾力佳德贸易',
			companyStatus: 1, // 企业状态,注销，存续等
			amount: '4000万人民币', // 认缴金额
			isHoldingCompany: true, // 是否控股
			id: 101001, // 公司id or 个人id
			hasNode: true,
			percent: '70%',
			type: 2, // 公司 or 个人
			isFHolder: false,
			holderList: [],
		},
		{
			name: '杭州越昌科技',
			companyStatus: 1, // 企业状态,注销，存续等
			amount: '7000万人民币', // 认缴金额
			isHoldingCompany: true, // 是否控股
			id: 101002, // 公司id or 个人id
			hasNode: true,
			percent: '70%',
			type: 2, // 公司 or 个人
			isFHolder: false,
			holderList: [],
		},
	],
	// 投资的子公司
	investorList: [
		{
			name: '天津网之易',
			companyStatus: 1, // 企业状态,注销，存续等
			amount: '400万人民币', // 认缴金额
			isHoldingCompany: true, // 是否控股
			id: 201001, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 2, // 公司 or 个人
			isFHolder: false,
			children: [],
		},
		{
			name: '青岛中天',
			companyStatus: 1, // 企业状态,注销，存续等
			amount: '500万人民币', // 认缴金额
			isHoldingCompany: true, // 是否控股
			id: 201002, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 2, // 公司 or 个人
			isFHolder: false,
			children: [],
		},
	],
};

const imitateSource = {
	1010021: [{
		name: '李1骆',
		amount: '100万人民币', // 认缴金额
		id: 10100131, // 公司id or 个人id
		hasNode: false,
		percent: '70%',
		type: 1, // 公司 or 个人
		isFHolder: false, // 最终受益人
	},				{
		name: '李2骆',
		amount: '100万人民币', // 认缴金额
		id: 10100132, // 公司id or 个人id
		hasNode: false,
		percent: '70%',
		type: 1, // 公司 or 个人
		isFHolder: false, // 最终受益人
	},				{
		name: '李3骆',
		amount: '100万人民币', // 认缴金额
		id: 10100132, // 公司id or 个人id
		hasNode: false,
		percent: '70%',
		type: 1, // 公司 or 个人
		isFHolder: false, // 最终受益人
	}],
	101001: [
		{
			name: '何均善',
			amount: '73000万人民币', // 认缴金额
			id: 1010011, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: true, // 最终受益人
		},
		{
			name: '李骆萍',
			amount: '1000万人民币', // 认缴金额
			id: 1010012, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
	],
	101002: [
		{
			name: '何均善有限公司',
			amount: '73000万人民币', // 认缴金额
			id: 1010021, // 公司id or 个人id
			hasNode: true,
			percent: '70%',
			type: 2, // 公司 or 个人
			isFHolder: true, // 最终受益人
		},
		{
			name: '李骆萍',
			amount: '1000万人民币', // 认缴金额
			id: 1010022, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
		{
			name: '李骆',
			amount: '100万人民币', // 认缴金额
			id: 1010023, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
	],
};
export { imitateSource };
export default eData;
