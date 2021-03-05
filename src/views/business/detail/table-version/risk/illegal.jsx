import React from 'react';
import { Illegal } from '@/views/risk-monitor/operation-risk/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class IllegalIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 30401),
		};
	}

	render() {
		const { id, data, portrait } = this.props;
		const { count } = this.state;
		const h = toH(30401, toGetNumber(data, 30401), portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`严重违法 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Illegal {...this.props} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
