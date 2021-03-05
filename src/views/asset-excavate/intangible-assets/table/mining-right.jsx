import React, { Component, Fragment } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';
import { floatFormat } from '@/utils/format';
import { Table, SelectedNum, Ellipsis } from '@/common';
import { Mining } from '@/utils/api/monitor-info/intangible';

const certificateTypeStatus = {
	1: '采矿权',
	2: '探矿权',
	0: '未知',
};

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="GMT_PUBLISH_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'gmtPublishTime',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '探/采矿权人',
			dataIndex: 'rightsHolder',
			width: 200,
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
		}, {
			title: '许可证编号',
			width: 200,
			dataIndex: 'licenseNumber',
			// render: (text, row) => (text ? linkDom(row.url, text) : '-'),
			render: (text, row) => (text ? <div><Ellipsis content={text} url={row.url} isSourceLink bussinessStyle tooltip /></div> : '-'),
		}, {
			title: '权证类型',
			width: 100,
			dataIndex: 'certificateType',
			render: text => (text !== '' ? certificateTypeStatus[text] : '-'),
		}, {
			title: '权证信息',
			width: 260,
			dataIndex: 'mineralSpecies',
			render: (text, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>矿种</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{text || '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>矿山名称</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content"><Ellipsis content={row.projectName || '-'} tooltip width={200} /></span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>面积</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.area ? `${floatFormat(row.area)} 平方米` : '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>有效期</span>
						<span className="list list-title-colon">:</span>
						{
							row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
								<span className="list list-content">{`${row.gmtValidityPeriodStart} 至 ${row.gmtValidityPeriodEnd}` }</span>
							) : '-'
						}
					</li>
				</div>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 90,
		}, {
			title: '操作',
			width: 60,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? Mining.unAttention : Mining.attention}
					index={index}
				/>
			),
		}];

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class BusinessChange extends Component {
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
		const idList = [];
		idList.push(id);
		if (!isRead && !manage) {
			Mining.read({ idList }).then((res) => {
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
			<Fragment>
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
			</Fragment>
		);
	}
}
