import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Dump } from 'api/monitor-info/intangible';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import { linkDom } from '@/utils';

const status = {
	1: {
		reasonName: '注销原因',
		dateName: '注销时间',
	},
	2: {
		reasonName: '撤销原因',
		dateName: '撤销时间',
	},
	3: {
		reasonName: '遗失原因',
		dateName: '遗失时间',
	},
};
function keyToValue(key) {
	if (key === '注销') {
		return 1;
	}
	if (key === '撤销') {
		return 2;
	}
	if (key === '遗失') {
		return 3;
	}
	return 0;
}
export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '发证日期',
					dataIndex: 'gmtPublishTime',
					render: text => (text || '-'),
				}, {
					title: '持证单位',
					dataIndex: 'companyName',
					width: 200,
					render: (text, row) => (
						<Ellipsis
							content={text || '-'}
							tooltip
							width={180}
							url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
						/>
					),
				}, {
					title: '许可证编号',
					dataIndex: 'licenseNumber',
					width: 120,
					// render: (text, row) => (text ? linkDom(row.url, text) : '-'),
					render: (text, row) => (text ? <div><Ellipsis url={row.url} content={text} isSourceLink bussinessStyle tooltip /></div> : '-'),
				}, {
					title: '权证信息',
					dataIndex: 'industry',
					render: (text, row) => (
						<div className="assets-info-content">
							<LiItem Li title="行业分类" auto><Ellipsis content={text || '-'} tooltip width={200} /></LiItem>
							<LiItem Li title="有效期" auto>
								{
										row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
											<span className="list list-content">{`${row.gmtValidityPeriodStart}至${row.gmtValidityPeriodEnd}` }</span>
										) : '-'
									}
							</LiItem>
						</div>
					),
				}, {
					title: '当前状态',
					dataIndex: 'status',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-content">{text}</span>
							</li>
							{
								text !== '正常' ? (
									<Fragment>
										<li>
											<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToValue(text)].reasonName}</span>
											<span className="list list-title-colon">:</span>
											<span className="list list-content"><Ellipsis content={row.reason || '-'} tooltip width={200} /></span>
										</li>
										<li>
											<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToValue(text)].dateName}</span>
											<span className="list list-title-colon">:</span>
											<span className="list list-content">{row.gmtIssueTime || '-'}</span>
										</li>
									</Fragment>
								) : null
							}
						</div>
					),
				}, {
					title: '更新日期',
					dataIndex: 'gmtModified',
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
							api={row.isAttention ? Dump.unAttention : Dump.attention}
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
		const { emissionModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-排污权"
				width={1100}
				style={{ height: 320 }}
				visible={emissionModalVisible}
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
