import React from 'react';
import {
	Form, Select, message, Pagination,
} from 'antd';
import { navigate } from '@reach/router';
import {
	Spin, Input, Button, timeRule, Download, DatePicker,
} from '@/common';
import {
	parseQuery, generateUrlWithParams, objectKeyIsEmpty,
} from '@/utils';
import {
	equityPledgeExport, // 本页导出
	equityPledgeExportAll, // 导出全部
	equityPledgeSearch, // 全文搜索
} from '@/utils/api/search';
import { ScrollAnimation } from '@/utils/changeTime';
import EquityPledgeTable from './table';

const _style1 = { width: 278 };
const _style2 = { width: 180 };
const createForm = Form.create;

class EquityPledge extends React.Component {
	constructor(props) {
		super(props);
		document.title = '股权质押-信息搜索';
		this.state = {
			dataList: [],
			params: {},
			loading: false,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
			sortColumn: undefined,
			sortOrder: undefined,
			Sort: undefined,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		this.setState({
			params,
		});
		// 判断是否为空对象,非空请求接口
		if (Object.keys(params).length !== 0) {
			this.getData(params); // 进入页面请求数据
		}
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

	// 获取消息列表
	getData = (value) => {
		const {
			current, pageSize,
		} = this.state;
		const { form } = this.props;
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const params = {
			num: pageSize,
			page: current,
			...Fields,
			...value,
		};
		this.setState({
			loading: true,
		});
		equityPledgeSearch(params).then((res) => {
			if (res && res.data) {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current,
			page: current,
		});

		const { form } = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			current,
			num: pageSize,
			page: current,
		};
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fields)) {
			this.getData(params); // 进入页面请求数据
		}
	};

	// page翻页
	handleChangePage = (val) => {
		const {
			pageSize, sortColumn, sortOrder,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const params = {
			...Fields,
			num: pageSize,
			page: val,
			sortColumn,
			sortOrder,
		};
		this.setState({
			current: val,
			page: val,
			loading: true,
		});
		this.getData(params);
	};

	// 搜索
	search = () => {
		const { form: { getFieldsValue } } = this.props;
		const fields = getFieldsValue();
		const { pageSize } = this.state;
		navigate(generateUrlWithParams('/search/detail/equityPledge', fields));
		this.setState({
			page: 1,
			current: 1,
			params: fields,
			sortOrder: undefined,
			Sort: undefined,
		});
		const params = {
			...fields,
			page: 1,
			num: pageSize,
		};

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fields)) {
			this.getData(params);
		} else {
			this.queryReset();
			// message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props;
		const { resetFields } = form;
		navigate('/search/detail/equityPledge');
		this.setState({
			params: {},
			dataList: [],
			totals: 0,
			pageSize: 10,
			page: 1,
			sortOrder: undefined,
			Sort: undefined,
		});
		resetFields('');
	};

	// 导出
	toExportCondition=(type) => {
		const {
			pageSize, current, sortOrder, sortColumn,
		} = this.state;
		const { form } = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
			sortOrder,
			sortColumn,
		};
		return Object.assign({}, params);
	};

	// 时间排序
	SortTime = () => {
		const {
			params, Sort, dataList, pageSize, page,
		} = this.state;
		let _Sort;
		if (Sort === undefined) _Sort = 'DESC';
		if (Sort === 'DESC') _Sort = 'ASC';
		if (Sort === 'ASC') _Sort = undefined;
		const sortColumn = _Sort === undefined ? undefined : 'REG_DATE';
		const sortOrder = _Sort;
		const Params = {
			sortColumn,
			sortOrder,
			...params,
			page,
			num: pageSize,
		};
		// 判断是否为空对象,非空请求接口
		if (dataList.length > 0) {
			this.getData(Params);
		}
		this.setState({
			Sort: _Sort,
			sortOrder: _Sort,
			sortColumn,
		});
	};

	render() {
		const {
			loading, dataList, params, totals, current, page, pageSize, Sort,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input
						title="个人/企业"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="个人/企业名称"
						{...getFieldProps('name', {
							initialValue: params.name,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">质押角色: </span>
					<Select
						size="large"
						allowClear
						placeholder="请选择质押角色"
						style={_style2}
						{...getFieldProps('role', {
							initialValue: params.role,
						})}
					>
						<Select.Option key="0" value="0">出质人</Select.Option>
						<Select.Option key="1" value="1">质权人</Select.Option>
					</Select>
				</div>
				<div className="yc-query-item">
					<Input
						title="标的企业"
						maxLength="40"
						style={_style1}
						size="large"
						placeholder="股权标的企业名称"
						{...getFieldProps('companyName', {
							initialValue: params.companyName,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">登记状态: </span>
					<Select
						size="large"
						allowClear
						placeholder="请选择登记状态"
						style={_style2}
						{...getFieldProps('state', {
							initialValue: params.state,
						})}
					>
						<Select.Option key="0" value="0">有效</Select.Option>
						<Select.Option key="1" value="1">无效</Select.Option>
					</Select>
				</div>
				<div>
					<div className="yc-query-item">
						<span className="yc-query-item-lable">登记日期: </span>
						<DatePicker
							{...getFieldProps('regDateStart', {
								initialValue: params.regDateStart,
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('regDateEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-lable">至</span>
						<DatePicker
							{...getFieldProps('regDateEnd', {
								initialValue: params.regDateEnd,
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('regDateStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 110, marginRight: 0 }}>重置查询条件</Button>
					</div>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
				<div className="yc-auction-tablebtn">
					{
						dataList.length > 0 && (
						<Download
							condition={() => this.toExportCondition('current')}
							style={{ marginRight: 10 }}
							api={equityPledgeExport}
							current
							page
							num
							text="本页导出"
						/>
						)
					}
					<Download
						disabled={dataList.length === 0}
						condition={() => this.toExportCondition('all')}
						api={equityPledgeExportAll}
						all
						page
						num
						text="全部导出"
					/>
					<div className="yc-btn-right">
						{dataList.length > 0 && <span className="yc-right-total">{`为您找到${totals}条信息`}</span>}
					</div>
				</div>
				<Spin visible={loading}>
					<EquityPledgeTable
						dataList={dataList}
						getData={this.getData}
						SortTime={this.SortTime}
						Sort={Sort}
					/>
					{dataList && dataList.length > 0 && (
					<div className="yc-table-pagination">
						<Pagination
							total={totals && totals > 1000 ? 1000 : totals}
							current={current}
							pageSize={pageSize} // 默认条数
							pageSizeOptions={['10', '25', '50']}
							showQuickJumper
							showSizeChanger
							onShowSizeChange={this.onShowSizeChange}
							showTotal={() => `共 ${totals} 条记录`}
							onChange={(val) => {
								// 存在数据才允许翻页
								if (dataList.length > 0) {
									this.handleChangePage(val);
								}
							}}
						/>
					</div>
					)}
					{/* {page === 100 && ( */}
					{/*	<div style={{ */}
					{/*		color: '#929292', fontSize: 12, textAlign: 'right', lineHeight: 1, paddingBottom: '20px', */}
					{/*	}} */}
					{/*	> */}
					{/*		如需更多数据请联系：180-7294-2900 */}
					{/*	</div> */}
					{/* )} */}
				</Spin>
			</div>
		);
	}
}

export default createForm()(EquityPledge);
