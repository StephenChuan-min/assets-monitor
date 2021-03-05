import React from 'react';
import { Tooltip } from 'antd';
import { Tabs, Icon } from '@/common';
import { Court, Trial, Judgment } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { toGetNumber, toGetDefaultId } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';


export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 20601,
					name: '立案',
					number: toGetNumber(props.data, 20601),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20601),
				},
				{
					id: 20602,
					name: '开庭',
					number: toGetNumber(props.data, 20602),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20602),
				},
				{
					id: 20603,
					name: '裁判文书',
					number: toGetNumber(props.data, 20603),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20603),
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
		const { id, data, portrait } = this.props;
		const h = toH(sourceType, toGetNumber(data, sourceType), portrait);

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={(
						<div className="yc-tabs-simple-prefix" style={{ width: 120 }}>
							<span>涉诉信息</span>
							<Tooltip placement="top" title="债务人作为被告被他人起诉的案件">
								<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
							</Tooltip>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					{sourceType === 20601 ? <Trial {...this.props} loadingHeight={h} /> : null}
					{sourceType === 20602 ? <Court {...this.props} loadingHeight={h} /> : null}
					{sourceType === 20603 ? <Judgment {...this.props} loadingHeight={h} /> : null}
				</div>
			</div>
		);
	}
}
