import React from 'react';
import { Punishment } from '@/views/risk-monitor/operation-risk/table-version';
import { toGetNumber } from '@/utils/promise';

export default class PunishmentIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 30601),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`行政处罚 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Punishment />
				</div>
			</div>
		);
	}
}
