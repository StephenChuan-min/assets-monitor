import React from 'react';
import {
	Pagination, message, Tooltip,
} from 'antd';
import {
	Table, SelectedNum, Ellipsis,
} from '@/common';
import { Attentions, SortVessel } from '@/common/table';
import { postMarkRead, postFollow, postUnFollow } from '@/utils/api/monitor-info/real-estate';
import { timeStandard } from '@/utils';
import accurate from 'img/icon/icon-jinzhun.png';


const announcementEnum = {
	1: '注销公告',
	2: '遗失公告',
	3: '继承公告',
	4: '首次登记公告',
	5: '作废公告',
	6: '转移登记公告',
	7: '变更/更正公告',
	8: '其他公告',
	0: '未知',
};
const roleName = {
	1: '注销人',
	2: '权利人',
	3: '新权利人',
	4: '原权利人',
	5: '抵押人',
	6: '抵押权人',
	7: '被执行人',
	8: '申请执行人',
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
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="PUBLISH_TIME " onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'publishTime',
			width: 110,
			render: (text, row) => (
				<React.Fragment>
					{row.matchType === 1 ? <img src={accurate} alt="" className="yc-assets-info-img" /> : null}
					<span className={!row.isRead && row.isRead !== undefined ? 'yc-table-read' : 'yc-table-unread'} />
					<span>{text}</span>
				</React.Fragment>
			),
		}, {
			title: '关联债务人',
			dataIndex: 'obligorName',
			width: 210,
			render: (text, row) => (
				<React.Fragment>
					{
						row.matchType === 1 ? (
							<div className="yc-assets-table-info">
								<li className="table-info-list">
									{
										(row.role && roleName[row.role]) ? (<span className="info info-title">{`${roleName[row.role]}：`}</span>) : null
									}

									<Ellipsis
										content={text}
										width={168}
										url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}
										tooltip
									/>
								</li>
							</div>
						) : (
							<Ellipsis
								content={text}
								width={170}
								url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}
								tooltip
							/>
						)
					}


				</React.Fragment>

			),
		}, {
			title: '公告类型',
			dataIndex: 'announcementType',
			width: 190,
			render: text => <p>{announcementEnum[text]}</p>,
		}, {
			title: '公告内容',
			width: 320,
			dataIndex: 'vehicleNumber',
			render: (text, row) => (
				<div className="yc-assets-table-info">
					{
					row.title || row.url ? (
						// <Tooltip placement="top" title={row.title}>
						// 	<a
						// 		className="table-info-title text-ellipsis click-link"
						// 		href={row.url}
						// 		target="_blank"
						// 		rel="noopener noreferrer"
						// 	>
						// 		{row.title || row.url}
						// 	</a>
						// </Tooltip>
						<Ellipsis
							content={row.title || row.url}
							url={row.url}
							tooltip
							isSourceLink
						/>
					) : <div className="table-info-title ">-</div>
				}
					{
						row.certificateType ? (
							<li className="table-info-list" style={{ width: 320 }}>
								<span className="list list-title align-justify">权证类型</span>
								<span className="list list-title-colon">:</span>
								<span className="info info-content text-ellipsis " style={{ maxWidth: 237 }}>{row.certificateType}</span>
							</li>
						) : null
					}
					{
						row.certificateNumber ? (
							<li className="table-info-list " style={{ width: 320 }}>
								<span className="list list-title align-justify">权证号</span>
								<span className="list list-title-colon">:</span>
								<span className="info info-content" style={{ maxWidth: 237 }}>{row.certificateNumber}</span>
							</li>
						) : null

					}
					{
						row.realEstateLocated ? (
							<li className="table-info-list" style={{ width: 320 }}>
								<span className="list list-title align-justify">不动产坐落</span>
								<span className="list list-title-colon">:</span>
								<span className="info info-content" style={{ maxWidth: 237 }}>{row.realEstateLocated}</span>
							</li>
						) : null
					}

				</div>
			),
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
