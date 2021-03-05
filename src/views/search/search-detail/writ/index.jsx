/* eslint-disable no-restricted-syntax */
import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Select, message, Pagination,
} from 'antd';
import { navigate } from '@reach/router';
import {
	judgement, // 列表
	exportWritAll, // 导出所有
	exportWritCurrent, // 本页导出
} from '@/utils/api/search';
import {
	Spin, Input, Button, timeRule, Download, DatePicker,
} from '@/common';
import { ScrollAnimation } from '@/utils/changeTime';
import { parseQuery, generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import WritTable from './table';
import './style.scss';

const _style1 = { width: 278 };
const _style2 = { width: 116 };
const _style3 = { width: 140 };
const _style4 = { width: 1160 };
const { Option } = Select;
const createForm = Form.create;

class WRIT extends React.Component {
	constructor(props) {
		super(props);
		document.title = '文书信息-信息搜索';
		this.state = {
			dataList: [],
			loading: false,
			params: {},
			startTime: undefined,
			endTime: undefined,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
			Sort: undefined,
			SortTime: undefined,
			inputSearch: {},
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		console.log(params);
		// 判断是否为空对象,非空请求接口
		if (Object.keys(params).length !== 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			params,
			startTime: params.publishStart,
			endTime: params.publishEnd,
		});
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
			current, pageSize, startTime, endTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const Fields = getFieldsValue();

		const params = {
			num: pageSize,
			page: current,
			...Fields,
			publishStart: startTime,
			publishEnd: endTime,
			...value,
		};
		this.setState({
			loading: true,
		});
		judgement(params).then((res) => {
			if (res && res.data) {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page,
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

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current: 1,
			page: 1,
			Sort: undefined,
			SortTime: undefined,
		});
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const { startTime, endTime } = this.state;
		const Fields = getFieldsValue();
		const params = {
			...Fields,
			current: 1,
			num: pageSize,
			page: 1,
			publishStart: startTime,
			publishEnd: endTime,
		};
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(Fields)) {
			this.getData(params); // 进入页面请求数据
		}
	};

	// page翻页
	handleChangePage = (val) => {
		const {
			pageSize, startTime, endTime, SortTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const Fields = getFieldsValue();
		const params = {
			...Fields,
			sort: SortTime,
			publishStart: startTime,
			publishEnd: endTime,
			num: pageSize,
			page: val,
		};
		this.setState({
			page: val,
			loading: true,
		});
		// 获取当前高度，动态移动滚动条
		const currentY = document.documentElement.scrollTop || document.body.scrollTop;
		ScrollAnimation(currentY, 0);
		judgement(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page,
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

	// 时间排序
	SortTime = () => {
		const { dataList, Sort, inputSearch } = this.state;
		let _Sort;
		if (Sort === undefined)_Sort = 'DESC';
		if (Sort === 'DESC')_Sort = 'ASC';
		if (Sort === 'ASC') _Sort = undefined;
		const params = {
			sort: _Sort === undefined ? undefined : _Sort === 'DESC' ? 0 : 1,
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			Sort: _Sort,
			SortTime: params.sort,
		});
	};

	// 搜索
	search = () => {
		const { form: { getFieldsValue } } = this.props; // 会提示props is not defined
		const { startTime, endTime } = this.state;
		const Fields = getFieldsValue();
		Fields.publishStart = startTime;
		Fields.publishEnd = endTime;
		const { pageSize } = this.state;
		navigate(generateUrlWithParams('/search/detail/writ', Fields));
		this.setState({
			page: 1,
			inputSearch: Fields,
			Sort: undefined,
			SortTime: undefined,
		});

		const params = {
			...Fields,
			page: 1,
			num: pageSize,
		};

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(Fields)) {
			this.getData(params); // 进入页面请求数据
		} else {
			this.queryReset();
			// message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		navigate('/search/detail/writ');
		this.setState({
			params: {},
			dataList: [],
			totals: 0,
			pageSize: 10,
			page: 1,
			Sort: undefined,
			SortTime: undefined,
			startTime: undefined,
			endTime: undefined,
		});
		resetFields('');
	};

	// 导出
	toExportCondition=(type) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const {
			SortTime, pageSize, current, startTime, endTime,
		} = this.state;
		const fields = getFieldsValue();

		const params = {
			...fields,
			publishStart: startTime,
			publishEnd: endTime,
			sort: SortTime,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
		};
		return Object.assign({}, params);
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
			<React.Fragment>
				<div className="yc-content-query">
					<div className="yc-query-item">
						<Input
							title="全文"
							style={_style4}
							size="large"
							placeholder="姓名/公司名称/关键字"
							{...getFieldProps('content', {
								initialValue: params ? params.content : '',
								getValueFromEvent: e => e.trim().replace(/\s+/g, ' '),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="案号"
							style={_style1}
							size="large"
							maxLength="40"
							placeholder="案件编号"
							{...getFieldProps('ah', {
								initialValue: params ? params.ah : '',
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="案由"
							style={_style1}
							size="large"
							maxLength="40"
							placeholder="案件内容提要"
							{...getFieldProps('reason', {
								initialValue: params ? params.reason : '',
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="起诉法院"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="法院名称"
							{...getFieldProps('court', {
								initialValue: params ? params.court : '',
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div>
						<div className="yc-query-item">
							<span className="yc-query-item-lable">发布时间: </span>
							<DatePicker
								size="large"
								allowClear
								style={_style2}
								placeholder="开始日期"
								{...getFieldProps('publishStart', {
									initialValue: params ? params.publishStart : '',
									onChange: (value, dateString) => {
										this.setState({
											startTime: dateString,
										});
									},
									...timeOption,
								})}
								disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishEnd'))
						}
							/>
							<span className="yc-query-item-lable">至</span>
							<DatePicker
								size="large"
								allowClear
								style={_style2}
								placeholder="结束日期"
								{...getFieldProps('publishEnd', {
									initialValue: params ? params.publishEnd : '',
									onChange: (value, dateString) => {
										this.setState({
											endTime: dateString,
										});
									},
									...timeOption,
								})}
								disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishStart'))
							}
							/>
						</div>
						<div className="yc-query-item">
							<span className="yc-query-item-title">案件类型: </span>
							<Select
								size="large"
								allowClear
								style={_style3}
								placeholder="请选择案件类型"
								{...getFieldProps('caseType', {
									initialValue: params ? params.caseType : '',
								})}
							>
								<Option value="民事案件">民事案件</Option>
								<Option value="行政案件">行政案件</Option>
								<Option value="执行案件">执行案件</Option>
								<Option value="刑事案件">刑事案件</Option>
								<Option value="赔偿案件">赔偿案件</Option>
								<Option value="强制清算与破产案件">强制清算与破产案件</Option>
								<Option value="其他">其他</Option>
							</Select>
						</div>
						<div className="yc-query-item yc-query-item-btn">
							<Button
								onClick={this.search}
								size="large"
								type="common"
								style={{ width: 84 }}
							>
								查询
							</Button>
							<Button
								onClick={this.queryReset}
								size="large"
								style={{ width: 120 }}
							>
								重置查询条件
							</Button>
						</div>
					</div>
					{/* 分隔下划线 */}
					<div className="yc-noTab-hr" />
					<div className="yc-writ-tablebtn">
						{dataList.length > 0 && <Download condition={() => this.toExportCondition('current')} style={{ marginRight: 10 }} api={exportWritCurrent} current page num text="本页导出" />}
						<Download disabled={dataList.length === 0} condition={() => this.toExportCondition('all')} api={exportWritAll} all page num text="全部导出" />
						{dataList.length > 0 && (
						<div
							className="yc-public-floatRight"
							style={{
								lineHeight: '30px', color: '#929292', fontSize: '12px',
							}}
						>
							{`为您找到${totals}条信息`}
						</div>
						)}
					</div>
					<Spin visible={loading}>
						<WritTable
							stateObj={this.state}
							dataList={dataList}
							getData={this.getData}
							openPeopleModal={this.openPeopleModal}
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
						{/* <div style={{ */}
						{/*	color: '#929292', fontSize: 12, textAlign: 'right', lineHeight: 1, paddingBottom: '20px', */}
						{/* }} */}
						{/* > */}
						{/*	如需更多数据请联系：180-7294-2900 */}
						{/* </div> */}
						{/* )} */}
					</Spin>
				</div>
			</React.Fragment>
		);
	}
}

export default createForm()(WRIT);
