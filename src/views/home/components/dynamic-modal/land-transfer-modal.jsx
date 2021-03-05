import React from 'react';
import { Modal, Button } from 'antd';
import Api from 'api/monitor-info/public';
import { Spin, Table } from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';
import { Result } from '@/views/asset-excavate/land-data/table/common';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '成交日期',
					dataIndex: 'dealingTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '土地使用权人',
					dataIndex: 'parties',
					render: partyInfo,
				}, {
					title: '项目信息',
					dataIndex: 'number',
					render: Result.InfoTransferProject,
				}, {
					title: '土地信息',
					dataIndex: 'property',
					render: Result.InfoLand,
				}, {
					title: '转让信息',
					dataIndex: 'property',
					render: Result.transferInfo,
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? Api.attentionUnFollowTransfer : Api.attentionFollowTransfer}
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
		const { landTransferModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-土地转让"
				width={1100}
				style={{ height: 320 }}
				visible={landTransferModalVisible}
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
