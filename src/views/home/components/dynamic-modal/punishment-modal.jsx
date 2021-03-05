import React from 'react';
import { Modal, Button } from 'antd';
import { Spin, Table, Ellipsis } from '@/common';
import { Attentions } from '@/common/table';
import { Punishment } from '@/utils/api/risk-monitor/operation-risk';
import { linkDetail, timeStandard } from '@/utils';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '决定日期',
					dataIndex: 'decisionDate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '相关单位',
					dataIndex: 'obligorName',
					render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
				}, {
					title: '决定文书号',
					dataIndex: 'punishNumber',
					render: text => text || '-',
				}, {
					title: '违法行为类型',
					dataIndex: 'type',
					render: text => <Ellipsis content={text} tooltip width={150} line={2} />,
				}, {
					title: '处罚内容',
					dataIndex: 'content',
					render: text => <Ellipsis content={text} tooltip width={200} line={2} />,
				}, {
					title: '决定机关名称',
					dataIndex: 'departmentName',
					render: text => text || '-',
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: text => timeStandard(text),
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? Punishment.unAttention : Punishment.attention}
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
		const {
			columns, dataSource, loading,
		} = this.state;
		const { punishmentModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-行政处罚"
				width={1100}
				style={{ height: 320 }}
				visible={punishmentModalVisible}
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
