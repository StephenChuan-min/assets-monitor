import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import {
	Ellipsis, Icon, LiItem, Spin, Table,
} from '@/common';
import { timeStandard, toEmpty } from '@/utils';
import { PartyCrosswise } from '@/views/_common';

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

	toGetPortrait =() => {
		const { portrait } = this.props;
		return portrait === 'business';
	};

	toGetColumns=() => [
		{
			title: '信息',
			dataIndex: 'title',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
						<span className="list list-content-auto">
							<Ellipsis content={row.title} url={`#/judgement?sourceId=${row.sourceId}&pid=${row.pid}&title=${row.title}`} tooltip width={400} font={14} auto />
						</span>
						{ row.caseType ? <span className="yc-case-type">{row.caseType}</span> : ''}
						{ row.caseReason ? <span className="yc-case-reason text-ellipsis">{row.caseReason}</span> : ''}
					</li>
					<li>
						<LiItem title="判决日期" cotStyle={{ minWidth: 80 }}>{timeStandard(row.gmtJudgment)}</LiItem>
						<span className="list-split" style={{ height: 16 }} />
						<LiItem title="发布日期">{timeStandard(row.gmtPublish)}</LiItem>
					</li>
					<PartyCrosswise value={row.parties} row={row} type="judgment" linkDetail={this.toGetPortrait()} />

				</div>
			),
		}, {
			title: '关联信息',
			width: 270,
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 2 }} />
						<span className="list list-content">{value}</span>
					</li>
					<LiItem Li title="审理法院"><Ellipsis content={toEmpty(row.court)} tooltip width={160} /></LiItem>
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
		// 判断是个人还是企业
		const { portrait, option } = this.props;
		const { api, params } = getDynamicRisk(portrait, option || {
			b: 20603,
			e: 'judgment',
			p: 'personalJudgment',
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
								pageSize={5}
								showQuickJumper
								current={current || 1}
								total={total || 0}
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
