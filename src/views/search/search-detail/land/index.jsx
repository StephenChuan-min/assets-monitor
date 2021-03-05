import React from 'react';
import { Form, message, Pagination } from 'antd';
import { Spin, Tabs, Download } from '@/common';
import { parseQuery } from '@/utils';
import {
	landSellExport, // 出让结果 -- 本页导出
	landSellExportAll, // 出让结果 -- 导出全部
	landTransferExport, // 土地转让 -- 本页导出
	landTransferExportAll, // 土地转让 -- 导出全部
	landMortgageExport, // 土地抵押 -- 本页导出
	landMortgageExportAll, // 土地抵押 -- 导出全部
	landSellSearch, // 土地出让
	landTransferSearch, // 土地转让
	landMortgageSearch, // 土地抵押
	landSellCount, // 土地出让数量
	landTransferCount, // 土地转让数量
	landMortgageCount, // 土地抵押数量
} from '@/utils/api/search';
import { objectKeyIsEmpty, clearEmpty } from '@/utils';
import { ScrollAnimation } from '@/utils/changeTime';
import LandTable from './table';
import Query from './query';

const createForm = Form.create;

class LAND extends React.Component {
	constructor(props) {
		super(props);
		document.title = '土地信息-信息搜索';
		this.state = {
			sellCount: '', // 出让结果数量
			transferCount: '', // 土地转让数量
			mortgageCount: '', // 土地抵押数量
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
			order: '',
			type: 1,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const urlObj = parseQuery(hash);
		const { pageSize } = this.state;
		const Params = {
			name: urlObj.name || undefined,
			province: urlObj.province || undefined,
			landAddress: urlObj.landAddress || undefined,
			startTime: urlObj.startTime || undefined,
			endTime: urlObj.endTime || undefined,
			landUse: urlObj.landUse || undefined,
			page: 1,
			num: pageSize,
		};

		// 判断是否为空对象,非空请求接口
		if (Object.keys(urlObj).length !== 0) {
			this.getData(Params, urlObj.type); // 进入页面请求数据
			this.getCount(Params);
		}
		// 输入框默认值
		this.setState({
			urlObj, Params, type: urlObj.type ? Number(urlObj.type) : 1,
		});
	}

	// 获取数量
	getCount = (value) => {
		const params = {
			...value,
		};
		delete params.type;
		landSellCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					sellCount: res.data || '',
				});
			}
		});
		landTransferCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					transferCount: res.data || '',
				});
			}
		});
		landMortgageCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					mortgageCount: res.data || '',
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
		if (type === 1) {
			landSellSearch(clearEmpty(params)).then((res) => {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
				if (res && res.data) {
					this.setState({
						dataList: res.data.list,
						totals: res.data.totalCount,
						loading: false,
					});
				} else {
					message.error(res.message);
					this.setState({ loading: false });
				}
			}).catch(() => {
				this.setState({ loading: false });
			});
		} else if (type === 2) {
			landTransferSearch(clearEmpty(params)).then((res) => {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
				if (res && res.data) {
					this.setState({
						dataList: res.data.list,
						totals: res.data.totalCount,
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
			landMortgageSearch(clearEmpty(params)).then((res) => {
				if (res && res.data) {
					// 获取当前高度，动态移动滚动条
					const currentY = document.documentElement.scrollTop || document.body.scrollTop;
					ScrollAnimation(currentY, 0);
					this.setState({
						dataList: res.data.list,
						totals: res.data.totalCount,
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

	// 切换土地信息tab
	// 出让结果、土地转让、土地抵押
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
			pageSize, current, order, Params, sortColumn,
		} = this.state;
		const params = {
			...Params,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
			sortOrder: order || undefined,
			sortColumn: sortColumn || undefined,
		};
		delete params.type;
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
		const sortColumn = _Sort === undefined ? undefined : ({ 1: 'CONTRACT_SIGNED_TIME', 2: 'DEALING_TIME', 3: 'REGISTRATION_START_TIME' }[type] || 'CONTRACT_SIGNED_TIME');

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
			this.getCount(params);
		}
		this.setState({
			Sort: _Sort,
			order: _Sort,
			sortColumn,
			sortOrder,
		});
	};

	// 重置输入框
	queryReset = () => {
		this.setState({
			Sort: undefined,
			sortColumn: undefined,
			sortOrder: undefined,
			sellCount: '',
			transferCount: '',
			mortgageCount: '',
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
			Params, type, pageSize, sortColumn, sortOrder,
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

	getExportApi = (type) => {
		if (type === 1) {
			return landSellExport;
		}
		if (type === 2) {
			return landTransferExport;
		}
		return landMortgageExport;
	};

	getAllExportApi = (type) => {
		if (type === 1) {
			return landSellExportAll;
		}
		if (type === 2) {
			return landTransferExportAll;
		}
		return landMortgageExportAll;
	};

	render() {
		const {
			dataList, loading, urlObj, totals, current, page, pageSize, sellCount, transferCount, mortgageCount, Sort, type,
		} = this.state;

		const tabConfig = [
			{
				id: 1,
				name: '出让结果',
				dot: false,
				number: sellCount,
				showNumber: !!sellCount,
			},
			{
				id: 2,
				name: '土地转让',
				dot: false,
				number: transferCount,
				showNumber: !!transferCount,
			},
			{
				id: 3,
				name: '土地抵押',
				dot: false,
				number: mortgageCount,
				showNumber: !!mortgageCount,
			},
		];

		const queryProps = {
			queryReset: this.queryReset,
			getData: this.getData,
			getCount: this.getCount,
			getQueryData: this.getQueryData,
			urlObj,
			type,
		};

		return (
			<div className="yc-content-query">
				<Query {...queryProps} />
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
						api={this.getExportApi(type)}
						current
						page
						num
						text="本页导出"
					/>
					)}
					<Download
						disabled={dataList.length === 0}
						condition={() => this.toExportCondition('all')}
						api={this.getAllExportApi(type)}
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
					<LandTable
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

export default createForm()(LAND);
