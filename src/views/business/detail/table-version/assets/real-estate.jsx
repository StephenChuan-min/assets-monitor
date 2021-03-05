import React from 'react';
import { Tabs } from '@/common';
import Table from '@/views/asset-excavate/real-estate/table-detail';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight } from '@/utils';

export default class Auction extends React.Component {
	constructor(props) {
		super(props);
		const sourceType = toGetNumber(props.data, 11001) ? 11001 : 11002;
		this.sourceNumber = toGetNumber(props.data, sourceType);
		this.state = {
			sourceType,
			config: [{
				id: 11001,
				name: '精准匹配',
				number: toGetNumber(props.data, 11001),
				showNumber: true,
				disabled: !toGetNumber(props.data, 11001),
			}, {
				id: 11002,
				name: '模糊匹配',
				number: toGetNumber(props.data, 11002),
				showNumber: true,
				disabled: !toGetNumber(props.data, 11002),
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
		const index = sourceType === 11001 ? 0 : 1;
		config[index].number = count;
		this.setState({
			config,
		});
	};

	render() {
		const { config, sourceType } = this.state;
		const { id, portrait } = this.props;
		const params = {
			portrait,
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
					prefix={<div className="yc-tabs-simple-prefix">不动产登记</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 11001 && <Table {...params} loadingHeight={h} type={sourceType} />}
					{sourceType === 11002 && <Table {...params} loadingHeight={h} type={sourceType} />}
				</div>
			</div>
		);
	}
}
