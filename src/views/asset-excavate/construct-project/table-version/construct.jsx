import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { getDynamicAsset } from 'api/dynamic';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { toThousands } from '@/utils/changeTime';

const projectTypeMap = new Map([
	[1, '建筑工程'],
	[2, '装饰工程'],
	[3, '市政道路工程'],
	[4, '其他'],
	[0, '未知'],
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
	toGetColumns = () => {
		const { portrait } = this.props;
		// 债务人的时候portrait = debtor_enterprise
		return [
			{
				title: '建设信息',
				dataIndex: 'title',
				render: (value, row) => (
					<div className="assets-info-content">
						<Ellipsis auto content={row.title} url={row.url} tooltip className="yc-public-title-normal-bold" isSourceLink />
						{ row.projectType >= 0 ? <span className="yc-case-reason text-ellipsis">{projectTypeMap.get(row.projectType)}</span> : ''}
						<li>
							<LiItem title="建设性质">{row.nature || '-'}</LiItem>
							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="总投资">{`${row.totalInvestment > 0 ? `${toThousands(row.totalInvestment)}元` : '-'}`}</LiItem>
						</li>
						<li>
							<LiItem cotStyle={{ maxWidth: 700 }} title="项目所在地">{(portrait === 'enterprise' ? row.projectAddress : row.projectLocation) || '-'}</LiItem>
						</li>
					</div>
				),
			},
			{
				title: '计划开工日期',
				width: 340,
				className: 'planBeginTime',
				render: (value, row) => (
					<div className="assets-info-content" style={{ maxWidth: 400 }}>
						<li style={{ height: 16 }} />
						<li>
							<LiItem title="计划开工日期">{row.planBeginTime || '-'}</LiItem>
						</li>
					</div>
				),
			},
		];
	};

	// 当前页数变化
	onPageChange = (val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData = (page) => {
		const { portrait } = this.props;
		// 债务人的时候portrait = debtor_enterprise
		const { api, params } = getDynamicAsset(portrait, {
			b: 11201,
			e: 'constructUnit',
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
