import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { getDynamicAsset } from 'api/dynamic';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import '../index.scss';
import { toThousands } from '@/utils/changeTime';

const roleMap = new Map([
	[0, '未知'],
	[1, '中标单位'],
	[2, '勘察单位'],
	[3, '建设单位'],
	[4, '施工单位'],
	[5, '监理单位'],
	[6, '设计单位'],
	[7, '发包单位'],
	[8, '承包单位'],
	[9, '中标候选人'],
	[10, '招标人'],
	[11, '工程总承包单位'],
	[null, '未知'],
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
		return [
			{
				title: '施工信息',
				dataIndex: 'title',
				render: (value, row) => (
					<div className="assets-info-content">
						<Ellipsis auto content={row.title} url={row.url} tooltip className="yc-public-title-normal-bold" isSourceLink />
						<li>
							{/* portrait  区分画像和债务人 enterprise = 画像 */}
							{
								portrait === 'enterprise' ? <LiItem title="角色">{ row.role.map((it, index) => `${roleMap.get(it)}${index === row.role.length - 1 ? '' : '，'}`)}</LiItem> : <LiItem title="角色">{ row.parties[0].role.map((it, index) => `${roleMap.get(it)}${index === row.parties[0].role.length - 1 ? '' : '，'}`)}</LiItem>
							}

							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="合同金额">{`${row.contractPrice > 0 ? `${toThousands(row.contractPrice)}元` : '-'}`}</LiItem>
							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="合同工期">{row.projectPeriod || '-'}</LiItem>
						</li>
						{
							row.projectLocation && <LiItem Li title="项目所在地" cotStyle={{ maxWidth: 700 }}>{row.projectLocation}</LiItem>
						}
					</div>
				),
			},
			{
				title: '发证日期',
				width: 340,
				dataIndex: 'issuingTime',
				render: text => (
					<React.Fragment>
						<div className="assets-info-content">
							<li style={{ height: 16 }} />
							<li>
								<span className="list list-title">发证日期</span>
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
			b: 11203,
			e: 'underwayUnit',
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
