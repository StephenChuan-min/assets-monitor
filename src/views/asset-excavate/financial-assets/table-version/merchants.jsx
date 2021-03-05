import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { getDynamicAsset } from 'api/dynamic';
import { toEmpty } from '@/utils';
import {
	Ellipsis, Icon, Spin, Table,
} from '@/common';
import accurate from 'img/icon/icon-jinzhun.png';
import '../index.scss';

const assetsTypeMap = new Map([
	['200794003', '其他交通工具'],
	['50025970', '土地'],
	['50025975', '工程'],
	['50025974', '矿权'],
	['122406001', '无形资产'],
	['56936003', '机械设备'],
	['50025973', '林权'],
	['200778005', '海域'],
	['125228021', '船舶'],
	['125088031', '股权'],
	['50025971', '实物资产'],
	['50025972', '机动车'],
	['201290015', '奢侈品'],
	['50025969', '房产'],
	['56956002', '债权'],
	['50025976', '其他'],
	['0', '未知'],
	['default', '-'],
]);

// 当前状态的映射
const statusMap = new Map([
	[1, '即将开始'],
	[3, '正在进行'],
	[5, '已成交'],
	[7, '已流拍 '],
	[9, '中止'],
	[11, '撤回'],
	[13, '结束'],
	['default', '-'],
]);

const statusColorMap = new Map([
	[1, '#FB8E3C'],
	[3, '#1C80E1'],
	[5, '#3DBD7D'],
	[7, '#7D8699'],
	[9, '#7D8699'],
	[11, '#7D8699'],
	[13, '#7D8699'],
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
				<React.Fragment>
					{row.accurateType === 1 ? <img src={accurate} alt="" className="yc-assets-info-img" /> : null}
					<div className="assets-info-content">
						<li style={{ display: 'inline-block', marginTop: 10 }}>
							<span className="li-td-tag">
								{assetsTypeMap.get(`${row.category}`)}
							</span>
							{ toEmpty(row.title)
								? <Ellipsis content={row.title} url={row.url} tooltip width={600} font={15} className="yc-public-title-normal-bold" isSourceLink /> : '-' }
						</li>
					</div>
				</React.Fragment>
			),
		},
		{
			title: '拍卖状况',
			width: 340,
			render: (value, row) => (
				<React.Fragment>
					<div className="assets-info-content" style={{ maxWidth: 400 }}>
						<li>
							<span className="list list-content">
								<Icon type="icon-dot" style={{ fontSize: 12, color: statusColorMap.get(row.status), marginRight: 2 }} />
								{`${statusMap.get(row.status) || '-'}`}
							</span>
						</li>
						<li>
							<span className="list list-title">发布日期</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">
								{row.publishTime || '-'}
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
			b: 10802,
			e: 'financialMerchants',
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
