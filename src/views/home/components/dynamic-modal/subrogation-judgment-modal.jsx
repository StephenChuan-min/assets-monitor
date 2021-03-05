import React from 'react';
import { Modal, Button } from 'antd';
import { Judgment } from 'api/monitor-info/subrogation';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';

/* 文书信息 */
const documentInfo = (value, row) => {
	const {
		caseReason, caseType, gmtJudgment, title, isRestore, sourceId, pid,
	} = row;
	return (
		<div className="assets-info-content">
			<li>
				<Ellipsis content={title} line={2} tooltip url={`#/judgement?sourceId=${sourceId}&pid=${pid}&title=${title}`} />
			</li>
			<LiItem Li title="案由" auto>{caseReason || '-'}</LiItem>
			<LiItem Li title="案件类型" auto>{isRestore ? '执恢案件' : (caseType || '-')}</LiItem>
			<LiItem Li title="判决日期" auto>{timeStandard(gmtJudgment)}</LiItem>
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
					title: '发布日期',
					dataIndex: 'gmtPublish',
					render: text => timeStandard(text),
				}, {
					title: '当事人',
					dataIndex: 'parties',
					render: partyInfo,
				}, {
					title: '法院',
					dataIndex: 'court',
					render: text => text || '-',
				}, {
					title: '案号',
					dataIndex: 'caseNumber',
					render: text => text || '-',
				}, {
					title: '文书信息',
					dataIndex: 'associatedInfo1',
					width: 200,
					render: documentInfo,
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
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
							api={row.isAttention ? Judgment.unAttention : Judgment.attention}
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
		const { subrogationJudgmentModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-代位权(文书)"
				width={1100}
				style={{ height: 320 }}
				visible={subrogationJudgmentModalVisible}
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
