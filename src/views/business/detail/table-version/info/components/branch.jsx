import React from 'react';
import { Pagination } from 'antd';
import { Spin, Table } from '@/common';
import { parseQuery } from '@/utils';
import { getBranch } from '@/utils/api/professional-work/info';

export default class Branch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [], // 列表数据
			current: 1,
			total: 0,
		};
	}

	componentDidMount() {
		this.getBranchData();
	}

	// 当前页数变化
	onPageChange=(val) => {
		this.getBranchData(val);
	};

	getBranchData = (value) => {
		this.setState({
			loading: true,
		});
		const { hash } = window.location;
		const urlValue = parseQuery(hash);
		const params = {
			num: 5,
			id: urlValue.id || '',
			page: value > 200 ? 200 : value,
		};
		getBranch(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						data: res.data.list,
						current: res.data.page,
						total: res.data.total,
						loading: false,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	toGetColumns = () => [
		{
			title: '序号',
			dataIndex: 'indexNum',
			key: 'indexNum',
			width: 120,
			className: 'column-left20',
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '机构名称',
			dataIndex: 'companyName',
			key: 'companyName',
			width: 300,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '法定代表人',
			dataIndex: 'legalName',
			key: 'legalName',
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '注册资本',
			dataIndex: 'regCapital',
			key: 'regCapital',
			width: 200,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '注册时间',
			dataIndex: 'regTime',
			key: 'regTime',
			width: 120,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '经营状态',
			dataIndex: 'regStatus',
			key: 'regStatus',
			width: 120,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		},
	];

	render() {
		const { id } = this.props;
		const {
			loading, data, current, total,
		} = this.state;

		// 添加一个下标属性indexNum
		const newArray = [];
		if (data) {
			data.map((item, index) => newArray.push(
				Object.assign({}, item, { indexNum: 5 * (current - 1) + index + 1 }),
			));
		}

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
						分支机构
					</div>
				</div>
				<div className="yc-base-table">
					<Spin visible={loading}>
						<Table
							columns={this.toGetColumns()}
							dataSource={newArray}
							pagination={false}
							className="table"
						/>
						{total && total > 5 ? (
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
						) : ''}
					</Spin>
				</div>
			</div>
		);
	}
}
