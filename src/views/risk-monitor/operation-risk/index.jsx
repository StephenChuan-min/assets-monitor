import React from 'react';
import { message, Modal } from 'antd';
import {
	Tabs, Button, Spin, Download, Icon,
} from '@/common';
import { changeURLArg, clearEmpty } from '@/utils';
import ruleMethods from '@/utils/rule';
import API from '@/utils/api/risk-monitor/operation-risk';
import { getUrlParams } from '@/views/asset-excavate/query-util'; /* Table 展示列表 */
import TabsIntact from './tabs-intact';
import Query from './query'; /* Query 查询条件 */
import Table from './table';

const toGetConfig = () => {
	const rule = ruleMethods.toGetRuleSource('', 'YC10', 'YC03');
	const ruleChild = (rule.child.filter(i => i.id === 'YC0303')[0]) || {};
	return (ruleChild.child || []).filter(item => item.status).map(item => Object.assign(item, {
		number: 0,
		showNumber: true,
	}));
};

const toGetProcess = (sourceType, source) => {
	let site = 0;
	source.forEach((item, index) => { if (item.id === sourceType)site = index; });
	return site;
};

export default class OperationRisk extends React.Component {
	constructor(props) {
		super(props);
		document.title = '经营风险-风险监控';
		this.state = {
			sourceType: 1,
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
		};
		this.condition = {};
		this.selectRow = [];
		this.config = toGetConfig();
	}

	componentWillMount() {
		const sourceType = Tabs.Simple.toGetDefaultActive(this.config, 'process');
		this.setState({
			sourceType,
		}, () => {
			this.toInfoCount(sourceType);
			const url = window.location.hash;
			if (url.indexOf('?') === -1) {
				this.onQueryChange({});
			}
		});
	}

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 获取统计信息
	toInfoCount=(nextSourceType) => {
		if (this.tabIntactDom) this.tabIntactDom.toRefreshCount(this.config, nextSourceType);
	};

	// 切换列表类型
	handleReadChange=(val) => {
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val, 1);
	};

	// 全部标记为已读
	handleAllRead = () => {
		const _this = this;
		const { sourceType } = this.state;
		const _c = this.config;
		if (_c[toGetProcess(sourceType, _c)].dot) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
				iconType: 'exclamation-circle',
				onOk() {
					API(sourceType, 'readAll')().then((res) => {
						if (res.code === 200) {
							_this.onQueryChange();
						}
					});
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
					API(sourceType, 'attention')({ idList }, true).then((res) => {
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
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 判断url是否带参数
	isUrlParams = (val) => {
		const url = window.location.hash;
		if (url.indexOf('?') !== -1) {
			let dParams = {};
			if (val === 'YC030301') {
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			}
			if (val === 'YC030302') {
				dParams = getUrlParams(url, 'gmtCreateStart', 'gmtCreateEnd');
			}
			if (val === 'YC030303') {
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			} if (val === 'YC030304') {
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			} if (val === 'YC030305') {
				dParams = getUrlParams(url, 'gmtCreateStart', 'gmtCreateEnd');
			} if (val === 'YC030306') {
				dParams = getUrlParams(url, 'startCreateTime', 'endCreateTime');
			}

			return dParams;
		}
		return {};
	};


	// sourceType变化
	onSourceType = (sourceType) => {
		this.setState({
			sourceType,
			dataSource: '',
			current: 1,
			total: '',
			isRead: 'all',
		});
		this.toClearSortStatus();

		this.onQueryChange(this.isUrlParams(sourceType), sourceType, 'all', 1);
		this.toInfoCount(sourceType);
		this.selectRow = [];
		window.location.href = changeURLArg(window.location.href, 'process', sourceType);
	};

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		// this.selectRow = [];
		this.onQueryChange('', '', '', val, manage);
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.selectRow = [];
		this.onQueryChange(this.condition, '', '', 1);
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.selectRow = [];
		this.onQueryChange(con, '', '', 1);
	};

	// 发起查询请求
	onQueryChange=(con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, isRead, current } = this.state;
		const __isRead = _isRead || isRead;
		const __type = _sourceType || sourceType;
		this.condition = Object.assign({}, con || this.condition, {
			page: page || current,
			num: 10,
		});
		// console.log(__isRead);
		if (__isRead === 'all') delete this.condition.isRead;
		if (__isRead === 'unread') this.condition.isRead = 0;
		this.setState({
			loading: true,
			manage: _manage || false,
		});
		API(__type, 'list')(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.config[toGetProcess(__type, this.config)].number = res.data.total;
				// tabConfig[toGetProcess(__type, tabConfig)].number = res.data.total;
				this.setState({
					// tabConfig,
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				message.error(res.message || '网络请求异常请稍后再试！');
				this.setState({
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
	};

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
			selectRow: this.selectRow,
			onSelect: val => this.selectRow = val,
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		const QueryView = Query[sourceType];
		const TableView = Table[sourceType];
		return (
			<div className="yc-assets-auction">
				{/* 查询模块 */}
				<QueryView onQueryChange={this.onQuery} />
				{/* tab切换 */}
				<TabsIntact
					ref={e => this.tabIntactDom = e}
					onChange={this.onSourceType}
					source={this.config}
					sourceType={sourceType}
					field="process"
					toRefresh={val => this.config = val}
				/>
				{/* 操作栏 */}
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
									api={API(sourceType, 'exportList')}
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
								api={API(sourceType, 'exportList')}
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
				{/* 表格数据展示模块 */}
				<Spin visible={loading}>
					<TableView {...tableProps} />
				</Spin>

			</div>
		);
	}
}
