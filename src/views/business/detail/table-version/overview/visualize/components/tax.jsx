import React from 'react';
import { OverviewTax } from '@/utils/api/professional-work/overview';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import RingEcharts from '@/views/portrait-inquiry/common/ringEcharts';
// import NoContent from '@/common/noContent';

export default class BusinessRisk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			RingData: [],
			dataSourceNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { obligorId, getAssetProfile } = this.props;
		const params = { obligorId, type: 2 };
		this.setState({ loading: true });
		OverviewTax(params).then((res) => {
			if (res.code === 200) {
				const { roleDistributions } = res.data;
				const dataSourceNum = getCount(roleDistributions);
				getAssetProfile(dataSourceNum, 'Tax');
				this.setState({
					dataSourceNum,
					RingData: roleDistributions,
					loading: false,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { RingData, loading, dataSourceNum } = this.state;
		return (
			<div>
				<Spin visible={loading}>
					{RingData && dataSourceNum > 0 ? (
						<div>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${dataSourceNum} 条`}
								</span>
								<span className="container-title-name">税收违法</span>
							</div>
							<div className="overview-container-content">
								<RingEcharts title="角色分布" Data={RingData} id="tax" customColorArray={['#45A1FF', '#F2657A', '#FCD44A']} />
							</div>
						</div>
					) : null}
				</Spin>
			</div>
		);
	}
}
