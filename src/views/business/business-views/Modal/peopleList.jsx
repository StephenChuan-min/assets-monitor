import React from 'react';
import {
	Modal, message,
} from 'antd';
import {
	postGuaranteeList, // 担保人
} from '@/utils/api/business';
import { Spin, Table } from '@/common';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [], // 列表数据
			loading: false,
			columns: [{
				title: '担保人名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 220,
				render: (text, row) => (
					<p
						onClick={() => {
							const w = window.open('about:blank');
							w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
						}}
						style={{ color: '#3DA8F5', cursor: 'pointer' }}
					>
						{text || '-'}

					</p>
				),
			}, {
				title: '身份证号/统一社会信用代码',
				dataIndex: 'obligorNumber',
				key: 'obligorNumber',
				width: 200,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '角色',
				dataIndex: 'roleText',
				key: 'roleText',
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}],
		};
	}

	componentDidMount() {
		const { businessId } = this.props;
		this.setState({
			loading: true,
		});
		postGuaranteeList(businessId).then((res) => {
			if (res.code === 200 && res.data) {
				this.setState({
					data: res.data,
					loading: false,
				});
			} else {
				message.error(res.message);
				this.setState({
					loading: false,
				});
			}
		});
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { columns, data, loading } = this.state;
		const { PeopleListModalVisible } = this.props;
		return (
			<Modal title="担保人列表" width={560} style={{ 'max-height': 650 }} visible={PeopleListModalVisible} footer={null} onCancel={this.handleCancel}>
				<Spin visible={loading}>
					<Table
						scroll={data.length > 8 ? { y: 440 } : {}}
						columns={columns}
						dataSource={data}
						pagination={false}
						className="table"
					/>
				</Spin>
			</Modal>
		);
	}
}
