import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { Attentions, SortVessel } from '@/common/table';
import { toThousands } from '@/utils/changeTime';
import {
	Table, SelectedNum, Ellipsis, LiItem,
} from '@/common';
import { ConstructApi } from '@/utils/api/assets/construct';

const projectTypeMap = new Map([
	[1, '建筑工程'],
	[2, '装饰工程'],
	[3, '市政道路工程'],
	[4, '其他'],
	[0, '未知'],
]);

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
			title: <span style={{ marginLeft: 10 }}>建设单位</span>,
			width: 290,
			dataIndex: 'id',
			render: (text, row) => (
				<React.Fragment>
					<span style={{ position: 'absolute', top: '42%' }} className={!row.isRead && row.isRead !== undefined ? 'yc-table-read' : 'yc-table-unread'} />
					<div style={{ marginLeft: 10 }}>
						{
							row.parties.map(item => (
								<Ellipsis
									content={item.obligorName || '-'}
									url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
									tooltip
								/>
							))
						}
					</div>
				</React.Fragment>
			),
		},
		{
			title: '工程类型',
			dataIndex: 'projectType',
			render: text => <span>{projectTypeMap.get(text) || '-'}</span>,
		},
		{
			title: (noSort ? '项目信息'
				: <SortVessel field="APPROVAL_TIME" onClick={onSortChange} mark="(立项批复日期)" {...sort}>项目信息</SortVessel>),
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
						<LiItem Li auto title="建设性质" style={{ display: 'inline-block', width: 160, marginTop: 3 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.nature || '-'}</LiItem>
						<LiItem Li auto title="总投资" style={{ display: 'inline-block', width: 200, marginLeft: 40 }} titleStyle={{ color: '#7D8699', width: 80 }}>
							{`${row.totalInvestment > 0 ? `${toThousands(row.totalInvestment)}元` : '-'}`}
						</LiItem>
					</div>
					<div>
						{
							row.approvalTime && <LiItem Li auto title="立项批复日期" style={{ display: 'inline-block', width: 160 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.approvalTime || '-'}</LiItem>
						}
						{
							row.planBeginTime && <LiItem Li auto title="计划开工日期" style={{ display: 'inline-block', width: 160, marginLeft: 40 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.planBeginTime || '-'}</LiItem>
						}
					</div>
					{
						row.projectLocation && <LiItem Li title="项目所在地" style={{ width: 372 }} titleStyle={{ color: '#7D8699', width: 80 }} cotStyle={{ maxWidth: 274 }}>{row.projectLocation || '-'}</LiItem>
					}
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
					api={row.isAttention ? ConstructApi.unAttention : ConstructApi.attention}
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
			ConstructApi.read({ idList: [id] }).then((res) => {
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
