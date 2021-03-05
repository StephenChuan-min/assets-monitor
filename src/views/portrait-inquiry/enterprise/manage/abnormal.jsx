import React from 'react';
import { Abnormal } from '@/views/risk-monitor/operation-risk/table-version';
import { toGetNumber } from '@/utils/promise';

export default class AbnormalIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 30301),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`经营异常 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Abnormal />
				</div>
			</div>
		);
	}
}
