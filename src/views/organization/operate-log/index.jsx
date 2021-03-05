import React from 'react';
import { Select, Pagination } from 'antd';
import {
	userOperateList, // 操作列表
	operateTypeList, // 操作类型
} from '@/utils/api/organization';
import { Table, Spin, BreadCrumb } from '@/common';
import { getQueryByName } from '@/utils';
import { formatDateTime } from '../../../utils/changeTime';
import './style.scss';

const { Option } = Select;
export default class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		document.title = '操作记录-机构管理';
		this.state = {
			data: [],
			total: 0,
			current: 1,
			operateList: [],
			loading: false,
			pageSize: 10,
			hash: '',
			target: '',
			columns: [
				{
					title: '操作时间',
					dataIndex: 'createTime',
					key: 'createTime',
					width: 733,
					render: text => (
						<p>{formatDateTime(text) || '-'}</p>
					),
				},
				{
					title: '操作类型',
					dataIndex: 'targetName',
					key: 'targetName',
					render: text => (
						<p>{(text) || '-'}</p>
					),
				},
			],
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		this.setState({
			hash,
		});
		this.getTableData();
		this.getRole();
	}

	// 匹配操作类型
	// eslint-disable-next-line consistent-return
	matchingType = (type) => {
		const { operateList } = this.state;
		if (operateList && operateList.length > 0) {
			const list = operateList.filter(item => item.target === type);
			return list[0].type;
		}
	};

	getRole = () => {
		operateTypeList().then((res) => {
			if (res.code === 200) {
				this.setState({
					operateList: res.data,
				});
			}
		}).catch(() => {});
	};

	getTableData=(data) => {
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'userId');
		const params = {
			...data,
			num: 10,
			userId,
		};
		this.setState({
			loading: true,
		});
		userOperateList(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: res.data.list,
					total: res.data.total,
					loading: false,
					current: data && data.page ? data.page : 1, // 翻页传选中页数，其他重置为1
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// page翻页
	handleChangePage=(val) => {
		const { pageSize, target } = this.state;
		this.setState({
			current: val,
		});
		const params = {
			num: pageSize,
			page: val,
			target,
		};
		this.getTableData(params);
	};

	// 下拉选中
	handleChange = (searchVal) => {
		console.log(searchVal);
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'userId');
		const params = {
			target: searchVal,
			userId,
		};
		this.getTableData(params);
		this.setState({
			target: searchVal,
		});
	};

	render() {
		const {
			columns, total, data, loading, current, pageSize, operateList, hash,
		} = this.state;

		return (
			<div className="operate-log">
				<BreadCrumb
					line
					list={[
						{ id: 1, name: '机构管理', link: '/organization' },
						{ id: 2, name: '账号列表', link: '/organization/user' },
						{ id: 3, name: `${getQueryByName(hash, 'name')}_历史操作记录` },
					]}
				/>
				<div style={{ padding: '0 20px 20px' }}>
					<div className="search-item">
						<Select placeholder="请选择操作类型" size="large" onChange={this.handleChange} allowClear style={{ width: 185, 'margin-right': 10 }}>
							{
								operateList && operateList.length > 0 && operateList.map(item => (<Option value={item.target}>{item.type}</Option>))
							}
						</Select>
					</div>
					<div className="table">
						<Spin visible={loading}>
							<Table
								columns={columns}
								dataSource={data}
								className="table"
								pagination={false}
							/>
							{data && data.length > 0 && (
								<div className="yc-table-pagination ">
									<Pagination
										current={current}
										pageSize={pageSize}
										total={total}
										showTotal={val => `共 ${val} 条记录`}
										showQuickJumper
										onChange={(val) => {
											this.handleChangePage(val);
										}}
									/>
								</div>
							)}
						</Spin>
					</div>
				</div>

			</div>
		);
	}
}
