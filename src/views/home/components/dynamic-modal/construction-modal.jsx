import React from 'react';
import { Modal, Button } from 'antd';
import { Construction } from 'api/monitor-info/intangible';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '发布日期',
					dataIndex: 'issueTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '持证单位',
					dataIndex: 'obligorName',
					render: (text, row) => (
						<Ellipsis
							content={text || '-'}
							tooltip
							width={200}
							url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
						/>
					),
				}, {
					title: '证书编号',
					dataIndex: 'certificateNumber',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-content">{text || '-'}</span>
								{ row.gmtDeleted ? <span className="yc-case-reason text-ellipsis yc-case-reason__invalid">已失效</span> : ''}
							</li>
						</div>
					),
				}, {
					title: '资质信息',
					dataIndex: 'qualificationName',
					render: (text, row) => (
						<div className="assets-info-content">
							<LiItem Li title="资质名称" auto><Ellipsis content={row.qualificationName || '-'} tooltip width={380} /></LiItem>
							<LiItem Li title="资质类别" auto>{row.qualificationType || '-'}</LiItem>
							<LiItem Li title="资质等级" auto>{row.qualificationLevel || '-'}</LiItem>
							<LiItem Li title="有效期至" auto>{row.validityPeriod || '-'}</LiItem>
						</div>
					),
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
							api={row.isAttention ? Construction.unAttention : Construction.attention}
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
		const { constructionModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-建筑建造"
				width={1100}
				style={{ height: 320 }}
				visible={constructionModalVisible}
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
