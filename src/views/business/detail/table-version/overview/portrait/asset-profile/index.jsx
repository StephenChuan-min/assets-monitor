import React from 'react';
import {
	overviewAuction, // 债务人资产拍卖
	businessOverviewAuction, // 业务资产拍卖
	overviewLand, // 债务人土地信息
	businessOverviewLand, // 业务土地信息
	overviewIntangible, // 债务人无形资产
	businessOverviewIntangible, // 业务无形资产
	overviewSubrogation, // 债务人代位权
	overviewUnBlock, // 债务人查解封资产
	overviewFinancial, // 债务人金融资产
	businessOverviewSubrogation, // 业务代位权
	overviewStock, // 债务人股权质押
	businessOverviewStock, // 业务股权质押
	overviewMortgage, // 债务人动产抵押
	businessOverviewMortgage, // 业务动产抵押
	overviewBidding, // 债务人招投标
	businessOverviewBidding, // 业务招投标
	overviewRealRegister, // 不动产
	overviewvehicle, // 车辆
	overviewConstruct, // 在建工程
} from '@/utils/api/professional-work/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';
import { promiseAll } from '@/utils/promise';
import getCount from '@/views/portrait-inquiry/common/getCount';
import AssetsCard from '../card-components/assets-card';
import LandCard from '../card-components/land-card';
import Intangible from '../card-components/intangible-card';
import Subrogation from '../card-components/subrogation-card';
import EquityPledge from '../card-components/EquityPledge-card';
import ChattelMortgage from '../card-components/chattelMortgage-card';
import Bidding from '../card-components/bidding-card';
import UnBlockCard from '../card-components/unblock-card';
import FinancialCard from '../card-components/financial-card';
import RealEstateCard from '../card-components/real-estate-card';
import CarCard from '../card-components/car-card';
import Constructcard from '../card-components/construct-card';
import './style.scss';

const constantNumber = 99999999; // 默认值

const obligorUnitTypeMap = new Map([
	[1, '建设单位'],
	[2, '中标单位'],
	[3, '施工单位'],
]);

