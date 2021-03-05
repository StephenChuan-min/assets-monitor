import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import { Spin, Table, Ellipsis } from '@/common';
import { timeStandard, toEmpty } from '@/utils';

export default class TableVersion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toShowExtraField=(item = {}) => {
		const { portrait } = this.props;
		if (portrait === 'business') {
			return (
				<li>
					<span className="list list-title align-justify">相关单位</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content-auto">
						<Ellipsis
							content={item.obName}
							url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
							tooltip
							width={250}
						/>
					</span>
					{/* <span className="list-split" style={{ height: 16 }} /> */}
				</li>
			);
		}
		return null;
	};

	toGetColumns = () => [
		{
			title: '主要信息',
			dataIndex: 'title',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
						<Ellipsis content={toEmpty(value)} url={row.url} width={600} font={15} tooltip isSourceLink />
					</li>
					{this.toShowExtraField(row)}
				</div>
			),
		}, {
			title: '辅助信息',
			width: 300,
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify">发布日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.publishTime)}</span>
					</li>
				</div>
			),
		},
	];

	// 当前页数变化
	onPageChange = (val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData = (page) => {
		const { portrait, option } = this.props;
		const { api, params } = getDynamicRisk(portrait, option || {
			b: 30701,
		});
		if (!api) return;
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			...params,
		}).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
			}
		})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	render() {
		const { dataSource, current, total } = this.state;
		const { loading } = this.state;
		const { loadingHeight } = this.props;
		return (
			<div className="yc-assets-auction ">
				<Spin visible={loading} minHeight={(current > 1 && current * 5 >= total) ? '' : loadingHeight}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={dataSource}
						showHeader={false}
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && (
						<div className="yc-table-pagination">
							<Pagination
								showQuickJumper
								current={current || 1}
								total={total || 0}
								pageSize={5}
								onChange={this.onPageChange}
								showTotal={totalCount => `共 ${totalCount} 条信息`}
							/>
						</div>
					)}
				</Spin>
			</div>
		);
	}
}
