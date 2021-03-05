import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { getDynamicAsset } from 'api/dynamic';
import { toEmpty } from '@/utils';
import {
	Ellipsis, Spin, Table,
} from '@/common';
import '../index.scss';

const projectTypeMap = new Map([
	[1, '股权项目'],
	[2, '债权项目'],
	[3, '资产项目'],
	[4, '租赁项目'],
	[5, '增资项目'],
	[6, '其他项目'],
	[-1, ' 未知'],
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
					<li style={{ display: 'inline-block' }}>
						<span className="li-td-tag">
							{projectTypeMap.get(row.projectType)}
						</span>
						{ toEmpty(row.title)
							? <Ellipsis content={row.title} url={row.sourceUrl} tooltip width={600} font={15} className="yc-public-title-normal-bold" isSourceLink /> : '-' }
					</li>
				</div>
			),
		},
		{
			title: '拍卖状况',
			width: 340,
			dataIndex: 'gmtPublish',
			render: text => (
				<React.Fragment>
					<div className="assets-info-content">
						<li>
							<span className="list list-title">发布日期</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">
								{text || '-'}
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
			b: 10803,
			e: 'financialPublicity',
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
