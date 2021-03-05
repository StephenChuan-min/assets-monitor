import React from 'react';
import TimeLine from '../../../common/timeLine';
import getCount from '../../../common/getCount';

export default class LostLetter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { timeLineData } = this.props;

		return (
			<div>
				{timeLineData && getCount(timeLineData) > 0 && (
				<div>
					<div className="overview-container-title">
						<div className="overview-left-item" />
						<span className="container-title-num">
							{getCount(timeLineData)}
							条
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
