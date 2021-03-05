import React from 'react';
import { Modal, Button } from 'antd';
import { Court } from '@/utils/api/risk-monitor/lawsuit';
import { Spin, Table } from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';
import associationLink from '@/views/_common/association-link';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '开庭日期',
					dataIndex: 'gmtTrial',
					render: text => timeStandard(text) || '-',
				}, {
					title: '当事人',
					dataIndex: 'parties',
					render: partyInfo,
				}, {
					title: '法院',
					dataIndex: 'court',
					render: text => text || '-',
				}, {
					title: '案号',
					dataIndex: 'caseNumber',
					render: text => text || '-',
				}, {
					title: '案由',
					dataIndex: 'caseReason',
					className: 'min-width-80-normal',
					render: text => text || '-',
				}, {
					title: '关联信息',
					dataIndex: 'associatedInfo',
					className: 'tAlignCenter_important min-width-80',
					render: (value, row) => associationLink(value, row, 'Court'),
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: val => timeStandard(val),
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? Court.unAttention : Court.attention}
							index={index}
						/>
					),
				}],
		};
	}

	componentDidMount() {
		const { dataSource } = this.props;
		this.setState(() => ({
			dataSource,
		}));
	}

	// 表格发生变化
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = [...dataSource];
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { columns, dataSource, loading } = this.state;
		const { lawsuitCourtModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-涉诉信息(开庭)"
				width={1100}
				style={{ height: 320 }}
				visible={lawsuitCourtModalVisible}
				footer={null}
				onCancel={this.handleCancel}
				wrapClassName="vertical-center-modal"
			>
				<Spin visible={loading}>
					<Table
						scroll={dataSource.length > 8 ? { y: 440 } : {}}
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						className="table"
					/>
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Button onClick={this.handleCancel} type="primary" className="dynamic-modal-btn">关闭</Button>
					</div>
				</Spin>
			</Modal>
		);
	}
}
