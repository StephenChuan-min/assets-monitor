import React from 'react';

import {
	Form, Pagination, message,
} from 'antd';
import { ScrollAnimation } from '@/utils/changeTime';
import { navigate } from '@reach/router';
import { parseQuery, generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import {
	timeRule, Spin, Input, Button, Download, DatePicker,
} from '@/common';
import {
	bankruptcySearch, // 列表
	exportBankruptcyAll, // 全部导出
	exportBankruptcyCurrent, // 本页导出
} from '@/utils/api/search';
import Bankruptcy from './table';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 278 };
const _style2 = { width: 116 };
class BANKRUPTCY extends React.Component {
	constructor(props) {
		super(props);
		this.scrollTop = React.createRef();
		document.title = '破产重组-信息搜索';
		this.state = {
			dataList: [],
			params: {},
			SortTime: undefined,
			Sort: undefined,
			publishDateStart: undefined,
			publishDateEnd: undefined,
			loading: false,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		window._addEventListener(document, 'keyup', this.toKeyCode13);
		this.setState({
			params,
			publishDateStart: params.publishDateStart,
			publishDateEnd: params.publishDateEnd,
		});
		// 判断是否为空对象,非空请求接口
		if (Object.keys(params).length !== 0) {
			this.getData(params); // 进入页面请求数据
		}
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
		const { form } = this.props; // 会提示props is not defined
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
		bankruptcySearch(params).then((res) => {
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

	// 时间排序
	SortTime = () => {
		const { dataList, Sort } = this.state;
		const { hash } = window.location;
		const urlObj = parseQuery(hash);

		let _Sort;
		if (Sort === undefined)_Sort = 'DESC';
		if (Sort === 'DESC')_Sort = 'ASC';
		if (Sort === 'ASC') _Sort = undefined;

		const params = {
			sort: _Sort === undefined ? undefined : _Sort === 'DESC' ? 0 : 1,
			...urlObj,
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
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const { pageSize, publishDateStart, publishDateEnd } = this.state;
		Fields.publishDateStart = publishDateStart;
		Fields.publishDateEnd = publishDateEnd;
		navigate(generateUrlWithParams('/search/detail/bankruptcy', Fields));
		this.setState({
			page: 1,
			Sort: undefined,
			SortTime: undefined,
		});
		const params = {
			...Fields,
			page: 1,
			num: pageSize,
		};

		if (!objectKeyIsEmpty(Fields)) {
			this.getData(params);
		} else {
			this.queryReset();
			// message.error('请输入搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		this.setState({
			pageSize: 10,
			dataList: [],
			totals: 0,
			page: 1,
			publishDateStart: undefined,
			publishDateEnd: undefined,
			Sort: undefined,
			SortTime: undefined,
			params: {},
		});
		navigate(generateUrlWithParams('/search/detail/bankruptcy', {}));
	};

	//  pageSize页面翻页可选
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
		const Fields = getFieldsValue();
		const { publishDateStart, publishDateEnd } = this.state;
		Fields.publishDateStart = publishDateStart;
		Fields.publishDateEnd = publishDateEnd;
		const params = {
			...Fields,
			num: pageSize,
			page: 1,
		};
		if (!objectKeyIsEmpty(Fields)) {
			this.getData(params);
		}
	};

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, SortTime } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const { publishDateStart, publishDateEnd } = this.state;
		Fields.publishDateStart = publishDateStart;
		Fields.publishDateEnd = publishDateEnd;
		const params = {
			...Fields,
			sort: SortTime,
			current: val,
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
		bankruptcySearch(params).then((res) => {
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

	// 导出
	toExportCondition=(type) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const {
			SortTime, pageSize, current, publishDateStart, publishDateEnd,
		} = this.state;
		const fields = getFieldsValue();

		const params = {
			...fields,
			publishDateStart,
			publishDateEnd,
			sort: SortTime,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
		};
		return Object.assign({}, params);
	};

	render() {
		const {
			loading, totals, current, dataList, page, pageSize, params, Sort,
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
				<div className="yc-content-header">
					<div className="yc-query-item">
						<Input
							title="全文"
							style={_style1}
							size="large"
							maxLength="40"
							placeholder="企业名称、关键字"
							{...getFieldProps('brcompanyname', {
								initialValue: params.brcompanyname,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="案号/标题"
							style={_style1}
							size="large"
							maxLength="40"
							placeholder="破产案号/公告标题"
							{...getFieldProps('title', {
								initialValue: params.title,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="受理法院"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="案件受理法院名称"
							{...getFieldProps('court', {
								initialValue: params.court,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-lable">发布日期: </span>
						<DatePicker
							{...getFieldProps('publishDateStart', {
								initialValue: params.publishDateStart,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										publishDateStart: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishDateEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-lable">至</span>
						<DatePicker
							{...getFieldProps('publishDateEnd', {
								initialValue: params.publishDateEnd,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										publishDateEnd: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishDateStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
				{/* <div className="yc-header-title">
					{totals ? `源诚科技为您找到${totals}条信息` : ''}
				</div> */}
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
				<div className="yc-writ-tablebtn">
					{dataList.length > 0 && <Download condition={() => this.toExportCondition('current')} style={{ marginRight: 10 }} api={exportBankruptcyCurrent} current page num text="本页导出" />}
					<Download disabled={dataList.length === 0} condition={() => this.toExportCondition('all')} api={exportBankruptcyAll} all page num text="全部导出" />
					{dataList.length > 0 && (
						<div
							className="yc-public-floatRight"
							style={{ lineHeight: '30px', color: '#929292', fontSize: '12px' }}
						>
							{`为您找到${totals}条信息`}
						</div>
					)}
				</div>
				<Spin visible={loading}>
					<div ref={this.scrollTop}>
						<Bankruptcy SortTime={this.SortTime} Sort={Sort} stateObj={this.state} dataList={dataList} getData={this.getData} openPeopleModal={this.openPeopleModal} />
					</div>
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

export default createForm()(BANKRUPTCY);
