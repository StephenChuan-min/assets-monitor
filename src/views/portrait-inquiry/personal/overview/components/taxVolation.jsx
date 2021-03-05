import React from 'react';
import { getTaxIllegal } from '@/utils/api/portrait-inquiry/personal/overview';
import { getQueryByName } from '@/utils';
import RingEcharts from '../../../common/ringEcharts';
import getCount from '../../../common/getCount';

export default class TaxViolation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			RingData: [],
		};
		this.info = {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const params = this.info;
		const { getAssetProfile } = this.props;
		getTaxIllegal(params).then((res) => {
			if (res.code === 200) {
				const RingData = res.data.taxIllegalInfoVO;
				getAssetProfile(getCount(RingData), 'TaxViolation', false);
				this.setState({
					RingData,
				});
			}
		}).catch(() => {
		});
	};

	render() {
		const { RingData } = this.state;
		return (
			<div>
				{RingData && getCount(RingData) > 0 && (
				<div>
					<div className="overview-container-title">
						<div className="overview-left-item" />
						<span className="container-title-num">
							{`${getCount(RingData)} 条`}
						</span>
						<span className="container-title-name">税收违法</span>
					</div>
					<div className="overview-container-content">
						<RingEcharts title="角色分布" Data={RingData} id="taxVolation" customColorArray={['#45A1FF', '#F2657A', '#FCD44A']} />
					</div>
				</div>
				)}
			</div>
		);
	}
}
