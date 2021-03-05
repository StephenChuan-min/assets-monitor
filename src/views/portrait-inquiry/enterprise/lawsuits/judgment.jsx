import React from 'react';
import { Judgment } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { toGetNumber } from '@/utils/promise';

export default class JudgmentIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 20301),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`涉诉文书 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Judgment />
				</div>
			</div>
		);
	}
}
