import React from 'react';
import { Tabs } from '@/common';
import Table from '@/views/asset-excavate/real-estate/table-detail';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';

export default class RealEstate extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 11001,
					name: '智能精准匹配',
					number: toGetNumber(props.data, 11001),
					showNumber: true,
					disabled: !toGetNumber(props.data, 11001),
				},
				{
					id: 11002,
					name: '模糊匹配',
					number: toGetNumber(props.data, 11002),
					showNumber: true,
					disabled: !toGetNumber(props.data, 11002),
				},
			],
		};
	}

	onSourceType = (val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	render() {
		const { config, sourceType } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={<div className="yc-tabs-simple-prefix">不动产登记</div>}
				/>
				<div className="inquiry-public-table">
					{ sourceType === 11001 ? <Table portrait="enterprise" type={sourceType} /> : null }
					{ sourceType === 11002 ? <Table portrait="enterprise" type={sourceType} /> : null }
				</div>
			</div>
		);
	}
}
