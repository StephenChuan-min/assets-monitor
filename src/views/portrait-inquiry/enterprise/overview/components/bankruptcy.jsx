import React from 'react';
import { getBankruptcy } from '@/utils/api/portrait-inquiry/enterprise/overview';
import { Spin } from '@/common';
import TimeLine from '../../../common/timeLine';
import './style.scss';

export default class Bankruptcy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeLineData: [],
			allTimeDate: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId, getRiskProfile } = this.props;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};
		getBankruptcy(params).then((res) => {
			if (res.code === 200) {
				const timeLineData = res.data.yearDistributions;
				this.setState({
					loading: false,
					timeLineData, // 年份分布
					allTimeDate: res.data.bankruptcy,
				});
				getRiskProfile(res.data.bankruptcy, 'Bankruptcy');
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { timeLineData, loading, allTimeDate } = this.state;
		return (
			<div>
				{
					allTimeDate > 0 ? (
						<Spin visible={loading}>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${allTimeDate} 条`}
								</span>
								<span className="container-title-name"> 破产重组信息</span>
							</div>
							<div className="overview-container-content">
								{allTimeDate > 0 && <TimeLine title="年份分布" Data={timeLineData} id="Bidding" />}
							</div>
						</Spin>
					) : null
					}
			</div>
		);
	}
}
