import React from 'react';
import { Pagination, Tooltip } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { readStatus, unFollowSingle, followSingle } from '@/utils/api/monitor-info/bankruptcy';
import { linkDom, timeStandard } from '@/utils';
import { Table, SelectedNum, Ellipsis } from '@/common';
import RegisterModal from './registerModal';

const getName = (list, key) => {
	let temp = '';
	list.forEach((i) => {
		if (i.role === key) {
			temp = `${temp + i.name} `;
		}
	});
	return temp;
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
			title: (noSort ? '发布日期'
				: <SortVessel field="PUBLISH_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'publishDate',
			className: 'yc-publish-date',
			width: 115,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '企业',
			dataIndex: 'obligorName',
			width: 200,
			render: (text, row) => (text ? linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text) : '-'),
		}, {
			title: '标题',
			dataIndex: 'title',
			width: 200,
			render: (text, record) => {
				if (record.url) {
					return (
						// <span>{text ? linkDom(record.url, text) : '-'}</span>
						<div>{text ? <Ellipsis content={text} url={record.url} isSourceLink bussinessStyle tooltip /> : '-'}</div>
					);
				}
				return (
					<span>{text || '-'}</span>
				);
			},
		},
		{
			title: '相关单位',
			dataIndex: 'court',
			width: 280,
			render: (text, row) => (
				<div className="yc-assets-table-info">
					{
						getName(row.parties, '申请人') && (
							<li className="table-info-list" style={{ width: 280 }}>
								<span className="list list-title align-justify">申请人</span>
								<span className="list list-title-colon">:</span>
								<Tooltip placement="top" title={getName(row.parties, '申请人')}>
									<span className="info info-content text-ellipsis" style={{ maxWidth: 200 }}>{getName(row.parties, '申请人')}</span>
								</Tooltip>
							</li>
						)
					}
					{
						getName(row.parties, '被申请人') && (
							<li className="table-info-list" style={{ width: 280 }}>
								<span className="list list-title align-justify">被申请人</span>
								<span className="list list-title-colon">:</span>
								<Tooltip placement="top" title={getName(row.parties, '被申请人')}>
									<span className="info info-content text-ellipsis" style={{ maxWidth: 200 }}>{getName(row.parties, '被申请人')}</span>
								</Tooltip>
							</li>
						)
					}
					{
					text && (
					<li className="table-info-list" style={{ width: 280 }}>
						<span className="list list-title align-justify">经办法院</span>
						<span className="list list-title-colon">:</span>
						<Tooltip placement="top" title={row.certificateType}>
							<span className="info info-content text-ellipsis" style={{ maxWidth: 200 }}>{text}</span>
						</Tooltip>
					</li>
					)
				}

				</div>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'createTime',
			width: 90,
			render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '-'}</span>,
		}, {
			title: '操作',
			width: 55,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					single
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
			registerModalVisible: false,
			rowObj: {},
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

	// 打开立案弹框
	openRegisterModal = (rowObj) => {
		// console.log(rowObj);
		this.setState({
			registerModalVisible: true,
			rowObj,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			registerModalVisible: false,
		});
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
		} = this.props;
		const { selectedRowKeys, registerModalVisible, rowObj } = this.state;
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
					columns={columns(this.props, this.openRegisterModal)}
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
				{registerModalVisible && (
					<RegisterModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						rowObj={rowObj}
						registerModalVisible={registerModalVisible}
					/>
				)}
			</React.Fragment>
		);
	}
}
