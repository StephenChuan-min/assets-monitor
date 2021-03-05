import React from 'react';
import {
	overviewLand, businessOverviewLand,
} from '@/utils/api/professional-work/overview';
import ColumnarEcharts from '@/views/portrait-inquiry/common/columnarEcharts';
import RingEcharts from '@/views/portrait-inquiry/common/ringEcharts';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';

export default class Land extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columnarData: [],
			RingData: [],
			timeLineData: [],
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
		const api = portrait === 'business' ? businessOverviewLand : overviewLand;
		this.setState({ loading: true });

		api(params).then((res) => {
			if (res.code === 200) {
				const RingData = res.data.infoTypes;
				const columnarData = res.data.visualRoleDistributions;
				const timeLineData = res.data.yearDistributions;
				const allNum = getCount(columnarData) + getCount(RingData) + getCount(timeLineData);
				getAssetProfile(allNum, 'Land');

				this.setState({
					loading: false,
					RingData, // 信息类型
					columnarData, // 角色分布
					timeLineData, // 年份分布
				});
			} else {
				this.setState({ loading: false });
			}
		})
			.catch(() => {
				this.setState({ loading: false });
			});
	};


	render() {
		const {
			columnarData, RingData, timeLineData, loading,
		} = this.state;
		return (
			<div>
				{
					getCount(columnarData) + getCount(RingData) + getCount(timeLineData) > 0
						? (
							<Spin visible={loading}>
								<div className="overview-container-title">
									<div className="overview-left-item" />
									<span className="container-title-num">
										{`${getCount(RingData)}条`}
									</span>
									<span className="container-title-name">土地信息</span>
								</div>
								<div className="overview-container-content">
									{getCount(RingData) && <RingEcharts title="信息类型分布" Data={RingData} id="Land" customColorArray={['#45A1FF', '#F2657A', '#FCD44A']} />}
									{getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="Land" />}
									{getCount(columnarData) > 0 && <ColumnarEcharts title="角色分布" Data={columnarData} id="Land" /> }
								</div>
							</Spin>
						) : null
				}
			</div>
		);
	}
}
