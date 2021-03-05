import React from 'react';
import {
	overviewLitigation, // 债务人涉诉
	businessOverviewLitigation, // 业务涉诉
	overviewBusiness,
} from '@/utils/api/professional-work/overview';
import { parseQuery } from '@/utils';
import Basic from '@/views/portrait-inquiry/enterprise/overview/components/basic';
import ShareholderSituation from '@/views/portrait-inquiry/enterprise/overview/components/shareholderSituation';
import BusinessScale from '@/views/portrait-inquiry/enterprise/overview/components/businessScale';
import NoContent from '@/common/noContent';
import { Spin } from '@/common';
import AssetAuction from './components/assetAuction';
import Land from './components/land';
import Intangible from './components/intangible';
import Subrogation from './components/subrogation';
import EquityPledge from './components/equityPledge';
import ChattelMortgage from './components/chattelMortgage';
import Bidding from './components/tender';
import Bankruptcy from './components/bankruptcy';
import Dishonest from './components/dishonest';
import Information from './components/information';
import BusinessRisk from './components/businessRisk';
import Tax from './components/tax';
import Financial from './components/financial';
import UnBlock from './components/unblock';
import RealEstate from './components/real-estate';
import Car from './components/car';
import LimitHeight from './components/limitHeight';
import Construct from './components/construct';
import './style.scss';

