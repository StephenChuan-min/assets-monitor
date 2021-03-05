import React from 'react';
import { Punishment } from '@/views/risk-monitor/operation-risk/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class PunishmentIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 30601),
		};
	}

	render() {
		const { id, data, portrait } = this.props;
		const { count } = this.state;
		const h = toH(30601, toGetNumber(data, 30601), portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`行政处罚 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Punishment {...this.props} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
