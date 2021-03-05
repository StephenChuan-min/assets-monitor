import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { readStatus, unFollowSingle, followSingle } from '@/utils/api/monitor-info/broken-record';
import { timeStandard } from '@/utils';
import { Table, SelectedNum } from '@/common';
import { Ellipsis } from '@/common';
import isBreak from '@/assets/img/business/status_shixin.png';
import beforeBreak from '@/assets/img/business/status_cengshixin.png';
// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = {
		sortField,
		sortOrder,
	};
	const imgStyle = {
		position: 'absolute',
		right: 8,
		bottom: 5,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? '发布日期'
				: <SortVessel field="GMT_PUBLISH_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'gmtPublishDate',
			className: 'yc-publish-date',
			width: 115,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '债务人',
			dataIndex: 'name',
			width: 200,
			render: (text, row = {}) => (
				<div style={{ position: 'relative' }}>
					<Ellipsis
						content={(text || '-') + (text.length <= 4 ? `（${row.number}）` : '')}
						tooltip
						width={160}
						url={`/#/business/debtor/detail?id=${row.obligorId}`}
					/>
					{row.status === 1 && <img style={imgStyle} src={isBreak} alt="" />}
					{row.status === 2 && <img style={imgStyle} src={beforeBreak} alt="" />}
				</div>
			),

		}, {
			title: '案件信息',
			dataIndex: 'caseCode',
			width: 250,
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
				</div>
			),
		}, {
			title: '失信信息',
			dataIndex: 'disruptType',
			width: 350,
			render: (text, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify" style={{ width: 100 }}>失信行为具体情形</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 100 }}>生效文书确定义务</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content"><Ellipsis content={row.duty || '-'} tooltip width={200} /></span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 100 }}>被执行人履行情况</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.performance || '-'}</span>
					</li>
				</div>
			),
		}, {
			title: '移除情况',
			dataIndex: 'removeStatus',
			width: 80,
			render: text => (text ? <p className="no-attention">已移除</p> : <p className="circle-item">未移除</p>),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'updateTime',
			width: 90,
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
					api={row.isAttention ? unFollowSingle : followSingle}
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
			// registerModalVisible: false,
			// rowObj: {},
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
			readStatus({ idList: [id] }).then((res) => {
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
		// console.log('xx', columns(this.props));
		// console.log('cc', dataSource);
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
