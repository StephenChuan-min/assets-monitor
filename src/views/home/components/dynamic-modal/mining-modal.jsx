import React from 'react';
import { Modal, Button } from 'antd';
import { Mining } from 'api/monitor-info/intangible';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import {
	linkDetail, linkDom, timeStandard,
} from '@/utils';
import { floatFormat } from '@/utils/format';

const certificateTypeStatus = {
	1: '采矿权',
	2: '探矿权',
	0: '未知',
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
					dataIndex: 'gmtPublishTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '探/采矿权人',
					dataIndex: 'rightsHolder',
					render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
				}, {
					title: '许可证编号',
					dataIndex: 'licenseNumber',
					// render: (text, row) => (text ? linkDom(row.url, text) : '-'),
					render: (text, row) => (text ? <div><Ellipsis url={row.url} content={text} isSourceLink bussinessStyle tooltip /></div> : '-'),
				}, {
					title: '权证类型',
					dataIndex: 'certificateType',
					render: text => (text !== '' ? certificateTypeStatus[text] : '-'),
				}, {
					title: '权证信息',
					dataIndex: 'mineralSpecies',
					render: (text, row) => (
						<div className="assets-info-content">
							<LiItem Li title="矿种" auto>{text || '-'}</LiItem>
							<LiItem Li title="矿山名称" auto><Ellipsis content={row.projectName || '-'} tooltip width={200} /></LiItem>
							<LiItem Li title="面积" auto>{row.area ? `${floatFormat(row.area)} 平方米` : '-'}</LiItem>
							<LiItem Li title="有效期" auto>
								{
								row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
									<span className="list list-content">{`${row.gmtValidityPeriodStart} 至 ${row.gmtValidityPeriodEnd}` }</span>
								) : '-'
							}
							</LiItem>
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
							api={row.isAttention ? Mining.unAttention : Mining.attention}
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
		const { miningModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-采矿权"
				width={1100}
				style={{ height: 320 }}
				visible={miningModalVisible}
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
