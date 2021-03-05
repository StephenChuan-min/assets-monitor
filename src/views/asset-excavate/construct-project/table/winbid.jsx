import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import {
	Table, SelectedNum, Ellipsis, LiItem,
} from '@/common';
import { WinbidApi } from '@/utils/api/assets/construct';
import { toThousands } from '@/utils/changeTime';

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
			title: (noSort ? '中标日期'
				: <SortVessel field="WINNING_TIME " onClick={onSortChange} {...sort}>中标日期</SortVessel>),
			dataIndex: 'winningTime',
			render: (text, row) => ReadStatus(text || '-', row),
		},
		{
			title: <span style={{ marginLeft: 10 }}>中标单位</span>,
			width: 290,
			dataIndex: 'id',
			render: (text, row) => (
				<React.Fragment>
					{
					row.parties.map(item => (
						<Ellipsis
							content={item.obligorName}
							url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
							tooltip
						/>
					))
				}
				</React.Fragment>
			),
		},
		{
			title: '中标类型',
			dataIndex: 'biddingType',
			render: text => <span>{text || '-'}</span>,
		},
		{
			title: '中标信息',
			width: 496,
			dataIndex: 'title',
			render: (text, row) => (
				<div className="assets-info-content">
					<Ellipsis
						width={480}
						content={text}
						url={row.url}
						tooltip
						isSourceLink
					/>
					<div>
						<LiItem Li auto title="招标方式" style={{ display: 'inline-block', marginTop: 3 }} titleStyle={{ color: '#7D8699', width: 52 }}>{row.biddingMode || '-'}</LiItem>
						<LiItem Li auto title="中标金额" style={{ display: 'inline-block', marginLeft: 20 }} titleStyle={{ color: '#7D8699', width: 52 }}>{`${row.winningPrice > 0 ? `${toThousands(row.winningPrice)}元` : '-'}`}</LiItem>
					</div>
				</div>
			),
		},
		{
			title: (noSort ? '更新日期'
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>更新日期</SortVessel>),
			dataIndex: 'gmtModified',
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
					api={row.isAttention ? WinbidApi.unAttention : WinbidApi.attention}
					index={index}
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
			WinbidApi.read({ idList: [id] }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange = (selectedRowKeys, record) => {
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
	onRefresh: () => {},
	onPageChange: () => {},
	onSelect: () => {},
};

export default TableView;
