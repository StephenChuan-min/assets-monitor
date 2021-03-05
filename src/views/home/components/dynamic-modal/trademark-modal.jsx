import React from 'react';
import { Modal, Button } from 'antd';
import { Copyright } from 'api/monitor-info/intangible';
import { Spin, Table, Ellipsis } from '@/common';
import { Attentions } from '@/common/table';
import { linkDetail, linkDom, timeStandard } from '@/utils';

const rightsTypeStatus = {
	0: '未知',
	1: '商标',
	2: '专利',
};
export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '公告日期',
					dataIndex: 'noticeTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '申请人/权利人',
					dataIndex: 'obligorName',
					render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
				}, {
					title: '商标/专利名称',
					dataIndex: 'rightsName',
					// render: (text, row) => (text ? linkDom(row.url, text) : '-'),
					render: (text, row) => (text ? <Ellipsis url={row.url} content={text} isSourceLink /> : '-'),
				}, {
					title: '权利类型',
					dataIndex: 'rightsType',
					render: text => (
						<span>{rightsTypeStatus[text]}</span>
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
							api={row.isAttention ? Copyright.unAttention : Copyright.attention}
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
		const { trademarkModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-商标专利"
				width={1100}
				style={{ height: 320 }}
				visible={trademarkModalVisible}
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
