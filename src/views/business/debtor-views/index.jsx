import React from 'react';
import {
	Select, message, Pagination, Form, Modal,
} from 'antd';
import {
	Spin, Input, Button, Download,
} from '@/common';
import {
	obligorList, exportExcel, openPush, closePush,
} from '@/utils/api/debator';
import { clearEmpty } from '@/utils';
import TableList from './table';
import './style.scss';

const _style1 = { width: 278 };
const _style2 = { width: 150 };
const _style3 = { width: 120 };

// const dishonestList = [
// 	{ id: 1, name: '全部', value: '' },
// 	{ id: 2, name: '未失信', value: 0 },
// 	{ id: 3, name: '已失信', value: 1 },
// 	{ id: 4, name: '曾失信', value: 2 },
// ];
// const bankruptList = [
// 	{ id: 1, name: '全部', value: '' },
// 	{ id: 2, name: '存在破产/重整风险', value: 0 },
// 	{ id: 3, name: '暂未匹配破产风险', value: 1 },
// ];
const { confirm } = Modal;
class BusinessDebtor extends React.Component {
	constructor(props) {
		super(props);
		document.title = '债务人-业务管理';
		this.state = {
			totals: 0,
			current: 1, // 当前页
			pageSize: 10, // 默认展示条数
			loading: false,
			searchValue: null,
			dataList: [],
			selectIds: [],
			manage: false,
		};
		this.condition = {};
	}

