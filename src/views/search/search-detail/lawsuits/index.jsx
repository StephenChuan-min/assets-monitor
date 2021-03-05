import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form, message, Pagination } from 'antd';
import { Spin, Tabs, Download } from '@/common';
import { parseQuery } from '@/utils';
import {
	ktggRelationSearch, // 开庭列表
	trialRelationSearch, // 立案列表
	relationSearchCount, // 数量
	courtSearchListCount, // 开庭数量
	trialRelationSearchExport, // 立案导出
	ktggRelationSerachExport, // 开庭导出
} from '@/utils/api/search';
import { objectKeyIsEmpty, clearEmpty } from '@/utils';
import { ScrollAnimation } from '@/utils/changeTime';
import LawsuitsTable from './table';
import Query from './query';
import './style.scss';

const createForm = Form.create;

class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		document.title = '涉诉信息-信息搜索';
		this.state = {
			urlObj: {},
			dataList: [],
			loading: false,
			Sort: undefined,
			sortColumn: undefined,
			sortOrder: undefined,
			Params: {},
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
			field: '',
			order: '',
			ktggRelationCount: '', // 开庭
			trialRelationCount: '', // 立案
			type: 1,
			plaintiff: [{ name: '', id: 1 }],
			defendant: [{ name: '', id: 1 }],
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const urlObj = parseQuery(hash);
		const { pageSize } = this.state;
		const defendantArray = ([urlObj.defendant0 || undefined, urlObj.defendant1 || undefined, urlObj.defendant2 || undefined]);
		const plaintiffArray = ([urlObj.plaintiff0 || undefined, urlObj.plaintiff1 || undefined, urlObj.plaintiff2 || undefined]);
		const Params = {
			defendantList: defendantArray,
			plaintiffList: plaintiffArray,
			caseNumber: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endGmtRegister: urlObj.endLarq || undefined,
			startGmtRegister: urlObj.startLarq || undefined,
			startGmtTrial: urlObj.startLarq || undefined,
			endGmtTrial: urlObj.endLarq || undefined,
			page: 1,
			num: pageSize,
		};

		// 判断是否为空对象,非空请求接口
		if (Object.keys(urlObj).length !== 0) {
			this.getData(Params, urlObj.type); // 进入页面请求数据
			this.getCount(Params);
		}
		// 如果存在就增加输入栏
		this.initialValue(urlObj);
		// 输入框默认值
		const { plaintiff, defendant } = this.state;
		if (plaintiff[0]) {
			plaintiff[0].name = urlObj.plaintiff0 ? urlObj.plaintiff0 : undefined;
		}
		if (plaintiff[1]) {
			plaintiff[1].name = urlObj.plaintiff1 ? urlObj.plaintiff1 : undefined;
		}
		if (plaintiff[2]) {
			plaintiff[2].name = urlObj.plaintiff2 ? urlObj.plaintiff2 : undefined;
		}
		if (defendant[0]) {
			defendant[0].name = urlObj.defendant0 ? urlObj.defendant0 : undefined;
		}
		if (defendant[1]) {
			defendant[1].name = urlObj.defendant1 ? urlObj.defendant1 : undefined;
		}
		if (defendant[2]) {
			defendant[2].name = urlObj.defendant2 ? urlObj.defendant2 : undefined;
		}
		this.setState({
			plaintiff, defendant, urlObj, Params, type: urlObj.type ? Number(urlObj.type) : 1,
		});
	}

	initialValue = (urlObj) => {
		if (urlObj.plaintiff1) {
			this.addPlaintiff();
		}
		if (!urlObj.plaintiff1 && urlObj.plaintiff2) {
			this.addPlaintiff();
		}
		if (urlObj.plaintiff2) {
			this.addPlaintiff();
		}
		if (urlObj.defendant1) {
			this.addDefendant();
		}
		if (!urlObj.defendant1 && urlObj.defendant2) {
			this.addDefendant();
		}
		if (urlObj.defendant2) {
			this.addDefendant(urlObj.defendant2);
		}
	};

	// 获取数量
	getCount = (value) => {
		const params = {
			...value,
		};
		relationSearchCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					trialRelationCount: res.data,
				});
			}
		});
		courtSearchListCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					ktggRelationCount: res.data,
				});
			}
		});
	};

	// 获取消息列表
	getData = (value, selectType) => {
		const { current, pageSize } = this.state;
		const params = {
			num: pageSize,
			page: current,
			...value,
		};
		this.setState({
			loading: true,
		});
		const type = Number(selectType);
		if (type === 2) {
			ktggRelationSearch(clearEmpty(params)).then((res) => {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
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
		} else {
			trialRelationSearch(clearEmpty(params)).then((res) => {
				if (res && res.data) {
					// 获取当前高度，动态移动滚动条
					const currentY = document.documentElement.scrollTop || document.body.scrollTop;
					ScrollAnimation(currentY, 0);
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
		}
	};

	// 切换立案开庭
	onSourceType = (val) => {
		const { Params, pageSize } = this.state;
		const { hash } = window.location;
		const urlObj = parseQuery(hash);
		const ParamsObj = {
			...Params,
			page: 1,
			num: pageSize,
		};
		// 判断是否为空对象,非空请求接口
		if (Object.keys(urlObj).length !== 0) {
			this.getData(ParamsObj, val);
		}
		this.setState({
			type: val, current: 1, Sort: undefined, sortColumn: '',
		});
	};

	// 导出
	toExportCondition = (type) => {
		const {
			pageSize, current, field, order, Params,
		} = this.state;
		const params = {
			...Params,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
			field: field || undefined,
			order: order || undefined,
		};
		return Object.assign({}, params);
	};

	// 时间排序
	SortTime = () => {
		const {
			Params, type, Sort, dataList, pageSize, page,
		} = this.state;
		let _Sort;
		if (Sort === undefined) _Sort = 'DESC';
		if (Sort === 'DESC') _Sort = 'ASC';
		if (Sort === 'ASC') _Sort = undefined;
		// gmtTrial
		const sortColumn = _Sort === undefined ? undefined : (type === 1 ? 'gmtRegister' : 'gmtTrial');
		const sortOrder = _Sort;
		const params = {
			sortColumn,
			sortOrder,
			...Params,
			page,
			num: pageSize,
		};
		// 判断是否为空对象,非空请求接口
		if (dataList.length > 0) {
			this.getData(params, type); // 进入页面请求数据
			// this.getCount(params);
		}
		this.setState({
			field: 'LARQ',
			Sort: _Sort,
			order: _Sort,
			sortColumn,
			sortOrder,
		});
	};

	// 重置输入框
	queryReset = () => {
		this.setState({
			plaintiff: [{ name: '', id: 1 }],
			defendant: [{ name: '', id: 1 }],
			Sort: undefined,
			sortColumn: undefined,
			sortOrder: undefined,
			ktggRelationCount: '', // 开庭
			trialRelationCount: '', // 立案
			urlObj: {},
			dataList: [],
			Params: {},
			totals: 0,
			pageSize: 10,
			page: 1,
			type: 1,
		});
	};

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		const { Params, type } = this.state;
		const ParamsObj = {
			...Params,
			page: 1,
			num: pageSize,
		};
		this.setState({ pageSize, current: 1, page: 1 });
		// 判断是否为空对象,非空请求接口
		if (Object.keys(ParamsObj).length !== 0) {
			this.getData(ParamsObj, type); // 进入页面请求数据
		}
	};

	// page翻页
	handleChangePage = (val) => {
		const {
			Params, type, pageSize, sortColumn,
			sortOrder,
		} = this.state;
		const ParamsObj = {
			...Params,
			page: val,
			num: pageSize,
			sortColumn,
			sortOrder,
		};
		this.setState({ current: val, page: val });
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(ParamsObj)) {
			this.getData(ParamsObj, type); // 进入页面请求数据
		}
	};

	// 输入原告被告
	inputChange = (value, e, id) => {
		const { plaintiff, defendant } = this.state;
		const inputArray = value === 1 ? plaintiff : defendant;
		if (inputArray && inputArray.length > 0) {
			inputArray.forEach((i, index) => {
				if (i.id === id) {
					inputArray[index].name = e.trim();
				}
			});
			this.setState({ plaintiff, defendant });
		}
	};

	// 新增原告
	addPlaintiff = () => {
		const { plaintiff } = this.state;
		plaintiff.push({ name: '', id: plaintiff.length + 1 });
		this.setState({ plaintiff });
	};

	// 删除原告
	deletePlaintiff = (id) => {
		let { plaintiff } = this.state;
		plaintiff = plaintiff.filter(key => key.id !== id);
		plaintiff.map((item, index) => {
			const _item = item;
			return _item.id = index + 1;
		});
		this.setState({ plaintiff });
	};

	// 新增被告
	addDefendant = () => {
		const { defendant } = this.state;
		defendant.push({ name: '', id: defendant.length + 1 });
		this.setState({ defendant });
	};

	// 删除被告
	deleteDefendant = (id) => {
		let { defendant } = this.state;
		defendant = defendant.filter(key => key.id !== id);
		defendant.map((item, index) => {
			const _item = item;
			return _item.id = index + 1;
		});
		this.setState({ defendant });
	};

	// 获取查询参数
	getQueryData = (obj) => {
		this.setState({
			Params: obj,
			page: 1,
			current: 1,
			Sort: undefined,
			sortColumn: undefined,
			sortOrder: undefined,
		});
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

	render() {
		const {
			plaintiff, defendant, dataList, loading, urlObj, totals, current, page, pageSize, ktggRelationCount, trialRelationCount, Sort, type,
		} = this.state;

		const tabConfig = [
			{
				id: 1,
				name: '立案信息',
				dot: false,
				number: trialRelationCount,
				showNumber: !!trialRelationCount,
			},
			{
				id: 2,
				name: '开庭公告',
				dot: false,
				number: ktggRelationCount,
				showNumber: !!ktggRelationCount,
			},
		];
		const queryProps = {
			inputChange: this.inputChange,
			addDefendant: this.addDefendant,
			deleteDefendant: this.deleteDefendant,
			addPlaintiff: this.addPlaintiff,
			deletePlaintiff: this.deletePlaintiff,
			queryReset: this.queryReset,
			getData: this.getData,
			getCount: this.getCount,
			getQueryData: this.getQueryData,
			urlObj,
			type,
			plaintiff,
			defendant,
		};
		/* const tableProps = {
			loading,
			manage: false,
			dataSource: dataList,
			current,
			total: totals,
			onRefresh: this.onRefresh,
		}; */
		return (
			<div className="yc-content-query">
				{/* 搜索栏 */}
				<Query {...queryProps} />
				{/* 切换立案开庭 */}
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={tabConfig}
					field="type"
				/>
				<div className="yc-writ-tablebtn">
					{dataList.length > 0
					&& (
					<Download
						condition={() => this.toExportCondition('current')}
						style={{ marginRight: 10 }}
						api={type === 1 ? trialRelationSearchExport : ktggRelationSerachExport}
						current
						page
						num
						text="本页导出"
					/>
					)}
					<Download
						disabled={dataList.length === 0}
						condition={() => this.toExportCondition('all')}
						api={type === 1 ? trialRelationSearchExport : ktggRelationSerachExport}
						all
						page
						num
						text="全部导出"
					/>
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
					<LawsuitsTable
						stateObj={this.state}
						dataList={dataList}
						SortTime={this.SortTime}
						Sort={Sort}
						type={type}
					/>
					{
						dataList && dataList.length > 0
						&& (
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
										this.handleChangePage(val);
									}}
								/>
							</div>
						)}
					{/* { */}
					{/*	page === 100 */}
					{/*	&& ( */}
					{/*		<div style={{ */}
					{/*			color: '#929292', fontSize: 12, textAlign: 'right', lineHeight: 1, paddingBottom: '20px', */}
					{/*		}} */}
					{/*		> */}
					{/*			如需更多数据请联系：180-7294-2900 */}
					{/*		</div> */}
					{/*	)} */}
				</Spin>
			</div>
		);
	}
}

export default createForm()(LAWSUITS);
