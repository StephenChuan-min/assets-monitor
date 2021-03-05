import React from 'react';
import { parseQuery } from '@/utils';
import Stock from '@/views/portrait-inquiry/stock-right';

export default class EquityPenetration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stockChartId: parseQuery(window.location.hash).id || -9999,
		};
	}

	render() {
		const { id, name } = this.props;
		const { stockChartId } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
						股权穿透图
					</div>
				</div>
				<div style={{ height: 546, border: '1px solid #DADDE6', marginBottom: 35 }}>
					<div className="yc-Stock-name">{name && name}</div>
					<Stock isBusiness stockChartId={stockChartId && stockChartId} name={name} field="id" />
				</div>
			</div>
		);
	}
}
