import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { Attentions, SortVessel } from '@/common/table';
import Api from 'api/monitor-info/seizedUnbock';
import { Table, SelectedNum, Ellipsis } from '@/common';
import InforItem from './infoItem';

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	const defaultColumns = [
		{
			title: <span style={{ paddingLeft: 10 }}>查/解封对象</span>,
			dataIndex: 'parties',
			width: 260,
			render: (text, row = {}) => (
				<div>
					{ !row.isRead
						? (
							<span
								className={!row.isRead && row.isRead !== undefined ? 'yc-table-read' : 'yc-table-unread'}
								style={!row.isRead && row.isRead !== undefined ? { position: 'absolute', top: '40%' } : {}}
							/>
						) : null}
					{
					text.map(i => (
						<div style={{ position: 'relative', paddingLeft: 10 }}>
							<Ellipsis
								content={`${i.name}`}
								tooltip
								width={240}
								url={`${i.obligorId !== 0 ? `/#/business/debtor/detail?id=${i.obligorId}` : ''}`}
							/>
						</div>
					))
				}
				</div>
			),
		}, {
			title: (noSort ? (
				<span>
					关联案件
					<span className="yc-title-mark">(判决/查封日期)</span>
				</span>
			)
				: (
					<SortVessel field="ORDER_TIME" onClick={onSortChange} {...sort}>
						关联案件
						<span className="yc-title-mark">(判决/查封日期)</span>
					</SortVessel>
				)),
			dataIndex: 'caseNumber',
			width: 263,
			render: (text, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>案号</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>执行法院</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content"><Ellipsis content={row.court || '-'} tooltip width={200} /></span>
					</li>
					{
						row.dataType === 2 ? 	(
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>判决日期</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={row.judementTime || '-'} tooltip width={200} /></span>
							</li>
						) : null
					}
					{
						row.dataType === 1 ? (
							<React.Fragment>
								{
									row.sealUpTime ? (
										<li>
											<span className="list list-title align-justify" style={{ width: 50 }}>查封日期</span>
											<span className="list list-title-colon">:</span>
											<span className="list list-content"><Ellipsis content={row.sealUpTime || '-'} tooltip width={200} /></span>
										</li>
									) : null
								}
								{
									row.unsealingTime ? (
										<li>
											<span className="list list-title align-justify" style={{ width: 50 }}>解封日期</span>
											<span className="list list-title-colon">:</span>
											<span className="list list-content"><Ellipsis content={row.unsealingTime || '-'} tooltip width={200} /></span>
										</li>
									) : null
								}
							</React.Fragment>
						) : null
					}
				</div>
			),
		}, {
			title: '资产信息',
			dataIndex: 'information',
			width: 328,
			render: (text, row) => <InforItem content={text} row={row} />,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			width: 110,
		}, {
			title: '操作',
			width: 55,
			unNormal: false,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? Api.unFollow : Api.follow}
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
			Api.read({ idList: [id] }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange = (selectedRowKeys) => {
		// const _selectedRowKeys = record.map(item => item.id);
		// console.log(_selectedRowKeys);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
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
					columns={columns(this.props)}
					rowKey={record => record.id}
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
	onPageChange: PropTypes.func,
	isShowPagination: PropTypes.bool,
	manage: PropTypes.bool,
};

TableView.defaultProps = {
	current: 1,
	total: 0,
	pageSize: 10,
	isShowPagination: true,
	manage: false,
	dataSource: [],
	onPageChange: () => {},
};
export default TableView;
