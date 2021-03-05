import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import {
	Spin, Table, Ellipsis, Icon, LiItem,
} from '@/common';
import { timeStandard, toEmpty } from '@/utils';

// removeSituation 移除情况
const removeSituation = (val, row) => {
	const { gmtRemoveDate, removeReason, removeDepartment } = row;
	if (gmtRemoveDate || removeReason || removeDepartment) {
		return (
			<div className="assets-info-content">
				<li>
					<Icon type="icon-dot" style={{ fontSize: 12, color: '#7c7c7c', marginRight: 3 }} />
					<span className="list list-content">已移除</span>
				</li>
				<LiItem Li title="移除日期" titleStyle={{ width: 50 }}>{timeStandard(gmtRemoveDate)}</LiItem>
				<LiItem Li title="移除原因" auto titleStyle={{ width: 50 }}>
					<Ellipsis content={toEmpty(removeReason)} tooltip width={180} />
				</LiItem>
				<LiItem Li title="移除机关" titleStyle={{ width: 50 }} auto>
					<Ellipsis content={toEmpty(removeDepartment)} tooltip width={180} />
				</LiItem>
			</div>
		);
	}
	return (
		<div className="assets-info-content">
			<li>
				<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 3 }} />
				<span className="list list-content">未移除</span>
			</li>
		</div>
	);
};

export default class TableIntact extends React.Component {
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
				<React.Fragment>
					<span className="list list-title align-justify">相关单位</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						<Ellipsis
							content={item.name}
							url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
							tooltip
							width={250}
						/>
					</span>
					<span className="list-split" style={{ height: 16 }} />
				</React.Fragment>
			);
		}
		return null;
	};

	toGetColumns=() => [
		{
			title: '主要信息',
			dataIndex: 'type',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
						<Ellipsis content={toEmpty(value)} tooltip width={600} font={15} />
					</li>
					<li>
						{this.toShowExtraField(row)}
						<LiItem title="列入日期" cotStyle={{ minWidth: 100 }}>{timeStandard(row.gmtPutDate)}</LiItem>
						<span className="list-split" style={{ height: 16 }} />
						<LiItem title="决定机关" auto><Ellipsis content={toEmpty(row.putDepartment)} width={300} tooltip /></LiItem>
					</li>
					<LiItem Li title="列入原因" auto><Ellipsis content={toEmpty(row.putReason)} tooltip width={600} /></LiItem>
					<LiItem Li title="具体事实" auto><Ellipsis content={toEmpty(row.fact)} tooltip width={600} /></LiItem>
				</div>
			),
		}, {
			title: '辅助信息',
			width: 300,
			render: removeSituation,
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const { portrait, option } = this.props;
		const { api, params } = getDynamicRisk(portrait, option || {
			b: 30401,
			e: 'illegal',
		});
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
		}).catch(() => {
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
