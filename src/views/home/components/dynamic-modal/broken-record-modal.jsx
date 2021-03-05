import React from 'react';
import { Modal, Button } from 'antd';
import isBreak from 'img/business/status_shixin.png';
import beforeBreak from 'img/business/status_cengshixin.png';
import { followSingle, unFollowSingle } from 'api/monitor-info/broken-record';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';

const imgStyle = {
	position: 'absolute',
	right: 8,
	bottom: 5,
};
export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '发布日期',
					dataIndex: 'gmtPublishDate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '债务人',
					dataIndex: 'name',
					width: 200,
					render: (text, row = {}) => (
						<div style={{ position: 'relative' }}>
							<Ellipsis
								content={(text || '-') + (text.length <= 4 ? `（${row.number}）` : '')}
								tooltip
								width={160}
								url={`/#/business/debtor/detail?id=${row.obligorId}`}
							/>
							{row.status === 1 && <img style={imgStyle} src={isBreak} alt="" />}
							{row.status === 2 && <img style={imgStyle} src={beforeBreak} alt="" />}
						</div>
					),

				}, {
					title: '案件信息',
					dataIndex: 'caseCode',
					width: 250,
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>案号</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>执行法院</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={row.court || '-'} tooltip width={200} /></span>
							</li>
						</div>
					),
				}, {
					title: '失信信息',
					dataIndex: 'disruptType',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify" style={{ width: 100 }}>失信行为具体情形</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 100 }}>生效文书确定义务</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={row.duty || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 100 }}>被执行人履行情况</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.performance || '-'}</span>
							</li>
						</div>
					),
				}, {
					title: '移除情况',
					dataIndex: 'removeStatus',
					render: text => (text ? <p className="no-attention">已移除</p> : <p className="circle-item">未移除</p>),
				}, {
					title: '更新日期',
					dataIndex: 'updateTime',
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

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { columns, dataSource, loading } = this.state;
		const { brokenModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-失信记录"
				width={1100}
				style={{ height: 320 }}
				visible={brokenModalVisible}
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