const constantNumber = 99999999; // 默认值
export default class Visualize extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			obligorId: parseQuery(window.location.hash).id || constantNumber,
			businessId: parseQuery(window.location.hash).id || constantNumber,
			loading: false,
			litigationInfos: null,
			baseInfo: {},
			shareholderInfos: [],
			businessScaleInfo: '',
			litigationLoading: false,
			AssetAuctionCount: 0,
			SubrogationCount: 0,
			LandCount: 0,
			EquityPledgeCount: 0,
			ChattelMortgageCount: 0,
			IntangibleCount: 0,
			BiddingCount: 0,
			BankruptcyCount: 0,
			DishonestCount: 0,
			BusinessRiskCount: 0,
			TaxCount: 0,
			FinanceCount: 0,
			UnBlockCount: 0,
			LimitHeightCount: 0,
			RealCount: 0,
			CarCount: 0,
			ConstructCount: 0, // 在建工程
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { obligorId, businessId } = this.state;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		const api = portrait === 'business' ? businessOverviewLitigation : overviewLitigation;

		if (portrait === 'debtor_enterprise') {
			this.setState({ loading: true });

			// 获取工商基本信息
			overviewBusiness(params).then((res) => {
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
		}
		this.setState({ litigationLoading: true });
		// 获取涉诉信息
		api(params).then((res) => {
			const isLitigationInfos = res.data.litigationInfos && res.data.litigationInfos.length > 0;

			const newLitigationInfosArray = [
				{
					caseReasons: [], caseTypes: [], count: 0, type: 1, yearDistribution: [],
				},
				{
					caseReasons: [], caseTypes: [], count: 0, type: 2, yearDistribution: [],
				},
				...res.data.litigationInfos,
			];
			const noData = [
				{
					caseReasons: [], caseTypes: [], count: 0, type: 1, yearDistribution: [],
				},
				{
					caseReasons: [], caseTypes: [], count: 0, type: 2, yearDistribution: [],
				},
				{
					caseReasons: [], caseTypes: [], count: 0, type: 3, yearDistribution: [],
				},
			];
			if (res.code === 200) {
				this.setState({
					litigationInfos: isLitigationInfos ? (res.data.litigationInfos.length === 3 ? res.data.litigationInfos : newLitigationInfosArray) : noData,
					litigationLoading: false,
				});
			} else {
				this.setState({
					litigationLoading: false,
					litigationInfos: [
						{ count: 0 },
						{ count: 0 },
						{ count: 0 },
					],
				});
			}
		}).catch(() => {
			this.setState({
				litigationLoading: false,
				litigationInfos: [
					{ count: 0 },
					{ count: 0 },
					{ count: 0 },
				],
			});
		});
	};

	// 获取资产监控可模块数量
	getAssetProfile = (AssetProfileCountValue, type) => {
		switch (type) {
		case 'AssetAuction':
			return (
				this.setState({
					AssetAuctionCount: AssetProfileCountValue,
				})
			);
		case 'Subrogation':
			return (
				this.setState({
					SubrogationCount: AssetProfileCountValue,
				})
			);
		case 'Land':
			return (
				this.setState({
					LandCount: AssetProfileCountValue,
				})
			);
		case 'EquityPledge':
			return (
				this.setState({
					EquityPledgeCount: AssetProfileCountValue,
				})
			);
		case 'ChattelMortgage':
			return (
				this.setState({
					ChattelMortgageCount: AssetProfileCountValue,
				})
			);
		case 'Finance':
			return (
				this.setState({
					FinanceCount: AssetProfileCountValue,
				})
			);
		case 'Intangible':
			return (
				this.setState({
					IntangibleCount: AssetProfileCountValue,
				})
			);
		case 'Bidding':
			return (
				this.setState({
					BiddingCount: AssetProfileCountValue,
				})
			);
		case 'RealEstate':
			return (
				this.setState({
					RealCount: AssetProfileCountValue,
				})
			);
		case 'Car':
			return (
				this.setState({
					CarCount: AssetProfileCountValue,
				})
			);
		case 'UnBlock':
			return (
				this.setState({
					UnBlockCount: AssetProfileCountValue,
				})
			);
		case 'Bankruptcy':
			return (
				this.setState({
					BankruptcyCount: AssetProfileCountValue,
				})
			);
		case 'Dishonest':
			return (
				this.setState({
					DishonestCount: AssetProfileCountValue,
				})
			);
		case 'BusinessRisk':
			return (
				this.setState({
					BusinessRiskCount: AssetProfileCountValue,
				})
			);
		case 'Tax':
			return (
				this.setState({
					TaxCount: AssetProfileCountValue,
				})
			);
		case 'LimitHeight':
			return (
				this.setState({
					LimitHeightCount: AssetProfileCountValue,
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

	render() {
		const { portrait } = this.props;
		const {
			obligorId, litigationLoading, baseInfo, shareholderInfos, businessScaleInfo, litigationInfos, AssetAuctionCount, SubrogationCount, LandCount, EquityPledgeCount, ConstructCount,
			ChattelMortgageCount, TaxCount, FinanceCount, UnBlockCount, LimitHeightCount, loading, IntangibleCount, BiddingCount, RealCount, CarCount, BankruptcyCount, DishonestCount,
			BusinessRiskCount, businessId,
		} = this.state;
		const params = {
			portrait,
			businessId,
			obligorId,
			getAssetProfile: this.getAssetProfile,
		};
		return (
			<div className="visualize-overview">
				<div className="visualize-overview-line" />
				<div className="overview-left">

					<div className="yc-overview-title">资产概况</div>
					<div className="yc-overview-container">
						{/* 相关资产拍卖 */}
						<AssetAuction {...params} />
						{/* 无形资产 */}
						{portrait !== 'debtor_personal' && <Intangible {...params} />}
						{/* 土地信息 */}
						{portrait !== 'debtor_personal' && <Land {...params} />}
						{/* 代位权信息 (裁判文书) */}
						<Subrogation {...params} />
						{/* /!* 股权质押 *!/ */}
						{portrait !== 'debtor_personal' && <EquityPledge {...params} />}
						{/* /!* 动产抵押信息 *!/ */}
						{portrait !== 'debtor_personal' && <ChattelMortgage {...params} />}
						{/* /!* 金融资产 *!/ */}
						{portrait !== 'debtor_personal' && <Financial {...params} />}
						{/* 招标中标 */}
						{portrait !== 'debtor_personal' && <Bidding {...params} />}
						{/* 查解封资产 */}
						{portrait !== 'debtor_personal' && <UnBlock {...params} />}
						{/* 在建工程 */}
						{portrait !== 'debtor_personal' && <Construct {...params} />}
						{/* 不动产 */}
						{portrait !== 'debtor_personal' && <RealEstate {...params} />}
						{/* 车辆信息 */}
						{portrait !== 'debtor_personal' && <Car {...params} />}
						{
							AssetAuctionCount === 0 && SubrogationCount === 0 && LandCount === 0 && EquityPledgeCount === 0
							&& ChattelMortgageCount === 0 && IntangibleCount === 0 && BiddingCount === 0 && RealCount === 0 && CarCount === 0 && FinanceCount === 0 && UnBlockCount === 0 && ConstructCount === 0
							&& (
								<Spin visible={loading}>
									{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到资产信息" />}
								</Spin>
							)
						}
					</div>
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">风险信息</div>
					<div className="yc-overview-container">
						{
							BankruptcyCount === 0 && DishonestCount === 0 && BusinessRiskCount === 0 && TaxCount === 0 && LimitHeightCount === 0
							&& litigationInfos && litigationInfos.length > 0 && litigationInfos[0].count === 0 && litigationInfos[1].count === 0 && litigationInfos[2].count === 0
							&& (
								<Spin visible={litigationLoading}>
									{litigationLoading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到风险信息" />}
								</Spin>
							)
						}
						{/* 破产重组 */}
						{portrait !== 'debtor_personal' && <Bankruptcy {...params} />}
						{/* 限制高消费 */}
						<LimitHeight {...params} />
						{/* 失信记录 */}
						<Dishonest {...params} />
						{/* 涉诉信息 */}
						{litigationInfos && litigationInfos.length > 0 && <Information portrait={portrait} litigationInfosArray={litigationInfos} />}
						{/* 经营风险 */}
						{portrait !== 'debtor_personal' && <BusinessRisk {...params} />}
						{/* 税收违法 */}
						{portrait === 'debtor_personal' && <Tax {...params} />}
						{/* <BusinessRisk companyId={companyId} /> */}
					</div>
					{portrait === 'debtor_enterprise'
						? (
							<div>
								<div className="visualize-overview-line" />
								<div className="yc-overview-title">工商基本信息</div>
								<div className="yc-overview-container">
									{/*  基本信息 */}
									<Basic baseInfo={baseInfo} />
									{/*  股东情况 */}
									{shareholderInfos && shareholderInfos.length > 0 && <ShareholderSituation shareholderInfos={shareholderInfos} />}
									{/* 企业规模 */}
									<BusinessScale businessScaleInfo={businessScaleInfo} />
								</div>
							</div>
						) : null
					}
				</div>
			</div>
		);
	}
}
