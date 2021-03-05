import React from 'react';
import { getBusiness, getLitigation } from '@/utils/api/portrait-inquiry/enterprise/overview';
import { Spin } from '@/common';
import { parseQuery } from '@/utils';
import NoContent from '@/common/noContent';
import AssetAuction from './components/assetAuction';
import Subrogation from './components/subrogation';
import Land from './components/land';
import LostLetter from './components/lostLetter';
import EquityPledge from './components/equityPledge';
import ChattelMortgage from './components/chattelMortgage';
import BusinessRisk from './components/businessRisk';
import Information from './components/information';
import Basic from './components/basic';
import ShareholderSituation from './components/shareholderSituation';
import BusinessScale from './components/businessScale';
import IntangibleAssets from './components/intangibleAssets';
import BiddingInfo from './components/biddingInfo';
import Bankruptcy from './components/bankruptcy';
import Financial from './components/financial';
import UnBlock from './components/unblock';
// import LimitHeight from './components/limit-height';
import RealEstate from './components/real-estate';
import Car from './components/car';
import Construct from './components/construct';
import './style.scss';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companyId: parseQuery(window.location.hash).id || -9999,
			baseInfo: {},
			loading: true,
			shareholderInfos: [],
			businessScaleInfo: '',
			yearDistributions: null,
			litigationInfos: null,
			AssetAuctionCount: 0,
			SubrogationCount: 0,
			IntangibleAssetCount: 0,
			BiddingCount: 0,
			LandCount: 0,
			EquityPledgeCount: 0,
			ChattelMortgageCount: 0,
			BankruptcyCount: 0,
			BusinessRiskCount: 0,
			LitigationInfosCount: 0,
			FinanceCount: 0,
			UnBlockCount: 0,
			LimitHeightCount: 0,
			RealEstateCount: 0,
			CarCount: 0,
			ConstructCount: 0,
		};
	}

	componentDidMount() {
		const { viewLoading } = this.props;
		if (!viewLoading) {
			this.getData();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { viewLoading } = this.props;
		if (!nextProps.viewLoading && nextProps.viewLoading !== viewLoading) {
			this.getData();
		}
	}

	// 获取涉诉信息的总和
	getLitigationInfosSum = (arr) => {
		let sum = 0;
		arr.forEach((i) => {
			sum += i.count || 0;
		});
		return sum;
	};

	// 请求数据
	getData = () => {
		const { companyId } = this.state;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};

		// 获取涉诉信息（这个接口会返回失信记录和涉诉信息两个模块的数据）
		getLitigation(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					yearDistributions: res.data.assetOverviewDishonestInfo.yearDistributions,
					litigationInfos: res.data.litigationInfos,
					LitigationInfosCount: this.getLitigationInfosSum(res.data.litigationInfos),
				});
			} else {
				this.setState({
					LitigationInfosCount: 0,
					yearDistributions: [],
					litigationInfos: [
						{ count: 0 },
						{ count: 0 },
						{ count: 0 },
					],
				});
			}
		}).catch(() => {
			this.setState({
				yearDistributions: [],
				LitigationInfosCount: 0,
				litigationInfos: [
					{ count: 0 },
					{ count: 0 },
					{ count: 0 },
				],
			});
		});

		// 获取工商基本信息
		getBusiness(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					baseInfo: res.data.baseInfo, // 工商基本信息
					shareholderInfos: res.data.shareholderInfos, // 股东情况
					businessScaleInfo: res.data.businessScaleInfo, // 人员规模
					loading: false,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 获取概览-资产-模块数量
	getAssetProfile = (AssetProfileCountValue, type) => {
		switch (type) {
		// 资产拍卖
		case 'AssetAuction':
			return (
				this.setState({
					AssetAuctionCount: AssetProfileCountValue,
				})
			);
		// 无形资产
		case 'IntangibleAsset':
			return (
				this.setState({
					IntangibleAssetCount: AssetProfileCountValue,
				})
			);
		// 代位权
		case 'Subrogation':
			return (
				this.setState({
					SubrogationCount: AssetProfileCountValue,
				})
			);
		// 土地信息
		case 'Land':
			return (
				this.setState({
					LandCount: AssetProfileCountValue,
				})
			);
		// 股权质押
		case 'EquityPledge':
			return (
				this.setState({
					EquityPledgeCount: AssetProfileCountValue,
				})
			);
		// 金融资产
		case 'Finance':
			return (
				this.setState({
					FinanceCount: AssetProfileCountValue,
				})
			);
		// 查解封资产
		case 'UnBlock':
			return (
				this.setState({
					UnBlockCount: AssetProfileCountValue,
				})
			);
		// 动产抵押
		case 'ChattelMortgage':
			return (
				this.setState({
					ChattelMortgageCount: AssetProfileCountValue,
				})
			);
		// 招投标
		case 'Bidding':
			return (
				this.setState({
					BiddingCount: AssetProfileCountValue,
				})
			);
		// 不动产
		case 'RealEstate':
			return (
				this.setState({
					RealEstateCount: AssetProfileCountValue,
				})
			);
		// 车辆信息
		case 'Car':
			return (
				this.setState({
					CarCount: AssetProfileCountValue,
				})
			);
		case 'Construct':
			return (
				this.setState({
					ConstructCount: AssetProfileCountValue,
				})
			);
		default: return '-';
		}
	};

	// 获取概览-风险-模块数量
	getRiskProfile = (RiskProfileCountValue, type) => {
		switch (type) {
		// 破产重组
		case 'Bankruptcy':
			return (
				this.setState({
					BankruptcyCount: RiskProfileCountValue,
				})
			);
		// 经营风险
		case 'BusinessRisk':
			return (
				this.setState({
					BusinessRiskCount: RiskProfileCountValue,
				})
			);
		case 'LimitHeight':
			return (
				this.setState({
					LimitHeightCount: RiskProfileCountValue,
				})
			);
		default: return '-';
		}
	};

	render() {
		const {
			loading, companyId, baseInfo, shareholderInfos, businessScaleInfo, yearDistributions, litigationInfos, AssetAuctionCount, IntangibleAssetCount, SubrogationCount, LandCount, EquityPledgeCount, UnBlockCount,
			ChattelMortgageCount, BiddingCount, BankruptcyCount, BusinessRiskCount, LitigationInfosCount, FinanceCount, LimitHeightCount, RealEstateCount, CarCount, ConstructCount,
		} = this.state;
		const { viewLoading } = this.props;
		return (
			<div className="inquiry-overview">
				<div className="mark-line" />
				<div className="overview-left" style={{ minHeight: 1000 }}>
					<div className="yc-overview-title">资产概况</div>
					{
						viewLoading ? <Spin visible /> : [
							<div className="yc-overview-container">
								{/* 相关资产拍卖 */}
								<AssetAuction companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 无形资产信息 */}
								<IntangibleAssets companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 代位权信息 (裁判文书) */}
								<Subrogation companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 土地信息 */}
								<Land companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 股权质押 */}
								<EquityPledge companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 动产抵押信息 */}
								<ChattelMortgage companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 查解封资产 */}
								<UnBlock companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 金融资产 */}
								<Financial companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 相关招投标信息 */}
								<BiddingInfo companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 在建工程 */}
								<Construct companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 不动产登记信息 */}
								<RealEstate companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 车辆信息 */}
								<Car companyId={companyId} getAssetProfile={this.getAssetProfile} />
							</div>,
							AssetAuctionCount === 0 && IntangibleAssetCount === 0 && SubrogationCount === 0 && LandCount === 0 && EquityPledgeCount === 0 && ChattelMortgageCount === 0 && BiddingCount === 0 && FinanceCount === 0 && UnBlockCount === 0 && RealEstateCount === 0 && CarCount === 0 && ConstructCount === 0
							&& <Spin visible={loading}>{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到资产信息" />}</Spin>,
						]
					}
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">风险信息</div>
					{ viewLoading ? <Spin visible /> : [
						<div className="yc-overview-container">
							{/* 破产重组 */}
							<Bankruptcy companyId={companyId} getRiskProfile={this.getRiskProfile} />
							{/*  失信记录 */}
							{yearDistributions && yearDistributions.length > 0 ? <LostLetter timeLineData={yearDistributions} /> : ''}
							{/* 限制高消费 */}
							{/* <LimitHeight companyId={companyId} getRiskProfile={this.getRiskProfile} /> */}
							{/*  涉诉信息 */}
							{LitigationInfosCount > 0 ? <Information litigationInfosArray={litigationInfos} /> : ''}
							{/* 经营风险信息 */}
							<BusinessRisk companyId={companyId} getRiskProfile={this.getRiskProfile} />
						</div>,
						BankruptcyCount === 0 && yearDistributions && yearDistributions.length === 0 && LitigationInfosCount === 0 && BusinessRiskCount === 0 && LimitHeightCount === 0 && <Spin visible={loading}>{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到风险信息" />}</Spin>,
					]
					}
					<div className="mark-line" />
					<div className="yc-overview-title">工商基本信息</div>
					{ viewLoading
						? <Spin visible />
						: (
							<Spin visible={loading}>
								<div className="yc-overview-container">
									{/*  基本信息 */}
									<Basic baseInfo={baseInfo} />
									{/*  股东情况 */}
									{shareholderInfos && shareholderInfos.length > 0
									&& <ShareholderSituation shareholderInfos={shareholderInfos} />}
									{/* 企业规模 */}
									<BusinessScale businessScaleInfo={businessScaleInfo} />
								</div>
							</Spin>
						)
					}
				</div>
			</div>
		);
	}
}
