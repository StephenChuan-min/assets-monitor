import React from 'react';
import { Tabs } from '@/common';
import { Construct, Winbid, Underway } from '@/views/asset-excavate/construct-project/table-version';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';
import { roleState } from '@/utils/rule';

export default class ConstructTable extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 11201,
					name: '建设单位',
					number: toGetNumber(props.data, 11201),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 11201)),
					isRule: roleState('zcwj', 'zjgcjsdw'),
				},
				{
					id: 11202,
					name: '中标单位',
					number: toGetNumber(props.data, 11202),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 11202)),
					isRule: roleState('zcwj', 'zjgczbdw'),
				},
				{
					id: 11203,
					name: '施工单位',
					number: toGetNumber(props.data, 11203),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 11203)),
					isRule: roleState('zcwj', 'zjgcsgdw'),
				}],
		};
	}

	// 切换tab
	onSourceType = (val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	render() {
		const { config, sourceType } = this.state;
		const { id, portrait, data } = this.props;
		const h = toH(sourceType, toGetNumber(data, sourceType), portrait);
		const newConfig = config.filter(item => item.isRule);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={newConfig}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={<div className="yc-tabs-simple-prefix">在建工程</div>}
				/>
				<div className="inquiry-public-table" style={{ paddingTop: 0 }}>
					{sourceType === 11201 ? <Construct portrait={portrait} loadingHeight={h} /> : null}
					{sourceType === 11202 ? <Winbid portrait={portrait} loadingHeight={h} /> : null}
					{sourceType === 11203 ? <Underway portrait={portrait} loadingHeight={h} /> : null}
				</div>
			</div>
		);
	}
}
