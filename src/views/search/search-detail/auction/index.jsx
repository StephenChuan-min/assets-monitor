import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Select, message, Pagination,
} from 'antd';
import { navigate } from '@reach/router';
import {
	Spin, Input, Button, timeRule, Download, DatePicker,
} from '@/common';
import InputPrice from '@/common/input/input-price';
import {
	parseQuery, generateUrlWithParams, objectKeyIsEmpty,
} from '@/utils';
import {
	fullAssetSearch, // 列表
	fullAssetSearchExport, // 导出
} from '@/utils/api/search';
import { ScrollAnimation } from '@/utils/changeTime';
import defaultOrder from '@/assets/img/icon/icon_arrow.png';
import AuctionTable from './table';
import './style.scss';


const _style1 = { width: 278 };
const _style2 = { width: 116 };
const _style3 = { width: 130 };
const createForm = Form.create;
const someThing = [
	{ name: '房产', key: '50025969' },
	{ name: '奢侈品', key: '201290015' },
	{ name: '机动车', key: '50025972' },
	{ name: '实物资产', key: '50025971' },
	{ name: '土地', key: '50025970' },
	{ name: '机械设备', key: '56936003' },
	{ name: '股权', key: '125088031' },
	{ name: '债权', key: '56956002' },
	{ name: '林权', key: '50025973' },
	{ name: '无形资产', key: '122406001' },
	{ name: '船舶', key: '125228021' },
	{ name: '其他交通工具', key: '200794003' },
	{ name: '矿权', key: '50025974' },
	{ name: '工程', key: '50025975' },
	{ name: '海域', key: '200778005' },
	{ name: '其他', key: '50025976' },
];


