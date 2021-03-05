import React from 'react';
import { Modal, message } from 'antd';
import {
	Button, Tabs, Spin, Download, Icon,
} from '@/common';
import { readAllStatusBid, readAllStatusMerchants, readAllStatusPub } from '@/utils/api/monitor-info/finance';
import Apis from '@/utils/api/monitor-info/finance';
import { clearEmpty, changeURLArg } from '@/utils';
import { unReadCount } from '@/utils/api/monitor-info';
import { promiseAll } from '@/utils/promise';
import { getUrlParams } from '@/views/asset-excavate/query-util';
import TableBidding from './table/bidding';
import TableMerchants from './table/merchants';
import QueryBidding from './query/bidding';
import QueryMerchants from './query/merchants';
import QueryPublicity from './query/publicity';
import TablePublicity from './table/publicity';

const sourceTypeMap = new Map([
	[1, 'auctionBiddingCount'],
	[2, 'financeInvestment'],
	[3, 'financeCount'],
	['default', 'auctionBiddingCount'],
]);

// export const peojectStatusMap = new Map([
// 	[1, '预披露'],
// 	[2, '等待挂牌'],
// 	[3, '挂牌中'],
// 	[4, '挂牌结束'],
// 	[5, '报名中'],
// 	[6, '报名结束'],
// 	[7, '竞价中'],
// 	[8, '竞价结束'],
// 	[9, '已成交'],
// 	[10, '已结束'],
// 	[11, '中止'],
// 	[0, '未知'],
// ]);

// 获取api具体
const api = (field, type) => {
	if (type === 1) return Apis[`${field}Bid`];
	if (type === 2) return Apis[`${field}Merchants`];
	if (type === 3) return Apis[`${field}Pub`];
	return Apis[`${field}Bid`];
};

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		document.title = '金融资产-资产挖掘';
		// 获取当前页面路由配置
		const _rule = () => ([
			{
				id: 1,
				name: '竞价项目',
				dot: false,
				status: true,
				number: 0,
				showNumber: true,
			},
			{
				id: 2,
				name: '招商项目',
				status: true,
				number: 0,
				showNumber: true,
				dot: false,
			},
			{
				id: 3,
				name: '公示项目',
				status: true,
				dot: false,
				number: 0,
				showNumber: true,
			},
		]).filter(item => item.status);
		this.state = {
			sourceType: 1,
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
		const sourceType = Tabs.Simple.toGetDefaultActive(tabConfig, 'class');
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

	// 获取URL里的参数
	isUrlParams = (sourceType) => {
		const url = window.location.hash;
		if (url.indexOf('?') !== -1) {
			let dParams = {};
			if (sourceType === 1) {
				dParams = getUrlParams(url, 'updateTimeStart', 'updateTimeEnd');
			}
			if (sourceType === 2) {
				dParams = getUrlParams(url, 'gmtModifyStart', 'gmtModifyEnd');
			}
			if (sourceType === 3) {
				dParams = getUrlParams(url, 'gmtModifiedStart', 'gmtModifiedEnd');
			}
			return dParams;
		}
		return '';
	};

	// 获取三类数据的统计信息
	toInfoCount = (sourceType) => {
		const promiseArray = [];
		promiseArray.push(Apis.infoListCountBid(sourceType === 1 ? this.condition : this.isUrlParams(1)));
		promiseArray.push(Apis.infoListCountMerchants(sourceType === 2 ? this.condition : this.isUrlParams(2)));
		promiseArray.push(Apis.infoListCountPub(sourceType === 3 ? this.condition : this.isUrlParams(3)));

		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到, 返回的其实是resolved
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			const { tabConfig } = this.state;
			const newConfig = [];
			tabConfig.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				const itemContent = { ...item, number: res.filter(it => it.id === item.id)[0].data || 0 };
				newConfig.push(itemContent);
			});
			this.setState({
				tabConfig: newConfig,
			});
		}).catch((reason) => {
			console.log('promise reject failed reason ===', reason);
		});
	};

	// 切换列表类型
	handleReadChange = (val) => {
		const { sourceType } = this.state;
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val, 1);
		this.onUnReadCount(sourceType);
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
					if (sourceType === 1) {
						readAllStatusBid({}).then((res) => {
							if (res.code === 200) {
								_this.onQueryChange();
								_this.onUnReadCount();
							}
						});
					} else if (sourceType === 2) {
						readAllStatusMerchants({}).then((res) => {
							if (res.code === 200) {
								_this.onQueryChange();
								_this.onUnReadCount();
							}
						});
					} else if (sourceType === 3) {
						readAllStatusPub({}).then((res) => {
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

	// sourceType变化
	onSourceType = (val) => {
		this.setState({
			sourceType: val,
			dataSource: '',
			isRead: 'all',
			current: 1,
			total: '',
		});
		this.onUnReadCount();
		this.toClearSortStatus();
		this.onQueryChange(this.isUrlParams(val), val, 'all', 1);
		this.selectRow = [];
		window.location.href = changeURLArg(window.location.href, 'class', val);
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
		const { sourceType } = this.state;
		this.toClearSortStatus();
		this.onUnReadCount(sourceType);
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
	onUnReadCount = (sourceType) => {
		const { tabConfig } = this.state;
		unReadCount().then((res) => {
			const { data, code } = res;
			// console.log('data onUnReadCount === ', data);
			let _tabConfig = [];
			if (code === 200) {
				if (sourceType && sourceType > 0) {
					_tabConfig = tabConfig.map((item) => {
						const _item = item;
						if (_item.id === sourceType) {
							_item.dot = data[sourceTypeMap.get(sourceType)];
						}
						return _item;
					});
				} else {
					_tabConfig = tabConfig.map((item) => {
						const _item = item;
						if (_item.id === 1)_item.dot = data.auctionBiddingCount;
						if (_item.id === 2)_item.dot = data.financeInvestment;
						if (_item.id === 3)_item.dot = data.financeCount;
						return _item;
					});
				}
				// console.log('_tabConfig === ', _tabConfig);
				this.setState({ tabConfig: _tabConfig }, () => {
					this.toInfoCount(sourceType);
				});
			} else {
				this.toInfoCount(sourceType);
			}
		}).catch(() => {
			this.toInfoCount(sourceType);
		});
	};

	// 取消批量管理选择框
	clearSelectRowNum = () => this.selectRow = [];

	render() {
		const {
			sourceType, isRead, dataSource, current, total, tabConfig, manage, loading,
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
				{ sourceType === 1 ?	<QueryBidding onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{ sourceType === 2 ?	<QueryMerchants onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{ sourceType === 3 ?	<QueryPublicity onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={tabConfig}
					field="class"
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button
								active={isRead === 'all'}
								onClick={() => this.handleReadChange('all')}
								title="全部"
							/>
							<Button
								active={isRead === 'else'}
								onClick={() => this.handleReadChange('else')}
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
									api={api('exportList', sourceType)}
								/>
								<Button style={{ margin: '0 0 0 10px' }} onClick={() => this.setState({ manage: true })}>批量管理</Button>
							</div>
						</div>
					) : (
						<div className="yc-batch-management">
							<Button onClick={this.handleAttention} title="收藏" />
							<Download
								text="导出"
								field="idList"
								waringText="未选中数据"
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
					{sourceType === 1 ? <TableBidding {...tableProps} /> : null }
					{sourceType === 2 ? <TableMerchants {...tableProps} /> : null }
					{sourceType === 3 ? <TablePublicity {...tableProps} /> : null }
				</Spin>
			</div>
		);
	}
}
