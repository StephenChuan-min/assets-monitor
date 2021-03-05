import React from 'react';
import { Modal, Button } from 'antd';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import Api from 'api/monitor-info/limit-consumption';
import RegisterModal from '../../../risk-monitor/bankruptcy/registerModal';
import './comStyle.scss';

export default class LimitHeightModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			registerModalVisible: false,
			rowObj: {},
			columns: [
				{
					title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
					dataIndex: 'registerDate',
					width: 120,
					render: text => timeStandard(text) || '-',
				}, {
					title: '姓名',
					dataIndex: 'personName',
					width: 210,
					render: (text, row) => (
						<Ellipsis
							content={`${row.obligorType === 2 ? `${text}${row.obligorNumber ? `(${row.obligorNumber})` : ''}` : `${text || '-'}`}`}
							tooltip
							width={180}
							url={`${row.obligorType === 2 ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}`}
						/>
					),
				}, {
					title: '企业',
					dataIndex: 'companyName',
					width: 210,
					render: (text, row) => (
						<Ellipsis
							content={`${text || '-'}`}
							tooltip
							width={180}
							url={`${row.obligorType === 1 ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}`}
						/>
					),
				}, {
					title: '案号',
					dataIndex: 'caseNumber',
					width: 210,
					render: text => <span>{text ? text.replace('（', '(') : '-'}</span>,
				}, {
					title: '移除状况',
					dataIndex: 'status',
					render: text => (
						<span>
							<span className="status-dot" style={{ backgroundColor: text === 1 ? '#3DBD7D' : '#FB5A5C' }} />
							<span className="status-text">{text === 1 ? '已移除' : '未移除'}</span>
						</span>
					),
				},
				// {
				// 	title: '源链接',
				// 	dataIndex: 'url',
				// 	width: 90,
				// 	render: (text, row) => (
				// 		<a onClick={() => toViewContent([row.content, row.url])}>{`${text ? '查看' : '-'}`}</a>
				// 	),
				// },
				{
					title: global.Table_CreateTime_Text,
					dataIndex: 'gmtModified',
				}, {
					title: '操作',
					width: 55,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? Api.unFollow : Api.follow}
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

	// 打开立案弹框
	openRegisterModal = (rowObj) => {
		// console.log(rowObj);
		this.setState({
			registerModalVisible: true,
			rowObj,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			registerModalVisible: false,
		});
	};

	// 关闭弹窗
	handleCancel = () => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const {
			columns, dataSource, loading, registerModalVisible, rowObj,
		} = this.state;
		const { limitHeightModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-限制高消费"
				width={1100}
				style={{ height: 320 }}
				visible={limitHeightModalVisible}
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
				{registerModalVisible && (
					<RegisterModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						rowObj={rowObj}
						registerModalVisible={registerModalVisible}
					/>
				)}
			</Modal>
		);
	}
}
