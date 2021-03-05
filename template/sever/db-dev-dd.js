const dd ={
	/** 业务相关接口 ---------- start */
	/* 基本信息 */
	"BB10101":"/yc/business/monitor/overview/detail", // 基本信息
	"BB10102":"/yc/business/monitor/overview/relation", // 业务相关人列表

	/* 资产*/
	"BA10101":"/yc/business/monitor/asset/auction/accurate/list", // 资产拍卖_精准匹配
	"BA10102":"/yc/business/monitor/asset/auction/fuzzy/list", // 资产拍卖_模糊匹配
	"BA10401":"/yc/business/monitor/asset/intangible/emission/list", // 无形资产_排污权
	"BA10402":"/yc/business/monitor/asset/intangible/mining/list", // 无形资产_矿业权
	"BA10403":"/yc/business/monitor/asset/intangible/trademarkRight/list", // 无形资产_商标专利
	"BA10404":"/yc/business/monitor/asset/intangible/construct/list", // 无形资产_建筑建造资质
	"BA10301":"/yc/business/monitor/asset/land/transfer/list", // 土地信息_出让结果
	"BA10302":"/yc/business/monitor/asset/land/transaction/list", // 土地信息_土地转让
	"BA10303":"/yc/business/monitor/asset/land/mortgage/list", // 土地信息_土地抵押
	"BA10201":"/yc/business/monitor/asset/subrogation/trial/list", // 代位权_立案
	"BA10202":"/yc/business/monitor/asset/subrogation/court-notice/list", // 代位权_开庭
	"BA10203":"/yc/business/monitor/asset/subrogation/judgment-document/list", // 代位权_裁判文书
	"BA10501":"/yc/business/monitor/asset/finance/pledgor/list", // 股权质押_股权出质
	"BA10502":"/yc/business/monitor/asset/finance/pledgee/list", // 股权质押_股权质权
	"BA10601":"/yc/business/monitor/asset/mortgage/owner/list", // 动产抵押_抵押
	"BA10602":"/yc/business/monitor/asset/mortgage/people/list", // 动产抵押_抵押权
	"BA10701":"/yc/business/monitor/asset/bidding/list", // 招投标


	/* 风险 */
	"BR30201":"/yc/business/monitor/risk/bankruptcy/list", // 破产重组
	"BR20401":"/yc/business/monitor/risk/dishonest/list?removeStatus=false", //  失信记录-列入
	"BR20402":"/yc/business/monitor/risk/dishonest/list?removeStatus=true", //  失信记录-已移除
	// "R20502":"", //  限高
	"BR20601":"/yc/business/monitor/risk/lawsuit/trial/list", // 涉诉信息_立案
	"BR20602":"/yc/business/monitor/risk/lawsuit/court-notice/list", // 涉诉信息_开庭
	"BR20603":"/yc/business/monitor/risk/lawsuit/judgment-document/list", // 涉诉信息_裁判文书
	"BR30301":"/yc/business/monitor/risk/abnormal/list", // 经营异常
	"BR30401":"/yc/business/monitor/risk/illegal/list", // 严重违法
	"BR30501":"/yc/business/monitor/risk/tax/list", // 税收违法
	"BR30601":"/yc/business/monitor/risk/punishment/list", // 行政处罚
	"BR30701":"/yc/business/monitor/risk/epb/list", // 环保处罚

	/** 业务相关接口 ---------- end */


	/** 债务人相关接口 ---------- start */
	/* 基本信息 */
	"DB10101":"/yc/obligor/monitor/overview/detail", // 基本信息
	"DB10102":"/yc/obligor/monitor/overview/relation", // 关联业务表

	/* 概览 */
	"DO10100":'/yc/obligor/monitor/overview/auction',  	// 资产拍卖
	"DO10300":'/yc/obligor/monitor/overview/land', //债务人土地信息
	"DO10400":'/yc/obligor/monitor/overview/intangible',// 债务人无形资产
	"DO10200":'/yc/obligor/monitor/overview/subrogation',// 债务人代位权
	"DO10500":'/yc/obligor/monitor/overview/stock',// 债务人股权质押
	"DO10600":'/yc/obligor/monitor/overview/mortgage',// 债务人动产抵押
	"DO10700":'/yc/obligor/monitor/overview/bidding',// 债务人招标中标
	"DO30200":'/yc/obligor/monitor/overview/bankruptcy',// 债务人破产重组
	"DO20600":'/yc/obligor/monitor/overview/litigation',// 债务人涉诉
	"DO20400":'/yc/obligor/monitor/overview/dishonest',// 债务人失信
	"DO30300":'/yc/obligor/monitor/overview/risk',// 债务人经营风险
	"DO30500":'/yc/obligor/monitor/overview/tax',// 个人债务人税收违法
	'DO50000':'/yc/obligor/monitor/overview/business',// 债务人工商基本情况

	/* 资产*/
	"DA10101":"/yc/obligor/monitor/asset/auction/list?important=1", // 资产拍卖_精准匹配
	"DA10102":"/yc/obligor/monitor/asset/auction/list?important=0", // 资产拍卖_模糊匹配
	"DA10401":"/yc/obligor/monitor/asset/intangible/emission/list", // 无形资产_排污权
	"DA10402":"/yc/obligor/monitor/asset/intangible/mining/list", // 无形资产_矿业权
	"DA10403":"/yc/obligor/monitor/asset/intangible/trademarkRight/list", // 无形资产_商标专利
	"DA10404":"/yc/obligor/monitor/asset/intangible/construct/list", // 无形资产_建筑建造资质
	"DA10301":"/yc/obligor/monitor/asset/land/transfer/list", // 土地信息_出让结果
	"DA10302":"/yc/obligor/monitor/asset/land/transaction/list", // 土地信息_土地转让
	"DA10303":"/yc/obligor/monitor/asset/land/mortgage/list", // 土地信息_土地抵押
	"DA10201":"/yc/obligor/monitor/asset/subrogation/trial/list", // 代位权_立案
	"DA10202":"/yc/obligor/monitor/asset/subrogation/court-notice/list", // 代位权_开庭
	"DA10203":"/yc/obligor/monitor/asset/subrogation/judgment-document/list", // 代位权_裁判文书
	"DA10501":"/yc/obligor/monitor/asset/finance/pledgor/list", // 股权质押_股权出质
	"DA10502":"/yc/obligor/monitor/asset/finance/pledgee/list", // 股权质押_股权质权
	"DA10601":"/yc/obligor/monitor/asset/mortgage/owner/list", // 动产抵押_抵押
	"DA10602":"/yc/obligor/monitor/asset/mortgage/people/list", // 动产抵押_抵押权
	"DA10701":"/yc/obligor/monitor/asset/bidding/list", // 招投标

	// 金融资产
	"DA10801": "/yc/obligor/monitor/asset/finance/auctionBidding/list", // 竞价项目
	"DA10802": "/yc/obligor/monitor/asset/finance/finance/list", // 招商项目
	"DA10803": "/yc/obligor/monitor/asset/finance/finance/list", // 公示项目
	// 查解封资产
	"DA10901": "/yc/obligor/monitor/asset/unseal/unsealList",

	/*债务人详情，风险*/
	// 限制高消费
	"DR20501": "/yc/obligor/monitor/risk/LimitHeightList",

	/* 风险 */
	"DR30201":"/yc/obligor/monitor/risk/bankruptcy/list", // 破产重组
	"DR20604":"/yc/obligor/monitor/risk/lawsuit/judgment-document/list", // 涉诉文书
	"DR20401":"/yc/obligor/monitor/risk/dishonest/list?removeStatus=false", //  失信记录-列入
	"DR20402":"/yc/obligor/monitor/risk/dishonest/list?removeStatus=true", //  失信记录-已移除
	// "R20502":"", //  限高
	"DR20601":"/yc/obligor/monitor/risk/lawsuit/trial/list", // 涉诉信息_立案
	"DR20602":"/yc/obligor/monitor/risk/lawsuit/court-notice/list", // 涉诉信息_开庭
	"DR20603":"/yc/obligor/monitor/risk/lawsuit/judgment-document/list", // 涉诉信息_裁判文书
	"DR30301":"/yc/obligor/monitor/risk/abnormal/list", // 经营异常
	"DR30401":"/yc/obligor/monitor/risk/illegal/list", // 严重违法
	"DR30501":"/yc/obligor/monitor/risk/tax/list", // 税收违法
	"DR30601":"/yc/obligor/monitor/risk/punishment/list", // 行政处罚
	"DR30701":"/yc/obligor/monitor/risk/epb/list", // 环保处罚

	/*工商基本信息*/
	"DI50101":"/yc/obligor/monitor/baseInfo/baseInfo", // 基本信息
	"DI50201":"/yc/obligor/monitor/baseInfo/mainPerson", // 主要人员
	"DI50301":"/yc/obligor/monitor/baseInfo/stockholder", // 股东信息
	// "I50401":"", // 股权穿透
	"DI50501":"/yc/obligor/monitor/baseInfo/branch", // 分支机构
	"DI50601":"/yc/obligor/monitor/baseInfo/investment", // 对外投资
	"DI50701":"/yc/obligor/monitor/change/list", // 工商变更

	/** 债务人相关接口 ---------- end */
};
