import React from 'react';
import { overviewvehicle } from '@/utils/api/professional-work/overview';
import { getVehicleInformation } from '@/utils/api/portrait-inquiry/enterprise/overview';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import './style.scss';

export default class Car extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeLineData: [],
			vehicleCount: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			businessId,
			obligorId,
			getAssetProfile,
			portrait,
			companyId,
		} = this.props;
		this.setState({
			loading: true,
		});
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2, companyId };
		const api = portrait === 'business' ? overviewvehicle : getVehicleInformation;
		api(params).then((res) => {
			if (res.code === 200) {
				// console.log('unblock === ', res);
				const timeLineData = res.data.yearDistributions;
				const { vehicleCount } = res.data;
				const allNum = getCount(timeLineData);
				getAssetProfile(allNum, 'Car');
				this.setState({
					loading: false,
					timeLineData, // 年份分布
					vehicleCount, // 车辆总数
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { timeLineData, loading, vehicleCount } = this.state;
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
								<span className="container-title-name">车辆信息</span>
								{
									vehicleCount > 0 ? (
										<span className="container-title-name">
											（共
											<span style={{ fontWeight: 'bold' }}>{vehicleCount}</span>
											辆车）
										</span>
									) : null
								}
							</div>
							<div className="overview-container-content">
								{getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="Unblock" />}
							</div>
						</Spin>
					)}
			</div>
		);
	}
}
