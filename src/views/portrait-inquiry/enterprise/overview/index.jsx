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

	// ???????????????????????????
	getLitigationInfosSum = (arr) => {
		let sum = 0;
		arr.forEach((i) => {
			sum += i.count || 0;
		});
		return sum;
	};

	// ????????????
	getData = () => {
		const { companyId } = this.state;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};

		// ?????????????????????????????????????????????????????????????????????????????????????????????
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

		// ????????????????????????
		getBusiness(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					baseInfo: res.data.baseInfo, // ??????????????????
					shareholderInfos: res.data.shareholderInfos, // ????????????
					businessScaleInfo: res.data.businessScaleInfo, // ????????????
					loading: false,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// ????????????-??????-????????????
	getAssetProfile = (AssetProfileCountValue, type) => {
		switch (type) {
		// ????????????
		case 'AssetAuction':
			return (
				this.setState({
					AssetAuctionCount: AssetProfileCountValue,
				})
			);
		// ????????????
		case 'IntangibleAsset':
			return (
				this.setState({
					IntangibleAssetCount: AssetProfileCountValue,
				})
			);
		// ?????????
		case 'Subrogation':
			return (
				this.setState({
					SubrogationCount: AssetProfileCountValue,
				})
			);
		// ????????????
		case 'Land':
			return (
				this.setState({
					LandCount: AssetProfileCountValue,
				})
			);
		// ????????????
		case 'EquityPledge':
			return (
				this.setState({
					EquityPledgeCount: AssetProfileCountValue,
				})
			);
		// ????????????
		case 'Finance':
			return (
				this.setState({
					FinanceCount: AssetProfileCountValue,
				})
			);
		// ???????????????
		case 'UnBlock':
			return (
				this.setState({
					UnBlockCount: AssetProfileCountValue,
				})
			);
		// ????????????
		case 'ChattelMortgage':
			return (
				this.setState({
					ChattelMortgageCount: AssetProfileCountValue,
				})
			);
		// ?????????
		case 'Bidding':
			return (
				this.setState({
					BiddingCount: AssetProfileCountValue,
				})
			);
		// ?????????
		case 'RealEstate':
			return (
				this.setState({
					RealEstateCount: AssetProfileCountValue,
				})
			);
		// ????????????
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

	// ????????????-??????-????????????
	getRiskProfile = (RiskProfileCountValue, type) => {
		switch (type) {
		// ????????????
		case 'Bankruptcy':
			return (
				this.setState({
					BankruptcyCount: RiskProfileCountValue,
				})
			);
		// ????????????
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
					<div className="yc-overview-title">????????????</div>
					{
						viewLoading ? <Spin visible /> : [
							<div className="yc-overview-container">
								{/* ?????????????????? */}
								<AssetAuction companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ?????????????????? */}
								<IntangibleAssets companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ??????????????? (????????????) */}
								<Subrogation companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ???????????? */}
								<Land companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ???????????? */}
								<EquityPledge companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ?????????????????? */}
								<ChattelMortgage companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ??????????????? */}
								<UnBlock companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ???????????? */}
								<Financial companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ????????????????????? */}
								<BiddingInfo companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ???????????? */}
								<Construct companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ????????????????????? */}
								<RealEstate companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* ???????????? */}
								<Car companyId={companyId} getAssetProfile={this.getAssetProfile} />
							</div>,
							AssetAuctionCount === 0 && IntangibleAssetCount === 0 && SubrogationCount === 0 && LandCount === 0 && EquityPledgeCount === 0 && ChattelMortgageCount === 0 && BiddingCount === 0 && FinanceCount === 0 && UnBlockCount === 0 && RealEstateCount === 0 && CarCount === 0 && ConstructCount === 0
							&& <Spin visible={loading}>{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="???????????????????????????" />}</Spin>,
						]
					}
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">????????????</div>
					{ viewLoading ? <Spin visible /> : [
						<div className="yc-overview-container">
							{/* ???????????? */}
							<Bankruptcy companyId={companyId} getRiskProfile={this.getRiskProfile} />
							{/*  ???????????? */}
							{yearDistributions && yearDistributions.length > 0 ? <LostLetter timeLineData={yearDistributions} /> : ''}
							{/* ??????????????? */}
							{/* <LimitHeight companyId={companyId} getRiskProfile={this.getRiskProfile} /> */}
							{/*  ???????????? */}
							{LitigationInfosCount > 0 ? <Information litigationInfosArray={litigationInfos} /> : ''}
							{/* ?????????????????? */}
							<BusinessRisk companyId={companyId} getRiskProfile={this.getRiskProfile} />
						</div>,
						BankruptcyCount === 0 && yearDistributions && yearDistributions.length === 0 && LitigationInfosCount === 0 && BusinessRiskCount === 0 && LimitHeightCount === 0 && <Spin visible={loading}>{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="???????????????????????????" />}</Spin>,
					]
					}
					<div className="mark-line" />
					<div className="yc-overview-title">??????????????????</div>
					{ viewLoading
						? <Spin visible />
						: (
							<Spin visible={loading}>
								<div className="yc-overview-container">
									{/*  ???????????? */}
									<Basic baseInfo={baseInfo} />
									{/*  ???????????? */}
									{shareholderInfos && shareholderInfos.length > 0
									&& <ShareholderSituation shareholderInfos={shareholderInfos} />}
									{/* ???????????? */}
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
