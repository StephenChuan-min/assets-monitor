import React, { PureComponent } from 'react';
import {
	homeAssetDig, riskReference, importantListAuction, importantListLandTransfer, importantListLandMortgage, importantListLandTransaction, importantListIntangibleEmission,
	importantListIntangibleMining, importantListIntangibleTrademarkRight, importantListIntangibleConstruct, importantListMortgage, importantListPledge, importantListSubrogationCourt,
	importantListSubrogationTrial, importantListSubrogationJudgment, importantListRiskPunishment, importantListRiskTax, importantListRiskIllegal, importantListRiskAbnormal,
	importantListRiskDishonest, importantListRiskBankruptcy, importantListLawsuitCourt, importantListLawsuitTrial, importantListLawsuitJudgment, importantListRiskChange,
	importantListRiskEpb, importantListAuctionBidding, importantListFinance, importantListBidding, importantListUnseal, importantListLimitHeight, importantListEstateRegister, importantListBuildConstruct, importantListBuildWinbid, importantListBuildUnderway,
	importantListCar,
} from 'api/home';
import { Button as Btn, Spin } from '@/common';
import { promiseAll } from '@/utils/promise';
import './style.scss';
import DetailItem from '@/views/home/components/detail-item';
import ImportantInfoModal from '@/views/home/home-left/important-info-modal';
import { Select } from 'antd';
import DynamicUpdate from './dynamic-update';

