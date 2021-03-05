import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import { Ellipsis, Spin, Table } from '@/common';
import { timeStandard, toEmpty } from '@/utils';
import './index.scss';

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

	// 获取column配置
	// 债务人类型（1：企业 2：个人）
	// 企业债务人限高信息中的关联对象为个人的名称
	// 个人债务人限高信息中的管理对象为企业或者为空，为空的不显示关联对象这项信息
	toGetColumns = () => [
		{
			title: '限制高消费',
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold">
						<Ellipsis content={toEmpty(row.caseNumber)} width="auto" tooltip font={14} />
						{
							row.status === 1 ? <span className="limit-status" style={{ fontWeight: 400 }}>已移除</span> : null
						}
					</li>
					{
						row.obligorType === 1 ? (
							<li>
								<span className="list list-title align-justify">关联对象</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.personName || '-'}</span>
							</li>
						) : null
					}
					{
						row.obligorType === 2 && row.companyName ? (
							<li>
								<span className="list list-title align-justify">关联对象</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.companyName}</span>
							</li>
						) : null
					}
				</div>
			),
		}, {
			title: '关联信息',
			width: 270,
			dataIndex: 'registerDate',
			render: value => (
				<div className="assets-info-content">
					<li style={{ marginTop: 10 }}>
						<span className="list list-title align-justify">立案日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(value)}</span>
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
		// 默认查询债务人的限制高消费list
		const { api, params } = getDynamicRisk(portrait, option || {
			b: 20501,
			e: 'limitHeight',
		});
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			...params,
		})
			.then((res) => {
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
