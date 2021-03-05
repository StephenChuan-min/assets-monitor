const dd = {
	/*画像详情，概览*/

	// 资产拍卖（补充模糊匹配）
	"A10201": "/yc/search/portrait/company/overview/asset/auction",
	// 代位权
	"A10202" : "/yc/search/portrait/company/overview/asset/subrogation",
	// 土地信息
	"A10203": "/yc/search/portrait/company/overview/asset/land",
	// 股权质押
	"A10204": "/yc/search/portrait/company/overview/asset/stock",
	// 动产抵押
	"A10205": "/yc/search/portrait/company/overview/asset/mortgage",
	// 失信记录
	"A10206": "",
	// 经营风险
	"A10207": "/yc/search/portrait/company/overview/intangible",
	// 工商基本情况
	"A10208": "/yc/search/portrait/company/overview/business",
	// 破产重组
	"A10209": "/yc/search/portrait/company/overview/bankruptcy",
	// 无形资产
	"A10210": "/yc/search/portrait/company/overview/intangible",
	// 招投标
	"A10211": "/yc/search/portrait/company/overview/bidding",
	// 查解封资产
	"A10212": "/yc/search/portrait/company/overview/unseal",
	// 金融资产
	"A10213": "/yc/search/portrait/company/overview/finance",
	// 限制高消费
	"A10214": "/yc/search/portrait/company/overview/limitHeight",
	// 不动产
	"A10215": "/yc/search/portrait/company/overview/estateRegister", // 精准
	"A10216": "/yc/search/portrait/company/overview/estateRegister", // 模糊
	// 车辆
	"A10217": "/yc/search/portrait/company/overview/vehicleInformation",
	// 在建工程
	"A10218": "/yc/search/portrait/company/overview/onBuild",
	//  个人 - 概览
	// 资产拍卖
	"B10201": "/yc/search/portrait/personal/overview/asset/auction",
	// 代位权信息
	"B10202": "/yc/search/portrait/personal/overview/asset/subrogation",
	// 涉诉信息（涉诉文书）
	"B10203": "/yc/search/portrait/personal/overview/risk/litigation",
	// 失信记录
	"B10204": "/yc/search/portrait/personal/overview/risk/dishonest",
	// 税收违法
	"B10205": "/yc/search/portrait/personal/overview/risk/tax-illegal",

	/*画像详情，资产*/
	// 资产拍卖
	"A10301": "/yc/search/portrait/company/asset/auction/precision/list", // 精准匹配
	"A10312": "/yc/search/portrait/company/asset/auction/vague/list", // 模糊匹配
	//代位权
	"A10302": "/yc/search/portrait/company/asset/subrogation/trial/list", // 立案
	"A10303": "/yc/search/portrait/company/asset/subrogation/court-notice/list", // 开庭
	"A10304": "/yc/search/portrait/company/asset/subrogation/judgment-document/list", // 裁判文书
	//土地信息
	"A10305": "/yc/search/portrait/company/asset/land/transfer", // 出让
	"A10306": "/yc/search/portrait/company/asset/land/transaction", // 转让
	"A10307": "/yc/search/portrait/company/asset/land/mortgage", // 抵押
	//股权质押
	"A10308": "/yc/search/portrait/company/asset/stock/pledgor", // 股权出质
	"A10309": "/yc/search/portrait/company/asset/stock/pledgee", // 股权质权
	// 动产抵押
	"A10310": "/yc/search/portrait/company/asset/mortgage/owner", // 抵押
	"A10311": "/yc/search/portrait/company/asset/mortgage/people", // 抵押权
	// 无形资产
	"A10313": "/yc/search/portrait/company/asset/intangible/emission/list", // 排污权
	"A10314": "/yc/search/portrait/company/asset/intangible/mining/list", // 矿业权
	"A10315": "/yc/search/portrait/company/asset/intangible/trademark/list", // 商标专利
	"A10316": "/yc/search/portrait/company/asset/intangible/construct/list", // 建筑建造资质
	// 招投标
	"A10317": "/yc/search/portrait/company/asset/bidding/list",
	// 查解封资产
	"A10318": "/yc/search/portrait/company/asset/unseal/unsealList",
	// 金融资产
	"A10319": "/yc/search/portrait/company/asset/finance/auctionFinanceList", // 竞价项目
	"A10320": "/yc/search/portrait/company/asset/finance/financeInvestmentList", // 招商项目
	"A10321": "/yc/search/portrait/company/asset/finance/financeList", // 公示项目
	// 不动产
	"A10322": "/yc/search/portrait/company/asset/estateRegister/estateRegisterList",	// 精准
	"A10323": "/yc/search/portrait/company/asset/estateRegister/estateRegisterList",  // 模糊

	// 车辆
	"A10324": "/yc/search/portrait/company/asset/vehicle/vehicleList",

	// 在建工程
	"A10325": "/yc/search/portrait/company/asset/onBuild/onBuildUnitList", // 建设单位
	"A10326": "/yc/search/portrait/company/asset/onBuild/onBuildBidList", // 中标单位
	"A10327": "/yc/search/portrait/company/asset/onBuild/onBuildConstList", // 施工单位

	/*画像详情，风险*/
	//涉诉
	"A10401": "/yc/search/portrait/company/lawsuit/trial/list", // 立案
	"A10402": "/yc/search/portrait/company/lawsuit/court-notice/list", // 开庭
	"A10403": "/yc/search/portrait/company/lawsuit/judgment-document/list", // 裁判文书
	// 失信记录
	"A10404": "/yc/search/portrait/company/lawsuit/dishonest/list",
	// 破产重组
	"A10501": "/yc/search/portrait/company/management/bankruptcy/list",
	// 经营风险
	"A10502": "/yc/search/portrait/company/management/abnormal/list", // 经营异常
	"A10503": "/yc/search/portrait/company/management/illegal/list", // 严重违法
	"A10504": "/yc/search/portrait/company/management/tax/list", // 税收违法
	"A10505": "/yc/search/portrait/company/management/punishment/list", // 行政处罚
	"A10506": "/yc/search/portrait/company/management/epb/list", // 环保处罚
	// 限制高消费
	"A10507": "/yc/search/portrait/company/lawsuit/limitHeight/limitHeightList",



};
