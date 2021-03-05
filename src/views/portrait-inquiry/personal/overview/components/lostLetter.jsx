import React from 'react';
import { getDishonest } from '@/utils/api/portrait-inquiry/personal/overview';
import { getQueryByName } from '@/utils';
import TimeLine from '../../../common/timeLine';
import getCount from '../../../common/getCount';

export default class LostLetter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeLineData: [
				{ num: 2, year: 2017 },
				{ num: 6, year: 2018 },
			],
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
		const { getAssetProfile } = this.props;
		const params = this.info;
		getDishonest(params).then((res) => {
			if (res.code === 200) {
				const timeLineData = res.data.assetOverviewDishonestInfo.yearDistributions;
				getAssetProfile(getCount(timeLineData), 'LostLetter', false);
				this.setState({
					timeLineData,
				});
			}
		}).catch(() => {
		});
	};

	render() {
		const { timeLineData } = this.state;
		return (
			<div>
				{timeLineData && getCount(timeLineData) > 0 && (
				<div>
					<div className="overview-container-title">
						<div className="overview-left-item" />
						<span className="container-title-num">
							{`${getCount(timeLineData)} 条`}
						</span>
						<span className="container-title-name">失信记录</span>
					</div>
					<div className="overview-container-content">
						<TimeLine title="年份分布" Data={timeLineData} id="lostLetter" />
					</div>
				</div>
				)}
			</div>
		);
	}
}