// 获取api请求
const apiType = (value, portrait) => {
	switch (value) {
	case 'Auction': return portrait === 'business' ? businessOverviewAuction : overviewAuction;
	case 'Land': return portrait === 'business' ? businessOverviewLand : overviewLand;
	case 'Intangible': return portrait === 'business' ? businessOverviewIntangible : overviewIntangible;
	case 'Subrogation': return portrait === 'business' ? businessOverviewSubrogation : overviewSubrogation;
	case 'Stock': return portrait === 'business' ? businessOverviewStock : overviewStock;
	case 'Mortgage': return portrait === 'business' ? businessOverviewMortgage : overviewMortgage;
	case 'Bidding': return portrait === 'business' ? businessOverviewBidding : overviewBidding;
	case 'UnBlock': return overviewUnBlock; // 这个目前只做了债务人，没有做业务视图的
	case 'RealEstateCard': return overviewUnBlock; // 这个目前只做了债务人，没有做业务视图的
	case 'CarCard': return overviewUnBlock; // 这个目前只做了债务人，没有做业务视图的
	case 'Financial': return overviewFinancial; // 这个目前只做了债务人，没有做业务视图的
	case 'Register': return overviewRealRegister; // 不动产
	case 'Car': return overviewvehicle; // 车辆
	case 'Construct': return overviewConstruct; // 在建工程
	default: return {};
	}
};
export default class AssetProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			auctionPropsData: {}, // 资产拍卖
			landPropsData: {}, // 土地信息
			intangiblePropsData: {}, // 无形资产
			subrogationPropsData: {}, // 代位权
			stockPropsData: {}, // 股权质押
			mortgagePropsData: {}, // 动产抵押
			biddingPropsData: {}, // 招投标
			unblockPropsData: {}, // 查解封资产
			financialPropsData: {}, // 金融资产
			CarPropsData: {}, // 车辆信息
			RealPropsData: {}, // 不动产登记
			constructPropsData: {}, // 在建工程
		};
	}

	componentDidMount() {
		const urlId = getQueryByName(window.location.href, 'id') || constantNumber;
		const obligorId = urlId;
		const businessId = urlId;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId, type: 1 } : { obligorId, type: 1 };
		this.setState(() => ({ isLoading: true }));
		// 资产卡片列表
		this.getData(params, portrait);
	}

	getData = (value, portrait) => {
		const params = { ...value };
		const promiseArray = [];
		promiseArray.push(apiType('Auction', portrait)(params)); // 资产拍卖
		promiseArray.push(apiType('Land', portrait)(params)); // 土地信息
		promiseArray.push(apiType('Intangible', portrait)(params)); // 无形资产
		promiseArray.push(apiType('Subrogation', portrait)(params)); // 代位权
		promiseArray.push(apiType('Stock', portrait)(params)); // 股权质押
		promiseArray.push(apiType('Mortgage', portrait)(params)); // 动产抵押
		promiseArray.push(apiType('Bidding', portrait)(params)); // 招投标
		promiseArray.push(apiType('UnBlock', portrait)(params)); // 查解封资产
		promiseArray.push(apiType('Financial', portrait)(params)); // 金融资产
		promiseArray.push(apiType('Register', portrait)(params)); // 不动产
		promiseArray.push(apiType('Car', portrait)(params)); // 车辆
		promiseArray.push(apiType('Construct', portrait)(params)); // 车辆

		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((values) => {
			const isArray = Array.isArray(values) && values.length > 0;
			this.setState({ isLoading: false });
			// 资产拍卖
			this.getAuctionData(isArray, values);
			// 土地信息
			this.getLandData(isArray, values);
			// 无形资产
			this.getIntangibleData(isArray, values);
			// 代位权
			this.getSubrogationData(isArray, values);
			// 股权质押
			this.getStockData(isArray, values);
			// 动产抵押
			this.getMortgageData(isArray, values);
			// 招投标
			this.getBiddingData(isArray, values);
			// 查解封资产
			this.getUnBlockData(isArray, values);
			// 不动产
			this.getRegisterData(isArray, values);
			// 车辆
			this.getCarData(isArray, values);
			// 金融资产
			this.getFinancialData(isArray, values);
			// 在建工程
			this.getConstructData(isArray, values);
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	// 资产拍卖
	getAuctionData = (isArray, values) => {
		const res = values[0];
		if (isArray && res && res.code === 200) {
			const auctionPropsData = {
				auctionPropsData: res.data,
			};
			this.setState(() => ({
				auctionPropsData,
			}));
		}
	};

	// 土地信息
	getLandData = (isArray, values) => {
		const res = values[1];
		if (isArray && res && res.code === 200) {
			const dataSource = res.data.roleDistributions;
			const dataSourceNum = getCount(dataSource);
			const landPropsData = {
				dataSource,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				landPropsData,
			}));
		}
	};

	// 无形资产
	getIntangibleData = (isArray, values) => {
		const res = values[2];
		if (isArray && res && res.code === 200) {
			const dataSource = [];
			dataSource.push({ count: res.data.emission, typeName: '排污权发证' });
			dataSource.push({ count: res.data.trademark, typeName: '商标专利' });
			dataSource.push({ count: res.data.mining, typeName: '矿业权发证' });
			dataSource.push({ count: res.data.construct, typeName: '建造资质' });
			const dataSourceNum = getCount(dataSource);
			const intangiblePropsData = {
				dataSource,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				intangiblePropsData,
			}));
		}
	};

	// 代位权
	getSubrogationData = (isArray, values) => {
		const res = values[3];
		if (isArray && res && res.code === 200) {
			const {
				restore, execute, trial, judgment, courtNotice, gmtCreate,
			} = res.data;
			const allNum = trial + judgment + courtNotice;
			const otherCase = (trial + judgment + courtNotice) - execute;
			const subrogationPropsData = {
				restore,
				execute,
				allNum,
				otherCase,
				gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				subrogationPropsData,
			}));
		}
	};

	// 股权质押
	getStockData = (isArray, values) => {
		const res = values[4];
		if (isArray && res && res.code === 200) {
			const dataSource = res.data.roleDistributions;
			const dataSourceNum = getCount(dataSource);
			const stockPropsData = {
				dataSource,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				stockPropsData,
			}));
		}
	};

	// 动产抵押
	getMortgageData = (isArray, values) => {
		const res = values[5];
		if (isArray && res && res.code === 200) {
			const dataSource = res.data.roleDistributions;
			const dataSourceNum = getCount(dataSource);
			const mortgagePropsData = {
				dataSource,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				mortgagePropsData,
			}));
		}
	};

	// 招投标
	getBiddingData = (isArray, values) => {
		const res = values[6];
		if (isArray && res && res.code === 200) {
			const { bidding, gmtCreate } = res.data;
			const biddingPropsData = {
				biddingNum: bidding,
				gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				biddingPropsData,
			}));
		}
	};

	// 查解封资产
	getUnBlockData = (isArray, values) => {
		const res = values[7];
		if (isArray && res && res.code === 200) {
			const { unsealCount, gmtModified } = res.data;
			const unblockPropsData = {
				unsealCount,
				gmtModified,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				unblockPropsData,
			}));
		}
	};


	// 金融资产
	getFinancialData = (isArray, values) => {
		const res = values[8];
		if (isArray && res && res.code === 200) {
			const {
				auctionFinanceCount, financeCount, financeInvestmentCount, gmtModified,
			} = res.data;
			const allNum = auctionFinanceCount + financeCount + financeInvestmentCount;
			const dataArray = [];
			if (auctionFinanceCount) {
				dataArray.push({ count: auctionFinanceCount || 0, typeName: '竞价项目' });
			}
			if (financeInvestmentCount) {
				dataArray.push({ count: financeInvestmentCount || 0, typeName: '招商项目' });
			}
			if (financeCount) {
				dataArray.push({ count: financeCount || 0, typeName: '公示项目' });
			}
			const financialPropsData = {
				gmtModified,
				dataArray,
				allNum,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				financialPropsData,
			}));
		}
	};

	// 不动产
	getRegisterData = (isArray, values) => {
		const res = values[9];
		if (isArray && res && res.code === 200) {
			const { realRegisterCount, gmtModified } = res.data;
			const RealPropsData = {
				realRegisterCount,
				gmtModified,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				RealPropsData,
			}));
		}
	};

	// 车辆
	getCarData = (isArray, values) => {
		const res = values[10];
		if (isArray && res && res.code === 200) {
			const { vehicleInformationCount, gmtModified, totalVehicleNum } = res.data;
			const CarPropsData = {
				vehicleInformationCount,
				gmtModified,
				obligorTotal: res.data.obligorTotal || null,
				totalVehicleNum,
			};
			this.setState(() => ({
				CarPropsData,
			}));
		}
	};

	getConstructData = (isArray, values) => {
		const res = values.filter(item => item.field === 'Construct')[0];
		if (isArray && res && res.code === 200) {
			const { onBuildCount, obligorUnitTypeVOList, gmtModified } = res.data;
			const allNum = onBuildCount;
			const dataArray = [];
			obligorUnitTypeVOList.forEach((item) => {
				dataArray.push({ count: item.obligorUnitCount || 0, typeName: obligorUnitTypeMap.get(item.obligorUnitType) });
			});
			const constructPropsData = {
				gmtModified,
				dataArray,
				allNum,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				constructPropsData,
			}));
		}
	};

	// 判断内部是否存数据
	isHasValue = () => {
		const { portrait } = this.props;
		const {
			auctionPropsData, landPropsData, intangiblePropsData, subrogationPropsData, stockPropsData, biddingPropsData, mortgagePropsData, unblockPropsData, financialPropsData, RealPropsData, CarPropsData, constructPropsData,
		} = this.state;
		return (Object.keys(auctionPropsData).length > 0 && auctionPropsData.auctionPropsData.count > 0) || (landPropsData.dataSourceNum > 0 && portrait !== 'debtor_personal')
			|| (intangiblePropsData.dataSourceNum > 0 && portrait !== 'debtor_personal') || subrogationPropsData.allNum > 0
			|| (stockPropsData.dataSourceNum > 0 && portrait !== 'debtor_personal') || (biddingPropsData.biddingNum > 0 && portrait !== 'debtor_personal')
			|| (mortgagePropsData.dataSourceNum > 0 && portrait !== 'debtor_personal') || (unblockPropsData.unsealCount > 0 && portrait !== 'debtor_personal')
			|| (constructPropsData.allNum > 0 && portrait !== 'debtor_personal')
			|| (financialPropsData.allNum > 0 && portrait !== 'debtor_personal')
			|| (RealPropsData.realRegisterCount > 0 && portrait !== 'debtor_personal')
	|| (CarPropsData.vehicleInformationCount > 0 && portrait !== 'debtor_personal')
			|| (CarPropsData.totalVehicleNum > 0 && portrait !== 'debtor_personal')  ;
	};

	render() {
		const { portrait } = this.props;
		const {
			auctionPropsData, landPropsData, intangiblePropsData, subrogationPropsData, stockPropsData, biddingPropsData, mortgagePropsData, isLoading, unblockPropsData, financialPropsData, RealPropsData, CarPropsData, constructPropsData,
		} = this.state;
		const isHasValue = this.isHasValue();
		// console.log(portrait, 13);
		return (
			<React.Fragment>
				{isHasValue ? (
					<div>
						<div className="overview-container-title" style={{ marginTop: '40px' }}>
							<div className="overview-left-item" />
							<span className="container-title-name">资产概况</span>
						</div>
						<Spin visible={isLoading}>
							<div className="overview-container-cardContent">
								{/* 资产拍卖 */}
								{Object.keys(auctionPropsData).length !== 0 && <AssetsCard dataSource={auctionPropsData} portrait={portrait} />}
								{/* 土地信息 */}
								{portrait !== 'debtor_personal' && Object.keys(landPropsData).length !== 0 && <LandCard dataSource={landPropsData} portrait={portrait} />}
								{/* 无形资产 */}
								{portrait !== 'debtor_personal' && Object.keys(intangiblePropsData).length !== 0 && <Intangible dataSource={intangiblePropsData} portrait={portrait} />}
								{/* 代位权 */}
								{Object.keys(subrogationPropsData).length !== 0 && <Subrogation dataSource={subrogationPropsData} portrait={portrait} />}
								{/* 股权质押 */}
								{portrait !== 'debtor_personal' && Object.keys(stockPropsData).length !== 0 && <EquityPledge dataSource={stockPropsData} portrait={portrait} />}
								{/* 动产抵押 */}
								{portrait !== 'debtor_personal' && Object.keys(mortgagePropsData).length !== 0 && <ChattelMortgage dataSource={mortgagePropsData} portrait={portrait} />}
								{/* 金融资产 */}
								{portrait !== 'debtor_personal' && Object.keys(financialPropsData).length !== 0 && <FinancialCard dataSource={financialPropsData} portrait={portrait} />}
								{/* 查解封资产 */}
								{portrait !== 'debtor_personal' && Object.keys(unblockPropsData).length !== 0 && <UnBlockCard dataSource={unblockPropsData} portrait={portrait} />}
								{/* 在建工程 */}
								{portrait !== 'debtor_personal' && Object.keys(constructPropsData).length !== 0 && <Constructcard dataSource={constructPropsData} portrait={portrait} />}
								{/* 不动产登记 */}
								{portrait !== 'debtor_personal' && Object.keys(RealPropsData).length !== 0 && <RealEstateCard dataSource={RealPropsData} portrait={portrait} />}
								{/* 车辆信息 */}
								{portrait !== 'debtor_personal' && Object.keys(CarPropsData).length !== 0 && <CarCard dataSource={CarPropsData} portrait={portrait} />}
								{/* 招投标 */}
								{portrait !== 'debtor_personal' && Object.keys(biddingPropsData).length !== 0 && <Bidding dataSource={biddingPropsData} portrait={portrait} />}
							</div>
						</Spin>
					</div>
				) : null}
			</React.Fragment>
		);
	}
}
