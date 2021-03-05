import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import {
	Ellipsis,
	Spin, Table,
} from '@/common';


const rightsTypeStatus = {
	0: '未知',
	1: '商标',
	2: '专利',
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

	toShowExtraField=(row = {}) => {
		const { portrait } = this.props;
		if (portrait === 'business') {
			return (
				<li>
					<span className="list list-title align-justify">申请人/权利人</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content" style={{ minWidth: 400 }}>
						<Ellipsis
							content={row.obligorName}
							url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
							tooltip
							width={400}
						/>
					</span>
				</li>
			);
		}
		return null;
	};

	toGetColumns=() => [
		{
			title: '信息',
			dataIndex: 'rightsName',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-title-normal-bold" style={{ lineHeight: '20px' }}>
						{/* <a href={row.url} target="_blank" rel="noopener noreferrer">{value}</a> */}
						<Ellipsis url={row.url} content={value} isSourceLink bussinessStyle />
						{ row.rightsType ? <span className="yc-case-reason text-ellipsis" style={{ minWidth: 50 }}>{rightsTypeStatus[row.rightsType]}</span> : ''}
					</li>
					{this.toShowExtraField(row)}
				</div>
			),
		},
		{
			title: '关联信息',
			width: 240,
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify">公告日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.noticeTime || '-'}</span>
					</li>
				</div>
			),
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const { portrait, option } = this.props;
		const { api, params } = getDynamicAsset(portrait, option || {
			b: 10403,
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
