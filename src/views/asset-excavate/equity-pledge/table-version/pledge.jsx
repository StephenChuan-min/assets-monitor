import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import { timeStandard, toEmpty, toGetUnStatusText } from '@/utils';
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

	getListStr= (val = [], field) => {
		const { portrait } = this.props;
		if (val.length) {
			if (portrait) return (val.map(i => i[field])).join('、');
			return val.join('、');
		}
		return '-';
	};

	toGetPortraitStatus=() => {
		const { portrait } = this.props;
		return portrait === 'business' || portrait === 'debtor_enterprise';
	};

	toShowExtraField=(row = {}) => {
		const { portrait } = this.props;
		if (portrait === 'business') {
			const item = (row.pledgorList || [])[0] || {};
			return (
				<React.Fragment>
					<span className="list list-title align-justify">出质人</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						<Ellipsis
							content={item.pledgor}
							url={item.pledgorId ? `#/business/debtor/detail?id=${item.pledgorId}` : ''}
							tooltip
							width={120}
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
			title: '信息',
			dataIndex: 'pledgeeList',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-title-normal-bold" style={{ lineHeight: '20px' }}>
						{ toEmpty(row.companyName)
							? <Ellipsis content={`股权标的企业：${row.companyName}`} tooltip width={600} font={15} /> : '股权标的企业：未公示' }
					</li>
					<li>
						<span className="list list-title align-justify">登记日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.regDate)}</span>
					</li>
					<li>
						{this.toShowExtraField(row)}
						<span className="list list-title align-justify">质权人</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 200 }}>
							{ this.getListStr(row.pledgeeList, 'pledgee') ? <Ellipsis content={this.getListStr(row.pledgeeList, 'pledgee')} tooltip width={200} /> : '-'}
						</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">出质股权数额</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content none-width">{row.equityAmount || '-'}</span>
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
						<Icon type="icon-dot" style={{ fontSize: 12, color: toGetUnStatusText(row.state).color, marginRight: 2 }} />
						<span className="list list-content ">{toGetUnStatusText(row.state).text}</span>
						{
							toGetUnStatusText(row.state).status && this.toGetPortraitStatus() ? [
								<span>（</span>,
								<span className="list list-title align-justify">匹配时间</span>,
								<span className="list list-title-colon">:</span>,
								<span className="list list-content none-width">{timeStandard(row.gmtCreate)}</span>,
								<span>）</span>,
							] : null
						}
					</li>
					<li>
						<span className="list list-title align-justify">登记编号</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content none-width">
							{ toEmpty(row.regNumber) ? <Ellipsis content={row.regNumber} tooltip width={250} /> : '-'}
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
			b: 10501,
			e: 'pledge',
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
