import React from 'react';
import {
	Pagination, message, Tooltip,
} from 'antd';
import { Table, SelectedNum, Ellipsis } from '@/common';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { postMarkRead, postFollow, postUnFollow } from '@/utils/api/monitor-info/mortgage';
import { timeStandard, w } from '@/utils';
import { formatDateTime } from '@/utils/changeTime';
import { floatFormat } from '@/utils/format';


// 抵押详情
const MortgageDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 80 }}>抵押物名称</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content text-ellipsis">
					{
						rowContent.pawnName && rowContent.pawnName.length > 10
							? (
								<Tooltip placement="topLeft" title={rowContent.pawnName}>
									<p>{`${rowContent.pawnName.substr(0, 10)}...`}</p>
								</Tooltip>
							)
							: <p>{rowContent.pawnName || '-'}</p>
					}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					{rowContent.regNum || '-'}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>担保债权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.amount && w(floatFormat(rowContent.amount.toFixed(2)), { suffix: ' 元' })}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 130 }}>债务人履行债务的期限</span>
				<span className="list list-title-colon">:</span>
			</li>
			<li>
				<span className="list list-content" style={{ maxWidth: 'none' }}>{rowContent.term || '-'}</span>
			</li>
		</div>
	</React.Fragment>
);

// 登记详情
const RegisterDetail = (text, rowContent) => {
	let status;
	if (rowContent.status === 0) {
		status = '无效';
	} else if (rowContent.status === 1) {
		status = '有效';
	} else {
		status = '-';
	}
	return (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content text-ellipsis">
						{status}
					</span>
				</li>
				{
					status === '无效' ? [
						<li>
							<span className="list list-title align-justify" style={{ width: 'auto' }}>注销原因</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{rowContent.cancelReason }</span>
						</li>,
						<li>
							<span className="list list-title align-justify" style={{ width: 'auto' }}>注销时间</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{formatDateTime(rowContent.cancelDate, 'onlyYear') || '-'}</span>
						</li>,
					] : null
				}
			</div>
		</React.Fragment>
	);
};
// 获取表格配置
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
			title: (noSort ? <span style={{ paddingLeft: 11 }}>登记日期</span>
				: <SortVessel field="REG_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>登记日期</SortVessel>),
			dataIndex: 'regDate',
			width: 110,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '抵押物所有人',
			dataIndex: 'owner',
			width: 190,
			render: (text, row) => (
				<Ellipsis content={text} tooltip width={170} url={row.ownerId ? `/#/business/debtor/detail?id=${row.ownerId}` : ''} />
			),
		}, {
			title: '抵押权人',
			dataIndex: 'people',
			width: 190,
			render: (text, row) => (
				<Ellipsis content={text} tooltip width={170} url={row.peopleId ? `/#/business/debtor/detail?id=${row.peopleId}` : ''} />
			),
		}, {
			title: '抵押详情',
			width: 250,
			render: MortgageDetail,
		}, {
			title: '登记状态',
			width: 110,
			render: RegisterDetail,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 110,
			render: text => timeStandard(text) || '-',
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
					api={row.isAttention ? postUnFollow : postFollow}
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
			postMarkRead({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: 1, index }, 'isRead');
				} else {
					message.error(res.data.message);
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
					dataSource={dataSource}
					pagination={false}
					rowKey={record => record.id}
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
