import React from 'react';
import { Judgment } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 20603),
		};
	}

	render() {
		const { id, data, portrait } = this.props;
		const { count } = this.state;
		const h = toH(20603, toGetNumber(data, 20603), portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`涉诉文书 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Judgment {...this.props} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
