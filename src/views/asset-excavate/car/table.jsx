import React from 'react';
import {
	Pagination, message,
} from 'antd';
import { Table, SelectedNum, Ellipsis } from '@/common';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { postMarkRead, postFollow, postUnFollow } from '@/utils/api/monitor-info/car';
import { linkDom, timeStandard } from '@/utils';

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
			title: (noSort ? <span style={{ paddingLeft: 11 }}>公示日期</span>
				: <SortVessel field="PUBLISH_TIME " onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>公示日期</SortVessel>),
			dataIndex: 'publishTime',
			width: 110,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '车辆所有人',
			dataIndex: 'obligorName',
			width: 190,
			render: (text, row) => <Ellipsis content={text} width={170} url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : '--'} tooltip />,
		}, {
			title: '车辆种类',
			dataIndex: 'vehicleType',
			width: 190,
			render: text => <span>{text || '--'}</span>,
		}, {
			title: '车牌号',
			width: 250,
			render: text => <span>{text || '--'}</span>,
			dataIndex: 'vehicleNumber',
		}, {
			title: '源链接',
			width: 110,
			dataIndex: 'url',
			// render: (text, row) => (text ? linkDom(row.url, '查看') : '-'),
			render: (text, row) => (text ? (
				<Ellipsis
					content="查看"
					url={row.url}
					isSourceLink
				/>
			) : '-'),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_MODIFIED " onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
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
			postMarkRead({ idList: [id] }).then((res) => {
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
