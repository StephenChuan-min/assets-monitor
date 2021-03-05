import React from 'react';
import { Modal, Button } from 'antd';
import {
	Spin, Table, Ellipsis, LiItem,
} from '@/common';
import { Attentions } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';
import { Abnormal } from '@/utils/api/risk-monitor/operation-risk';

// removeSituation 移除情况
const removeSituation = (val, row) => {
	const { gmtRemoveDate, removeReason, removeDepartment } = row;
	if (!gmtRemoveDate) {
		return (
			<div className="assets-info-content">
				<li><span className="list list-content">未移除</span></li>
			</div>
		);
	}
	return (
		<div className="assets-info-content">
			<li>
				<span className="list list-content">已移除</span>
			</li>
			<LiItem Li title="移除日期" auto>{timeStandard(gmtRemoveDate) || '-'}</LiItem>
			<LiItem Li title="移除原因" auto><Ellipsis content={removeReason} tooltip line={2} width={150} /></LiItem>
			<LiItem Li title="移除机关" auto><Ellipsis content={removeDepartment} tooltip line={1} width={150} /></LiItem>
		</div>
	);
};

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '列入日期',
					dataIndex: 'gmtPutDate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '相关单位',
					dataIndex: 'name',
					render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
				}, {
					title: '列入原因',
					dataIndex: 'putReason',
					render: text => <Ellipsis content={text} tooltip width={300} line={2} />,
				}, {
					title: '决定机关名称',
					dataIndex: 'putDepartment',
					render: text => text || '-',
				}, {
					title: '移除情况',
					dataIndex: 'gmtRemoveDate',
					render: removeSituation,
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: text => timeStandard(text),
				}, {
					title: '操作',
					width: 60,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? Abnormal.unAttention : Abnormal.attention}
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
		const { abnormalModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-经营异常"
				width={1100}
				style={{ height: 320 }}
				visible={abnormalModalVisible}
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