class AUCTION extends React.Component {
	constructor(props) {
		super(props);
		document.title = '拍卖信息-信息搜索';
		this.state = {
			dataList: [],
			params: {},
			inputSearch: {},
			field: undefined,
			order: undefined,
			loading: false,
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			startTime: undefined,
			endTime: undefined,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		const objParams = {
			...params,
			lowestConsultPrice: params.lowestConsultPrice && params.lowestConsultPrice * 10000,
			highestConsultPrice: params.highestConsultPrice && params.highestConsultPrice * 10000,
		};
		this.setState({
			params,
			startTime: params.startTime,
			endTime: params.endTime,
		});
		// 判断是否为空对象,非空请求接口
		if (Object.keys(params).length !== 0) {
			this.getData(objParams); // 进入页面请求数据
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
			current, pageSize, startTime, endTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const Fields = getFieldsValue();

		const params = {
			num: pageSize,
			page: current,
			...Fields,
			startTime,
			endTime,
			...value,
		};
		this.setState({
			loading: true,
		});
		fullAssetSearch(params).then((res) => {
			if (res && res.data) {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
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

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current: 1,
			page: 1,
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
			startTime,
			endTime,
		};
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(Fields)) {
			this.getData(params); // 进入页面请求数据
		}
	};

	// page翻页
	handleChangePage = (val) => {
		const {
			pageSize, startTime, endTime, field, order,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const params = {
			...Fields,
			num: pageSize,
			page: val,
			field,
			order,
			startTime,
			endTime,
			lowestConsultPrice: Fields.lowestConsultPrice ? Fields.lowestConsultPrice *= 10000 : undefined,
			highestConsultPrice: Fields.highestConsultPrice ? Fields.highestConsultPrice *= 10000 : undefined,
		};
		this.setState({
			current: val,
			page: val,
			loading: true,
		});
		// 获取当前高度，动态移动滚动条
		const currentY = document.documentElement.scrollTop || document.body.scrollTop;
		ScrollAnimation(currentY, 0);
		fullAssetSearch(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
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

	// 搜索
	search = () => {
		const { form: { getFieldsValue } } = this.props; // 会提示props is not defined
		const { startTime, endTime } = this.state;
		const Fields = getFieldsValue();
		Fields.startTime = startTime;
		Fields.endTime = endTime;
		if (Fields.lowestConsultPrice && Number(Fields.lowestConsultPrice) > Fields.highestConsultPrice && Number(Fields.highestConsultPrice)) {
			message.error('评估价格最低价不能高于评估价格最高价！');
			return;
		}
		const { pageSize } = this.state;
		navigate(generateUrlWithParams('/search/detail/auction', Fields));
		this.setState({
			page: 1,
			current: 1,
			inputSearch: Fields,
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			field: undefined,
			order: undefined,
		});
		const params = {
			...Fields,
			page: 1,
			num: pageSize,
			lowestConsultPrice: Fields.lowestConsultPrice ? Fields.lowestConsultPrice *= 10000 : undefined,
			highestConsultPrice: Fields.highestConsultPrice ? Fields.highestConsultPrice *= 10000 : undefined,
		};

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(Fields)) {
			if (Fields.number && Fields.number.length < 8) {
				message.error('证件号不得小于8位');
			} else {
				this.getData(params); // 进入页面请求数据
			}
		} else {
			this.queryReset();
			// message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		navigate('/search/detail/auction');
		this.setState({
			params: {},
			dataList: [],
			totals: 0,
			pageSize: 10,
			page: 1,
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			field: undefined,
			order: undefined,
			startTime: undefined,
			endTime: undefined,
			inputSearch: {},
		});
		resetFields('');
	};


	// 导出
	toExportCondition=(type) => {
		const {
			pageSize, current, field, order, startTime, endTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
			field,
			order,
			startTime,
			endTime,
		};

		return Object.assign({}, params);
	};

	// 默认排序
	defaultSort = () => {
		const { inputSearch, dataList } = this.state;
		const params = {
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			field: undefined,
			order: undefined,
		});
	};

	// 时间排序
	auctionSort = () => {
		const { inputSearch, auctionSort, dataList } = this.state;
		const params = {
			field: 'START',
			order: auctionSort === 'DESC' ? 'ASC' : 'DESC',
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			auctionSort: auctionSort === 'DESC' ? 'ASC' : 'DESC',
			field: 'START',
			order: auctionSort === 'DESC' ? 'ASC' : 'DESC',
			currentSort: undefined,
			assessmentSort: undefined,
		});
	};

	// 当前价格排序
	currentSort = () => {
		const { inputSearch, currentSort, dataList } = this.state;
		const params = {
			field: 'CURRENT_PRICE',
			order: currentSort === 'DESC' ? 'ASC' : 'DESC',
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			currentSort: currentSort === 'DESC' ? 'ASC' : 'DESC',
			field: 'CURRENT_PRICE',
			order: currentSort === 'DESC' ? 'ASC' : 'DESC',
			auctionSort: undefined,
			assessmentSort: undefined,
		});
	};

	// 评估价格排序
	assessmentSort = () => {
		const { inputSearch, assessmentSort, dataList } = this.state;
		const params = {
			field: 'CONSULT_PRICE',
			order: assessmentSort === 'DESC' ? 'ASC' : 'DESC',
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			assessmentSort: assessmentSort === 'DESC' ? 'ASC' : 'DESC',
			field: 'CONSULT_PRICE',
			order: assessmentSort === 'DESC' ? 'ASC' : 'DESC',
			auctionSort: undefined,
			currentSort: undefined,
		});
	};

	render() {
		const {
			loading, dataList, params, totals, current, page, pageSize, auctionSort, currentSort, assessmentSort, inputSearch,
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
						title="债务人"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="姓名/公司名称"
						{...getFieldProps('name', {
							initialValue: params.name,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						maxLength="18"
						style={_style1}
						size="large"
						placeholder="身份证号/统一社会信用代码"
						{...getFieldProps('number', {
							initialValue: params.number,
							getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-*（）()]/g, '') || undefined,
							// getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="全文"
						style={_style1}
						size="large"
						placeholder="关键字"
						{...getFieldProps('addr', {
							initialValue: params.addr,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item" style={{ marginRight: 0 }}>
					<InputPrice
						title="评估价"
						style={_style1}
						maxLength="9"
						size="large"
						suffix="万元"
						inputFirstProps={getFieldProps('lowestConsultPrice', {
							initialValue: params.lowestConsultPrice,
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
							rules: [
								{ required: true },
							],
						})}
						inputSecondProps={getFieldProps('highestConsultPrice', {
							initialValue: params.highestConsultPrice,
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
							rules: [
								{ required: true },
							],
						})}
					/>
				</div>
				<div>
					<div className="yc-query-item">
						<span className="yc-query-item-lable">开拍时间: </span>
						<DatePicker
							{...getFieldProps('startTime', {
								initialValue: params.startTime,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endTime'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-lable">至</span>
						<DatePicker
							{...getFieldProps('endTime', {
								initialValue: params.endTime,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTime'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">拍卖标的物: </span>
						<Select
							size="large"
							allowClear
							placeholder="请选择标的物类型"
							style={_style3}
							{...getFieldProps('category', {
								initialValue: params.category,
							})}
						>
							{
								someThing.map(item => <Select.Option value={item.key}>{item.name}</Select.Option>)
							}
						</Select>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">拍卖状态: </span>
						<Select
							size="large"
							allowClear
							placeholder="请选择拍卖状态"
							style={_style2}
							{...getFieldProps('status', {
								initialValue: params.status,
							})}
						>
							<Select.Option value="9">中止</Select.Option>
							<Select.Option value="11">撤回</Select.Option>
							<Select.Option value="5">已成交</Select.Option>
							<Select.Option value="7">已流拍</Select.Option>
							<Select.Option value="1">即将开始</Select.Option>
							<Select.Option value="3">正在进行</Select.Option>
						</Select>
					</div>

					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 110, marginRight: 0 }}>重置查询条件</Button>
					</div>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
				<div className="yc-auction-tablebtn">
					{dataList.length > 0 && <Download condition={() => this.toExportCondition('current')} style={{ marginRight: 10 }} api={fullAssetSearchExport} current page num text="本页导出" />}
					<Download disabled={dataList.length === 0} condition={() => this.toExportCondition('all')} api={fullAssetSearchExport} all page num text="全部导出" />
					<div className="yc-btn-right">
						{dataList.length > 0 && <span className="yc-right-total">{`为您找到${totals}条信息`}</span>}
						<Button onClick={() => this.defaultSort(inputSearch)}>
							默认排序
						</Button>
						<div className="yc-right-order" onClick={() => this.auctionSort('DESC')}>
							{/* {auctionSort === undefined && <span className="sort th-sort-default" />} */}
							{auctionSort === undefined && <img src={defaultOrder} alt="" className="sort th-sort-default" /> }
							{auctionSort === 'DESC' && <span className="sort th-sort-down" />}
							{auctionSort === 'ASC' && <span className="sort th-sort-up" />}
							开拍时间
						</div>
						<div className="yc-right-order" onClick={() => this.currentSort('DESC')}>
							{/* {currentSort === undefined && <span className="sort th-sort-default" />} */}
							{currentSort === undefined && <img src={defaultOrder} alt="" className="sort th-sort-default" /> }
							{currentSort === 'DESC' && <span className="sort th-sort-down" />}
							{currentSort === 'ASC' && <span className="sort th-sort-up" />}
							当前价格
						</div>
						<div className="yc-right-order" onClick={() => this.assessmentSort('DESC')}>
							{/* {assessmentSort === undefined && <span className="sort th-sort-default" />} */}
							{assessmentSort === undefined && <img src={defaultOrder} alt="" className="sort th-sort-default" /> }
							{assessmentSort === 'DESC' && <span className="sort th-sort-down" />}
							{assessmentSort === 'ASC' && <span className="sort th-sort-up" />}
							评估价格
						</div>
					</div>
				</div>
				<Spin visible={loading}>
					<AuctionTable id="actionId" stateObj={this.state} dataList={dataList} getData={this.getData} openPeopleModal={this.openPeopleModal} />
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

export default createForm()(AUCTION);
