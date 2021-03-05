import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { readStatusResult } from '@/utils/api/monitor-info/pledge';
import api from '@/utils/api/monitor-info/pledge';
import { Table, SelectedNum, Ellipsis } from '@/common';
import { timeStandard } from '@/utils';

// 出质详情
const PledgeDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 72 }}>股权标的企业</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					<Ellipsis content={rowContent.companyName} tooltip width={250} />
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.regNumber || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>出质股权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.equityAmount || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>状 态</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.state === 1 ? '无效' : '有效'}</span>
			</li>
		</div>
	</React.Fragment>
);

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
			title: (noSort ? <span style={{ paddingLeft: 11 }}>登记日期</span>
				: <SortVessel field="REG_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>登记日期</SortVessel>),
			dataIndex: 'regDate',
			width: 103,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '出质人',
			dataIndex: 'pledgorList',
			width: 250,
			render: (text, row) => row.pledgorList && row.pledgorList.length > 0 && row.pledgorList.map(item => (
				<Ellipsis content={item.pledgor || '-'} url={item.pledgorId ? `/#/business/debtor/detail?id=${item.pledgorId}` : ''} tooltip width={230} />
			)),
		}, {
			title: '质权人',
			dataIndex: 'pledgeeList',
			width: 250,
			render: (text, row) => row.pledgeeList && row.pledgeeList.length > 0 && row.pledgeeList.map(item => (
				<Ellipsis content={item.pledgee || '-'} url={item.pledgeeId ? `/#/business/debtor/detail?id=${item.pledgeeId}` : ''} tooltip width={230} />
			)),
		}, {
			title: '出质详情',
			render: PledgeDetail,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			className: 'tAlignCenter_important',
			width: 93,
			render: text => timeStandard(text),
		}, {
			title: '操作',
			unNormal: true,
			width: 60,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? api.unFollowResult : api.followResult}
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
			readStatusResult({ id }).then((res) => {
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
