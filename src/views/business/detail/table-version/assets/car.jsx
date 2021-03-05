import React from 'react';
import { toGetNumber } from '@/utils/promise';
import Table from '@/views/asset-excavate/car/table-version';
import { toGetModuleHeight } from '@/utils';

export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 11101),
		};
	}

	render() {
		const { count } = this.state;
		const { id, portrait } = this.props;
		const h = toGetModuleHeight(11101, count, portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`车辆信息 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Table portrait={portrait} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
