import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { timeStandard } from '@/utils';
import { Table, Ellipsis, SelectedNum } from '@/common';
import { partyInfo } from '@/views/_common';
import { Judgment } from '@/utils/api/risk-monitor/lawsuit';

/* 文书信息 */
const documentInfo = (value, row) => {
	const {
		caseReason, caseType, gmtJudgment, title, sourceId, pid,
	} = row;
	return (
		<div className="assets-info-content">
			<li>
				<Ellipsis content={title} line={2} tooltip url={`#/judgement?sourceId=${sourceId}&pid=${pid}&title=${title}`} />
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>案由</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{caseReason || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>案件类型</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{caseType || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>判决日期</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{timeStandard(gmtJudgment)}</span>
			</li>
		</div>
	);
};
/* 获取表格配置 */
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = {
		sortField,
		sortOrder,
	};

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="GMT_PUBLISH" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'gmtPublish',
			width: 103,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '当事人',
			dataIndex: 'parties',
			width: 300,
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
			title: (noSort ? <span style={{ paddingLeft: 11 }}>文书信息</span>
				: <SortVessel field="GMT_JUDGMENT" onClick={onSortChange} mark="(判决日期)" {...sort}>文书信息</SortVessel>),
			dataIndex: 'associatedInfo1',
			width: 350,
			render: documentInfo,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 93,
			render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '-'),
		}, {
			title: '操作',
			unNormal: true,
			className: 'tAlignCenter_important',
			width: 60,
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? Judgment.unAttention : Judgment.attention}
					index={index}
				/>
			),
		}];
	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { manage } = this.props;
		if ((manage === false && nextProps.manage) || !(nextProps.selectRow || []).length) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 行点击操作
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		const { onRefresh, manage } = this.props;
		if (!isRead && !manage) {
			Judgment.read({ idList: [id] }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		// const _selectedRowKeys = record.map(item => item.id);
		console.log(record);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
		} = this.props;
		const {
			selectedRowKeys,
		} = this.state;
		const rowSelection = manage ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange,
			},
		} : null;
		return (
			<React.Fragment>
				{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null}
				<Table
					{...rowSelection}
					rowKey={record => record.id}
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 0 && isShowPagination && (
					<div className="yc-table-pagination">
						<Pagination
							showQuickJumper
							pageSize={pageSize || 10}
							current={current || 1}
							total={total || 0}
							onChange={onPageChange}
							showTotal={totalCount => `共 ${totalCount} 条信息`}
						/>
					</div>
				)}
			</React.Fragment>
		);
	}
}
