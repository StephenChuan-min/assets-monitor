import React from 'react';
import { Pagination } from 'antd';
import { parseQuery, timeStandard } from '@/utils';
import { Spin, Table } from '@/common';
import { getChange } from '@/utils/api/professional-work/info';

export default class BusinessCircles extends React.Component {
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
		this.getChangeData();
	}

	// 当前页数变化
	onPageChange=(val) => {
		this.getChangeData(val);
	};

	getChangeData = (value) => {
		this.setState({
			loading: true,
		});
		const { hash } = window.location;
		const urlValue = parseQuery(hash);
		const params = {
			num: 5,
			obligorId: urlValue.id || '',
			page: value > 200 ? 200 : value,
		};
		getChange(params).then((res) => {
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
		}).catch(() => {
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
			title: '变更日期',
			dataIndex: 'changeTime',
			key: 'changeTime',
			width: 200,
			render(text) {
				return <div>{timeStandard(text)}</div>;
			},
		}, {
			title: '变更事项',
			dataIndex: 'changeItem',
			key: 'changeItem',
			width: 300,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '变更前内容',
			dataIndex: 'contentBefore',
			key: 'contentBefore',
			width: 300,
			render(text, row) {
				return (
					<div className="yc-td-hl">
						<div dangerouslySetInnerHTML={{ __html: row.contentBefore }} />
					</div>
				);
			},
		}, {
			title: '变更后内容',
			dataIndex: 'contentAfter',
			key: 'contentAfter',
			width: 300,
			render(text, row) {
				return (
					<div className="yc-td-hl">
						<div dangerouslySetInnerHTML={{ __html: row.contentAfter }} />
					</div>
				);
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
						工商变更
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
