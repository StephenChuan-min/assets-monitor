import service from 'service';
import { serviceFile } from 'service';


/**
 * 【首页接口】
 * @returns {Promise<*>}
 * @param params
 */
// 首页列表
export const selfTree = async (params) => {
	const response = await service.get('/yc/statistics/organization/selfTree', { params });
	return response.data;
};

// 未读消息数量提醒 [zhousai]
export const unreadCount = async (params) => {
	const response = await service.get('/yc/message/station/notify/unreadCount', { params });
	return response.data;
};


// 导出Excel文件
export const exportFile = id => `/yc/export/file/excel/${id}`;


// 导出Excel文件
export const normalGet = url => params => serviceFile.get(url, { params }).then(res => res.data);

// 当前机构统计信息
export const currentOrganization = async (params) => {
	const response = await service.get('/yc/index/information/overview/currentOrganization', { params });
	return response.data;
};

// 每日监控日报提醒
export const dailyMonitorNotice = async (params) => {
	const response = await service.get('/yc/index/information/dailyMonitorNotice', { params });
	return response.data;
};

// 关闭推送
export const closeNotice = async (params) => {
	const response = await service.get('/yc/index/information/closeNotice', { params });
	return response.data;
};

// 监控概览的未读消息数量
export const unreadInfoRemind = async () => {
	const response = await service.get('/yc/index/information/wechat/unreadInfoRemind');
	return response.data;
};

// 资产挖掘
export const homeAssetDig = async (params) => {
	const response = await service.get('/yc/index/information/overview/assetDig', { params });
	return Object.assign(response.data, { name: 'homeAsset' });
};

// 风险参考
export const riskReference = async (params) => {
	const response = await service.get('/yc/index/information/overview/riskReference', { params });
	return Object.assign(response.data, { name: 'homeRisk' });
};

// [v2.0]重要信息提醒
// 资产拍卖
export const importantListAuction = async (params) => {
	const response = await service.get('/yc/monitor/auction/importantList', { params });
	return Object.assign(response.data, { name: 'action' });
};
// 土地出让结果
export const importantListLandTransfer = async (params) => {
	const response = await service.get('/yc/monitor/land/transfer/importantList', { params });
	return Object.assign(response.data, { name: 'LandTransfer' });
};
// 土地抵押
export const importantListLandMortgage = async (params) => {
	const response = await service.get('/yc/monitor/land/mortgage/importantList', { params });
	return Object.assign(response.data, { name: 'LandMortgage' });
};
// 土地转让
export const importantListLandTransaction = async (params) => {
	const response = await service.get('/yc/monitor/land/transaction/importantList', { params });
	return Object.assign(response.data, { name: 'LandTransaction' });
};
// 招投标
export const importantListBidding = async (params) => {
	const response = await service.get('/yc/monitor/bidding/importantList', { params });
	return Object.assign(response.data, { name: 'bidding' });
};
// 查/解封资产
export const importantListUnseal = async (params) => {
	const response = await service.get('/yc/monitor/unseal/importantList', { params });
	return Object.assign(response.data, { name: 'unseal' });
};
// 查/解封资产
export const importantListEstateRegister = async (params) => {
	const response = await service.get('/yc/monitor/estateRegister/importantList', { params });
	return Object.assign(response.data, { name: 'unseal' });
};
// 金融资产-竞价项目
export const importantListAuctionBidding = async (params) => {
	const response = await service.get('/yc/monitor/finance/auctionBidding/importantList', { params });
	return Object.assign(response.data, { name: 'auctionBidding' });
};
// 金融资产-公示项目
export const importantListFinance = async (params) => {
	const response = await service.get('/yc/monitor/finance/finance/importantList', { params });
	return Object.assign(response.data, { name: 'finance' });
};
// 排污权发证
export const importantListIntangibleEmission = async (params) => {
	const response = await service.get('/yc/monitor/intangible/emission/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleEmission' });
};
// 采矿权发证
export const importantListIntangibleMining = async (params) => {
	const response = await service.get('/yc/monitor/intangible/mining/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleMining' });
};
// 商标专利
export const importantListIntangibleTrademarkRight = async (params) => {
	const response = await service.get('/yc/monitor/intangible/trademarkRight/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleTrademarkRight' });
};
// 建筑建造资质
export const importantListIntangibleConstruct = async (params) => {
	const response = await service.get('/yc/monitor/intangible/construct/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleConstruct' });
};
// 动产抵押
export const importantListMortgage = async (params) => {
	const response = await service.get('/yc/monitor/mortgage/importantList', { params });
	return Object.assign(response.data, { name: 'mortgage' });
};
// 股权质押
export const importantListPledge = async (params) => {
	const response = await service.get('/yc/monitor/pledge/importantList', { params });
	return Object.assign(response.data, { name: 'pledge' });
};

