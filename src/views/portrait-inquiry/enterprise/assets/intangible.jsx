import React from 'react';
import { Tabs } from '@/common';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';
import TableDumping from '@/views/asset-excavate/intangible-assets/table-version/dumping-right';
import TableMining from '@/views/asset-excavate/intangible-assets/table-version/mining-right';
import TableCopyRight from '@/views/asset-excavate/intangible-assets/table-version/copyright';
import TableConstruction from '@/views/asset-excavate/intangible-assets/table-version/construction-qualification';

export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 10601,
					name: '排污权',
					number: toGetNumber(props.data, 10601),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10601)),
				},
				{
					id: 10602,
					name: '矿业权',
					number: toGetNumber(props.data, 10602),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10602)),
				},
				{
					id: 10603,
					name: '商标专利',
					number: toGetNumber(props.data, 10603),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10603)),
				},
				{
					id: 10604,
					name: '建筑建造资质',
					number: toGetNumber(props.data, 10604),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10604)),
				},
			],
		};
	}

	onSourceType = (val) => {
		console.log('val === ', val);
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
					defaultCurrent={sourceType}
					symbol="none"
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">无形资产</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10601 ? <TableDumping portrait="enterprise" option={{ e: 'emission' }} /> : null}
					{sourceType === 10602 ? <TableMining portrait="enterprise" option={{ e: 'mining' }} /> : null}
					{sourceType === 10603 ? <TableCopyRight portrait="enterprise" option={{ e: 'trademark' }} /> : null}
					{sourceType === 10604 ? <TableConstruction portrait="enterprise" option={{ e: 'construct' }} /> : null}
				</div>
			</div>
		);
	}
}
