import React from 'react';
import { Modal, Button } from 'antd';
import {
	Ellipsis, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { postFollow, postUnFollow } from 'api/monitor-info/car';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '公示日期',
					dataIndex: 'publishTime',
					width: 110,
					render: text => (
						<React.Fragment>
							<span>{text}</span>
						</React.Fragment>
					),
				}, {
					title: '车辆所有人',
					dataIndex: 'obligorName',
					width: 190,
					render: (text, row) => <Ellipsis content={text} width={170} url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : ''} tooltip />,
				}, {
					title: '车辆种类',
					dataIndex: 'vehicleType',
					width: 190,
				}, {
					title: '车牌号',
					width: 250,
					dataIndex: 'vehicleNumber',
				}, {
					title: '源链接',
					width: 110,
					dataIndex: 'url',
					// render: (text, row) => (text ? linkDom(row.url, '查看') : '-'),
					render: (text, row) => (text ? <Ellipsis url={row.url} content="查看" isSourceLink /> : '-'),
				}, {
					title: global.Table_CreateTime_Text,
					dataIndex: 'gmtModified',
					width: 110,
					render: text => timeStandard(text) || '-',
				}, {
					title: '操作',
					width: 55,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={() => this.onRefresh()}
							api={row.isAttention ? postUnFollow : postFollow}
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
		const { carModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-车辆信息"
				width={1100}
				style={{ height: 320 }}
				visible={carModalVisible}
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
