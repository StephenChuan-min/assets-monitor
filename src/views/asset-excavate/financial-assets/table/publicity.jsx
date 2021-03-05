import React from 'react';
import PropTypes from 'reactPropTypes';
import { Pagination } from 'antd';
import { Attentions, SortVessel } from '@/common/table';
import { readStatus } from '@/utils/api/monitor-info/finance';
import api from '@/utils/api/monitor-info/finance';
import { Table, SelectedNum, Ellipsis } from '@/common';
import { ProjectPubInfo } from '@/views/asset-excavate/assets-auction/tableComponents';

const projectTypeMap = new Map([
	[1, '股权项目'],
	[2, '债权项目'],
	[3, '资产项目'],
	[4, '租赁项目'],
	[5, '增资项目'],
	[6, '其他项目'],
	[-1, ' 未知'],
]);

// 获取表格配置
const columns = (props) => {
	const {
		normal, onRefresh, onSortChange, sortField, sortOrder, noSort,
	} = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? '发布日期'
				: <SortVessel field="PUBLISH_TIME" onClick={onSortChange} {...sort}>发布日期</SortVessel>),
			dataIndex: 'gmtPublish',
			width: 160,
			render: (text, row) => (
				<div>
					{ !row.isRead
						? (
							<span
								className={!row.isRead && row.isRead !== undefined ? 'yc-table-read' : 'yc-table-unread'}
								style={!row.isRead && row.isRead !== undefined ? { position: 'absolute' } : {}}
							/>
						) : null}
					<span style={{ marginLeft: 10 }}>{text || '-'}</span>
				</div>
			),
		},
		{
			title: '关联债务人',
			dataIndex: 'obligorId',
			width: 250,
			render: (text, row) => (
				<Ellipsis
					content={row.obligorName || '-'}
					url={text ? `#/business/debtor/detail?id=${text}` : ''}
					tooltip
					width={250}
				/>
			),
		},
		{
			title: '项目类型',
			dataIndex: 'projectType',
			width: 150,
			render: text => <span>{projectTypeMap.get(text) || '-'}</span>,
		},
		{
			title: '项目名称',
			dataIndex: 'title',
			render: (text, row) => (
				<Ellipsis
					content={text || '-'}
					url={text ? `${row.sourceUrl}` : ''}
					tooltip
					width={250}
					isSourceLink
				/>
			),
		},
		{
			title: '项目信息',
			width: 255,
			render: (text, row) => ProjectPubInfo(text, row),
		},
		{
			title: (noSort ? '更新日期'
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>更新日期</SortVessel>),
			dataIndex: 'updateTime',
			width: 120,
			render: text => <span>{text || '-'}</span>,
		},
		{
			title: '操作',
			width: 60,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? api.unFollowPub : api.followPub}
					index={index}
					// single
				/>
			),
		}];
	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

class TableView extends React.Component {
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
			readStatus({ id }).then((res) => {
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
		if (typeof onSelect === 'function')onSelect(selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
		} = this.props;
		const { selectedRowKeys } = this.state;
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
TableView.propTypes = {
	current: PropTypes.number,
	total: PropTypes.number,
	pageSize: PropTypes.number,
	dataSource: PropTypes.obj,
	isShowPagination: PropTypes.bool,
	manage: PropTypes.bool,
	onSelect: PropTypes.fun,
	onPageChange: PropTypes.func,
	onRefresh: PropTypes.func,
};

TableView.defaultProps = {
	current: 1,
	total: 0,
	pageSize: 10,
	isShowPagination: true,
	manage: false,
	dataSource: [],
	onPageChange: () => {},
	onSelect: () => {},
	onRefresh: () => {},
};

export default TableView;
