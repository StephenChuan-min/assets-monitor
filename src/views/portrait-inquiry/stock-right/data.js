// const fs = require('fs');
const eData = {
	name: '浙江天赐生态科技',
	companyStatus: '在业', // 企业状态,1.在业 2.存续 3.吊销 4.注销 5.撤销 6.迁出 7.停业 8.清算 9.其他
	amount: '7000万元', // 认缴金额
	isHoldingCompany: true, // 是否控股
	id: 1111, // 公司id or 个人id
	hasNode: true,
	percent: '70%', // 份额 箭头
	type: 2, // 2 公司 or 1 个人
	isFHolder: false, // 最终受益人
	holderPercent: '39%', // 最终受益人份额
	isHolder: false, // 控制人
	holderList: // 股东
		[
			{
				name: '浙江禾力佳德贸易',
				companyStatus: '存续', // 企业状态,注销，存续等
				amount: '4000万元', // 认缴金额
				isHoldingCompany: true, // 是否控股
				id: 48156156126, // 公司id or 个人id
				hasNode: true,
				percent: '10%',
				type: 2, // 公司 or 个人
				isFHolder: false,
				children: [],
				holderList: [],
			},
			{
				name: '杭州越昌科技',
				companyStatus: '吊销', // 企业状态,注销，存续等
				amount: '7000万元', // 认缴金额
				isHoldingCompany: true, // 是否控股
				id: 1848484562, // 公司id or 个人id
				hasNode: true,
				percent: '50%',
				type: 2, // 公司 or 个人
				isFHolder: false,
				children: [],
				holderList: [],
			},
		],

	investorList: // 投资的子公司
		[
			{
				name: '天津网之易',
				companyStatus: '注销', // 企业状态,注销，存续等
				amount: '400万元', // 认缴金额
				isHoldingCompany: true, // 是否控股
				id: 66666, // 公司id or 个人id
				hasNode: false,
				percent: '70%',
				type: 2, // 公司 or 个人
				isFHolder: false,
				investorList: [],
			},
			{
				name: '青岛中天',
				companyStatus: '撤销', // 企业状态,注销，存续等
				amount: '500万元', // 认缴金额
				isHoldingCompany: true, // 是否控股
				id: 77777, // 公司id or 个人id
				hasNode: false,
				percent: '70%',
				type: 2, // 公司 or 个人
				isFHolder: false,
				investorList: [],
			},
		],
};
const imitateSource = {
	65825153: [
		{
			name: '何1',
			amount: '73000万元', // 认缴金额
			id: 444444333, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: true, // 最终受益人
		},
		{
			name: '李2',
			amount: '1000万元', // 认缴金额
			id: 4444444444244, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
		{
			name: '李3',
			amount: '100万元', // 认缴金额
			id: 5522222222225, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
	],
	48156156126: [
		{
			name: '禾力',
			companyStatus: '迁出', // 企业状态,注销，存续等
			amount: '4000万元', // 认缴金额
			isHoldingCompany: true, // 是否控股
			id: 22888888, // 公司id or 个人id
			hasNode: true,
			percent: '20%',
			type: 2, // 公司 or 个人
			isFHolder: false,
		},
		{
			name: '李骆萍2',
			amount: '1000万元', // 认缴金额
			id: 444666666664, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
		{
			name: '李骆3',
			amount: '100万元', // 认缴金额
			id: 555, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
	],
	1848484562: [
		{
			name: '何均善',
			amount: '73000万元', // 认缴金额
			id: 333, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: true, // 最终受益人
		},
		{
			name: '李骆萍',
			amount: '1000万元', // 认缴金额
			id: 444, // 公司id or 个人id
			hasNode: true,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
		{
			name: '李骆',
			amount: '100万元', // 认缴金额
			id: 555, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
	],
	444: [
		{
			name: '何1',
			amount: '73000万元', // 认缴金额
			id: 444444333, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: true, // 最终受益人
		},
		{
			name: '李2',
			amount: '1000万元', // 认缴金额
			id: 4444444444244, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
		{
			name: '李3',
			amount: '100万元', // 认缴金额
			id: 5522222222225, // 公司id or 个人id
			hasNode: false,
			percent: '70%',
			type: 1, // 公司 or 个人
			isFHolder: false, // 最终受益人
		},
	],
};
export { imitateSource };
export default eData;
