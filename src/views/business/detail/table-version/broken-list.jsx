import React from 'react';
import { Pagination } from 'antd';
import { brokenCount } from 'api/professional-work/business/risk';
import { Spin, Table } from '@/common';
import { getHrefQuery } from '@/utils';

export default class BrokenList extends React.Component {
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

	shouldComponentUpdate(nextProps) {
		const { type } = this.props;
		if (nextProps.type !== type) {
			this.toGetData(1, nextProps.type);
		}
		return true;
	}


	toGetColumns=() => [
		{
			title: '债务人名称',
			dataIndex: 'name',
		},
		{
			title: '身份证号/统一社会信用代码',
			dataIndex: 'number',
		},
		{
			title: '角色',
			dataIndex: 'role',
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page, nextType) => {
		const { type } = this.props;
		if (!type) return;
		const _type = nextType || type;
		const api = _type === 1 ? brokenCount['20403'] : brokenCount['20404'];
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 10,
			businessId: getHrefQuery('id'),
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
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && total > 10 && (
						<div className="yc-table-pagination">
							<Pagination
								showQuickJumper
								current={current || 1}
								total={total || 0}
								pageSize={10}
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