	componentDidMount() {
		this.getData();
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}


	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.search();
	};

	// 获取消息列表
	getData = (value) => {
		const {
			current, pageSize, startTime, endTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fieldsValue = getFieldsValue();
		const params = {
			num: pageSize,
			page: current,
			...fieldsValue,
			...value,
			uploadTimeStart: startTime, // 搜索时间
			uploadTimeEnd: endTime,
		};
		this.setState({
			loading: true,
		});
		obligorList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 导出
	toExportCondition = (type) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const {
			startTime, endTime, selectedRowKeys,
		} = this.state;
		const fields = getFieldsValue();
		const params = {
			...fields,
			uploadTimeStart: startTime || null, // 搜索时间
			uploadTimeEnd: endTime || null,
		};
		if (type === 'all') {
			return Object.assign({}, params);
		}
		return Object.assign({}, params, { idList: selectedRowKeys });
	};

	// 搜索
	search = () => {
		const { pageSize } = this.state; // 会提示props is not defined
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const values = getFieldsValue();

		const params = {
			...values,
			page: 1,
			num: pageSize,
			...this.condition,
		};
		this.getData(params);
		this.setState({
			searchValue: params,
		});
	};

	onShowSizeChange = (p) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const values = getFieldsValue();
		const params = {
			...values,
			page: 1,
			num: p,
			...this.condition,
		};
		this.setState({ pageSize: p });
		this.getData(params);
	};


	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		const params = {
			page: 1,
		};
		this.getData(clearEmpty(params));
		this.setState({
			searchValue: '',
		});
	};

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		const params = {
			...searchValue,
			current: val,
			num: pageSize,
			page: val,
		};
		this.setState({
			loading: true,
		});
		obligorList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	selectedRowKeys = (val) => {
		this.setState({ selectIds: val });
	};

	handleClosePush = () => {
		const { selectIds } = this.state;
		const that = this;
		if (selectIds.length === 0) {
			message.warn('请选择债务人');
			return;
		}
		const content = '点击确定，系统将不再为您推送所选债务人的监控信息。';
		const iconType = 'none';
		confirm({
			title: '确认关闭所选债务人的推送功能?',
			content,
			iconType,
			className: iconType === 'none' ? 'message-confirm-no-icon' : 'message-confirm-icon',
			onOk() {
				that.setState({ loading: true });
				closePush({ idList: selectIds }).then((res) => {
					that.setState({ loading: false });
					if (res.code === 200) {
						message.success('关闭成功');
						that.setState({ manage: false, selectIds: [] });
						that.getData();
					} else if (res.code === 9003) {
						message.error(res.message);
					}
				}).catch(() => {
					that.setState({ loading: false });
				});
			},
			onCancel() {},
		});
	};

	handleOpenPush = () => {
		const { selectIds } = this.state;
		const that = this;
		if (selectIds.length === 0) {
			message.warn('请选择债务人');
			return;
		}
		const content = '点击确定，系统将为您推送所选债务人的监控信息。';
		const iconType = 'none';
		confirm({
			title: '确认开启所选债务人的推送功能?',
			content,
			iconType,
			className: iconType === 'none' ? 'message-confirm-no-icon' : 'message-confirm-icon',
			onOk() {
				that.setState({ loading: true });
				openPush({ idList: selectIds }).then((res) => {
					that.setState({ loading: false });
					if (res.code === 200) {
						message.success('开启成功');
						that.setState({ manage: false, selectIds: [] });
						that.getData();
					} else if (res.code === 9003) {
						message.error(res.message);
					}
				});
			},
			onCancel() {},
		}).catch(() => {
			that.setState({ loading: false });
		});
	};

	render() {
		const {
			totals, current, loading, dataList, pageSize, manage, selectIds,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		// 排序相关字段
		const sortInfo = {
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		return (
			<div className="yc-content-query" style={{ padding: 20 }}>
				<div className="yc-query-item">
					<Input
						title="债务人"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="姓名/公司名称"
						{...getFieldProps('obligorName', { getValueFromEvent: e => e.trim() })}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						style={_style1}
						maxLength="18"
						size="large"
						placeholder="身份证号/统一社会信用代码"
						{...getFieldProps('obligorNumber', { getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-*（）()]/g, '') })}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">失信状态: </span>
					<Select
						size="large"
						defaultValue="all"
						style={_style3}
						{...getFieldProps('dishonestStatus', { initialValue: '' })}
					>
						{[
							{ id: 1, name: '全部', value: '' },
							{ id: 2, name: '未失信', value: 0 },
							{ id: 3, name: '已失信', value: 1 },
							{ id: 4, name: '曾失信', value: 2 },
						].map(item => <Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>)}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">限高状态: </span>
					<Select
						size="large"
						style={_style3}
						defaultValue="all"
						{...getFieldProps('limitHeightStatus', { initialValue: '' })}
					>
						{[
							{ id: 1, name: '全部', value: '' },
							{ id: 2, name: '未限高', value: 0 },
							{ id: 3, name: '已限高', value: 1 },
						].map(item => <Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>)}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">破产情况: </span>
					<Select
						size="large"
						defaultValue="all"
						style={_style2}
						{...getFieldProps('bankruptcyStatus', {
							initialValue: '',
						})}
					>
						{[
							{ id: 1, name: '全部', value: '' },
							{ id: 2, name: '存在破产/重整风险', value: 1 },
							{ id: 3, name: '暂未匹配破产风险', value: 0 },
						].map(item => <Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>)}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">是否借款人: </span>
					<Select
						size="large"
						defaultValue="all"
						style={_style3}
						{...getFieldProps('isBorrower', { initialValue: '' })}
					>
						{[
							{ id: 1, name: '全部', value: '' },
							{ id: 2, name: '是', value: true },
							{ id: 3, name: '否', value: false },
						].map(item => <Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>)}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">推送状态: </span>
					<Select
						size="large"
						defaultValue="all"
						style={_style3}
						{...getFieldProps('pushState', { initialValue: '' })}
					>
						{[
							{ id: 1, name: '全部', value: '' },
							{ id: 2, name: '开启', value: 1 },
							{ id: 3, name: '关闭', value: 0 },
						].map(item => <Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>)}
					</Select>
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
					<Button onClick={this.queryReset} size="large" style={{ width: 120, marginRight: 0 }}>重置查询条件</Button>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />

				<div className="yc-business-table-btn">
					{
						!manage ? (
							<div className="yc-public-floatRight">
								<Download condition={() => this.toExportCondition('all')} style={{ marginRight: 0 }} api={exportExcel} all text="一键导出" />
								{
									!global.isProxyLimit && (
										<Button style={{ margin: '0 0 0 10px' }} onClick={() => this.setState({ manage: true })}>批量管理</Button>
									)
								}
							</div>
						) : (
							<div className="yc-public-floatRight">
								<Button
									onClick={() => { this.handleClosePush(); }}
									title="关闭推送"
								/>
								<Button
									onClick={() => { this.handleOpenPush(); }}
									title="开启推送"
								/>
								<Button
									type="common"
									onClick={() => {
										this.setState({ manage: false, selectIds: [] });
									}}
									title="取消批量管理"
								/>
							</div>
						)
					}
				</div>

				<Spin visible={loading}>
					<TableList key={manage} selectIds={selectIds} stateObj={this.state} manage={manage} dataList={dataList} getData={this.getData} {...sortInfo} onSelect={(val) => { this.selectedRowKeys(val); }} />
					{dataList && dataList.length > 0 && (
					<div className="yc-table-pagination">
						<Pagination
							total={totals}
							current={current}
							defaultPageSize={pageSize} // 默认条数
							showQuickJumper
							pageSizeOptions={['10', '25', '50']}
							showSizeChanger
							onShowSizeChange={(c, p) => this.onShowSizeChange(p)}
							showTotal={total => `共 ${total} 条记录`}
							onChange={(val) => {
								this.handleChangePage(val);
							}}
						/>
					</div>
					)}
				</Spin>
			</div>
		);
	}
}
export default Form.create()(BusinessDebtor);
