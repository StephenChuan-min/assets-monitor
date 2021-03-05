import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import Api from 'api/monitor-info/limit-consumption';
import { Table, SelectedNum, Ellipsis } from '@/common';
import { timeStandard } from '@/utils';
import ViewContentModal from './view-content-modal';
import './index.scss';

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>立案日期</span>
				: <SortVessel field="GMT_REGISTER_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>立案日期</SortVessel>),
			dataIndex: 'registerDate',
			width: 120,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		},
		{
			title: '债务人',
			dataIndex: 'obligorType',
			width: 300,
			render: (text, row) => (
				row.obligorType === 2
					? (
						<div>
							<div>
								<span className="obligor-type">个人：</span>
								<Ellipsis
									content={`${row.obligorType === 2 ? `${row.personName}` : `${row.personName || '-'}`}`}
									tooltip
									width={200}
									url={`${row.obligorType === 2 ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}`}
								/>
							</div>
							<div>
								<span className="obligor-type">证件号：</span>
								<span>{row.obligorType === 2 ? row.personNumber : '-'}</span>
							</div>
						</div>
					) : (
						<div>
							<span className="obligor-type">企业：</span>
							<Ellipsis
								content={`${row.companyName || '-'}`}
								tooltip
								width={200}
								url={`${row.obligorType === 1 ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}`}
							/>
						</div>
					)
			),
		},
		// {
		// 	title: '姓名',
		// 	dataIndex: 'personName',
		// 	width: 210,
		// 	render: (text, row) => (
		// 		<Ellipsis
		// 			content={`${row.obligorType === 2 ? `${text}${row.personNumber ? `(${row.personNumber})` : ''}` : `${text || '-'}`}`}
		// 			tooltip
		// 			width={180}
		// 			url={`${row.obligorType === 2 ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}`}
		// 		/>
		// 	),
		// }, {
		// 	title: '企业',
		// 	dataIndex: 'companyName',
		// 	width: 210,
		// 	render: (text, row) => (
		// 		<Ellipsis
		// 			content={`${text || '-'}`}
		// 			tooltip
		// 			width={180}
		// 			url={`${row.obligorType === 1 ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}`}
		// 		/>
		// 	),
		// },
		{
			title: '案号',
			dataIndex: 'caseNumber',
			width: 300,
			render: text => <span>{text ? text.replace('（', '(') : '-'}</span>,
		}, {
			title: '移除状况',
			dataIndex: 'status',
			render: text => (
				<span>
					<span className="status-dot" style={{ backgroundColor: text === 1 ? '#3DBD7D' : '#FB5A5C' }} />
					<span className="status-text">{text === 1 ? '已移除' : '未移除'}</span>
				</span>
			),
		},
		// {
		// 	title: '源链接',
		// 	dataIndex: 'url',
		// 	width: 90,
		// 	render: (text, row) => (
		// 		<a onClick={() => toViewContent([row.content, row.url])}>{`${text ? '查看' : '-'}`}</a>
		// 	),
		// },
		{
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
		}, {
			title: '操作',
			width: 55,
			unNormal: true,
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
			visible: false,
			viewContent: '',
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

	// 批量管理复选框的变化监听函数
	onSelectChange = (selectedRowKeys) => {
		// const _selectedRowKeys = record.map(item => item.id);
		// console.log(selectedRowKeys, record, _selectedRowKeys);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	// 点击查看限高内容
	// toViewContent = ([viewContent = '', url]) => {
	// 	if (url) {
	// 		this.setState({
	// 			visible: true,
	// 			viewContent,
	// 		});
	// 	}
	// };

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
		} = this.props;
		const { selectedRowKeys, visible, viewContent } = this.state;
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
					columns={columns(this.props, this.toViewContent)}
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
				{
					visible ? (
						<ViewContentModal
							className="view-content-modal"
							visible={visible}
							data={viewContent}
							onCancel={() => this.setState({ visible: false })}
							onOk={() => this.setState({ visible: false })}
						/>
					)
						: null
				}
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
