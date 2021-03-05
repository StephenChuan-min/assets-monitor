import service from 'service';
/*
* 2.0 信息概览资产挖掘卡片数量接口
*
*/

// 土地数据-出让结果
export const landTransferCount = async (params) => {
	const response = await service.get('/yc/monitor/land/transfer/list-count', { params });
	return response.data;
};

// 土地数据-土地抵押
export const landMortgageCount = async (params) => {
	const response = await service.get('/yc/monitor/land/mortgage/list-count', { params });
	return response.data;
};

// 土地数据-转让
export const landTransactionCount = async (params) => {
	const response = await service.get('/yc/monitor/land/transaction/list-count', { params });
	return response.data;
};

// 无形资产-排污权
export const emissionCount = async (params) => {
	const response = await service.get('/yc/monitor/intangible/emission/list-count', { params });
	return response.data;
};

// 无形资产-采矿权
export const miningCount = async (params) => {
	const response = await service.get('/yc/monitor/intangible/mining/list-count', { params });
	return response.data;
};

// 无形资产-商标专利
export const trademarkRightCount = async (params) => {
	const response = await service.get('/yc/monitor/intangible/trademarkRight/list-count', { params });
	return response.data;
};

// 无形资产-建筑建造
export const constructCount = async (params) => {
	const response = await service.get('/yc/monitor/intangible/construct/list-count', { params });
	return response.data;
};

// 代位权-立案
export const subrogationTrialCount = async (params) => {
	const response = await service.get('/yc/monitor/trial/subrogation/list-count', { params });
	return response.data;
};

// 代位权-开庭
export const subrogationCourtCount = async (params) => {
	const response = await service.get('/yc/monitor/court/subrogation/list-count', { params });
	return response.data;
};

// 代位权-裁判
export const subrogationJudgmentCount = async (params) => {
	const response = await service.get('/yc/monitor/judgment/subrogation/list-count', { params });
	return response.data;
};

// 股权质押
export const pledgeCount = async (params) => {
	const response = await service.get('/yc/monitor/pledge/list-count', { params });
	return response.data;
};

// 动产抵押
export const mortgageCount = async (params) => {
	const response = await service.get('/yc/monitor/mortgage/list-count', { params });
	return response.data;
};

// 金融资产-竞价项目
export const auctionBiddingCount = async (params) => {
	const response = await service.get('/yc/monitor/finance/auctionBidding/listCount', { params });
	return response.data;
};

// 金融资产-招商项目
export const auctionFinanceCountMerchants = async (params) => {
	const response = await service.get('/yc/monitor/finance/investment/financeInvestmentCount', { params });
	return response.data;
};

// 金融资产-公示项目
export const auctionFinanceCount = async (params) => {
	const response = await service.get('/yc/monitor/finance/finance/listCount', { params });
	return response.data;
};

// 招投标 => 数量统计
export const assetBiddingCount = async (params) => {
	const response = await service.get('/yc/monitor/bidding/list-count', { params });
	return response.data;
};

// 在建工程-建筑单位
export const buildConstructCount = async (params) => {
	const response = await service.get('/yc/monitor/onBuild/projectInfo/projectInfoCount', { params });
	return Object.assign(response.data, { code: 200 });
};

// 在建工程-中标单位
export const buildWinbidCount = async (params) => {
	const response = await service.get('/yc/monitor/onBuild/bidding/projectBiddingCount', { params });
	return Object.assign(response.data, { code: 200 });
};

// 在建工程-施工单位
export const buildUnderwayCount = async (params) => {
	const response = await service.get('/yc/monitor/onBuild/constructionLicence/constructionLicenceCount', { params });
	return Object.assign(response.data, { code: 200 });
};

// 不动产 => 数量统计
export const estateRegisterCount = async (params) => {
	const response = await service.get('/yc/monitor/estateRegister/estateRegisterListCount', { params });
	return response.data;
};

// 车辆信息 => 数量统计
export const carCount = async (params) => {
	const response = await service.get('/yc/monitor/vehicle/vehicleListCount', { params });
	return response.data;
};

// 查解封资产 => 数量统计
export const assetUnBlockCount = async (params) => {
	const response = await service.get('/yc/monitor/unseal/unsealListCount', { params });
	return response.data;
};

// 限制高消费 => 数量统计
export const riskLimitCount = async (params) => {
	const response = await service.get('/yc/monitor/limitHeight/LimitHeightCount', { params });
	return response.data;
};

// 破产重组
export const riskBankruptcyCount = async (params) => {
	const response = await service.get('/yc/monitor/bankruptcy/list-count', { params });
	return response.data;
};

// 失信
export const riskDishonestCount = async (params) => {
	const response = await service.get('/yc/monitor/dishonest/list-count', { params });
	return response.data;
};

// 涉诉监控-立案
export const lawsuitTrialCount = async (params) => {
	const response = await service.get('/yc/monitor/trial/lawsuit/list-count', { params });
	return response.data;
};

// 涉诉监控-开庭
export const lawsuitCourtCount = async (params) => {
	const response = await service.get('/yc/monitor/court/lawsuit/list-count', { params });
	return response.data;
};

// 涉诉监控-裁判
export const lawsuitJudgmentCount = async (params) => {
	const response = await service.get('/yc/monitor/judgment/lawsuit/list-count', { params });
	return response.data;
};

// 经营风险-工商变更
export const riskChangeCount = async (params) => {
	const response = await service.get('/yc/monitor/risk/change/list-count', { params });
	return response.data;
};

// 经营风险-行政处罚
export const riskPunishmentCount = async (params) => {
	const response = await service.get('/yc/monitor/risk/punishment/list-count', { params });
	return response.data;
};

// 经营风险-环保处罚
export const riskEpbCount = async (params) => {
	const response = await service.get('/yc/monitor/risk/epb/list-count', { params });
	return response.data;
};

// 经营风险-严重违法
export const riskIllegalCount = async (params) => {
	const response = await service.get('/yc/monitor/risk/illegal/list-count', { params });
	return response.data;
};

// 经营风险-经营异常
export const riskAbnormalCount = async (params) => {
	const response = await service.get('/yc/monitor/risk/abnormal/list-count', { params });
	return response.data;
};

// 经营风险-税收违法
export const riskTaxCount = async (params) => {
	const response = await service.get('/yc/monitor/risk/tax/list-count', { params });
	return response.data;
};
