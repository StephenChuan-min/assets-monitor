import React from 'react';
import { Tabs } from '@/common';
import { Pledge, Mortgage } from '@/views/asset-excavate/equity-pledge/table-version';
import { toGetNumber, toGetDefaultId } from '@/utils/promise';

export default class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetDefaultId(props.data),
			config: [
				{
					id: 10401,
					name: '股权出质',
					number: toGetNumber(props.data, 10401),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10401)),
					tooltip: '查询主体作为股权持有人向其债权人出质股权',
				},
				{
					id: 10402,
					name: '股权质权',
					number: toGetNumber(props.data, 10402),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10402)),
					tooltip: '查询主体作为出质人的债权人，出质人将其持有的股权质押给查询主体',
				}],
		};
	}

	onSourceType=(val) => {
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
					prefix={<div className="yc-tabs-simple-prefix">股权质押</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10401 ? <Pledge /> : null}
					{sourceType === 10402 ? <Mortgage /> : null}
				</div>
			</div>
		);
	}
}
