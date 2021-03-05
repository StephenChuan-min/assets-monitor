import React from 'react';
import { Modal, Button } from 'antd';
import { Illegal } from '@/utils/api/risk-monitor/operation-risk';
import {
	Ellipsis, Spin, Table, LiItem,
} from '@/common';
import { Attentions } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';

// removeSituation 移除情况
const removeSituation = (val, row) => {
	const { gmtRemoveDate, removeReason, removeDepartment } = row;
	if (gmtRemoveDate || removeReason || removeDepartment) {
		return (
			<div className="assets-info-content">
				<li>
					<span className="list list-content">已移除</span>
				</li>
				<LiItem Li title="移除日期" auto>{timeStandard(gmtRemoveDate) || '-'}</LiItem>
				<LiItem Li title="移除原因" auto><Ellipsis content={removeReason} tooltip line={2} width={150} /></LiItem>
				<LiItem Li title="决定机关" auto><Ellipsis content={removeDepartment} tooltip line={1} width={150} /></LiItem>
			</div>
		);
	}
	return (
		<div className="assets-info-content">
			<li><span className="list list-content">未移除</span></li>
		</div>
	);
};

// 点击查看具体违法事实
const toSeasonShow = (source) => {
	const style = { maxWidth: 450 };
	Modal.info({
		title: '具体违法事实',
		okText: '关闭',
		iconType: 'null',
		className: 'assets-an-info risk-detail-season',
		width: 600,
		content: (
			<div className="assets-info-content risk-detail-season-list" style={{ margin: '25px 0' }}>
				<LiItem Li title="违法类型" auto style={style}>{source.type.replace(/(^\s*)|(\s*$)/g, '') || '-'}</LiItem>
				<LiItem Li title="具体情形" auto style={style}>{source.fact.replace(/(^\s*)|(\s*$)/g, '') || '-'}</LiItem>
			</div>
		),
		onOk() {},
	});
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
					render: (text, row) => {
						const _text = text.replace(/(^\s*)|(\s*$)/g, '');
						const _type = row.type.replace(/(^\s*)|(\s*$)/g, '');
						const _fact = row.fact.replace(/(^\s*)|(\s*$)/g, '');
						return [
							_text ? <Ellipsis content={text.replace(/(^\s*)|(\s*$)/g, '')} tooltip width={250} /> : <div>-</div>,
							_type || _fact
								? <div><span className="click-link" onClick={() => toSeasonShow(row)}>点击查看具体违法事实</span></div> : '',
						];
					},
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
							api={row.isAttention ? Illegal.unAttention : Illegal.attention}
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
		const { illegalModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-严重违法"
				width={1100}
				style={{ height: 320 }}
				visible={illegalModalVisible}
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
