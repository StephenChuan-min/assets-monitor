import React from 'react';
import { Modal, Button } from 'antd';
import { Spin, Table, Ellipsis } from '@/common';
import { Attentions } from '@/common/table';
import { Violation } from '@/utils/api/risk-monitor/operation-risk';
import { linkDom, timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '发布日期',
					dataIndex: 'publishDate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '当事人',
					dataIndex: 'parties',
					render: partyInfo,
				},
				{
					title: '案件性质',
					dataIndex: 'caseNature',
					render: text => text || '-',
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: text => timeStandard(text),
				}, {
					title: '源链接',
					dataIndex: 'url',
					className: 'tAlignCenter_important',
					// render: (text, record) => (record.url ? linkDom(record.url, ' ', '', 'yc-list-link') : '-'),
					render: (text, record) => (record.url ? <Ellipsis url={record.url} content="" className="yc-list-link" isSourceLink /> : '-'),
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? Violation.unAttention : Violation.attention}
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
		const { taxModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-税收违法"
				width={1100}
				style={{ height: 320 }}
				visible={taxModalVisible}
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
