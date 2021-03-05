import React from 'react';
import { Tax } from '@/views/risk-monitor/operation-risk/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class TaxIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 30501),
		};
	}

	render() {
		const { id, data, portrait } = this.props;
		const { count } = this.state;
		const h = toH(30501, toGetNumber(data, 30501), portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`税收违法 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Tax {...this.props} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
