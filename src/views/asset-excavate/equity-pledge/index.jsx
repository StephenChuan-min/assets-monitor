import React from 'react';
import { Modal, message } from 'antd';
import {
	Button, Tabs, Spin, Download, Icon,
} from '@/common';
import { readStatusAll, readAllStatusResult } from '@/utils/api/monitor-info/pledge';
import Apis from '@/utils/api/monitor-info/pledge';
import { clearEmpty } from '@/utils';
import { unReadCount } from '@/utils/api/monitor-info';
import QueryResult from './query';
import TableResult from './table';

// 获取api具体
const api = (field, type) => {
	if (type === 3) return Apis[`${field}Result`];
	return Apis[`${field}Result`];
};

export default class EquityPledge extends React.Component {
	constructor(props) {
		super(props);
		document.title = '股权质押-资产挖掘';
		// 获取当前页面路由配置
		const _rule = () => ([
			{
				id: 3,
				name: '股权质押',
				dot: false,
				status: true,
			},
		]).filter(item => item.status);

		this.state = {
			sourceType: 3,
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
			tabConfig: _rule(props.rule.children),
		};
		this.condition = {
			num: 10,
		};
		this.selectRow = [];
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		const sourceType = Tabs.Simple.toGetDefaultActive(tabConfig, 'project');
		this.setState({
			sourceType,
		});
		const url = window.location.hash;
		if (url.indexOf('?') === -1) {
			this.onQueryChange({}, sourceType);
		}
		this.onUnReadCount();
		// this.setUnReadCount = setInterval(() => {
		// 	this.onUnReadCount();
		// }, 30 * 1000);
	}

	componentWillUnmount() {
		if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	// 清除排序状态
	toClearSortStatus = () => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 切换列表类型[仅公示项目]
	handleReadChange = (val) => {
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val, 1);
	};

	// 全部标记为已读
	handleAllRead = () => {
		const _this = this;
		const { tabConfig, sourceType } = this.state;
		const selectTab = tabConfig.filter(i => i.id === sourceType);
		if (selectTab && selectTab[0].dot) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
				iconType: 'exclamation-circle',
				onOk() {
					if (sourceType === 2) {
						readStatusAll({}).then((res) => {
							if (res.code === 200) {
								_this.onQueryChange();
								_this.onUnReadCount();
							}
						});
					} else if (sourceType === 3) {
						readAllStatusResult({}).then((res) => {
							if (res.code === 200) {
								_this.onQueryChange();
								_this.onUnReadCount();
							}
						});
					}
				},
				onCancel() {},
			});
		} else {
			message.warning('最新信息已经全部已读，没有未读信息了');
		}
	};

	// 批量收藏
	handleAttention = () => {
		if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			const { dataSource, sourceType } = this.state;
			const _this = this;
			Modal.confirm({
				title: '确认收藏选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					api('follow', sourceType)({ idList }, true).then((res) => {
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

	// 排序触发
	onSortChange = (field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', '', 1);
		this.selectRow = [];
	};

	// 当前页数变化
	onPageChange = (val) => {
		const { manage } = this.state;
		// this.selectRow = [];
		this.onQueryChange('', '', '', val, manage);
	};

	// 查询条件变化
	onQuery = (con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 查询条件变化
	onQueryChange = (con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, isRead, current } = this.state;
		const __isRead = _isRead || isRead;
		this.condition = Object.assign(con || this.condition, {
			page: page || current,
		});
		if (__isRead === 'all') delete this.condition.isRead;
		if (__isRead === 'else') this.condition.isRead = 0;
		this.setState({ loading: true, manage: _manage || false });
		// delete this.condition.sourceType;
		api('infoList', _sourceType || sourceType)(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
				message.error(res.message || '网络请求异常请稍后再试！');
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 查询是否有未读消息
	onUnReadCount = () => {
		const { tabConfig } = this.state;
		unReadCount().then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const _tabConfig = tabConfig.map((item) => {
					const _item = item;

					if (_item.id === 2)_item.dot = data.financeCount;
					if (_item.id === 3)_item.dot = data.stockPledgeFlag;
					return _item;
				});
				this.setState({ tabConfig: _tabConfig });
			}
		});
	};

	clearSelectRowNum = () => this.selectRow = [];

	render() {
		const {
			sourceType, isRead, dataSource, current, total, manage, loading,
		} = this.state;
		const tableProps = {
			manage,
			dataSource,
			current,
			total,
			onRefresh: this.onRefresh,
			onSelect: val => this.selectRow = val,
			selectRow: this.selectRow,
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		return (
			<div className="yc-assets-auction">
				<QueryResult onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} />
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
				{
					!manage ? (
						<div className="assets-auction-action">
							{
								sourceType === 2 || sourceType === 3 ? [
									<Button
										active={isRead === 'all'}
										onClick={() => this.handleReadChange('all')}
										title="全部"
									/>,
									<Button
										active={isRead === 'else'}
										onClick={() => this.handleReadChange('else')}
										title="只显示未读"
									/>,
									<div className="yc-all-read" onClick={this.handleAllRead}>
										<Icon className="yc-all-clear" type="icon-clear" />
										<span className="yc-all-read-text">全部标为已读</span>
									</div>,
								] : null
							}
							<div className="yc-public-floatRight">
								<Download
									all
									text="一键导出"
									condition={() => this.condition}
									api={api('exportList', sourceType)}
								/>
								<Button
									style={{ margin: '0 0 0 10px' }}
									onClick={() => this.setState({ manage: true })}
								>
									批量管理
								</Button>
							</div>
						</div>
					) : (
						<div className="yc-batch-management">
							<Button onClick={this.handleAttention} title="收藏" />
							<Download
								text="导出"
								waringText="未选中数据"
								field="idList"
								api={api('exportList', sourceType)}
								selectIds
								selectedRowKeys={() => this.selectRow}
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
					<TableResult {...tableProps} />
				</Spin>

			</div>
		);
	}
}