// 代位权开庭
export const importantListSubrogationCourt = async (params) => {
	const response = await service.get('/yc/monitor/court/subrogation/importantList', { params });
	return Object.assign(response.data, { name: 'SubrogationCourt' });
};
// 代位权立案
export const importantListSubrogationTrial = async (params) => {
	const response = await service.get('/yc/monitor/trial/subrogation/importantList', { params });
	return Object.assign(response.data, { name: 'SubrogationTrial' });
};
// 代位权裁判文书
export const importantListSubrogationJudgment = async (params) => {
	const response = await service.get('/yc/monitor/judgment/subrogation/importantList', { params });
	return Object.assign(response.data, { name: 'SubrogationJudgment' });
};
// 破产重组
export const importantListRiskBankruptcy = async (params) => {
	const response = await service.get('/yc/monitor/bankruptcy/importantList', { params });
	return Object.assign(response.data, { name: 'bankruptcy' });
};
// 经营风险行政处罚
export const importantListRiskPunishment = async (params) => {
	const response = await service.get('/yc/monitor/risk/punishment/importantList', { params });
	return Object.assign(response.data, { name: 'punishment' });
};
// 经营风险重大税收违法
export const importantListRiskTax = async (params) => {
	const response = await service.get('/yc/monitor/risk/tax/importantList', { params });
	return Object.assign(response.data, { name: 'tax' });
};
// 经营风险严重违法
export const importantListRiskIllegal = async (params) => {
	const response = await service.get('/yc/monitor/risk/illegal/importantList', { params });
	return Object.assign(response.data, { name: 'illegal' });
};
// 经营风险经营异常
export const importantListRiskAbnormal = async (params) => {
	const response = await service.get('/yc/monitor/risk/abnormal/importantList', { params });
	return Object.assign(response.data, { name: 'abnormal' });
};
// 经营风险工商变更
export const importantListRiskChange = async (params) => {
	const response = await service.get('/yc/monitor/risk/change/importantList', { params });
	return Object.assign(response.data, { name: 'change' });
};
// 经营风险环境处罚
export const importantListRiskEpb = async (params) => {
	const response = await service.get('/yc/monitor/risk/epb/importantList', { params });
	return Object.assign(response.data, { name: 'epb' });
};
// 失信记录
export const importantListRiskDishonest = async (params) => {
	const response = await service.get('/yc/monitor/dishonest/importantList', { params });
	return Object.assign(response.data, { name: 'dishonest' });
};
// 涉诉信息开庭
export const importantListLawsuitCourt = async (params) => {
	const response = await service.get('/yc/monitor/court/lawsuit/importantList', { params });
	return Object.assign(response.data, { name: 'LawsuitCourt' });
};
// 涉诉信息立案
export const importantListLawsuitTrial = async (params) => {
	const response = await service.get('/yc/monitor/trial/lawsuit/importantList', { params });
	return Object.assign(response.data, { name: 'LawsuitTrial' });
};
// 涉诉信息裁判文书
export const importantListLawsuitJudgment = async (params) => {
	const response = await service.get('/yc/monitor/judgment/lawsuit/importantList', { params });
	return Object.assign(response.data, { name: 'LawsuitJudgment' });
};
// 限制高消费
export const importantListLimitHeight = async (params) => {
	const response = await service.get('/yc/monitor/limitHeight/importantList', { params });
	return Object.assign(response.data, { name: 'limitHeight' });
};
// 车辆信息
export const importantListCar = async (params) => {
	const response = await service.get('/yc/monitor/vehicle/importantList', { params });
	return Object.assign(response.data, { name: 'limitHeight' });
};

// 在建工程-建设单位
export const importantListBuildConstruct = async (params) => {
	const response = await service.get('/yc/monitor/onBuild/projectInfo/importantList', { params });
	return Object.assign(response.data, { name: 'construct' });
};

// 在建工程-中标单位
export const importantListBuildWinbid = async (params) => {
	const response = await service.get('/yc/monitor/onBuild/bidding/importantList', { params });
	return Object.assign(response.data, { name: 'winbid' });
};

// 在建工程-施工单位
export const importantListBuildUnderway = async (params) => {
	const response = await service.get('/yc/monitor/onBuild/constructionLicence/importantList', { params });
	return Object.assign(response.data, { name: 'underway' });
};
