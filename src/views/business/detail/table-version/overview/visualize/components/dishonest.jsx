import React from 'react';
import { overviewDishonest, businessOverviewDishonest } from '@/utils/api/professional-work/overview';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import './style.scss';
import RingEcharts from '@/views/portrait-inquiry/common/ringEcharts';

export default class Dishonest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeLineData: [],
			DishonestList: [],
			beforeDishonestList: [],
			RingData: [],
			RingDataNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			businessId, obligorId, portrait, getAssetProfile,
		} = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		const api = portrait === 'business' ? businessOverviewDishonest : overviewDishonest;
		this.setState({ loading: true });
		api(params).then((res) => {
			if (res.code === 200) {
				const RingData = [];
				const timeLineData = res.data.yearDistributions;
				const DishonestList = res.data.obligorStatusList && res.data.obligorStatusList.length > 0 && res.data.obligorStatusList.filter(item => item.dishonestStatus === 1);
				const beforeDishonestList = res.data.obligorStatusList && res.data.obligorStatusList.length > 0 && res.data.obligorStatusList.filter(item => item.dishonestStatus === 2);
				RingData.push({ count: res.data.included || 0, type: '未移除' });
				RingData.push({ count: res.data.remove || 0, type: '已移除' });
				const RingDataNum = getCount(RingData);
				const allNum = getCount(timeLineData);
				getAssetProfile(allNum, 'Dishonest');

				this.setState({
					loading: false,
					DishonestList: DishonestList || [], // 已失信
					beforeDishonestList: beforeDishonestList || [], // 曾失信
					timeLineData, // 年份分布
					RingData,
					RingDataNum,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	handleOnClick = (value) => {
		if (value) {
			const w = window.open('about:blank');
			w.location.href = `#/business/debtor/detail?id=${value}`;
		}
	};

	render() {
		const {
			timeLineData, loading, DishonestList, beforeDishonestList, RingData, RingDataNum,
		} = this.state;
		const { portrait } = this.props;
		const isBusiness = portrait === 'business';
		const isDishonestList = Array.isArray(DishonestList) && DishonestList.length > 0;
		const isBeforeDishonestList = Array.isArray(beforeDishonestList) && beforeDishonestList.length > 0;
		return (
			<div>
				{
					getCount(timeLineData) > 0
					&& (
						<Spin visible={loading}>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${getCount(timeLineData)} 条`}
								</span>
								<span className="container-title-name"> 失信记录</span>
							</div>

							{isDishonestList && isBusiness ? (
								<div style={{ marginBottom: '16px', fontSize: '12px', marginLeft: '10px' }}>
									已失信债务人：
									{DishonestList.map((item, index) => {
										const key = item.obligorId;
										return (
											<span key={key} className="click-link" onClick={() => this.handleOnClick(item.obligorId)}>
												{item.obligorName}
												{DishonestList.length - index !== 1 && '、'}
											</span>
										);
									})}
								</div>
							) : null}
							{isBeforeDishonestList && isBusiness ? (
								<div style={{ marginBottom: '20px', fontSize: '12px', marginLeft: '10px' }}>
									曾失信债务人：
									{beforeDishonestList.map((item, index) => {
										const key = item.obligorId;
										return (
											<span key={key} className="click-link" onClick={() => this.handleOnClick(item.obligorId)}>
												{item.obligorName}
												{beforeDishonestList.length - index !== 1 && '、'}
											</span>
										);
									})}
								</div>
							) : null}

							<div className="overview-container-content">
								{getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="ChattelMortgage" />}
								{RingDataNum > 0 && isBusiness && <RingEcharts title="移除状态分布" Data={RingData} id="Dishonest" customColorArray={['#45A1FF', '#F2657A']} />}
							</div>
						</Spin>
					)}
			</div>
		);
	}
}
