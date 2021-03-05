import React from 'react';
import { Tabs } from '@/common';
import { Bidding, Merchants, Publicity } from '@/views/asset-excavate/financial-assets/table-version';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';

export default class Financial extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 10801,
					name: '竞价项目',
					number: toGetNumber(props.data, 10801),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10801)),
				},
				{
					id: 10802,
					name: '招商项目',
					number: toGetNumber(props.data, 10802),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10802)),
				},
				{
					id: 10803,
					name: '公示项目',
					number: toGetNumber(props.data, 10803),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10803)),
				}],
		};
	}

	// 切换金融资产的项目类型
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
					prefix={<div className="yc-tabs-simple-prefix">金融资产</div>}
				/>
				<div className="inquiry-public-table" style={{ paddingTop: 0 }}>
					{sourceType === 10801 ? <Bidding portrait="enterprise" /> : null}
					{sourceType === 10802 ? <Merchants portrait="enterprise" /> : null}
					{sourceType === 10803 ? <Publicity portrait="enterprise" /> : null}
				</div>
			</div>
		);
	}
}
