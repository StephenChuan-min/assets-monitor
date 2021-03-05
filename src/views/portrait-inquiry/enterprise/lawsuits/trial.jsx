import React from 'react';
import { Trial } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { toGetNumber } from '@/utils/promise';

export default class TrialIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 20101),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`立案 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Trial />
				</div>
			</div>
		);
	}
}
