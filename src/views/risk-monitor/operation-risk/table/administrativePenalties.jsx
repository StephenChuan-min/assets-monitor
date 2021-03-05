import React, { Component, Fragment } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';
import { Table, Ellipsis, SelectedNum } from '@/common';
import { Punishment } from '@/utils/api/risk-monitor/operation-risk';

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const _style = { paddingLeft: 11 };
	const defaultColumns = [
		{
			title: (noSort ? <span style={_style}>决定日期</span>
				: <SortVessel field="DECISION_DATE" onClick={onSortChange} style={_style} {...sort}>决定日期</SortVessel>),
			dataIndex: 'decisionDate',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '相关单位',
			dataIndex: 'obligorName',
			width: 150,
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
		}, {
			title: '决定文书号',
			dataIndex: 'punishNumber',
			width: 125,
			render: text => text || '-',
		}, {
			title: '违法行为类型',
			dataIndex: 'type',
			render: text => <Ellipsis content={text} tooltip width={150} line={2} />,
		}, {
			title: '处罚内容',
			dataIndex: 'content',
			render: text => <Ellipsis content={text} tooltip width={200} line={2} />,
		}, {
			title: '决定机关名称',
			dataIndex: 'departmentName',
			render: text => text || '-',
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 90,
			render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '-'),
		}, {
			title: '操作',
			width: 60,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? Punishment.unAttention : Punishment.attention}
					index={index}
				/>
			),
		}];

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class AdministrativePenalties extends Component {
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
			Punishment.read({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys) => {
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange,pageSize
		} = this.props;
		const { selectedRowKeys } = this.state;
		const rowSelection = manage ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange,
			},
		} : null;
		return (
			<Fragment>
				{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null}
				<Table
					{...rowSelection}
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					rowKey={record => record.id}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 0 && (
					<div className="yc-table-pagination">
						<Pagination
							pageSize={pageSize||10}
							showQuickJumper
							current={current || 1}
							total={total || 0}
							onChange={onPageChange}
							showTotal={totalCount => `共 ${totalCount} 条信息`}
						/>
					</div>
				)}
			</Fragment>
		);
	}
}
