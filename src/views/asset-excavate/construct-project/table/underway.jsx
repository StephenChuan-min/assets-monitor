import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'reactPropTypes';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import {
	Table, SelectedNum, Ellipsis, LiItem,
} from '@/common';
import { toThousands } from '@/utils/changeTime';
import { UnderwayApi } from '@/utils/api/assets/construct';

const roleMap = new Map([
	[0, '未知'],
	[1, '中标单位'],
	[2, '勘察单位'],
	[3, '建设单位'],
	[4, '施工单位'],
	[5, '监理单位'],
	[6, '设计单位'],
	[7, '发包单位'],
	[8, '承包单位'],
	[9, '中标候选人'],
	[10, '招标人'],
	[11, '工程总承包单位'],
	[null, '未知'],
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
			title: (noSort ? '发证日期'
				: <SortVessel field="ISSUING_TIME" onClick={onSortChange} {...sort}>发证日期</SortVessel>),
			dataIndex: 'issuingTime',
			render: (text, row) => ReadStatus(text || '-', row),
		},
		{
			title: <span style={{ marginLeft: 10 }}>施工单位</span>,
			width: 370,
			dataIndex: 'id',
			render: (text, row) => (
				<React.Fragment>
					{
					row.parties.map(item => (
						<Ellipsis
							prefixContent={Array.isArray(item.role) && item.role.length > 0 ? item.role.map((it, index) => `${roleMap.get(it)}${index === item.role.length - 1 ? '：' : '，'}`) : roleMap.get(item.role)}
							prefixStyle={{
								color: '#7D8699',
								width: 80,
								textAlign: 'justify',
								textAlignLast: 'justify',
								display: 'inline-block',
							}}
							content={item.obligorName}
							url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
							auto
							tooltip
						/>
					))
				}
				</React.Fragment>
			),
		},
		{
			title: '施工许可证信息',
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
						{
							row.contractPrice > 0 && <LiItem Li title="合同金额" titleStyle={{ color: '#7D8699', width: 52, marginTop: 3 }}>{`${row.contractPrice > 0 ? `${toThousands(row.contractPrice)}元` : '-'}`}</LiItem>
						}
						{
							row.projectPeriod && <LiItem Li title="合同工期" titleStyle={{ color: '#7D8699', width: 52 }}>{row.projectPeriod || '-'}</LiItem>
						}
						{
							row.projectLocation ? <LiItem Li auto title="项目所在地" titleStyle={{ color: '#7D8699' }}>{row.projectLocation}</LiItem> : null
						}
					</div>
				</div>
			),

		},
		{
			title: (noSort ? '更新日期'
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>更新日期</SortVessel>),
			dataIndex: 'gmtModified',
			render: text => <span>{text}</span>,
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
					api={row.isAttention ? UnderwayApi.unAttention : UnderwayApi.attention}
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
			UnderwayApi.read({ idList: [id] }).then((res) => {
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
