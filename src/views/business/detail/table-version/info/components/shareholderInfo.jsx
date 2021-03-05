import React from 'react';
import { parseQuery } from '@/utils';
import { Spin, Table } from '@/common';
import { getStockholder } from '@/utils/api/professional-work/info';

export default class ShareholderInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [], // 列表数据
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		this.getStockholderData(params);
	}

	getStockholderData = (value) => {
		this.setState({
			loading: true,
		});
		const params = {
			...value,
		};
		getStockholder(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						loading: false,
						data: res.data,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	toGetColumns = () => [
		{
			title: '序号',
			dataIndex: 'indexNum',
			key: 'indexNum',
			width: 240,
			className: 'column-left20',
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '股东基本信息',
			dataIndex: 'name',
			key: 'name',
			width: 240,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		},
		{
			title: '出资比例',
			dataIndex: 'rate',
			key: 'rate',
			width: 240,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		},
		{
			title: '认缴出资额',
			dataIndex: 'amount',
			key: 'amount',
			width: 260,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		},
	];

	render() {
		const { id } = this.props;
		const { loading, data } = this.state;

		// 添加一个下标属性indexNum
		const newArray = [];
		if (data) {
			data.map((item, index) => newArray.push(
				Object.assign({}, item, { indexNum: index + 1 }),
			));
		}

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
						股东信息
					</div>
				</div>
				<div className="yc-base-table">
					<Spin visible={loading}>
						<Table
							scroll={data.length > 8 ? { y: 440 } : {}}
							columns={this.toGetColumns()}
							dataSource={newArray}
							pagination={false}
							className="table"
						/>
					</Spin>
				</div>
			</div>
		);
	}
}
