import React from 'react';
import LimitHeightTable from '@/views/risk-monitor/limit-consumption/table/table-version';
import { toGetNumber } from '@/utils/promise';

export default class LimitHeight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 20901),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`限制高消费 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<LimitHeightTable portrait="enterprise" option={{ e: 'limitHeight' }} />
				</div>
			</div>
		);
	}
}
