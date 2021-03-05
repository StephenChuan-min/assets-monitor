"use strict";

module.exports = {

	/* 基本信息 */
	// 基本信息
	DB10101: {
		bankruptcy: false,
		dishonestStatus: 1,
		establishTime: '2003-03-12',
		id: 902169,
		isBorrower: null,
		legalPersonName: '谢世飞',
		limitConsumption: null,
		logoUrl: '',
		markedObligorName: '',
		markedUsedName: [],
		obligorName: '四川天益冶金集团有限公司',
		obligorNumber: '',
		pushState: 1,
		regCapital: '4000.000000万人民币',
		regStatus: '存续',
		usedName: [
			'广汉市瑞丰冶矿有限责任公司',
			'四川省瑞丰冶矿有限责任公司'
		]
	},
	// 关联业务表
	DB10102: [
		{
			businessId: 24255,
			caseNumber: '1',
			guarantee: null,
			guaranteeString: '',
			obligorName: '成都天益远洋国际贸易有限公司',
			obligorNumber: '',
			orgName: '',
			role: 2,
			roleText: '担保人'
		}
	],

	/* 概览 */
	// 资产拍卖
	DO10100: {
		assetTotal: null,
		auctionInfos: [
			{
				auctionResults: [],
				count: 0,
				roleDistributions: [],
				type: 2
			},
			{
				auctionResults: [],
				count: 0,
				roleDistributions: [],
				type: 1
			}
		],
		count: null,
		gmtCreate: null,
		roleDistributions: []
	},
	// 代位权
	DO10200: {
		courtNotice: null,
		execute: null,
		gmtCreate: null,
		judgment: null,
		restore: null,
		subrogationInfos: [
			{
				caseReasons: [],
				caseTypes: [
					{
						count: 3,
						type: '普通案件'
					}
				],
				count: 3,
				type: 1,
				yearDistribution: [
					{
						count: 3,
						year: 2019
					}
				]
			},
			{
				caseReasons: [
					{
						count: 2,
						type: '未知'
					}
				],
				caseTypes: [],
				count: 2,
				type: 2,
				yearDistribution: [
					{
						count: 2,
						year: 2016
					}
				]
			},
			{
				caseReasons: [],
				caseTypes: [],
				count: 0,
				type: 3,
				yearDistribution: []
			}
		],
		trial: null
	},
	// 土地信息
	DO10300: {
		gmtCreate: null,
		infoTypes: [
			{
				count: 1,
				type: 1,
				typeName: '土地出让'
			},
			{
				count: 0,
				type: 2,
				typeName: '土地转让'
			},
			{
				count: 0,
				type: 3,
				typeName: '土地抵押'
			}
		],
		roleDistributions: [],
		visualRoleDistributions: [
			{
				count: 1,
				type: 1,
				typeName: '出让结果中的受让方'
			}
		],
		yearDistributions: [
			{
				count: 1,
				year: 2009
			}
		]
	},
	// 无形资产
	DO10400: {
		construct: 11,
		emission: 22,
		gmtCreate: null,
		mining: 22,
		trademark: 22
	},
	// 股权质押
	DO10500: {
		gmtCreate: null,
		roleDistributions: [
			{
				count: 0,
				invalidCount: 0,
				type: 2
			},
			{
				count: 4,
				invalidCount: 2,
				type: 1
			}
		],
		yearDistributions: [
			{
				count: 2,
				year: 2015
			},
			{
				count: 1,
				year: 2016
			},
			{
				count: 1,
				year: 2018
			}
		]
	},
	// 动产抵押
	DO10600: {
		gmtCreate: null,
		roleDistributions: [
			{
				amount: null,
				count: 0,
				invalidCount: null,
				type: 1
			},
			{
				amount: null,
				count: 0,
				invalidCount: null,
				type: 2
			}
		],
		yearDistributions: []
	},
	// 招标中标
	DO10700: {
		bidding: 0,
		gmtCreate: null,
		yearDistributions: []
	},
	// 失信
	DO20400: {
		gmtCreate: '2020-08-03',
		included: 2,
		obligorStatusList: [
			{
				dishonestStatus: 1,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			}
		],
		obligorTotal: null,
		remove: 0,
		yearDistributions: [
			{
				count: 1,
				year: 2017
			},
			{
				count: 1,
				year: 2019
			}
		]
	},
	// 涉诉
	DO20600: {
		courtNotice: null,
		execute: null,
		gmtCreate: null,
		judgment: null,
		litigationInfos: [
			{
				caseReasons: [],
				caseTypes: [
					{
						count: 50,
						type: '普通案件'
					},
					{
						count: 89,
						type: '执行案件'
					},
					{
						count: 16,
						type: '终本案件'
					}
				],
				count: 155,
				type: 1,
				yearDistribution: [
					{
						count: 8,
						year: 2016
					},
					{
						count: 33,
						year: 2017
					},
					{
						count: 43,
						year: 2018
					},
					{
						count: 35,
						year: 2019
					},
					{
						count: 36,
						year: 2020
					}
				]
			},
			{
				caseReasons: [
					{
						count: 1,
						type: '合同纠纷'
					},
					{
						count: 1,
						type: '建设工程施工合同纠纷'
					},
					{
						count: 1,
						type: '借款合同纠纷'
					},
					{
						count: 1,
						type: '债权转让合同纠纷'
					},
					{
						count: 2,
						type: '金融借款合同纠纷'
					},
					{
						count: 2,
						type: '买卖合同纠纷'
					},
					{
						count: 11,
						type: '未知'
					}
				],
				caseTypes: [],
				count: 19,
				type: 2,
				yearDistribution: [
					{
						count: 3,
						year: 2016
					},
					{
						count: 5,
						year: 2017
					},
					{
						count: 9,
						year: 2018
					},
					{
						count: 1,
						year: 2019
					},
					{
						count: 1,
						year: 2020
					}
				]
			},
			{
				caseReasons: [],
				caseTypes: [],
				count: 0,
				type: 3,
				yearDistribution: []
			}
		],
		trial: null
	},
	// 破产重组
	DO30200: {
		bankruptcy: 0,
		gmtCreate: null,
		yearDistributions: []
	},
	// 债务人经营风险
	DO30300: {
		abnormal: 0,
		change: 63,
		epb: 0,
		gmtCreate: '2020-08-03',
		illegal: 0,
		punishment: 0,
		tax: 0
	},
	// 税收违法
	DO30500: {
		gmtCreate: null,
		roleDistributions: []
	},
	// 工商基本信息
	DO50000: {
		baseInfo: {
			establishTime: '2003-03-12',
			legalPersonName: '谢世飞',
			regCapital: '4000.000000万人民币',
			regLocation: '四川省德阳市广汉市新丰政府路',
			regStatus: '存续（在营、开业、在册）'
		},
		businessScaleInfo: {
			employeeNum: '企业选择不公示'
		},
		shareholderInfos: [
			{
				amount: '148.73798万人民币',
				name: '袁培庆',
				rate: '3.7%',
				time: ''
			},
			{
				amount: '594.951924万人民币',
				name: '路小省',
				rate: '14.9%',
				time: ''
			},
			{
				amount: '800万人民币',
				name: '四川绵竹剑南春对外经济贸易有限公司',
				rate: '20.0%',
				time: ''
			},
			{
				amount: '2456.310096万人民币',
				name: '刘厚军',
				rate: '61.4%',
				time: ''
			}
		]
	},

	/* 资产 */
	// 资产匹配-精准匹配
	DA10101: {
		hasNext: false,
		list: [
			{
				approveTime: 1605765688,
				auctionId: 3787034,
				auctionStatusTag: null,
				bankruptcyStatus: 1,
				commentTotal: 0,
				consultPrice: 209398,
				court: "新宁县人民法院",
				createTime: 1605081907,
				currentPrice: 146578,
				dishonestStatus: null,
				end: 1545962400,
				expend: null,
				historyAuction: [],
				id: 357855,
				important: 1,
				initialPrice: 146578,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 907007,
				obligorName: "娱乐有限公司",
				obligorNumber: "",
				orgName: "",
				orgNameList: "",
				process: 0,
				pushType: 0,
				reason: '[{"role":-1,"hl":["新宁县夷江水上<em>娱</em><em>乐</em><em>有</em><em>限</em><em>公</em><em>司</em>66.6667%的股权"],"name":"娱乐有限公司"}]',
				recovery: null,
				remark: "",
				roundTag: null,
				start: 1545876000,
				status: 5,
				title: "【一拍】新宁县夷江水上娱乐有限公司66.6667%的股权",
				updateTime: 1605765688,
				url: "https://sf-item.taobao.com/sf_item/582589964932.htm",
			},
			{
				approveTime: 1605765686,
				auctionId: 3770932,
				auctionStatusTag: null,
				bankruptcyStatus: 1,
				commentTotal: 0,
				consultPrice: 165569,
				court: "深圳市宝安区人民法院",
				createTime: 1605081910,
				currentPrice: 204898,
				dishonestStatus: null,
				end: 1538112799,
				expend: null,
				historyAuction: [],
				id: 357859,
				important: 1,
				initialPrice: 115898,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 907007,
				obligorName: "娱乐有限公司",
				obligorNumber: "",
				orgName: "",
				orgNameList: "",
				process: 0,
				pushType: 0,
				reason: '[{"role":-1,"hl":["深圳市咪王子<em>娱</em><em>乐</em><em>有</em><em>限</em><em>公</em><em>司</em>设备一批"],"name":"娱乐有限公司"}]',
				recovery: null,
				remark: "",
				roundTag: null,
				start: 1538013600,
				status: 5,
				title: "【一拍】深圳市咪王子娱乐有限公司设备一批",
				updateTime: 1605765686,
				url: "https://sf-item.taobao.com/sf_item/577130321908.htm",
			}
		],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 资产匹配-模糊匹配
	DA10102: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 无形资产_排污权
	DA10401: {
		hasNext: false,
		list: [
			{
				bankruptcyStatus: 0,
				companyName: "浙江索福工贸有限公司",
				dishonestStatus: 0,
				gmtCreate: "2020-11-25",
				gmtIssueTime: "2020-08-13",
				gmtModified: "2020-11-25",
				gmtPublishTime: "2020-08-13",
				gmtValidityPeriodEnd: "2023-08-12",
				gmtValidityPeriodStart: "2020-08-13",
				id: 88960,
				industry: "金属门窗制造",
				isAttention: false,
				isBorrower: false,
				isRead: true,
				licenseNumber: "913307847125248658001Q",
				obligorId: 955634,
				reason: "",
				status: "正常",
				url: "http://permit.mee.gov.cn/permitExt/xkgkAction!xkgk.action?xkgk=getxxgkContent&dataid=88e3916194d84f999857e8f37b834e6f",
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 1
	},
	// 无形资产_矿业权
	DA10402: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 无形资产_商标专利
	DA10403: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 无形资产_建筑建造资质
	DA10404: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 土地信息-出让结果
	DA10301: {
		hasNext: false,
		list: [
			{
				administrativeRegion: '四川省成都市双流县',
				approver: '',
				bankruptcyStatus: 0,
				dishonestStatus: 1,
				finalPrice: 548.3717,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 8772,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				landAddress: '中和镇化龙社区',
				landArea: 0.5993,
				landUse: '商务金融用地',
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司',
				projectName: '四川天益冶金集团有限公司',
				singedTime: 1246204800,
				supplyWay: '挂牌出让',
				transferTerm: '40',
				url: 'http://www.landchina.com/default.aspx?tabid=386&comname=default&wmguid=75c72564-ffd9-426a-954b-8ac2df0903b7&recorderguid=515a9366-335b-4062-a6c7-eb0dd1547599C'
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 1
	},
	// 土地信息-土地转让
	DA10302: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 土地信息-出让抵押
	DA10303: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 代位权_立案
	DA10201: {
		hasNext: false,
		list: [
			{
				associatedInfo: null,
				caseNumber: '（2019）川0191民初11482号',
				caseType: 1,
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426078,
				gmtModified: 1596426078,
				gmtRegister: '2019-09-05',
				id: 185415,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				isRestore: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '原告',
						roleType: 1,
						sid: 185415
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '唐晓东',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 185415
					}
				],
				url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300920190301002576'
			},
			{
				associatedInfo: null,
				caseNumber: '（2019）川0191民初11482号',
				caseType: 1,
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426073,
				gmtModified: 1596426073,
				gmtRegister: '2019-09-05',
				id: 185393,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				isRestore: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '原告',
						roleType: 1,
						sid: 185393
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '唐晓东',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 185393
					}
				],
				url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300920190301002576'
			},
			{
				associatedInfo: null,
				caseNumber: '（2019）川0191民初11482号',
				caseType: 1,
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426073,
				gmtModified: 1596426073,
				gmtRegister: '2019-09-05',
				id: 185392,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				isRestore: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '原告',
						roleType: 1,
						sid: 185392
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '唐晓东',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 185392
					}
				],
				url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300920190301002576'
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 3
	},
	// 代位权_开庭
	DA10202: {
		hasNext: false,
		list: [
			{
				associatedInfo: null,
				caseNumber: '（2016）川06民终1123号',
				caseReason: '',
				court: '德阳市中级人民法院',
				gmtCreate: 1596426066,
				gmtModified: 1596426066,
				gmtTrial: '2016-11-28',
				id: 340046,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '原告',
						roleType: 1,
						sid: 340046
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '李朝生',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340046
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2016）川06民终1123号',
				caseReason: '',
				court: '德阳法院',
				gmtCreate: 1596426067,
				gmtModified: 1596426067,
				gmtTrial: '2016-11-28',
				id: 340054,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '原告',
						roleType: 1,
						sid: 340054
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '李朝生',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340054
					}
				],
				url: ''
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 2
	},
	// 代位权_裁判文书
	DA10203: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 股权质押-股权出质
	DA10501: {
		hasNext: false,
		list: [
			{
				companyName: '青海天益冶金有限公司',
				equityAmount: '6400万元',
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 10896,
				isAttention: 0,
				isRead: false,
				pledgeeList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						pledgee: '大连银行股份有限公司成都分行',
						pledgeeId: 0
					}
				],
				pledgorList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						pledgor: '四川天益冶金集团有限公司',
						pledgorId: 902169
					}
				],
				regDate: 1526400000,
				regNumber: '633000201800000003',
				state: 0
			},
			{
				companyName: '青海天益冶金有限公司',
				equityAmount: '6400万元',
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 10898,
				isAttention: 0,
				isRead: false,
				pledgeeList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						pledgee: '大连银行股份有限公司成都分行',
						pledgeeId: 0
					}
				],
				pledgorList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						pledgor: '四川天益冶金集团有限公司',
						pledgorId: 902169
					}
				],
				regDate: 1481212800,
				regNumber: '633000201600000013',
				state: 1
			},
			{
				companyName: '青海天益冶金有限公司',
				equityAmount: '6400万元',
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 10897,
				isAttention: 0,
				isRead: false,
				pledgeeList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						pledgee: '大连银行股份有限公司成都分行',
						pledgeeId: 0
					}
				],
				pledgorList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						pledgor: '四川天益冶金集团有限公司',
						pledgorId: 902169
					}
				],
				regDate: 1442419200,
				regNumber: '633000201500000010',
				state: 1
			},
			{
				companyName: '四川绵竹剑南春对外经济贸易有限公司',
				equityAmount: '1200万元',
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 10895,
				isAttention: 0,
				isRead: false,
				pledgeeList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						pledgee: '四川剑海投资有限公司',
						pledgeeId: 0
					}
				],
				pledgorList: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						pledgor: '四川天益冶金集团有限公司',
						pledgorId: 902169
					}
				],
				regDate: 1426176000,
				regNumber: '510683000390',
				state: 0
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 4
	},
	// 股权质押-股权质权
	DA10502: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 动产抵押_抵押
	DA10601: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 动产抵押_抵押权
	DA10602: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 招投标
	DA10701: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 金融资产 - 竞价项目
	DA10801: {
		list: [
			{
				approveTime: 1605081931,
				auctionId: 2442656,
				auctionStatusTag: null,
				bankruptcyStatus: 1,
				commentTotal: null,
				consultPrice: 0,
				court: "中国长城湖南省分公司",
				createTime: 1605081927,
				currentPrice: 7760000,
				dishonestStatus: null,
				end: 1543975200,
				expend: -1,
				historyAuction: [],
				id: 357902,
				important: 1,
				initialPrice: 7760000,
				isAttention: 0,
				isBorrower: false,
				isRead: true,
				obligorId: 907007,
				obligorName: "娱乐有限公司",
				obligorNumber: "",
				orgName: "",
				orgNameList: "",
				process: 0,
				pushType: 2,
				reason: '[{"role":-1,"hl":["中国长城资产湖南省分公司对衡阳阳光<em>娱</em><em>乐</em><em>有</em><em>限</em><em>公</em><em>司</em>债权项目"],"name":"娱乐有限公司"}]',
				recovery: -1,
				remark: "",
				roundTag: null,
				start: 1543888800,
				status: 7,
				title: "【一拍】中国长城资产湖南省分公司对衡阳阳光娱乐有限公司债权项目",
				updateTime: 1605081927,
				url: "https://zc-item.taobao.com/auction/583000230496.htm",
			},
			{
				approveTime: 1605075615,
				auctionId: 2431765,
				auctionStatusTag: null,
				bankruptcyStatus: 0,
				commentTotal: null,
				consultPrice: 11000000,
				court: "中国工商银行玉林分行",
				createTime: 1605075606,
				currentPrice: 5510000,
				dishonestStatus: null,
				end: 1574215200,
				expend: -1,
				historyAuction: [],
				id: 357803,
				important: 1,
				initialPrice: 5500000,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 907004,
				obligorName: "中国工商银行股份有限公司",
				obligorNumber: "",
				orgName: "",
				orgNameList: "",
				process: 0,
				pushType: 2,
				reason: '[{"role":-1,"hl":["1.本次竞价项目的转让方：<em>中</em><em>国</em><em>工</em><em>商</em><em>银</em><em>行</em><em>股</em><em>份</em><em>有</em><em>限</em><em>公</em><em>司</em>玉林分行下属机构：<em>中</em><em>国</em><em>工</em><em>商</em><em>银</em><em>行</e"],"name":"中国工商银行股份有限公司"}]',
				recovery: -1,
				remark: "",
				roundTag: null,
				start: 1574128800,
				status: 5,
				title: "【一拍】陆川县温泉镇温泉北路的房地产",
				updateTime: 1605075606,
				url: "https://zc-item.taobao.com/auction/606949925676.htm",
			}
		],
		hasNext: true,
		num: 10,
		page: 1,
		pages: 160,
		total: 1599,
	},
	// 金融资产 - 招商项目
	DA10802: {
		list: [
			{
				accurateType: 2,
				category: 125088036,
				gmtModified: "2020-11-12",
				id: 231,
				isAttention: 1,
				isRead: true,
				obligorId: 901168,
				obligorName: "中国长城资产管理股份有限公司",
				pid: "4184",
				publishTime: "2020-07-07",
				referencePrice: null,
				referencePriceUnit: "",
				role: null,
				sourceId: 11204,
				status: 3,
				title: "贵州省都匀市华红石化产品销售有限公司等56户债权资产营销公告",
				url: "https://paimai.caa123.org.cn/pages/investment/detail.html?id=4184",
			},
			{
				accurateType: 1,
				category: 56956002,
				gmtModified: "2020-11-12",
				id: 2,
				isAttention: 0,
				isRead: true,
				obligorId: 906724,
				obligorName: "江苏呈飞精密合金股份有限公司",
				pid: "592",
				publishTime: '2020-11-11',
				referencePrice: 150400000,
				referencePriceUnit: "元",
				role: 1,
				sourceId: 11198,
				status: 13,
				title: "债务人上海隆维畅经贸有限公司的债权及相关担保从权利",
				url: "https://zc.gpai.net/zc/attractDetail?id=592",
			},
			{
				accurateType: 1,
				category: 56956002,
				gmtModified: "2020-11-12",
				id: 161,
				isAttention: 0,
				isRead: true,
				obligorId: 901213,
				obligorName: "重庆远洋园林有限公司",
				pid: "22054",
				publishTime: '2020-02-11',
				referencePrice: null,
				referencePriceUnit: "",
				role: 1,
				sourceId: 11172,
				status: 3,
				title: "【渝康 车位、商铺】重庆远洋园林有限公司债权项目",
				url: "https://zc-paimai.taobao.com/zc/mn_detail.htm?id=22054&size=150",
			}
		],
		hasNext: true,
		num: 10,
		page: 1,
		pages: 5,
		total: 50,
	},
	// 金融资产 - 公示项目
	DA10803: {
		list: [
			{
				amounts: null,
				bankruptcyStatus: 0,
				createTime: "2020-11-20",
				dishonestStatus: 0,
				endTime: "2018-03-13",
				gmtPublish: "2019-07-11",
				id: 49054,
				isAttention: 0,
				isBorrower: false,
				isRead: 0,
				listingPrice: 14480,
				listingUnit: "元",
				obligorId: 955588,
				obligorName: "东方电气风电有限公司",
				obligorNumber: "",
				orgName: "杭州分行高新支行",
				projectNumber: "GR2017SC1001494-3",
				projectStatus: 9,
				projectType: 3,
				publicityType: 1,
				sourceUrl: "http://www.dscq.com/bidDetails/41aaee25109a11e8bf2f00155d01050d.shtml",
				startTime: "2018-02-28",
				title: "甘FB5173",
				transactionPrice: 14480,
				transactionPriceUnit: "元",
				updateTime: "2020-11-20",
			},
			{
				amounts: 0,
				bankruptcyStatus: 0,
				createTime: "2020-11-13",
				dishonestStatus: 0,
				endTime: null,
				gmtPublish: "2018-11-19",
				id: 48362,
				isAttention: 0,
				isBorrower: true,
				isRead: 0,
				listingPrice: null,
				listingUnit: "",
				obligorId: 901168,
				obligorName: "中国长城资产管理股份有限公司",
				obligorNumber: "",
				orgName: "源诚测试机构;兴业银行扬州分行;-",
				projectNumber: "",
				projectStatus: 0,
				projectType: 2,
				publicityType: 2,
				sourceUrl: "http://www.gwamcc.com/HiringDetail.aspx?liName=64&ID=51305",
				startTime: null,
				title: "中国长城资产管理股份有限公司云南省分公司对昆明全拓房地产开发有限公司债权及石林同创置业有限公司基金收益权进行公开竞价的公告",
				transactionPrice: null,
				transactionPriceUnit: "",
				updateTime: "2020-11-13",
			}
		],
		hasNext: true,
		num: 10,
		page: 1,
		pages: 7,
		total: 66,
	},
	// 查解封资产
	DA10901: {
		list: [
			{
				address: "庆法执字[1999]64",
				caseNumber: "庆法执字[1999]64",
				court: "大庆市中级人民法院",
				dataType: 1,
				gmtCreate: "2020-11-11",
				gmtModified: "2020-11-11",
				id: 2136,
				information: "",
				isAttention: 0,
				isRead: false,
				judementTime: '2020-01-01',
				parties: [{bankruptcyStatus: 1, dishonestStatus: 0, isBorrower: false, name: "责任有限公司", obligorId: 907002}],
				bankruptcyStatus: 1,
				dishonestStatus: 0,
				isBorrower: false,
				name: "责任有限公司",
				obligorId: 907002,
				pid: "e53dbe1e93058f64593b56832c1f4cb9",
				publishTime: '2020-01-01',
				sealUpTime: '2020-11-11',
				sourceId: 10761,
				title: "",
				unsealingTime: '2020-11-11',
				url: "",
			},
			{
				address: "",
				caseNumber: "庆法执字[1999]64",
				court: "大庆市中级人民法院",
				dataType: 1,
				gmtCreate: "2020-11-11",
				gmtModified: "2020-11-11",
				id: 2136,
				information: "解封广州市增槎路21号富力半岛花园D5栋13层07单元；注销上述房产预售合同登记备案：预售证号：02004；注销上述房产在中国工商银行股份有限公司广州西华支行设立的抵押登记，协助执行广州市增槎路21号富力半岛花园D5栋13层07单元的房产过户手续",
				isAttention: 0,
				isRead: false,
				judementTime: '2020-01-01',
				parties: [{bankruptcyStatus: 1, dishonestStatus: 0, isBorrower: false, name: "责任有限公司", obligorId: 907002}],
				bankruptcyStatus: 1,
				dishonestStatus: 0,
				isBorrower: false,
				name: "责任有限公司",
				obligorId: 907002,
				pid: "e53dbe1e93058f64593b56832c1f4cb9",
				publishTime: '2020-01-01',
				sealUpTime: '2020-11-11',
				sourceId: 10761,
				title: "",
				unsealingTime: '2020-11-11',
				url: "",
			},
			{
				address: "",
				caseNumber: "（2016）浙0783执4424号之四",
				court: "浙江省东阳市人民法院",
				dataType: 2,
				gmtCreate: "2020-11-18",
				gmtModified: "2020-11-18",
				id: 118,
				information: "郑守高、仲大文、郑蔚共有的位于海珠区南华东路669号2603房的房屋所有权及国有土地使用权归中天建设集团有限公司所有。解除上述房地产的查封，上述房地产如有轮候查封的，均作自始未发生法律效力处理，一律自动解除。同时停止办理以原所有权人郑守高、仲大文为主体的对该房地产的查封。注销该房地产的原房屋所有权证、土地使用权证书及抵押他项权证并为中天建设集团有限公司办理相关的产权转移登记。中天建设集团有限公司可单方申请办理房屋所有权转移登记。",
				isAttention: 0,
				isRead: true,
				judementTime: '2020-02-02',
				parties: [{bankruptcyStatus: 0, dishonestStatus: 0, isBorrower: false, name: "中天建设集团有限公司", obligorId: 901228}],
				bankruptcyStatus: 0,
				dishonestStatus: 0,
				isBorrower: false,
				name: "中天建设集团有限公司",
				obligorId: 901228,
				pid: "fb7aaaa1a840f8c797ca246eb73688f3",
				publishTime: '2020-02-02',
				sealUpTime: '2020-11-11',
				sourceId: 10761,
				title: "郑守高、仲大文、郑蔚共有的位于海珠区南华东路669号2603房的房屋所有权及国有土地使用权归中天建设集团有限公司所有。",
				unsealingTime: null,
				url: "http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300920190301002576",
			},
			{
				address: "",
				caseNumber: "庆法执字[1999]64",
				court: "大庆市中级人民法院",
				dataType: 1,
				gmtCreate: "2020-11-11",
				gmtModified: "2020-11-11",
				id: 2136,
				information: "解封广州市增槎路21号富力半岛花园D5栋13层07单元；注销上述房产预售合同登记备案：预售证号：02004；注销上述房产在中国工商银行股份有限公司广州西华支行设立的抵押登记，协助执行广州市增槎路21号富力半岛花园D5栋13层07单元的房产过户手续",
				isAttention: 0,
				isRead: false,
				judementTime: '2020-01-01',
				parties: [{bankruptcyStatus: 1, dishonestStatus: 0, isBorrower: false, name: "责任有限公司", obligorId: 907002}],
				bankruptcyStatus: 1,
				dishonestStatus: 0,
				isBorrower: false,
				name: "责任有限公司",
				obligorId: 907002,
				pid: "e53dbe1e93058f64593b56832c1f4cb9",
				publishTime: '2020-01-01',
				sealUpTime: '2020-11-11',
				sourceId: 10761,
				title: "",
				unsealingTime: '2020-11-11',
				url: "",
			},
			{
				address: "this is address",
				caseNumber: "（2016）浙0783执4424号之四",
				court: "浙江省东阳市人民法院",
				dataType: 2,
				gmtCreate: "2020-11-18",
				gmtModified: "2020-11-18",
				id: 118,
				information: "",
				isAttention: 0,
				isRead: true,
				judementTime: '2020-02-02',
				parties: [{bankruptcyStatus: 0, dishonestStatus: 0, isBorrower: false, name: "中天建设集团有限公司", obligorId: 901228}],
				bankruptcyStatus: 0,
				dishonestStatus: 0,
				isBorrower: false,
				name: "中天建设集团有限公司",
				obligorId: 901228,
				pid: "fb7aaaa1a840f8c797ca246eb73688f3",
				publishTime: '2020-02-02',
				sealUpTime: '2020-11-11',
				sourceId: 10761,
				title: "郑守高、仲大文、郑蔚共有的位于海珠区南华东路669号2603房的房屋所有权及国有土地使用权归中天建设集团有限公司所有。",
				unsealingTime: null,
				url: "http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300920190301002576",
			},
		],
		hasNext: true,
		num: 10,
		page: 1,
		pages: 1,
		total: 4,
	},

	/* 风险 */
	// 破产重组
	DR30201: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	//  失信记录-列入
	DR20401: {
		hasNext: false,
		list: [
			{
				bankruptcyStatus: 0,
				caseCode: '(2018)浙0421执恢296号',
				court: '嘉善县人民法院',
				createTime: '2020-08-03',
				disruptType: '有履行能力而拒不履行生效法律文书确定义务',
				duty: '（2016）浙0421民初2820号：本金尚欠6410109.50元，利息286803.30元，合计6696912.80元。',
				gmtPublishDate: '2019-03-26',
				id: 88197,
				isAttention: false,
				isBorrower: false,
				isRead: false,
				name: '四川天益冶金集团有限公司',
				number: '',
				obligorId: 902169,
				performance: '全部未履行',
				removeStatus: false,
				status: 1,
				updateTime: '2020-08-03'
			},
			{
				bankruptcyStatus: 0,
				caseCode: '(2016)川0191执3237号',
				court: '成都高新技术产业开发区人民法院',
				createTime: '2020-08-03',
				disruptType: '其他有履行能力而拒不履行生效法律文书确定义务',
				duty: '空',
				gmtPublishDate: '2017-01-11',
				id: 88199,
				isAttention: false,
				isBorrower: false,
				isRead: false,
				name: '四川天益冶金集团有限公司',
				number: '',
				obligorId: 902169,
				performance: '全部未履行',
				removeStatus: false,
				status: 1,
				updateTime: '2020-08-03'
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 2
	},
	//  失信记录-已移除
	DR20402: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 限制高消费
	DR20501: {
		hasNext: false,
		list: [
			{
				bankruptcyStatus: 0,
				caseNumber: "(2020)川0793执1003号",
				companyName: "四川美佳地农业开发有限公司",
				dishonestStatus: 0,
				gmtCreate: "2020-11-20",
				gmtModified: "2020-11-20",
				id: 8044,
				isAttention: 0,
				isBorrower: false,
				isRead: 0,
				obligorId: 955591,
				obligorType: 1,
				personName: "张兵",
				personNumber: "510702197710085014",
				registerDate: "2020-10-19",
				status: 0,
				url: "/5038/2020-10-29/da615e7cd3b74bda96dfe3e30517f35a.pdf",
			},
			{
				bankruptcyStatus: 0,
				caseNumber: "(2020)川0793执1003号",
				companyName: "",
				dishonestStatus: 0,
				gmtCreate: "2020-11-20",
				gmtModified: "2020-11-20",
				id: 8044,
				isAttention: 0,
				isBorrower: false,
				isRead: 0,
				obligorId: 955591,
				obligorType: 1,
				personName: "张兵",
				personNumber: "510702197710085014",
				registerDate: "2020-10-19",
				status: 0,
				url: "/5038/2020-10-29/da615e7cd3b74bda96dfe3e30517f35a.pdf",
			},
			{
				bankruptcyStatus: 0,
				caseNumber: "(2020)鲁0102执恢650号",
				companyName: "",
				dishonestStatus: 0,
				gmtCreate: "2020-11-25",
				gmtModified: "2020-11-25",
				id: 113094,
				isAttention: 0,
				isBorrower: true,
				isRead: 0,
				obligorId: 955600,
				obligorType: 2,
				personName: "郭建文",
				personNumber: "",
				registerDate: "2020-08-18",
				status: 0,
				url: "https://aiqicha.baidu.com/c/restrictedconsumerdetail?pid=85013920830132&dataId=ebbb25e96ac8df430057286ecc082582",
			},
			{
				bankruptcyStatus: 0,
				caseNumber: "(2020)鲁0102执恢650号",
				companyName: "SSSSSSSSSSSSS",
				dishonestStatus: 0,
				gmtCreate: "2020-11-25",
				gmtModified: "2020-11-25",
				id: 113094,
				isAttention: 0,
				isBorrower: true,
				isRead: 0,
				obligorId: 955600,
				obligorType: 2,
				personName: "郭建文",
				personNumber: "",
				registerDate: "2020-08-18",
				status: 0,
				url: "https://aiqicha.baidu.com/c/restrictedconsumerdetail?pid=85013920830132&dataId=ebbb25e96ac8df430057286ecc082582",
			},
			{
				bankruptcyStatus: 0,
				caseNumber: "(2020)鲁0102执恢650号",
				companyName: "22222",
				dishonestStatus: 0,
				gmtCreate: "2020-11-25",
				gmtModified: "2020-11-25",
				id: 113094,
				isAttention: 0,
				isBorrower: true,
				isRead: 0,
				obligorId: 955600,
				obligorType: 2,
				personName: "郭建文",
				personNumber: "",
				registerDate: "2020-08-18",
				status: 0,
				url: "https://aiqicha.baidu.com/c/restrictedconsumerdetail?pid=85013920830132&dataId=ebbb25e96ac8df430057286ecc082582",
			}
		],
		num: 5000,
		page: 1,
		pages: 23,
		total: 223
	},
	// 涉诉信息_立案
	DR20601: {
		hasNext: false,
		list: [
			{
				associatedInfo: null,
				caseNumber: '（2020）川0191民初2998号',
				caseType: 1,
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426078,
				gmtModified: 1596426078,
				gmtRegister: '2020-05-12',
				id: 185416,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				isRestore: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '中国核工业二四建设有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 185416
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 185416
					}
				],
				url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300920200301003172'
			},
			{
				associatedInfo: null,
				caseNumber: '（2016）川01财保35号',
				caseType: 1,
				court: '',
				gmtCreate: 1596426053,
				gmtModified: 1596426053,
				gmtRegister: '2016-03-25',
				id: 185247,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				isRestore: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '中信银行股份有限公司成都分行',
						obligorId: null,
						role: '申请人',
						roleType: 1,
						sid: 185247
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被申请人',
						roleType: 2,
						sid: 185247
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被申请人',
						roleType: 2,
						sid: 185247
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被申请人',
						roleType: 2,
						sid: 185247
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天源冶金材料有限公司',
						obligorId: 902171,
						role: '被申请人',
						roleType: 2,
						sid: 185247
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天益冶金有限公司',
						obligorId: 902170,
						role: '被申请人',
						roleType: 2,
						sid: 185247
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被申请人',
						roleType: 2,
						sid: 185247
					}
				],
				url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300100001006460'
			},
			{
				associatedInfo: null,
				caseNumber: '（2016）川01财保35号',
				caseType: 1,
				court: '',
				gmtCreate: 1596426048,
				gmtModified: 1596426048,
				gmtRegister: '2016-03-25',
				id: 185226,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				isRestore: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '中信银行股份有限公司成都分行',
						obligorId: null,
						role: '申请人',
						roleType: 1,
						sid: 185226
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被申请人',
						roleType: 2,
						sid: 185226
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被申请人',
						roleType: 2,
						sid: 185226
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被申请人',
						roleType: 2,
						sid: 185226
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天源冶金材料有限公司',
						obligorId: 902171,
						role: '被申请人',
						roleType: 2,
						sid: 185226
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天益冶金有限公司',
						obligorId: 902170,
						role: '被申请人',
						roleType: 2,
						sid: 185226
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被申请人',
						roleType: 2,
						sid: 185226
					}
				],
				url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300100001006460'
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 155
	},
	// 涉诉信息_开庭
	DR20602: {
		hasNext: false,
		list: [
			{
				associatedInfo: null,
				caseNumber: '（2020）川0191民初2998号',
				caseReason: '建设工程施工合同纠纷',
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426068,
				gmtModified: 1596426068,
				gmtTrial: '2020-07-03',
				id: 340058,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '中国核工业二四建设有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340058
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340058
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2018）川01民初4932号',
				caseReason: '债权转让合同纠纷',
				court: '四川省成都市中级人民法院',
				gmtCreate: 1596426068,
				gmtModified: 1596426068,
				gmtTrial: '2019-04-18',
				id: 340056,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川剑海投资有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340056
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340056
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2018）青01民初155号',
				caseReason: '借款合同纠纷',
				court: '青海省西宁市中级人民法院',
				gmtCreate: 1596426066,
				gmtModified: 1596426066,
				gmtTrial: '2018-12-21',
				id: 340050,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '中国银行股份有限公司湟中县支行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340050
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340050
					}
				],
				url: 'https://splcgk.court.gov.cn/gzfwww//ktgg/Details?id=7BE5EFCA87351CEF74FC3D7989B5FF68'
			},
			{
				associatedInfo: null,
				caseNumber: '（2018）川0681民初2397号',
				caseReason: '买卖合同纠纷',
				court: '广汉市人民法院',
				gmtCreate: 1596426053,
				gmtModified: 1596426066,
				gmtTrial: '2018-11-09',
				id: 339980,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '青海君海工贸有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 339980
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 339980
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川绵竹剑南春对外经济贸易有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339980
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天益冶金有限公司',
						obligorId: 902170,
						role: '被告',
						roleType: 2,
						sid: 339980
					}
				],
				url: 'https://splcgk.court.gov.cn/gzfwww//ktgg/Details?id=304500000011508'
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0191民初13158号',
				caseReason: '金融借款合同纠纷',
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426066,
				gmtModified: 1596426066,
				gmtTrial: '2018-08-22',
				id: 340049,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '东亚银行（中国）有限公司成都分行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340049
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340049
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340049
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 340049
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340049
					}
				],
				url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/ktxx.jsp?lsh=300900001120570&xh=1'
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0191民初13158号',
				caseReason: '',
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				gmtTrial: '2018-08-22',
				id: 340042,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '东亚银行（中国）有限公司成都分行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340042
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340042
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340042
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 340042
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340042
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0191民初13158号',
				caseReason: '',
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				gmtTrial: '2018-05-16',
				id: 340043,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '东亚银行（中国）有限公司成都分行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340043
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340043
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340043
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 340043
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340043
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2018）川0681民初355号',
				caseReason: '',
				court: '广汉市人民法院',
				gmtCreate: 1596426051,
				gmtModified: 1596426066,
				gmtTrial: '2018-04-19',
				id: 339971,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '嘉峪关市凯盛工贸有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 339971
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川剑海国际贸易有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339971
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 339971
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川绵竹剑南春对外经济贸易有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339971
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 339971
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天益冶金有限公司',
						obligorId: 902170,
						role: '被告',
						roleType: 2,
						sid: 339971
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2018）川0681民初355号',
				caseReason: '买卖合同纠纷',
				court: '广汉市人民法院',
				gmtCreate: 1596426053,
				gmtModified: 1596426067,
				gmtTrial: '2018-03-20',
				id: 339985,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '嘉峪关市凯盛工贸有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 339985
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川剑海国际贸易有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339985
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 339985
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川绵竹剑南春对外经济贸易有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339985
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 339985
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天益冶金有限公司',
						obligorId: 902170,
						role: '被告',
						roleType: 2,
						sid: 339985
					}
				],
				url: 'https://splcgk.court.gov.cn/gzfwww//ktgg/Details?id=304500000008831'
			},
			{
				associatedInfo: null,
				caseNumber: '（2018）川0681民初355号',
				caseReason: '',
				court: '广汉市人民法院',
				gmtCreate: 1596426050,
				gmtModified: 1596426066,
				gmtTrial: '2018-03-20',
				id: 339959,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '嘉峪关市凯盛工贸有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 339959
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川剑海国际贸易有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339959
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 339959
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '四川绵竹剑南春对外经济贸易有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339959
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 339959
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天益冶金有限公司',
						obligorId: 902170,
						role: '被告',
						roleType: 2,
						sid: 339959
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川01民初3575号',
				caseReason: '',
				court: '成都市中级人民法院',
				gmtCreate: 1596426066,
				gmtModified: 1596426066,
				gmtTrial: '2018-02-08',
				id: 340048,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '渤海银行股份有限公司成都分行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340048
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340048
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340048
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 340048
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340048
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0191民初13158号',
				caseReason: '',
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				gmtTrial: '2017-12-05',
				id: 340044,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '东亚银行（中国）有限公司成都分行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340044
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340044
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340044
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 340044
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340044
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0191民初13158号',
				caseReason: '金融借款合同纠纷',
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426066,
				gmtModified: 1596426066,
				gmtTrial: '2017-12-05',
				id: 340051,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '东亚银行（中国）有限公司成都分行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340051
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340051
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340051
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 340051
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '龚婷婷',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 340051
					}
				],
				url: 'https://splcgk.court.gov.cn/gzfwww//ktgg/Details?id=300900001120570'
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0191民初9249号',
				caseReason: '',
				court: '成都高新技术产业开发区人民法院',
				gmtCreate: 1596426066,
				gmtModified: 1596426066,
				gmtTrial: '2017-09-14',
				id: 340045,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '日月幕墙门窗股份有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340045
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340045
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0191民初9249号',
				caseReason: '',
				court: '成都高新技术产业开发区法院',
				gmtCreate: 1596426067,
				gmtModified: 1596426067,
				gmtTrial: '2017-09-14',
				id: 340053,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '日月幕墙门窗股份有限公司',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340053
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340053
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2017）川0107民初6718号',
				caseReason: '',
				court: '成都市武侯区人民法院',
				gmtCreate: 1596426047,
				gmtModified: 1596426065,
				gmtTrial: '2017-08-22',
				id: 339946,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '交通银行股份有限公司成都人民南路支行',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '刘厚军',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '广汉天益冶金有限责任公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: true,
						name: '成都天益远洋国际贸易有限公司',
						obligorId: 902168,
						role: '被告',
						roleType: 2,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '成都益海矿业有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天源冶金材料有限公司',
						obligorId: 902171,
						role: '被告',
						roleType: 2,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '青海天益冶金有限公司',
						obligorId: 902170,
						role: '被告',
						roleType: 2,
						sid: 339946
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '马边天益镍铬材料有限公司',
						obligorId: null,
						role: '被告',
						roleType: 2,
						sid: 339946
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2016）川0681民初968号',
				caseReason: '',
				court: '广汉市人民法院',
				gmtCreate: 1596426066,
				gmtModified: 1596426066,
				gmtTrial: '2016-06-17',
				id: 340047,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '李朝生',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340047
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340047
					}
				],
				url: ''
			},
			{
				associatedInfo: null,
				caseNumber: '（2016）川0681民初968号',
				caseReason: '合同纠纷',
				court: '广汉市人民法院',
				gmtCreate: 1596426067,
				gmtModified: 1596426067,
				gmtTrial: '2016-06-17',
				id: 340052,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '李朝生',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340052
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340052
					}
				],
				url: 'https://splcgk.court.gov.cn/gzfwww//ktgg/Details?id=304500000002309'
			},
			{
				associatedInfo: null,
				caseNumber: '（2016）川0681民初968号',
				caseReason: '',
				court: '广汉法院',
				gmtCreate: 1596426067,
				gmtModified: 1596426067,
				gmtTrial: '2016-06-17',
				id: 340055,
				isAttention: false,
				isDeleted: false,
				isRead: false,
				parties: [
					{
						bankruptcyStatus: 0,
						dishonestStatus: 0,
						isBorrower: false,
						name: '李朝生',
						obligorId: null,
						role: '原告',
						roleType: 1,
						sid: 340055
					},
					{
						bankruptcyStatus: 0,
						dishonestStatus: 1,
						isBorrower: false,
						name: '四川天益冶金集团有限公司',
						obligorId: 902169,
						role: '被告',
						roleType: 2,
						sid: 340055
					}
				],
				url: ''
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 19
	},
	// 涉诉信息_裁判文书
	DR20603: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 经营异常
	DR30301: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 严重违法
	DR30401: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 税收违法
	DR30501: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 行政处罚
	DR30601: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},
	// 环保处罚
	DR30701: {
		hasNext: false,
		list: [],
		num: 5000,
		page: 1,
		pages: 0,
		total: 0
	},

	/* 工商基本信息 */
	// 基本信息
	DI50101: {
		actualCapital: '',
		approvedTime: '2018-12-28',
		businessScope: '销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品，易制毒化学品和易燃易爆物品）、建辅材料、棉纺织品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。',
		companyName: '四川天益冶金集团有限公司',
		companyOrgType: '有限责任公司(自然人投资或控股)',
		creditCode: '915106817469178351',
		englishName: 'Sichuan Tianyi Metallurgy Group Co.,Ltd.',
		establishTime: '2003-03-12',
		fromTime: '2003-03-12',
		id: 3190995,
		industry: '零售业',
		insuranceNum: '5人',
		legalPerson: '谢世飞',
		orgNumber: '746917835',
		regCapital: '4000.000000万人民币',
		regInstitute: '广汉市市场监督管理局',
		regLocation: '四川省德阳市广汉市新丰政府路',
		regNumber: '510681000000919',
		regStatus: '存续',
		scale: '企业选择不公示',
		taxNumber: '',
		toTime: null
	},
	// 主要人员
	DI50201: [
		{
			job: '董事',
			name: '宁兴建'
		},
		{
			job: '董事长',
			name: '李信全'
		},
		{
			job: '董事兼总经理',
			name: '谢世飞'
		},
		{
			job: '监事',
			name: '李健'
		}
	],
	// 股东信息
	DI50301: [
		{
			amount: '148.73798万人民币',
			name: '袁培庆',
			rate: '3.7%',
			time: ''
		},
		{
			amount: '594.951924万人民币',
			name: '路小省',
			rate: '14.9%',
			time: ''
		},
		{
			amount: '800万人民币',
			name: '四川绵竹剑南春对外经济贸易有限公司',
			rate: '20.0%',
			time: ''
		},
		{
			amount: '2456.310096万人民币',
			name: '刘厚军',
			rate: '61.4%',
			time: ''
		}
	],
	// 分支机构
	DI50501: {
		hasNext: false,
		list: [
			{
				companyName: '广汉天益冶金有限责任公司',
				legalName: '吴勇',
				regCapital: '1000.000000万人民币',
				regStatus: '存续',
				regTime: '2005-08-11'
			},
			{
				companyName: '四川天益冶金集团有限公司宁波分公司',
				legalName: '伍经明',
				regCapital: '',
				regStatus: '注销',
				regTime: '2010-07-06'
			}
		],
		num: 100,
		page: 1,
		pages: 1,
		total: 2
	},
	// 对外投资
	DI50601: {
		hasNext: false,
		list: [
			{
				amount: '1000万人民币',
				companyName: '广汉天益冶金有限责任公司',
				legalName: '吴勇',
				rate: '100%',
				regCapital: '1000.000000万人民币',
				regStatus: '存续',
				regTime: '2005-08-11'
			},
			{
				amount: '1200.0万人民币',
				companyName: '四川绵竹剑南春对外经济贸易有限公司',
				legalName: '邓晓春',
				rate: '30%',
				regCapital: '4000.000000万人民币',
				regStatus: '存续',
				regTime: '2004-04-13'
			},
			{
				amount: '6400.0万',
				companyName: '青海天益冶金有限公司',
				legalName: '陈维友',
				rate: '80%',
				regCapital: '8000.000000万',
				regStatus: '存续',
				regTime: '2008-07-04'
			},
			{
				amount: '未公开',
				companyName: '青海天源冶金材料有限公司',
				legalName: '邓小松',
				rate: '未公开',
				regCapital: '2000.000000万',
				regStatus: '存续',
				regTime: '2006-06-12'
			},
			{
				amount: '2000万人民币',
				companyName: '成都天益远洋国际贸易有限公司',
				legalName: '李信全',
				rate: '100%',
				regCapital: '2000.000000万人民币',
				regStatus: '存续',
				regTime: '2008-12-18'
			},
			{
				amount: '1000万人民币',
				companyName: '成都益海矿业有限公司',
				legalName: '吴勇',
				rate: '100%',
				regCapital: '1000.000000万人民币',
				regStatus: '存续',
				regTime: '2007-06-01'
			},
			{
				amount: '397.8万人民币',
				companyName: '马边天益镍铬材料有限公司',
				legalName: '陈维友',
				rate: '51%',
				regCapital: '780.000000万人民币',
				regStatus: '存续',
				regTime: '2005-01-28'
			},
			{
				amount: '1000万人民币',
				companyName: '阿坝汶川天源镍铬材料有限公司',
				legalName: '黄国洪',
				rate: '100%',
				regCapital: '1000.000000万人民币',
				regStatus: '存续',
				regTime: '2011-12-27'
			},
			{
				amount: '3000.0万人民币',
				companyName: '成都天益房地产开发有限公司',
				legalName: '宁兴建',
				rate: '3,000%',
				regCapital: '100.000000万人民币',
				regStatus: '注销',
				regTime: '2011-09-01'
			},
			{
				amount: '700.0万人民币',
				companyName: '成都天益矿业投资有限公司',
				legalName: '庞春风',
				rate: '70%',
				regCapital: '1000.000000万人民币',
				regStatus: '存续',
				regTime: '2011-07-21'
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 10
	},
	// 工商变更
	DI50701: {
		hasNext: false,
		list: [
			{
				bankruptcyStatus: 0,
				changeItem: '高级管理人员备案（董事、监事、经理等）',
				changeTime: 1545926400,
				contentAfter: '谢世飞 宁兴建 李信全 ',
				contentBefore: '谢世飞 <em>邱培先 邓晓春 </em>宁兴建 李信全 ',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70416,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1545926400,
				contentAfter: '<em>路小省</em> 出资 59<em>4</em>.<em>9</em>5<em>19</em>24万人民币;四川绵竹剑南春对外经济贸易有限公司 出资 800<em>.000000</em>万人民币;刘厚军 出资 2456.310096万人民币;<em>袁培庆 出资 148.73798万人民币;</em>',
				contentBefore: '<em>武保立</em> 出资 <em>297.47</em>59<em>62万人民币;路启民 出资 29</em><em>7</em>.<em>4</em><em>7</em>5<em>96</em>2<em>万人民币;庄忠浩 出资 1</em>4<em>8.73798</em>万人民币;四川绵竹剑南春对外经济贸易有限公司 出资 800万人民币;刘厚军 出资 2456.310096万人民币;',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70417,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '高级管理人员备案（董事、监事、经理等）',
				changeTime: 1545926400,
				contentAfter: '李健 ',
				contentBefore: '李健 <em>邱波 冯选伟 </em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70418,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '住所变更',
				changeTime: 1501171200,
				contentAfter: '四川省<em>德阳市</em>广汉市新丰政府路',
				contentBefore: '四川省广汉市新丰政府路',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70400,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1501171200,
				contentAfter: '<em>谢世飞</em>',
				contentBefore: '<em>刘厚军</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70401,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '经理备案',
				changeTime: 1501171200,
				contentAfter: '<em>谢世飞</em>',
				contentBefore: '',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70402,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '监事备案',
				changeTime: 1501171200,
				contentAfter: '<em>李健</em> <em>邱波 冯选伟</em>',
				contentBefore: '<em>熊</em><em>怡平</em> <em>邓晓春 李健</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70403,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '高级管理人员备案（董事、监事、经理等）',
				changeTime: 1501171200,
				contentAfter: '<em>谢世飞</em> <em>宁兴建</em> <em>李信全</em> <em>邓晓春</em> <em>邱培先</em>',
				contentBefore: '<em>胡旭辉</em> <em>余德华</em> <em>邱培先</em> <em>刘厚军</em> <em>李信全</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70407,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '地址变更',
				changeTime: 1501171200,
				contentAfter: '四川省<em>德阳市</em>广汉市新丰政府路',
				contentBefore: '四川省广汉市新丰政府路',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70408,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '高级管理人员备案（董事、监事、经理等）',
				changeTime: 1501171200,
				contentAfter: '<em>谢世飞</em>',
				contentBefore: '',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70409,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '高级管理人员备案（董事、监事、经理等）',
				changeTime: 1501171200,
				contentAfter: '<em>李健</em> <em>邱波 冯选伟</em>',
				contentBefore: '<em>熊</em><em>怡平</em> <em>邓晓春 李健</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70410,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '董事备案',
				changeTime: 1501171200,
				contentAfter: '<em>谢世飞</em> <em>宁兴建</em> <em>李信全</em> <em>邓晓春</em> <em>邱培先</em>',
				contentBefore: '<em>胡旭辉</em> <em>余德华</em> <em>邱培先</em> <em>刘厚军</em> <em>李信全</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70398,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1501171200,
				contentAfter: '武保立 出资 297.475962万人民币;路启民 出资 297.475962万人民币;庄忠浩 出资 148.73798万人民币;四川绵竹剑南春对外经济贸易有限公司 出资 800万人民币;刘厚军 出资 2456.310096万人民币;',
				contentBefore: '武保立 出资 297.475962万人民币;路启民 出资 297.475962万人民币;庄忠浩 出资 148.73798万人民币;四川绵竹剑南春对外经济贸易有限公司 出资 800万人民币;刘厚军 出资 2456.310096万人民币;',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70399,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他事项备案',
				changeTime: 1481817600,
				contentAfter: '姓名：<em>何忠荣</em>;证件类型：<em>中华人民共和国居民身份证</em>;证件号码：***;联络人联系电话：***<em>**</em>;联络人移动电话：***;联络人电子邮件：<em>*****</em>;',
				contentBefore: '姓名：<em>左蕊寒</em>;证件类型：;证件号码：***;联络人联系电话：***;联络人移动电话：***;联络人电子邮件：;',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70411,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他事项备案',
				changeTime: 1481817600,
				contentAfter: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品<em>，</em>易制毒化学品<em>和易燃易爆物品</em>）、建辅材料、棉纺织品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。',
				contentBefore: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品<em>和</em>易制毒化学品）、建辅材料、棉纺织品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70412,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '一般经营项目变更',
				changeTime: 1481817600,
				contentAfter: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品<em>，</em>易制毒化学品<em>和易燃易爆物品</em>）、建辅材料、棉纺织品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。',
				contentBefore: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品<em>和</em>易制毒化学品）、建辅材料、棉纺织品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70356,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '联络人员备案',
				changeTime: 1481817600,
				contentAfter: '姓名：<em>何忠荣</em>;证件类型：<em>中华人民共和国居民身份证</em>;证件号码：*****;联络人联系电话：****<em>*</em>;联络人移动电话：13<em>6</em>****<em>4</em>6<em>66</em>;联络人电子邮件：<em>*****</em>;',
				contentBefore: '姓名：<em>左蕊寒</em>;证件类型：;证件号码：*****;联络人联系电话：<em>138</em>****<em>362</em><em>2</em>;联络人移动电话：13<em>8</em>****<em>3</em>6<em>22</em>;联络人电子邮件：;',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70357,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '地址变更',
				changeTime: 1481817600,
				contentAfter: '联络员住所:住所:<em>四川省</em>广汉市新丰政府路',
				contentBefore: '联络员住所:住所:广汉市新丰政府路',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70358,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '经营范围变更',
				changeTime: 1481817600,
				contentAfter: '经营范围及方式:经营范围:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品<em>，</em>易制毒化学品<em>和易燃易爆物品</em>）、建辅材料、棉纺织品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。',
				contentBefore: '经营范围及方式:经营范围:<em> </em>销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品<em>和</em>易制毒化学品）、建辅材料、棉纺织品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70359,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '联络人员备案',
				changeTime: 1481817600,
				contentAfter: '姓名：<em>何忠荣</em>;证件类型：<em>中华人民共和国居民身份证</em>;证件号码：*****;联络人联系电话：*****;联络人移动电话：*****;联络人电子邮件：<em>*****</em>;',
				contentBefore: '姓名：<em>左蕊寒</em>;证件类型：;证件号码：*****;联络人联系电话：*****;联络人移动电话：*****;联络人电子邮件：;',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70397,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他事项备案',
				changeTime: 1401984000,
				contentAfter: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品和易制毒化学品）、建辅材料、棉纺织品。（<em>依法须经批准</em>的项目，<em>经</em>相关<em>部门批准</em>后方可<em>开展</em>经营<em>活动</em>）<em>。</em>',
				contentBefore: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品和易制毒化学品）、建辅材料、棉纺织品。（<em>以上经营范围国家</em><em>禁止或者限制</em>的<em>除外，涉及行政许可经营</em>项目<em>的</em>，<em>取</em><em>得</em>相关<em>批准文</em><em>件、证件</em>后方可经营）',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70413,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他事项备案',
				changeTime: 1401984000,
				contentAfter: '备注:子公司:广汉市鑫瑞物资贸易有限责任公司、海晏县瑞直铁合金有限责任公司、肃北聚能矿业有限责任公司<em> （2014年6月6日换照）</em>',
				contentBefore: '备注:子公司:广汉市鑫瑞物资贸易有限责任公司、海晏县瑞直铁合金有限责任公司、肃北聚能矿业有限责任公司',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70414,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他事项备案',
				changeTime: 1401984000,
				contentAfter: '备注:子公司:广汉市鑫瑞物资贸易有限责任公司、海晏县瑞直铁合金有限责任公司、肃北聚能矿业有限责任公司<em>      （2014年6月6日换照）</em>',
				contentBefore: '备注:子公司:广汉市鑫瑞物资贸易有限责任公司、海晏县瑞直铁合金有限责任公司、肃北聚能矿业有限责任公司',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70415,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '经营范围变更',
				changeTime: 1401984000,
				contentAfter: '经营范围及方式:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品和易制毒化学品）、建辅材料、棉纺织品。（<em>依法须经批准</em>的项目，<em>经</em>相关<em>部门批准</em>后方可<em>开展</em>经营<em>活动</em>）<em>。</em>',
				contentBefore: '经营范围及方式:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品和易制毒化学品）、建辅材料、棉纺织品。（<em>以上经营范围国家</em><em>禁止或者限制</em>的<em>除外，涉及行政许可经营</em>项目<em>的</em>，<em>取</em><em>得</em>相关<em>批准文</em><em>件、证件</em>后方可经营）',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70360,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他变更',
				changeTime: 1401984000,
				contentAfter: '备注:子公司:广汉市鑫瑞物资贸易有限责任公司、海晏县瑞直铁合金有限责任公司、肃北聚能矿业有限责任公司<em> （2014年6月6日换照）</em>',
				contentBefore: '备注:子公司:广汉市鑫瑞物资贸易有限责任公司、海晏县瑞直铁合金有限责任公司、肃北聚能矿业有限责任公司',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70361,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '一般经营项目变更',
				changeTime: 1401984000,
				contentAfter: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品和易制毒化学品）、建辅材料、棉纺织品。（<em>依法须经批准</em>的项目，<em>经</em>相关<em>部门批准</em>后方可<em>开展</em>经营<em>活动</em>）<em>。</em>',
				contentBefore: '一般经营项目:销售：矿产品、冶金炉料、钢材、化工产品（不含危险化学品和易制毒化学品）、建辅材料、棉纺织品。（<em>以上经营范围国家</em><em>禁止或者限制</em>的<em>除外，涉及行政许可经营</em>项目<em>的</em>，<em>取</em><em>得</em>相关<em>批准文</em><em>件、证件</em>后方可经营）',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70362,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1241539200,
				contentAfter: '投资方名称: <em>路启民</em>; 出资额: <em>297</em><em>.476</em>万元; 占百分比: 7<em>.4</em><em>4</em>%; 住所:*****',
				contentBefore: '投资方名称: <em>刘厚军</em>; 出资额: <em>3160</em>万元; 占百分比: 7<em>9</em>%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70363,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1241539200,
				contentAfter: '<em>投资方名称: 刘厚军; 出资额: 2456.3101万元; 占百分比: 61.41%; 住所:****</em><em>*</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70364,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1241539200,
				contentAfter: '投资方名称: <em>庄忠浩</em>; 出资额: <em>1</em>4<em>8.73</em><em>7</em>万元; 占百分比: <em>3.7</em>1%; 住所:*****',
				contentBefore: '投资方名称: <em>余德华</em>; 出资额: 4<em>0</em>万元; 占百分比: 1%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70365,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1241539200,
				contentAfter: '<em>投资方名称: 四川绵竹剑南春对外经济贸易有限公司; 出资额: 800万元; 占百分比: 20%; 住所:****</em><em>*</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70366,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1241539200,
				contentAfter: '投资方名称: <em>武保立</em>; 出资额: <em>297.</em><em>476</em>万元; 占百分比: <em>7.</em><em>44</em>%; 住所:*****',
				contentBefore: '投资方名称: <em>四川绵竹剑南春对外经济贸易有</em><em>限公司</em>; 出资额: <em>800</em>万元; 占百分比: <em>20</em>%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70367,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '注册资本(金)变更',
				changeTime: 1239120000,
				contentAfter: '<em>40</em>00',
				contentBefore: '<em>25</em>00',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70368,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1239120000,
				contentAfter: '投资方名称: 刘厚军; 出资额: <em>3160</em>万元; 占百分比: 79%; 住所:*****',
				contentBefore: '投资方名称: 刘厚军; 出资额: <em>1975</em>万元; 占百分比: 79%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70369,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1239120000,
				contentAfter: '投资方名称: 余德华; 出资额: <em>40</em>万元; 占百分比: 1%; 住所:*****',
				contentBefore: '投资方名称: 余德华; 出资额: <em>25</em>万元; 占百分比: 1%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70370,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1239120000,
				contentAfter: '投资方名称: 四川绵竹剑南春对外经济贸易有限公司; 出资额: <em>8</em>00万元; 占百分比: 20%; 住所:*****',
				contentBefore: '投资方名称: 四川绵竹剑南春对外经济贸易有限公司; 出资额: <em>5</em>00万元; 占百分比: 20%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70371,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1225382400,
				contentAfter: '<em>姓名: 熊怡平; 证件号码: *****; 性别: 男; 职务</em><em>:</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70372,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1225382400,
				contentAfter: '投资方名称: 余德华; 出资额: 25万元; 占百分比: 1%; 住所:*****',
				contentBefore: '投资方名称: 余德华; 出资额: 25万元; 占百分比: 1<em>.25</em>%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70373,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1225382400,
				contentAfter: '<em>姓名: 邱培先; 证件号码: *****; 性别: 男; 职务</em><em>:</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70374,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1225382400,
				contentAfter: '<em>姓名: 余德华; 证件号码: *****; 性别: 男; 职务</em><em>:</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70375,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1225382400,
				contentAfter: '<em>姓名: 李信全; 证件号码: *****; 性别: 男; 职务</em><em>:</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70376,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1225382400,
				contentAfter: '<em>姓名: 刘厚军; 证件号码: *****; 性别: 男; 职务</em><em>:</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70377,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他变更',
				changeTime: 1225382400,
				contentAfter: '姓名: <em>邓晓春</em>; 证件号码: *****; 性别: 男; 职务:',
				contentBefore: '姓名: <em>刘厚军</em>; 证件号码: *****; 性别: 男; 职务:',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70378,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1225382400,
				contentAfter: '投资方名称: <em>四川绵竹剑南春对外经济贸易有</em><em>限公司</em>; 出资额: <em>500</em>万元; 占百分比: <em>20</em>%; 住所:*****',
				contentBefore: '投资方名称: <em>刘厚军</em>; 出资额: <em>1</em><em>975</em>万元; 占百分比: <em>98.</em><em>75</em>%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70379,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1225382400,
				contentAfter: '<em>投资方名称: 刘厚军; 出资额: 1975万元; 占百分比: 79%; 住所:****</em><em>*</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70380,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1225382400,
				contentAfter: '<em>姓名: 李健; 证件号码: *****; 性别: 男; 职务</em><em>:</em>',
				contentBefore: '<em>无</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70381,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他变更',
				changeTime: 1225382400,
				contentAfter: '姓名: <em>胡旭辉</em>; 证件号码: *****; 性别: 男; 职务:',
				contentBefore: '姓名: <em>余德华</em>; 证件号码: *****; 性别: 男; 职务:',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70382,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '注册资本(金)变更',
				changeTime: 1225382400,
				contentAfter: '2<em>5</em>00',
				contentBefore: '2<em>0</em>00',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70383,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '名称变更',
				changeTime: 1203177600,
				contentAfter: '四川<em>天益</em>冶<em>金集团有限</em>公司',
				contentBefore: '四川<em>省</em><em>瑞丰</em>冶<em>矿有限责任</em>公司',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70384,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1197216000,
				contentAfter: '投资方名称: 刘厚军; 出资额: 1<em>9</em>75万元; 占百分比: <em>9</em>8<em>.7</em>5%; 住所:*****',
				contentBefore: '投资方名称: 刘厚军; 出资额: 175万元; 占百分比: 8<em>7.</em>5%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70385,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1197216000,
				contentAfter: '投资方名称: 余德华; 出资额: 25万元; 占百分比: 1<em>.2</em>5%; 住所:*****',
				contentBefore: '投资方名称: 余德华; 出资额: 25万元; 占百分比: 1<em>2.</em>5%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70386,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '注册资本(金)变更',
				changeTime: 1197216000,
				contentAfter: '200<em>0</em>',
				contentBefore: '200',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70387,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '名称变更',
				changeTime: 1191945600,
				contentAfter: '<em>四川省</em>瑞丰冶矿有限责任公司',
				contentBefore: '<em>广汉市</em>瑞丰冶矿有限责任公司',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70388,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1167148800,
				contentAfter: '投资方名称: <em>刘厚军</em>; 出资额: 1<em>7</em>5万元; 占百分比: <em>87</em><em>.5</em>%; 住所:*****',
				contentBefore: '投资方名称: <em>周继勇</em>; 出资额: 15万元; 占百分比: <em>30</em>%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70404,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1167148800,
				contentAfter: '<em>无</em>',
				contentBefore: '<em>投资方名称: 余德华; 出资额: 25万元; 占百分比: 50%; 住所:****</em><em>*</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70405,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他变更',
				changeTime: 1167148800,
				contentAfter: '姓名: 刘<em>厚军</em>; 证件号码: *****; 性别: <em>男</em>; 职务:',
				contentBefore: '姓名: 刘<em>孙科</em>; 证件号码: *****; 性别: ; 职务:',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70406,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '投资人(股权)变更',
				changeTime: 1167148800,
				contentAfter: '投资方名称: <em>余德华</em>; 出资额: <em>25</em>万元; 占百分比: <em>1</em>2<em>.</em><em>5</em>%; 住所:*****',
				contentBefore: '投资方名称: <em>刘孙科</em>; 出资额: <em>10</em>万元; 占百分比: 2<em>0</em>%; 住所:*****',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70389,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '注册资本(金)变更',
				changeTime: 1167148800,
				contentAfter: '<em>2</em>0<em>0</em>',
				contentBefore: '<em>5</em>0',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70390,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他变更',
				changeTime: 1167148800,
				contentAfter: '姓名: <em>余德华</em>; 证件号码: *****; 性别: <em>男</em>; 职务:',
				contentBefore: '姓名: <em>周继勇</em>; 证件号码: *****; 性别: ; 职务:',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70391,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '经营范围变更',
				changeTime: 1167148800,
				contentAfter: '经营范围: 矿产品、冶金炉料、钢材、化工<em>立</em>品<em>（不含危险化学品和易制毒化学品）</em>、建辅材料、棉纺织品<em>。</em>（<em>以上</em>经营范围国家<em>禁止或者</em>限制<em>的</em>除外<em>，</em><em>涉及</em>行<em>政许可经营项目的，取得相关批准文件、证件后方可经营）行</em>业代码: 6599',
				contentBefore: '经营范围: <em>销售：冶金</em>矿<em>石、矿</em>产品、冶金炉料、钢材、化工<em>产</em>品、建辅材料、棉纺织品（<em>上述</em>经营范围国家限制除外<em>）。</em>行业代码: 6599',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70392,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1167148800,
				contentAfter: '刘<em>厚军</em>',
				contentBefore: '刘<em>孙科</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70393,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他变更',
				changeTime: 1141833600,
				contentAfter: '姓名: <em>刘孙科</em>; 证件号码: *****; 性别: ; 职务:',
				contentBefore: '姓名: <em>余德华</em>; 证件号码: *****; 性别: ; 职务:',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70394,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '其他变更',
				changeTime: 1141833600,
				contentAfter: '姓名: 周继勇; 证件号码: *****; 性别: ; 职务:',
				contentBefore: '姓名: 周继勇; 证件号码: *****; 性别: ; 职务:',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70395,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			},
			{
				bankruptcyStatus: 0,
				changeItem: '法定代表人变更',
				changeTime: 1141833600,
				contentAfter: '<em>刘孙科</em>',
				contentBefore: '<em>余德华</em>',
				dishonestStatus: 1,
				gmtCreate: 1596426065,
				gmtModified: 1596426065,
				id: 70396,
				isAttention: 0,
				isBorrower: false,
				isRead: false,
				obligorId: 902169,
				obligorName: '四川天益冶金集团有限公司'
			}
		],
		num: 5000,
		page: 1,
		pages: 1,
		total: 63
	},
};
