import React from 'react';
import { Bidding } from '@/views/risk-monitor/operation-risk/table-version';

export default class BiddingIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">招投标</div>
				</div>
				<div className="inquiry-public-table">
					<Bidding />
				</div>
			</div>
		);
	}
}
