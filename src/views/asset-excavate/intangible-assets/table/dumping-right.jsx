import React, { Component, Fragment } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { timeStandard } from '@/utils';
import { Table, SelectedNum, Ellipsis } from '@/common';
import { Dump } from '@/utils/api/monitor-info/intangible';

const status = {
	1: {
		reasonName: '注销原因',
		dateName: '注销时间',
	},
	2: {
		reasonName: '撤销原因',
		dateName: '撤销时间',
	},
	3: {
		reasonName: '遗失原因',
		dateName: '遗失时间',
	},
};

function keyToVAlue(key) {
	if (key === '注销') {
		return 1;
	}
	if (key === '撤销') {
		return 2;
	}
	if (key === '遗失') {
		return 3;
	}
	return 0;
}

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发证日期</span>
				: <SortVessel field="GMT_PUBLISH_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发证日期</SortVessel>),
			dataIndex: 'gmtPublishTime',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text, '未公开'), record),
		}, {
			title: '持证单位',
			dataIndex: 'companyName',
			width: 200,
			render: (text, row) => (
				<Ellipsis
					content={text || '-'}
					tooltip
					width={180}
					url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
				/>
			),
		}, {
			title: '许可证编号',
			width: 200,
			dataIndex: 'licenseNumber',
			// render: (text, row) => (text ? linkDom(row.url, text) : '-'),
			render: (text, row) => (text ? <div><Ellipsis content={text} url={row.url} isSourceLink bussinessStyle tooltip /></div> : '-'),
		}, {
			title: '权证信息',
			width: 260,
			dataIndex: 'industry',
			render: (text, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>行业分类</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>有效期</span>
						<span className="list list-title-colon">:</span>
						{
							row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
								<span className="list list-content">{`${row.gmtValidityPeriodStart}至${row.gmtValidityPeriodEnd}` }</span>
							) : '-'
						}
					</li>
				</div>
			),
		}, {
			title: '当前状态',
			width: 280,
			dataIndex: 'status',
			render: (text, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-content">{text}</span>
					</li>
					{
						text !== '正常' ? (
							<Fragment>
								<li>
									<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToVAlue(text)].reasonName}</span>
									<span className="list list-title-colon">:</span>
									<span className="list list-content"><Ellipsis content={row.reason || '-'} tooltip width={200} /></span>
								</li>
								<li>
									<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToVAlue(text)].dateName}</span>
									<span className="list list-title-colon">:</span>
									<span className="list list-content">{row.gmtIssueTime || '-'}</span>
								</li>
							</Fragment>
						) : null
					}
				</div>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
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
					api={row.isAttention ? Dump.unAttention : Dump.attention}
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
			Dump.read({ idList }).then((res) => {
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
