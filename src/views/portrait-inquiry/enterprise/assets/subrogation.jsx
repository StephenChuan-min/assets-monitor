import React from 'react';
import { Tooltip } from 'antd';
import { Tabs, Icon } from '@/common';
import { Court, Trial, Judgment } from '@/views/asset-excavate/subrogation/table-version';
import { toGetNumber, toGetDefaultId } from '@/utils/promise';
import { linkDom } from '@/utils';


export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 10201,
					name: '立案',
					number: toGetNumber(props.data, 10201),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10201),
				},
				{
					id: 10202,
					name: '开庭',
					number: toGetNumber(props.data, 10202),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10202),
				},
				{
					id: 10203,
					name: '裁判文书',
					number: toGetNumber(props.data, 10203),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10203),
				}],
		};
	}

	// 监听tab变化
	onSourceType = (val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	// 获取跳转链接
	onGetLinkDom = () => {
		const { name } = this.props;
		const { sourceType } = this.state;
		if (sourceType === 10203) {
			return linkDom(`/#/search/detail/writ?content=${name}`, '查看更多相关文书＞');
		}
		return '';
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
					rightRender={this.onGetLinkDom}
					prefix={(
						<div className="yc-tabs-simple-prefix" style={{ width: 100 }}>
							<span>代位权</span>
							<Tooltip placement="top" title="查询主体作为原告起诉他人的案件">
								<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
							</Tooltip>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10201 ? <Trial /> : null}
					{sourceType === 10202 ? <Court /> : null}
					{sourceType === 10203 ? <Judgment /> : null}
				</div>
			</div>
		);
	}
}
