import React from 'react';
import { Tabs } from '@/common';
import Table from '@/views/asset-excavate/assets-auction/table-version';

export default class Auction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [{
				id: 1, name: '智能精准匹配', total: 12,
			}],
		};
	}

	render() {
		const { config } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">资产拍卖</div>}
				/>
				<div className="inquiry-public-table">
					<Table portrait="personal" />
				</div>
			</div>
		);
	}
}
