import React from 'react';
import { toGetNumber } from '@/utils/promise';
import TableEnvironment from '@/views/risk-monitor/operation-risk/table-version/environment';

export default class EnvironmentPunishment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 20801),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`环保处罚 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<TableEnvironment portrait="enterprise" option={{ e: 'environmentPunishment' }} />
				</div>
			</div>
		);
	}
}
