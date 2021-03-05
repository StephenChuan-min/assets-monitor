import React from 'react';
import LimitHeightTable from '@/views/risk-monitor/limit-consumption/table/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class LimitHeightIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 20501),
		};
	}

	render() {
		const { id, data, portrait } = this.props;
		const { count } = this.state;
		const h = toH(20501, toGetNumber(data, 2050), portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`限制高消费 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<LimitHeightTable {...this.props} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
