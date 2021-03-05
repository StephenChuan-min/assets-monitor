import React from 'react';
import { businessOverviewFinancial, overviewFinancial } from '@/utils/api/professional-work/overview';
import RingEcharts from '@/views/portrait-inquiry/common/ringEcharts';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import TagSide from '@/views/portrait-inquiry/common/checkBtn';
import getCount from '@/views/portrait-inquiry/common/getCount';

const financeProjectTypeMap = new Map([
	[1, '股权项目'],
	[2, '债权项目'],
	[3, '资产项目'],
	[4, '租赁项目'],
	[5, '增资项目'],
	[6, '其他项目'],
	[-1, '未知'],
]);

const projectStatusMap = new Map([
	[1, '即将开始'],
	[3, '正在进行'],
	[5, '已成交'],
	[7, '已流拍'],
	[9, '中止'],
	[11, '撤回'],
	[13, '结束'],
]);

// bidding 竞价  investment 招商 publicity 公示
function getTypeName(arr, mapType) {
	const typeNameArr = [];
	arr.forEach((i) => {
		if (mapType === 'publicity') {
			typeNameArr.push({ ...i, type: financeProjectTypeMap.get(i.type) });
		} else {
			typeNameArr.push({ ...i, type: projectStatusMap.get(i.status) });
		}
	});
	return typeNameArr;
}

export default class Financial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectType: '',
			financeAuctionArray: [],
			financeInvestmentArray: [],
			financePublicArray: [],
			financeAuctionNum: 0,
			financeInvestmentNum: 0,
			financePublicNum: 0,
			RingData: [],
			timeLineData: [],
			RingDataNum: 0,
			timeLineDataNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			businessId, obligorId, getAssetProfile, portrait,
		} = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		const api = portrait === 'business' ? businessOverviewFinancial : overviewFinancial;
		api(params).then((res) => {
			if (res.code === 200) {
				// console.log('finance res === ', res.data);
				const financeAuctionArray = res.data.financeInfos.filter(i => i.type === 1)[0]; // 竞价项目
				const financeInvestmentArray = res.data.financeInfos.filter(i => i.type === 2)[0]; // 招商项目
				const financePublicArray = res.data.financeInfos.filter(i => i.type === 3)[0]; // 公示项目
				const financeAuctionNum = financeAuctionArray.count; // 竞价总数数量
				const financeInvestmentNum = financeInvestmentArray.count; // 招商总数
				const financePublicNum = financePublicArray.count; // 公示总数
				const allNum = financeAuctionArray.count + financeInvestmentArray.count + financePublicArray.count;
				getAssetProfile(allNum, 'Finance');

				// bidding 竞价  investment 招商 publicity 公示
				if (financeAuctionNum > 0) {
					this.setState({
						selectType: 'bidding',
						RingData: getTypeName(financeAuctionArray.projectStatus, 'bidding'),
						timeLineData: financeAuctionArray.yearDistribution,
						RingDataNum: getCount(financeAuctionArray.projectStatus),
						timeLineDataNum: getCount(financeAuctionArray.yearDistribution),
					});
				} else if (financeInvestmentNum > 0) {
					this.setState({
						selectType: 'investment',
						RingData: getTypeName(financeInvestmentArray.investmentProjectStatus, 'investment'),
						timeLineData: financeInvestmentArray.yearDistribution,
						RingDataNum: getCount(financeInvestmentArray.investmentProjectStatus),
						timeLineDataNum: getCount(financeInvestmentArray.yearDistribution),
					});
				} else {
					this.setState({
						selectType: 'publicity',
						RingData: getTypeName(financePublicArray.financeProjectType, 'publicity'),
						timeLineData: financePublicArray.yearDistribution,
						RingDataNum: getCount(financePublicArray.financeProjectType),
						timeLineDataNum: getCount(financePublicArray.yearDistribution),
					});
				}
				this.setState({
					financeAuctionArray,
					financeInvestmentArray,
					financePublicArray,
					financeAuctionNum,
					financeInvestmentNum,
					financePublicNum,
				});
			}
		}).catch(() => {
			// this.setState({ loading: false });
		});
	};

	// bidding 竞价  investment 招商 publicity 公示
	checkTime = (selectType) => {
		const { financeAuctionArray, financeInvestmentArray, financePublicArray } = this.state;
		if (selectType === 'bidding') {
			this.setState({
				selectType,
				RingData: getTypeName(financeAuctionArray.projectStatus, 'bidding'),
				timeLineData: financeAuctionArray.yearDistribution,
				RingDataNum: getCount(financeAuctionArray.projectStatus),
				timeLineDataNum: getCount(financeAuctionArray.yearDistribution),
			});
		} else if (selectType === 'investment') {
			this.setState({
				selectType,
				RingData: getTypeName(financeInvestmentArray.investmentProjectStatus, 'investment'),
				timeLineData: financeInvestmentArray.yearDistribution,
				RingDataNum: getCount(financeInvestmentArray.investmentProjectStatus),
				timeLineDataNum: getCount(financeInvestmentArray.yearDistribution),
			});
		} else if (selectType === 'publicity') {
			this.setState({
				selectType,
				RingData: getTypeName(financePublicArray.financeProjectType, 'publicity'),
				timeLineData: financePublicArray.yearDistribution,
				RingDataNum: getCount(financePublicArray.financeProjectType),
				timeLineDataNum: getCount(financePublicArray.yearDistribution),
			});
		}
	};

	render() {
		const { portrait } = this.props;
		const {
			RingData, timeLineData, selectType, financeAuctionArray, financeInvestmentArray, financePublicArray, 	financeAuctionNum, financeInvestmentNum, financePublicNum, RingDataNum, timeLineDataNum,
		} = this.state;

		return (
			<div>
				{timeLineDataNum > 0 || RingDataNum > 0 ? (
					<div>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{financeAuctionArray.count || financeInvestmentArray.count || financePublicArray.count ? `${financeAuctionArray.count + financeInvestmentArray.count + financePublicArray.count} 条` : '-'}
							</span>
							<span className="container-title-name">
								金融资产
							</span>
						</div>
						<div className="overview-container-content">
							{portrait !== 'debtor_personal' && (
								<div style={{ marginBottom: 20 }}>
									<TagSide
										content="竞价项目"
										num={financeAuctionNum}
										onClick={() => {
											if (financeAuctionNum > 0) {
												this.checkTime('bidding');
											}
										}}
										tag={selectType === 'bidding' ? 'yc-tag-active' : ''}
									/>
									<TagSide
										content="招商项目"
										num={financeInvestmentNum}
										onClick={() => {
											if (financeInvestmentNum > 0) {
												this.checkTime('investment');
											}
										}}
										tag={selectType === 'investment' ? 'yc-tag-active' : ''}
									/>
									<TagSide
										content="公示项目"
										num={financePublicNum}
										onClick={() => {
											if (financePublicNum > 0) {
												this.checkTime('publicity');
											}
										}}
										tag={selectType === 'publicity' ? 'yc-tag-active' : ''}
									/>
								</div>
							)}
							<div style={{ marginBottom: 20 }} />
							{RingDataNum > 0 && <RingEcharts title={selectType === 'publicity' ? '项目类型分布' : '项目状态分布'} Data={RingData} id="financeCharts" customColorArray={['#1C80E1', '#45A1FF', '#59C874', '#FCD44A', '#FB8E3C', '#F2657A', '#965EE3', '#4561FF']} />}
							{timeLineDataNum > 0 && <TimeLine title="年份分布" Data={timeLineData} id="financeTimeLine" />}
						</div>
					</div>
				) : null }
			</div>
		);
	}
}
