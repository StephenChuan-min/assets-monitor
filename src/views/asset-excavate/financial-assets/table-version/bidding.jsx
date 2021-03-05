import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { getDynamicAsset } from 'api/dynamic';
import { toEmpty } from '@/utils';
import { floatFormat } from '@/utils/format';
import { formatDateTime } from '@/utils/changeTime';
import {
	Ellipsis, Icon, Spin, Table,
} from '@/common';
import '../index.scss';

const statusMap = new Map([
	[1, '即将开始'],
	[3, '正在进行'],
	[5, '已成交'],
	[7, '已流拍'],
	[9, '中止'],
	[11, '撤回'],
]);

const statusColorMap = new Map([
	[1, '#FB8E3C'],
	[3, '#1C80E1'],
	[5, '#3DBD7D'],
	[7, '#7D8699'],
	[9, '#7D8699'],
	[11, '#7D8699'],
]);

class TableIntact extends React.Component {
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

	// 获取tablecolumn配置
	toGetColumns = () => [
		{
			title: '拍卖信息',
			dataIndex: 'title',
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ height: 20 }} />
					<li style={{ lineHeight: '20px' }}>
						{ toEmpty(row.title)
							? <Ellipsis content={row.title} url={row.url} tooltip width={600} font={15} className="yc-public-title-normal-bold" isSourceLink /> : '-' }
					</li>
				</div>
			),
		},
		// 拍卖状态为已成交，则显示成 成交价；拍卖状态为其他，则显示成 当前价；
		{
			title: '拍卖状况',
			width: 340,
			className: 'auction-info',
			render: (value, row) => (
				<React.Fragment>
					<div className="assets-info-content" style={{ maxWidth: 400 }}>
						<li>
							<span className="list list-content">
								<Icon type="icon-dot" style={{ fontSize: 12, color: statusColorMap.get(row.status), marginRight: 2 }} />
								{`${row.status > 0 ? statusMap.get(row.status) : '-'}`}
							</span>
						</li>
						<li style={{ display: 'inline-block', width: 170 }}>
							<span className="list list-title">评估价</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">
								{row.consultPrice ? `${floatFormat(row.consultPrice)}元` : '未知'}
							</span>
						</li>
						<li style={{ display: 'inline-block', width: 170 }}>
							<span className="list list-title">{row.status === 5 ? '成交价' : '当前价'}</span>
							<span className="list list-title-colon">:</span>
							<span className={`list list-content ${row.status === 5 ? 'deal-price' : ''}`}>
								{floatFormat(row.currentPrice)}
								元
							</span>
						</li>
						<li style={{ display: 'inline-block', width: 170 }}>
							<span className="list list-title">开拍时间</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">
								<span className="list list-content">{formatDateTime(row.start)}</span>
							</span>
						</li>
						<li style={{ display: 'inline-block', width: 170 }}>
							<span className="list list-title">结束时间</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">
								<span className="list list-content">{formatDateTime(row.end)}</span>
							</span>
						</li>
					</div>
				</React.Fragment>
			),
		},
	];

	// 当前页数变化
	onPageChange = (val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData = (page) => {
		const { portrait } = this.props;
		// 债务人的时候portrait = debtor_enterprise
		const { api, params } = getDynamicAsset(portrait, {
			b: 10801,
			e: 'financialBidding',
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

TableIntact.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	loadingHeight: PropTypes.any,
	portrait: PropTypes.string,
};

TableIntact.defaultProps = {
	loadingHeight: undefined,
	portrait: 'debtor_enterprise',
};

export default TableIntact;
