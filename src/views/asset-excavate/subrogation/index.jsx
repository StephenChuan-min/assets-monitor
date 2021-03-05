import React from 'react';
import { Modal, message } from 'antd';

import {
	Button, Tabs, Spin, Download, Icon,
} from '@/common';
import API from '@/utils/api/monitor-info/subrogation';
import { changeURLArg, clearEmpty } from '@/utils';
import QueryView from './queryView';
import { TableCourt, TableTrial, TableJudgment } from './table';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		document.title = '代位权-资产挖掘';
		this.state = {
			sourceType: 1,
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
			tabConfig: [
				{
					id: 1,
					name: '立案信息',
					dot: false,
					number: 0,
					showNumber: true,
				},
				{
					id: 2,
					name: '开庭公告',
					number: 0,
					dot: false,
					showNumber: true,
				},
				{
					id: 3,
					name: '裁判文书',
					number: 0,
					dot: false,
					showNumber: true,
				},
			],
		};
		this.condition = {};
		this.queryCondition = {};
		this.readStatus = {};
		this.selectRow = [];
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		this.setState({
			sourceType: Tabs.Simple.toGetDefaultActive(tabConfig, 'process'),
		}, () => {
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
	toInfoCount=() => {
		const { tabConfig, sourceType } = this.state;
		// const _t = nextSourceType || sourceType;
		[1, 2, 3].forEach((i) => {
			if (i !== sourceType) {
				const params = Object.assign({}, this.toHandleReqTime(i, this.queryCondition), this.queryCondition);
				API(i, 'listReadCount')(clearEmpty(params)).then((res) => {
					tabConfig[i - 1].number = res.count;
					tabConfig[i - 1].dot = res.unRead;
					this.setState({ tabConfig });
				});
			} else {
				const params = Object.assign({ isRead: false }, this.queryCondition);
				API(i, 'listCount')(clearEmpty(params)).then((res) => {
					tabConfig[i - 1].dot = res.data;
					this.setState({ tabConfig });
				});
			}
		});
	};

	// 切换列表类型
	handleReadChange=(val) => {
		const { tabConfig } = this.state;
		const _tabConfig = tabConfig.map((item) => {
			const _item = Object.assign({}, item);
			_item.dot = false;
			_item.showNumber = true;
			return _item;
		});
		this.setState({ isRead: val, tabConfig: _tabConfig }, () => {
			this.onQueryChange(this.condition, 1);
		});
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		const { sourceType, tabConfig } = this.state;
		if (tabConfig[sourceType - 1].dot) {
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
	handleAttention=() => {
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

	// 修改请求参数【开庭】【立案】【裁判文书】
	toHandleReqTime=(__sourceType, __con) => {
		const GmtTime = {};
		if (__sourceType === 2) {
			GmtTime.startGmtTrial = __con.startGmt;
			GmtTime.endGmtTrial = __con.endGmt;
		} else if (__sourceType === 1) {
			GmtTime.startGmtRegister = __con.startGmt;
			GmtTime.endGmtRegister = __con.endGmt;
		} else {
			GmtTime.startGmtJudgment = __con.startGmt;
			GmtTime.endGmtJudgment = __con.endGmt;
		}
		return GmtTime;
	};

	// sourceType变化
	onSourceType=(sourceType) => {
		this.setState({
			sourceType,
			dataSource: '',
			current: 1,
			total: '',
			isRead: 'all',
		}, () => {
			this.selectRow = [];
			this.toClearSortStatus();
			this.onQueryChange('', 1);
		});
		window.location.href = changeURLArg(window.location.href, 'process', sourceType);
	};

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		// this.selectRow = [];
		this.onQueryChange('', val, manage);
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, 1);
		this.selectRow = [];
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.queryCondition = con;
		this.onQueryChange(con, 1);
	};

	// 发起查询请求
	onQueryChange=(con, page, _manage) => {
		const {
			sourceType: type, isRead, current, tabConfig,
		} = this.state;

		this.condition = Object.assign({}, con || this.condition, {
			page: page || current,
			num: 10,
		});

		/* load 展示 */
		this.setState({
			loading: true,
			manage: _manage || false,
		});

		/* 处理数据状态，是 全部、未读、还是只显示执恢 */
		this.readStatus = {};
		if (isRead === 'unread') this.readStatus.isRead = 0;
		if (isRead === 'resume') this.readStatus.isRestore = true;

		/* 三级tab 数据统计 */
		this.toInfoCount(type, isRead);

		// 主要请求
		const params = Object.assign({ selectType: type },
			this.toHandleReqTime(type, this.condition), this.condition, this.readStatus);
		delete params.startGmt;
		delete params.endGmt;
		console.log('clear', clearEmpty(params));
		API(type, 'list')(clearEmpty(params)).then((res) => {
			const { sourceType: selectType } = this.state;
			if (res.selectType === selectType) {
				if (res.code === 200) {
					tabConfig[type - 1].number = res.data.total;
					// this.setState({ tabConfig });
					this.setState({
						dataSource: res.data.list,
						current: res.data.page,
						total: res.data.total,
						tabConfig,
						loading: false,
					});
				} else {
					message.error(res.message || '网络请求异常请稍后再试！');
					this.setState({
						loading: false,
					});
				}
			}
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
			sourceType, isRead, dataSource, current, total, tabConfig, manage, loading,
		} = this.state;
		const tableProps = {
			loading,
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
		return (
			<div className="yc-assets-auction">
				{/* 查询模块 */}
				<QueryView onQueryChange={this.onQuery} sourceType={sourceType} clearSelectRowNum={this.clearSelectRowNum} />
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
				{/* tab切换 */}
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
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
							{sourceType !== 2 ? (
								<Button
									active={isRead === 'resume'}
									onClick={() => this.handleReadChange('resume')}
								>
									只显示执恢案件
								</Button>
							) : null}

							<div className="yc-all-read" onClick={this.handleAllRead}>
								<Icon className="yc-all-clear" type="icon-clear" />
								<span className="yc-all-read-text">全部标为已读</span>
							</div>
							<div className="yc-public-floatRight">
								<Download
									all
									text="一键导出"
									condition={() => Object.assign({}, this.toHandleReqTime(sourceType, this.condition), this.condition, this.readStatus)}
									api={API(sourceType, 'exportList')}
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
								field="idList"
								waringText="未选中数据"
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
				{/* 表格数据展示模块  */}
				<Spin visible={loading}>
					{sourceType === 1 ? <TableTrial {...tableProps} /> : null}
					{sourceType === 2 ? <TableCourt {...tableProps} /> : null}
					{sourceType === 3 ? <TableJudgment {...tableProps} /> : null}
					{/* { */}
					{/* sourceType === 3 */}
					{/* ? */}
					{/* : <TableView {...tableProps} sourceType={sourceType} /> */}
					{/* } */}
				</Spin>

			</div>
		);
	}
}
