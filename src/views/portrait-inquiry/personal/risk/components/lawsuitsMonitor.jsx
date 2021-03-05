import React from 'react';
import { Judgment } from '@/views/risk-monitor/lawsuits-monitor/table-version';

export default class lawsuitsMonitor extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ position: 'relative' }}>
					<div className="yc-tabs-simple-prefix">
						涉诉文书
						<span className="yc-table-num">{count}</span>
					</div>
				</div>
				<div className="inquiry-public-table">
					<Judgment portrait="personal" />
				</div>
			</div>
		);
	}
}
