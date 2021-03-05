import React from 'react';
import { Modal, Button } from 'antd';
import { Spin, Table, Ellipsis } from '@/common';
import { Attentions } from '@/common/table';
import { unFollowSingle, followSingle } from '@/utils/api/monitor-info/bankruptcy';
import { linkDom, timeStandard } from '@/utils';
import RegisterModal from '../../../risk-monitor/bankruptcy/registerModal';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			registerModalVisible: false,
			rowObj: {},
			columns: [
				{
					title: '发布日期',
					dataIndex: 'publishDate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '企业',
					dataIndex: 'obligorName',
					render: (text, row) => (text ? linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text) : '-'),
				}, {
					title: '起诉法院',
					dataIndex: 'court',
					render: text => text || '-',
				}, {
					title: '标题',
					dataIndex: 'title',
					render: (text, record) => {
						if (record.url) {
							return (
							// <span>{text ? linkDom(record.url, text) : '-'}</span>
								<div>{text ? <Ellipsis url={record.url} content={text} isSourceLink tooltip /> : '-'}</div>
							);
						}
						return (
							<span className="click-link" onClick={() => this.openRegisterModal(record)}>{text || '-'}</span>
						);
					},
				}, {
					title: '更新日期',
					dataIndex: 'createTime',
					render: val => timeStandard(val),
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							single
							onClick={this.onRefresh}
							api={row.isAttention ? unFollowSingle : followSingle}
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

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const {
			columns, dataSource, loading, registerModalVisible, rowObj,
		} = this.state;
		const { bankruptcyModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-破产重组"
				width={1100}
				style={{ height: 320 }}
				visible={bankruptcyModalVisible}
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
