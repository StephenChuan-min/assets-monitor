import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import {
	timeStandard, toEmpty, toGetStatusText, w,
} from '@/utils';
import { floatFormat } from '@/utils/format';
import {
	Ellipsis, Icon, Spin, Table,
} from '@/common';

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

	toGetPortraitStatus=() => {
		const { portrait } = this.props;
		return portrait === 'business' || portrait === 'debtor_enterprise';
	};

	toShowExtraField=(row = {}) => {
		const { portrait } = this.props;
		return portrait === 'business' && (
			<>
				<span className="list list-title align-justify">抵押物所有人</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content" style={{ minWidth: 200 }}>
					<Ellipsis
						content={toEmpty(row.owner)}
						url={row.ownerId ? `#/business/debtor/detail?id=${row.ownerId}` : ''}
						tooltip
						width={200}
					/>
				</span>
				<span className="list-split" style={{ height: 16 }} />
			</>
		);
	};

	toGetColumns=() => [
		{
			title: '信息',
			dataIndex: 'pledgeeList',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-title-normal-bold" style={{ lineHeight: '20px' }}>
						<Ellipsis content={toEmpty(row.pawnName)} tooltip width={700} font={15} />
					</li>
					<li>
						<span className="list list-title align-justify">登记日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.regDate)}</span>
					</li>
					<li>
						{this.toShowExtraField(row)}
						<span className="list list-title align-justify">抵押权人</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{ toEmpty(row.people) ? <Ellipsis content={row.people} tooltip width={250} /> : '-'}
						</span>
					</li>
					<li>
						<span className="list list-title align-justify">担保债权数额</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 170 }}>{row.amount ? w(floatFormat(row.amount.toFixed(2)), { suffix: ' 元' }) : '-'}</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">债务人履行债务的期限</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content " style={{ maxWidth: 'none' }}>{row.term || '-'}</span>
					</li>
				</div>
			),
		},
		{
			title: '关联信息',
			width: 360,
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ lineHeight: '20px' }}>
						<Icon type="icon-dot" style={{ fontSize: 12, color: toGetStatusText(row.status).color, marginRight: 2 }} />
						<span className="list list-content ">{toGetStatusText(row.status).text}</span>
						{
							toGetStatusText(row.status).status && this.toGetPortraitStatus() ? [
								<span>（</span>,
								<span className="list list-title align-justify">匹配时间</span>,
								<span className="list list-title-colon">:</span>,
								<span className="list list-content none-width">{timeStandard(row.gmtCreate)}</span>,
								<span>）</span>,
							] : null
						}
					</li>
					{
						!toGetStatusText(row.status).status ? [
							<li>
								<span className="list list-title align-justify">注销时间</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{timeStandard(row.cancelDate)}</span>
							</li>,
							<li>
								<span className="list list-title align-justify">注销原因</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.cancelReason || '-'}</span>
							</li>,
						] : null
					}
					<li>
						<span className="list list-title align-justify">登记编号</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{ toEmpty(row.regNum) ? <Ellipsis content={row.regNum} tooltip width={130} /> : '-'}
						</span>
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
		const { portrait } = this.props;
		const { api, params } = getDynamicAsset(portrait, {
			b: 10601,
			e: 'pledgeD',
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
