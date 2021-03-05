import React from 'react';
import { Modal, message } from 'antd';
import {
	Button, Download, Icon, Spin,
} from '@/common';
import {
	infoList, readStatus, exportList, follow,
} from '@/utils/api/monitor-info/bankruptcy';
import { clearEmpty } from '@/utils';
import { unReadCount } from '@/utils/api/monitor-info';
import Query from './query';
import Table from './table';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		document.title = '企业破产重组-风险监控';
		this.state = {
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
		};
		this.unReadCount = false;
		this.condition = {};
		this.selectRow = [];
	}

	componentDidMount() {
		const url = window.location.hash;
		if (url.indexOf('?') === -1) {
			this.onQueryChange({});
		}
		this.onUnReadCount();
	}

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 切换列表类型
	handleReadChange=(val) => {
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val, 1);
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		if (this.unReadCount) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
				iconType: 'exclamation-circle',
				onOk() {
					readStatus({}).then((res) => {
						if (res.code === 200) {
							_this.onQueryChange();
							_this.onUnReadCount();
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
			const { dataSource } = this.state;
			const _this = this;
			Modal.confirm({
				title: '确认收藏选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					follow({ idList }, true).then((res) => {
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

	// 查询是否有未读消息
	onUnReadCount=() => {
		unReadCount().then((res) => {
			const { data, code } = res;
			if (code === 200) {
				this.unReadCount = data.bankruptcyCount;
			}
		});
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', '', 1);
		this.selectRow = [];
	};

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		this.onQueryChange('', '', '', val, manage);
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 查询条件变化
	onQueryChange=(con, _sourceType, _isRead, page, _manage) => {
		const { isRead, current } = this.state;
		const __isRead = _isRead || isRead;
		this.condition = Object.assign({}, con || this.condition, {
			page: page || current,
		});
		if (__isRead === 'all') delete this.condition.isRead;
		if (__isRead === 'else') this.condition.isRead = 0;
		delete this.condition.sourceType;
		this.setState({
			loading: true,
			manage: _manage || false,
		});
		infoList(clearEmpty(this.condition)).then((res) => {
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
				<Query onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} />
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
								active={isRead === 'else'}
								onClick={() => this.handleReadChange('else')}
								title="只显示未读"
							/>
							<div className="yc-all-read" onClick={this.handleAllRead}>
								<Icon className="yc-all-clear" type="icon-clear" />
								<span className="yc-all-read-text">全部标为已读</span>
							</div>
							<div className="yc-public-floatRight">
								<Download condition={() => this.condition} api={exportList} all text="一键导出" />
								<Button style={{ margin: '0 0 0 10px' }} onClick={() => this.setState({ manage: true })}>批量管理</Button>
							</div>
						</div>
					) : (
						<div className="yc-batch-management">
							<Button onClick={this.handleAttention} title="收藏" />
							<Download
								condition={() => Object.assign({}, this.condition, { idList: this.selectRow })}
								api={exportList}
								selectIds
								selectedRowKeys={() => this.selectRow}
								field="idList"
								text="导出"
								waringText="未选中数据"
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
					<Table {...tableProps} />
				</Spin>
			</div>
		);
	}
}