const customStyle = { padding: '20px' };
const compare = property => (a, b) => {
	const first = a[property];
	const second = b[property];
	return second - first;
};
const assestArr = [
	{ count: 'zcwjzcpm', Api: importantListAuction, auction: true }, // 资产挖掘->资产拍卖 101
	/* { count: 'zcwjzbzb', Api: importantListBidding }, */ // 资产挖掘->招标中标
	{ count: 'zcwjcjfzc', Api: importantListUnseal }, // 资产挖掘->查解封资产

	{ count: 'zcwjtdsj', Api: importantListLandTransfer }, // 资产挖掘->土地数据
	{ count: 'zcwjtdsj', Api: importantListLandMortgage },
	{ count: 'zcwjtdsj', Api: importantListLandTransaction },

	/* { count: 'zcwjjrzj', Api: importantListAuctionBidding }, // 资产挖掘->金融资产
  { count: 'zcwjjrzj', Api: importantListFinance }, */

	{ count: 'zcwjwxzc', Api: importantListIntangibleEmission }, // 资产挖掘->无形资产
	{ count: 'zcwjwxzc', Api: importantListIntangibleMining },
	// { count: 'zcwjwxzc', Api: importantListIntangibleTrademarkRight }, //商标专利
	// { count: 'zcwjwxzc', Api: importantListIntangibleConstruct }, // 建筑建造资质

	{ count: 'zcwjdcdy', Api: importantListMortgage }, // 资产挖掘->动产抵押

	{ count: 'zcwjgqzy', Api: importantListPledge }, // 资产挖掘->股权质押

	{ count: 'zcwjdwq', Api: importantListSubrogationCourt }, // 资产挖掘->代位权
	{ count: 'zcwjdwq', Api: importantListSubrogationTrial },
	{ count: 'zcwjdwq', Api: importantListSubrogationJudgment },

	{ count: 'zcwjbdcdj', Api: importantListEstateRegister }, // 资产挖掘->不动产登记
	{ count: 'zcwjclxx', Api: importantListCar }, // 资产挖掘->车辆信息

	{ count: 'zjgcjsdw', Api: importantListBuildConstruct }, // 在建工程-建设单位
	{ count: 'zjgczbdw', Api: importantListBuildWinbid }, // 在建工程-中标单位
	{ count: 'zjgcsgdw', Api: importantListBuildUnderway }, // 在建工程-施工单位
];
const assetsDataType = {
	101: { tag: '资产拍卖', icon: 'auction-2' },
	201: { tag: '出让结果', icon: 'land-result' },
	202: { tag: '土地转让', icon: 'land-transfer' },
	203: { tag: '土地抵押', icon: 'land-mortgage' },
	301: { tag: '排污权发证', icon: 'intangible-dump' },
	302: { tag: '采矿权发证', icon: 'intangible-mining' },
	// 303: { tag: '商标专利', icon: 'intangible-trademark' },
	// 304: { tag: '建筑建造资质', icon: 'intangible-build' },
	401: { tag: '动产抵押', icon: 'chattel-2' },
	501: { tag: '股权质押', icon: 'stock-2' },
	601: { tag: '代位权(立案)', icon: 'subrogation-trial' },
	602: { tag: '代位权(开庭)', icon: 'subrogation-court' },
	603: { tag: '代位权(文书)', icon: 'subrogation-judgment' },
	1401: { tag: '查/解封资产', icon: 'unblockCube' },
	1501: { tag: '车辆信息', icon: 'biaoqian-cheliangxinxi' },
	1601: { tag: '不动产登记', icon: 'biaoqian-budongchandengji' },
	1701: { tag: '在建工程', icon: 'construct' },
	1702: { tag: '在建工程', icon: 'construct' },
	1703: { tag: '在建工程', icon: 'construct' },
};
const riskDataType = {
	701: { tag: '破产重组', icon: 'bankruptcy-2' },
	801: { tag: '失信(列入)', icon: 'broken-add' },
	802: { tag: '失信(移除)', icon: 'broken-remove' },
	901: { tag: '涉诉(立案)', icon: 'lawsuit-trial' },
	902: { tag: '涉诉(开庭)', icon: 'lawsuit-court' },
	903: { tag: '涉诉(文书)', icon: 'lawsuit-judgment' },
	1001: { tag: '经营异常', icon: 'abnormal' },
	1002: { tag: '严重违法', icon: 'illegal' },
	1003: { tag: '税收违法', icon: 'tax' },
	1004: { tag: '行政处罚', icon: 'punishment' },
	1301: { tag: '限制高消费(移除)', icon: 'limitCube' },
	1302: { tag: '限制高消费', icon: 'limitCube' },
};
const riskArr = [
	{ count: 'fxjkqypccz', Api: importantListRiskBankruptcy }, // 风险监控->企业破产重组

	{ count: 'jyfxxzcf', Api: importantListRiskPunishment }, // 经营风险->行政处罚
	{ count: 'jyfxsswf', Api: importantListRiskTax }, // 经营风险->税收违法
	{ count: 'jyfxyzwf', Api: importantListRiskIllegal }, // 经营风险->严重违法
	{ count: 'jyfxjyyc', Api: importantListRiskAbnormal }, // 经营风险->经营异常
	{ count: 'jyfxgsbg', Api: importantListRiskChange }, // 经营风险->工商变更
	{ count: 'jyfxhbcf', Api: importantListRiskEpb }, // 经营风险->环保处罚

	{ count: 'jkxxsxjl', Api: importantListRiskDishonest }, // 风险监控->失信记录

	{ count: 'fxjkssjk', Api: importantListLawsuitTrial }, // 风险监控->涉诉监控
	{ count: 'fxjkssjk', Api: importantListLawsuitCourt },
	{ count: 'fxjkssjk', Api: importantListLawsuitJudgment },
	{ count: 'fxjkxzgxf', Api: importantListLimitHeight }, // 风险监控->限制高消费
];
class HomeDynamic extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			checkArray: [
				{ name: '7天内更新', type: 1 },
				{ name: '30天内更新', type: 2 },
			],
			checkType: 0,
			assetPropsData: {},
			riskPropsData: {},
			AssetImportantReminderList: [],
			RiskImportantReminderList: [],
			AssetImportantReminderObligorIdList: [],
			RiskImportantReminderObligorIdList: [],
			loading: false,
			importLoading: false,
			finish: false,
			showModal: false,
			timeType: 1, // 7天内更新/30天内更新状态，
			typeValue: 'all',
		};
	}

	componentDidMount() {
		const params = { type: 1 };
		this.getData(params);
		this.getAssetImportantReminder();
		// this.getRiskImportantReminder();
	}

	// 获取数组的总数
	getTotal = (arr) => {
		const newArr = arr && arr.filter(i => i !== null);
		if (newArr.length === 0) { return null; }
		let total = 0;
		newArr.forEach((i) => {
			total += i;
		});
		return total;
	};

	// 获取资产和风险的数据
	getData = (val) => {
		const params = { ...val	};
		const excavate = new Map([
			['homeAsset', this.getAssetData],
			['homeRisk', this.getRiskData],
			['default', () => { console.log('未匹配'); }],
		]);
		const promiseArray = [];
		promiseArray.push(homeAssetDig(params));
		promiseArray.push(riskReference(params));
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		this.setState({ loading: true });
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			this.setState({ loading: false, finish: true });
			const isArray = Array.isArray(res) && res.length > 0;
			// this.setState({ loading: false, finish: true });
			if (isArray) {
				res.forEach((item) => {
					const value = { ...item, ...params };
					const excavateMap = excavate.get(item.name) || excavate.get('default');
					excavateMap.call(this, value);
				});
			}
			// console.log('all promise are resolved', res);
		}).catch((reason) => {
			this.setState({ loading: false, finish: false });
			console.log('promise reject failed reason', reason);
		});
	};

	// 资产每个模块的新增数量
	getAssetData = (res) => {
		if (res && res.code === 200) {
			const {
				auction, auctionBidding, bidding, construct, emission, finance, landMortgage, landTransaction, landTransfer,
				mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark, unseal, estateRegister,
				financeInvestment, vehicleInformation, projectInfoCount, projectBiddingCount, constructionLicenceCount,
			} = res.data;
			const landNum = this.getTotal([landMortgage, landTransaction, landTransfer]);
			const intangibleNum = this.getTotal([emission, mining, trademark, construct]);
			const subrogationNum = this.getTotal([subrogationCourt, subrogationJudgement, subrogationTrial]);
			const financeNum = this.getTotal([auctionBidding, finance, financeInvestment]);
			const onBuildNum = this.getTotal([projectInfoCount, projectBiddingCount, constructionLicenceCount]);
			const totalNum = this.getTotal([auction, auctionBidding, bidding, construct, emission,
				finance, financeInvestment, landMortgage, landTransaction, landTransfer, mining, mortgage, stock, subrogationCourt,
				subrogationJudgement, subrogationTrial, trademark, unseal, estateRegister, vehicleInformation, projectInfoCount, projectBiddingCount, constructionLicenceCount]);
			const assetDataArray = [
				{
					count: auction, type: 1, typeName: '资产拍卖', name: '资产拍卖', value: 1,
				},
				{
					count: subrogationNum, type: 6, typeName: '代位权', name: '代位权', value: 2,
				},
				{
					count: landNum, type: 2, typeName: '土地信息', name: '土地信息', value: 3,
				},
				{
					count: stock, type: 5, typeName: '股权质押', name: '股权质押', value: 4,
				},
				{
					count: financeNum, type: 12, typeName: '金融资产', name: '金融资产', value: 5,
				},
				{
					count: mortgage, type: 4, typeName: '动产抵押', name: '动产抵押', value: 6,
				},
				{
					count: bidding, type: 11, typeName: '招投标', name: '招投标', value: 7,
				},
				{
					count: intangibleNum, type: 3, typeName: '无形资产', name: '无形资产', value: 8,
				},
				{
					count: unseal, type: 14, typeName: '查/解封资产', name: '查/解封资产', value: 9,
				},
				{
					count: onBuildNum, type: 17, typeName: '在建工程', name: '在建工程', value: 12,
				},
				{
					count: estateRegister, type: 14, typeName: '不动产登记', name: '不动产登记', value: 10,
				},
				{
					count: vehicleInformation, type: 14, typeName: '车辆信息', name: '车辆信息', value: 11,
				},
			];
			// console.log('assetDataArray === ', assetDataArray);
			const assetPropsData = {
				totalNum,
				assetDataArray,
			};
			this.setState({
				assetPropsData,
				// loading: false,
			});
		}
	};

	// 资产每个模块的重要信息提醒
	getAssetImportantReminder = () => {
	/*	const apiImport = [
			importantListAuction,
			importantListBidding,
			importantListUnseal,
			importantListLandTransfer,
			importantListLandMortgage,
			importantListLandTransaction,
			importantListAuctionBidding,
			importantListFinance,
			importantListIntangibleEmission,
			importantListIntangibleMining,
			importantListIntangibleTrademarkRight,
			importantListIntangibleConstruct,
			importantListMortgage,
			importantListPledge,
			importantListSubrogationCourt,
			importantListSubrogationTrial,
			importantListSubrogationJudgment,
			importantListEstateRegister,
			importantListCar,
			importantListRiskBankruptcy,
			importantListRiskPunishment,
			importantListRiskTax,
			importantListRiskIllegal,
			importantListRiskAbnormal,
			importantListRiskChange,
			importantListRiskEpb,
			importantListRiskDishonest,
			importantListLawsuitTrial,
			importantListLawsuitCourt,
			importantListLawsuitJudgment,
			importantListLimitHeight,
		]; */
		 const apiArray = assestArr.concat(riskArr);

		const AssetImportantReminderArray = [];
		apiArray.forEach((item) => {
			if (global.authRoleList.includes(item.count)) {
				AssetImportantReminderArray.push(item.Api());
			}
		});
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		this.setState({ importLoading: true });
		const handlePromise = promiseAll(AssetImportantReminderArray.map(promiseItem => promiseItem.catch(err => err)));
		if (AssetImportantReminderArray.length === 0) {
			this.setState({ importLoading: false });
		}
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;
			this.setState({ importLoading: false });
			const AssetImportantReminderList = [];
			const AssetImportantReminderObligorIdList = [];
			if (isArray) {
				res.forEach((item) => {
					if (item.code === 200) {
						const { importantList, obligorId } = item.data;
						AssetImportantReminderList.push(...importantList);
						AssetImportantReminderObligorIdList.push(...obligorId);
					}
				});
			}
			// console.log('AssetImportantReminderList', AssetImportantReminderList);
			this.setState(() => ({
				AssetImportantReminderList,
				AssetImportantReminderObligorIdList,
			}));
		}).catch((reason) => {
			this.setState({ importLoading: false });
			console.log('promise reject failed reason', reason);
		});
	};

	getRiskData = (res) => {
		if (res && res.code === 200) {
			const {
				abnormal, bankruptcy, change, dishonest, epb, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial,
				punishment, tax, limitHeight,
			} = res.data;
			const lawsuitNum = this.getTotal([lawsuitCourt, lawsuitJudgement, lawsuitTrial]);
			const operationNum = this.getTotal([abnormal, change, tax, illegal, punishment, epb]);
			const totalNum = this.getTotal([abnormal, bankruptcy, change, dishonest, epb, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial, punishment, tax, limitHeight]);
			const riskDataArray = [
				{
					count: bankruptcy, type: 7, typeName: '破产重组', name: '破产重组', value: 2,
				},
				{
					count: dishonest, type: 8, typeName: '失信记录', name: '失信记录', value: 2,
				},
				{
					count: lawsuitNum, type: 9, typeName: '涉诉信息', name: '涉诉信息', value: 2,
				},
				{
					count: operationNum, type: 10, typeName: '经营风险', name: '经营风险', value: 2,
				},
				{
					count: limitHeight, type: 13, typeName: '限制高消费', name: '限制高消费', value: 2,
				},
			];
			const riskPropsData = {
				totalNum,
				riskDataArray,
			};

			this.setState({
				riskPropsData,
				loading: false,
			});
		}
	};

	getRiskImportantReminder = () => {
		// const apiImport = [
		// 	importantListRiskBankruptcy,
		// 	importantListRiskPunishment,
		// 	importantListRiskTax,
		// 	importantListRiskIllegal,
		// 	importantListRiskAbnormal,
		// 	importantListRiskChange,
		// 	importantListRiskEpb,
		// 	importantListRiskDishonest,
		// 	importantListLawsuitTrial,
		// 	importantListLawsuitCourt,
		// 	importantListLawsuitJudgment,
		// 	importantListLimitHeight,
		// ];
		const apiArray = [
			{ count: 'fxjkqypccz', Api: importantListRiskBankruptcy }, // 风险监控->企业破产重组

			{ count: 'jyfxxzcf', Api: importantListRiskPunishment }, // 经营风险->行政处罚
			{ count: 'jyfxsswf', Api: importantListRiskTax }, // 经营风险->税收违法
			{ count: 'jyfxyzwf', Api: importantListRiskIllegal }, // 经营风险->严重违法
			{ count: 'jyfxjyyc', Api: importantListRiskAbnormal }, // 经营风险->经营异常
			{ count: 'jyfxgsbg', Api: importantListRiskChange }, // 经营风险->工商变更
			{ count: 'jyfxhbcf', Api: importantListRiskEpb }, // 经营风险->环保处罚

			{ count: 'jkxxsxjl', Api: importantListRiskDishonest }, // 风险监控->失信记录

			{ count: 'fxjkssjk', Api: importantListLawsuitTrial }, // 风险监控->涉诉监控
			{ count: 'fxjkssjk', Api: importantListLawsuitCourt },
			{ count: 'fxjkssjk', Api: importantListLawsuitJudgment },
			{ count: 'fxjkxzgxf', Api: importantListLimitHeight }, // 风险监控->限制高消费
		];
		/* const apiArray = [
			{ count: bankruptcy, Api: importantListRiskBankruptcy },
			{ count: punishment, Api: importantListRiskPunishment },
			{ count: tax, Api: importantListRiskTax },
			{ count: illegal, Api: importantListRiskIllegal },
			{ count: abnormal, Api: importantListRiskAbnormal },
			{ count: change, Api: importantListRiskChange },
			{ count: epb, Api: importantListRiskEpb },
			{ count: dishonest, Api: importantListRiskDishonest },
			{ count: lawsuitTrial, Api: importantListLawsuitTrial },
			{ count: lawsuitCourt, Api: importantListLawsuitCourt },
			{ count: lawsuitJudgement, Api: importantListLawsuitJudgment },
			{ count: limitHeight, Api: importantListLimitHeight },
		]; */
		const RiskImportantReminderArray = [];
		apiArray.forEach((item) => {
			if (global.authRoleList.includes(item.count)) {
				RiskImportantReminderArray.push(item.Api());
			}
		});
		// apiImport.filter(i => i.count).forEach((item) => {
		// 	RiskImportantReminderArray.push(item());
		// });
		this.setState({ importLoading: true });
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		const handlePromise = promiseAll(RiskImportantReminderArray.map(promiseItem => promiseItem.catch(err => err)));
		if (RiskImportantReminderArray.length === 0) {
			this.setState({ loading: false, finish: true });
		}
		handlePromise.then((res) => {
			this.setState({ importLoading: false });
			const isArray = Array.isArray(res) && res.length > 0;
			const RiskImportantReminderList = [];
			const RiskImportantReminderObligorIdList = [];
			if (isArray) {
				res.forEach((item) => {
					if (item.code === 200) {
						const { importantList, obligorId } = item.data;
						RiskImportantReminderList.push(...importantList);
						RiskImportantReminderObligorIdList.push(...obligorId);
					}
				});
			}
			this.setState(() => ({
				RiskImportantReminderList: [
					...RiskImportantReminderList,
				],
				RiskImportantReminderObligorIdList,
			}));
		}).catch((reason) => {
			this.setState({ importLoading: false, finish: false });
			console.log('promise reject failed reason', reason);
		});
	};

	handleClick = (index) => {
		const params = {
			type: index + 1,
		};
		this.setState(() => ({
			timeType: index + 1,
			checkType: index,
			finish: false,
		}));
		this.getData(params);
	};

	// 打开显示重要信息标准弹窗
	handleImportantInfoStandard = () => {
		this.setState({
			showModal: true,
		});
	};

	getUnReadNum = (value) => {
		// clearAsset = true;
		// clearRisk = true;
		// clearAssetNum = true;
		// clearRiskNum = true;
		console.log(value);
	};

	onSelect = (value) => {
		this.setState({ typeValue: value });
	};

	dataType = (obj) => {
		const arr = Object.keys(obj).map(i => Number(i));
		return arr;
	};

	arrFilter = (arr, type) => {
		let curDetailType = [];
		if (type === 'assets') {
			curDetailType = this.dataType(assetsDataType);
		}
		if (type === 'risk') {
			curDetailType = this.dataType(riskDataType);
		}
		let curArr = [];
		if (arr.length > 0) {
			curArr = arr.filter(i => curDetailType.includes(i.detailType));
		}
		return curArr;
	}

	render() {
		const {
			checkArray, checkType, loading, importLoading, assetPropsData, riskPropsData, finish, AssetImportantReminderList, AssetImportantReminderObligorIdList, RiskImportantReminderList,
			RiskImportantReminderObligorIdList, timeType, showModal, typeValue,
		} = this.state;
		const params = {
			timeType,
			assetPropsData,
			riskPropsData,
			AssetImportantReminderList,
			AssetImportantReminderObligorIdList,
			RiskImportantReminderList,
			RiskImportantReminderObligorIdList,
		};
		const detailTypeAll = Object.assign({}, assetsDataType, riskDataType);
		const newAssetArr = [...AssetImportantReminderList];
		const assetArr = (newAssetArr.sort(compare('timestamp')));
		const newRiskArr = [...RiskImportantReminderList];
		// const riskArr = (newRiskArr.sort(compare('timestamp')));
		const newAllArr = newAssetArr.concat(newRiskArr);
		const riskArrTemp = this.arrFilter(assetArr, 'risk');
		const assetsTemp = this.arrFilter(assetArr, 'assets');
		let allArr = [];
		if (typeValue === 'all') {
			allArr = assetsTemp.concat(riskArrTemp).sort(compare('timestamp'));
		}
		if (typeValue === 'assets') {
			allArr = assetsTemp.sort(compare('timestamp'));
		}
		if (typeValue === 'risk') {
			allArr = riskArrTemp.sort(compare('timestamp'));
		}
		return (
			<React.Fragment>
				<div className="dynamic-container">
					<div className="dynamic-container-header">
						<div className="dynamic-container-header-name">新增动态</div>
						<div className="horizontal-line" />
						{
							checkArray.map((item, index) => (
								<div
									key={item.type}
									onClick={() => this.handleClick(index)}
									className="dynamic-container-header-type"
									style={checkType === index ? { borderBottom: '2px solid #fb8e3c', color: '#FB8E3C', fontWeight: '500' } : {}}
								>
									{item.name}
								</div>
							))
						}
					</div>
					<Spin visible={loading} minHeight={315}>
						{!finish ? null : (
							<div style={customStyle}>
								<DynamicUpdate {...params} />
							</div>
						)}
					</Spin>
				</div>
				<div className="home-import-list">
					<Spin visible={importLoading} minHeight={404}>
						<div className="seven-update-content-title">
							<div className="seven-update-content-title-name">
								<div className="dynamic-container-header-name">重要信息提醒</div>
								<Btn className="seven-update-content-checkBtn" onClick={() => this.handleImportantInfoStandard()}>规则说明</Btn>
								<Select
									defaultValue="all"
									style={{ width: '82px', float: 'right', marginLeft: '263px' }}
									onSelect={this.onSelect}
								>
									{[
										{ id: 1, name: '全部类型', value: 'all' },
										{ id: 2, name: '资产挖掘', value: 'assets' },
										{ id: 3, name: '风险参考', value: 'risk' },
									].map(item => <Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>)}
								</Select>
							</div>
						</div>
						{
							allArr.length > 0 ? (
								<DetailItem data={allArr} arr={newAllArr} getUnReadNum={val => this.getUnReadNum(val)} status={typeValue} detailTypeAll={detailTypeAll} />
							) : (
								<React.Fragment>
									{
										importLoading ? null : (
											<div className="detail-container-noData">
												<div className="detail-container-noData-allImg" style={{ height: 160, width: 270 }} />
												<span className="detail-container-noData-text">近30天暂无重要信息提醒</span>
											</div>
										)
									}
								</React.Fragment>
							)
					}
					</Spin>
				</div>
				<ImportantInfoModal
					visible={showModal}
					onCancel={() => this.setState({ showModal: false })}
				/>
			</React.Fragment>
		);
	}
}

export default HomeDynamic;
