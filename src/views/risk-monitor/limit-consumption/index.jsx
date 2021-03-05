import React from 'react';
import { message, Modal } from 'antd';
import {
	Button, Spin, Download, Icon,
} from '@/common';
import Api from 'api/monitor-info/limit-consumption';
import { unReadCount as unReadTotal } from 'api/monitor-info';
import { clearEmpty } from '@/utils';
import QueryView from './query';
import TableView from './table/table';
import './style.scss';

export default class LimitConsumption extends React.Component {
	constructor(props) {
		super(props);
		document.title = '限制高消费-风险监控';
		this.state = {
			isRead: 'all',
			dataSource: [],
			current: 1,
			total: 0,
			loading: false,
			manage: false,
			unReadCount: false,
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentWillMount() {
		const url = window.location.hash;
		if (url.indexOf('?') === -1) {
			this.onQueryChange({});
		}
	}

	// 获取限制高消费是否存在未读数据
	toUnReadCount = () => {
		unReadTotal().then((res) => {
			const { code, data } = res;
			if (code === 200) {
				this.setState({
					unReadCount: data.limitHeightFlag || false,
				});
			}
		});
	};

	// 清除排序状态
	toClearSortStatus = () => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 切换列表未读已读
	handleReadChange = (val) => {
		// console.log('val === ', val);
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, val, 1, false);
	};

	// 全部标记为已读
	handleAllRead = () => {
		const _this = this;
		const { unReadCount } = this.state;
		if (unReadCount) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
				iconType: 'exclamation-circle',
				onOk() {
					Api.readAll({}).then((res) => {
						if (res.code === 200) {
							_this.onQueryChange();
						}
					});
				},
				onCancel() {
				},
			});
		} else {
			message.warning('最新信息已经全部已读，没有未读信息了');
		}
	};

	// 批量收藏
	handleAttention = () => {
		if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			const { dataSource } = this.state;
			const _this = this;
			Modal.confirm({
				title: '确认收藏选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					Api.follow({ idList }, true).then((res) => {
						if (res.code === 200) {
							message.success('操作成功！');
							_this.selectRow = []; // 批量收藏清空选中项
							const _dataSource = dataSource.map((item) => {
								const _item = item;
								idList.forEach((it) => {
									if (it === item.id) {
										_item.isAttention = 1;
										_item.isRead = true;
									}
								});
								return _item;
							});
							_this.setState({
								dataSource: _dataSource,
								manage: false,
							});
						}
					});
				},
				onCancel() {},
			});
		} else {
			message.warning('未选中数据');
		}
	};

	// 表格发生变化
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 当前页数变化
	onPageChange = (val) => {
		const { manage } = this.state;
		// this.selectRow = [];
		this.onQueryChange('', '', val, manage);
	};

	// 排序触发
	onSortChange = (field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', 1, false);
		this.selectRow = [];
	};

	// 查询条件变化
	onQuery = (con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', 1, false);
	};

	// 查询条件变化
	onQueryChange = (con, _isRead, page, _manage) => {
		const { isRead, current } = this.state;
		const { loading } = this.state;
		this.condition = Object.assign(con || this.condition, {
			page: page || current,
			num: 10,
		});
		const __isRead = _isRead || isRead;
		if (__isRead === 'all') { delete this.condition.isRead; }
		if (__isRead === 'unread') { this.condition.isRead = 0; }
		if (!loading) this.setState({ loading: true, manage: _manage || false });
		this.toUnReadCount();
		// console.log('request api condition === ', this.condition);
		Api.list(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
				});
			}
			this.setState({
				loading: false,
			});
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
	};

	//  清空选中内容
	clearSelectRowNum = () => this.selectRow = [];

	render() {
		const {
			isRead, dataSource, current, total, manage, loading,
		} = this.state;
		const tableProps = {
			manage,
			dataSource,
			current,
			total,
			onSelect: val => this.selectRow = val,
			selectRow: this.selectRow,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		// console.log('tableProps === ', tableProps);
		return (
			<div className="yc-assets-auction">
				<QueryView onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} />
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button
								active={isRead === 'all'}
								onClick={() => this.handleReadChange('all')}
								title="全部"
							/>
							<Button
								active={isRead === 'unread'}
								onClick={() => this.handleReadChange('unread')}
								title="只显示未读"
							/>
							<div className="yc-all-read" onClick={this.handleAllRead}>
								<Icon className="yc-all-clear" type="icon-clear" />
								<span className="yc-all-read-text">全部标为已读</span>
							</div>
							<div className="yc-public-floatRight">
								<Download
									all
									text="一键导出"
									condition={() => this.condition}
									api={Api.exportList}
								/>
								<Button style={{ margin: '0 0 0 10px' }} onClick={() => this.setState({ manage: true })}>批量管理</Button>
							</div>
						</div>
					) : (
						<div className="yc-batch-management">
							<Button onClick={this.handleAttention} title="收藏" />
							<Download
								text="导出"
								waringText="未选中数据"
								field="idList"
								selectIds
								selectedRowKeys={() => this.selectRow}
								api={Api.exportList}
								condition={() => Object.assign({}, this.condition, { idList: this.selectRow })}
							/>
							<Button
								style={{ margin: 0 }}
								type="common"
								onClick={() => {
									this.setState({ manage: false });
									this.selectRow = [];
								}}
								title="取消批量管理"
							/>
						</div>
					)
				}
				<Spin visible={loading}>
					 <TableView {...tableProps} />
				</Spin>
			</div>
		);
	}
}
