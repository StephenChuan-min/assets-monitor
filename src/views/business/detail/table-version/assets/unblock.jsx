import React from 'react';
import { toGetNumber } from '@/utils/promise';
import Table from '@/views/asset-excavate/seized-unblock/table/table-version';
import { toGetModuleHeight } from '@/utils';

export default class UnBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 10901),
		};
	}

	render() {
		const { count } = this.state;
		const { id, portrait } = this.props;
		const h = toGetModuleHeight(10901, count, portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`查/解封资产 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Table portrait={portrait} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
