import React from 'react';
import { Tabs } from '@/common';
import { Pledge, Mortgage } from '@/views/asset-excavate/chattel-mortgage/table-version';
import { toGetNumber, toGetDefaultId } from '@/utils/promise';
import { toGetModuleHeight } from '@/utils';

export default class Chattel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: toGetDefaultId(props.data),
			config: [
				{
					id: 10601,
					name: '抵押',
					number: toGetNumber(props.data, 10601),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10601),
					tooltip: '查询主体作为抵押物所有人向其债权人抵押财产',
				},
				{
					id: 10602,
					name: '抵押权',
					number: toGetNumber(props.data, 10602),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10602),
					tooltip: '查询主体作为债权人享有的抵押权信息',
				}],
		};
	}

	onChangeType=(val) => {
		const { type } = this.state;
		if (val !== type) {
			this.setState({ type: val });
		}
	};


	render() {
		const { config, type } = this.state;
		const { id, portrait, data } = this.props;
		const h = toGetModuleHeight(type, toGetNumber(data, type), portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					borderBottom
					onChange={this.onChangeType}
					source={config}
					symbol="none"
					defaultCurrent={type}
					prefix={<div className="yc-tabs-simple-prefix">动产抵押</div>}
				/>
				<div className="inquiry-public-table">
					{type === 10601 ? <Pledge portrait={portrait} loadingHeight={h} /> : null}
					{type === 10602 ? <Mortgage portrait={portrait} loadingHeight={h} /> : null}
				</div>
			</div>
		);
	}
}
