import React from 'react';
import { Modal, Button } from 'antd';
import { postFollow, postUnFollow } from 'api/monitor-info/mortgage';
import {
	Ellipsis, Spin, Table, LiItem,
} from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard, toEmpty, w } from '@/utils';
import { floatFormat } from '@/utils/format';
import { formatDateTime } from '@/utils/changeTime';

// 抵押详情
const MortgageDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<LiItem Li title="抵押物名称" auto titleStyle={{ width: 80 }}><Ellipsis content={toEmpty(rowContent.pawnName)} width={120} tooltip /></LiItem>
			<LiItem Li title="登记编号" auto titleStyle={{ width: 80 }}>{rowContent.regNum || '-'}</LiItem>
			<LiItem Li title="担保债权数额" titleStyle={{ width: 80 }}>{rowContent.amount && w(floatFormat(rowContent.amount.toFixed(2)), { suffix: ' 元' })}</LiItem>
			<li>
				 <span className="list list-title align-justify" style={{ width: 130 }}>债务人履行债务的期限</span>
				 <span className="list list-title-colon">:</span>
			</li>
			<li>
				<span className="list list-content" style={{ maxWidth: 'none' }}>{rowContent.term || '-'}</span>
			</li>
		</div>
	</React.Fragment>
);

// 登记详情
const RegisterDetail = (text, rowContent) => {
	let status;
	if (rowContent.status === 0) {
		status = '无效';
	} else if (rowContent.status === 1) {
		status = '有效';
	} else {
		status = '-';
	}
	return (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content text-ellipsis">
						{status}
					</span>
				</li>
				{
					status === '无效' ? [
						<li>
							<span className="list list-title align-justify" style={{ width: 'auto' }}>注销原因</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{rowContent.cancelReason }</span>
						</li>,
						<li>
							<span className="list list-title align-justify" style={{ width: 'auto' }}>注销时间</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{formatDateTime(rowContent.cancelDate, 'onlyYear') || '-'}</span>
						</li>,
					] : null
				}
			</div>
		</React.Fragment>
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
					title: '登记日期',
					dataIndex: 'regDate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '抵押物所有人',
					dataIndex: 'owner',
					render: (text, row) => (
						<Ellipsis content={text} tooltip width={170} url={row.ownerId ? `/#/business/debtor/detail?id=${row.ownerId}` : ''} />
					),
				}, {
					title: '抵押权人',
					dataIndex: 'people',
					render: (text, row) => (
						<Ellipsis content={text} tooltip width={170} url={row.peopleId ? `/#/business/debtor/detail?id=${row.peopleId}` : ''} />
					),
				}, {
					title: '抵押详情',
					render: MortgageDetail,
				}, {
					title: '登记状态',
					render: RegisterDetail,
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
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
							onClick={this.onRefresh}
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
		const { chattelMortgageModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-动产抵押"
				width={1100}
				style={{ height: 320 }}
				visible={chattelMortgageModalVisible}
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
