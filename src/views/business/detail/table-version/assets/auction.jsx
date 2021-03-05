import React from 'react';
import { Switch } from 'antd';
import { Tabs } from '@/common';
import Table from '@/views/asset-excavate/assets-auction/table-detail';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight } from '@/utils';

export default class Auction extends React.Component {
	constructor(props) {
		super(props);
		const sourceType = toGetNumber(props.data, 10101) ? 10101 : 10102;
		this.sourceNumber = toGetNumber(props.data, sourceType);
		this.state = {
			ignored: false,
			sourceType,
			config: [{
				id: 10101,
				name: '精准匹配',
				number: toGetNumber(props.data, 10101),
				showNumber: true,
				disabled: !toGetNumber(props.data, 10101),
			}, {
				id: 10102,
				name: '模糊匹配',
				number: toGetNumber(props.data, 10102),
				showNumber: true,
				disabled: !toGetNumber(props.data, 10102),
			}],
		};
	}

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	onCountChange=(count, sourceType) => {
		const { config } = this.state;
		const index = sourceType === 10101 ? 0 : 1;
		config[index].number = count;
		this.setState({
			config,
		});
	};

	render() {
		const { config, sourceType, ignored } = this.state;
		const { id, portrait } = this.props;
		const params = {
			ignored,
			portrait,
			sourceType,
			onCountChange: this.onCountChange,
		};
		const h = toGetModuleHeight(sourceType, this.sourceNumber, portrait);
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={<div className="yc-tabs-simple-prefix">资产拍卖</div>}
					suffix={(
						<div className="yc-tabs-suffix-ignore">
							<span className="ignore-text">过滤已忽略数据</span>
							<Switch checkedChildren="开" unCheckedChildren="关" onChange={v => this.setState({ ignored: v })} />
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					<Table {...params} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
