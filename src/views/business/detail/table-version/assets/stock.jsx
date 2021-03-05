import React from 'react';
import { Tabs } from '@/common';
import { Pledge, Mortgage } from '@/views/asset-excavate/equity-pledge/table-version';
import { toGetNumber, toGetDefaultId } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetDefaultId(props.data),
			config: [
				{
					id: 10501,
					name: '股权出质',
					number: toGetNumber(props.data, 10501),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10501)),
					tooltip: '债务人作为股权持有人向其债权人出质股权',
				},
				{
					id: 10502,
					name: '股权质权',
					number: toGetNumber(props.data, 10502),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10502)),
					tooltip: '债务人作为出质人的债权人，出质人将其持有的股权质押给债务人',
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
		const { id, portrait, data } = this.props;
		const h = toH(sourceType, toGetNumber(data, sourceType), portrait);
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
					{sourceType === 10501 ? <Pledge portrait={portrait} loadingHeight={h} /> : null}
					{sourceType === 10502 ? <Mortgage portrait={portrait} loadingHeight={h} /> : null}
				</div>
			</div>
		);
	}
}
