import React from 'react';
import { Court } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { toGetNumber } from '@/utils/promise';

export default class CourtIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 20201),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">
						开庭
						<span className="yc-table-num">{count}</span>
					</div>
					{/* <div className="yc-tabs-simple-prefix">{`开庭 ${count || 0}`}</div> */}
				</div>
				<div className="inquiry-public-table">
					<Court />
				</div>
			</div>
		);
	}
}
