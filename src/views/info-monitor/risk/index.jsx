import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Spin } from '@/common';
import {
	bankruptcyCard, dishonestCard, limitHeightCard, litigationCard, riskCard,
} from '@/utils/api/monitor-info/risk/index';
import { promiseAll } from '@/utils/promise';
import getCount from '@/views/portrait-inquiry/common/getCount';
import {
	Bankruptcy, Broken, Lawsuit, Operation, LimitHeight,
} from '../components';
import './style.scss';

export default class Risk extends PureComponent {
	constructor(props) {
		super(props);
		document.title = '资产挖掘';
		// console.log(props.rule, 123);
		const isRule = props && props.rule && props.rule.children;
		const children = isRule && props.rule.children;
		const {
			jyfxgsbg, jyfxhbcf, jyfxjyyc, jyfxsswf, jyfxxzcf, jyfxyzwf,
		} = children;
		const operatingRisk = {
			jyfxgsbg, jyfxhbcf, jyfxjyyc, jyfxsswf, jyfxxzcf, jyfxyzwf,
		};
		// console.log(Object.values(operatingRisk).filter((i => i !== undefined)), 3331);
		this.state = {
			config: [
				{
					id: 1,
					title: '破产重组',
					rule: children.fxjkqypccz,
					url: '/risk/bankruptcy',
					Component: Bankruptcy,
					API: bankruptcyCard,
				},
				{
					id: 2,
					title: '失信记录',
					rule: children.jkxxsxjl,
					url: '/risk/broken',
					Component: Broken,
					API: dishonestCard,
				},
				{
					id: 5,
					title: '限制高消费',
					rule: children.fxjkxzgxf,
					url: '/risk/limitHight',
					Component: LimitHeight,
					API: limitHeightCard,
				},
				{
					id: 3,
					title: '涉诉信息',
					rule: children.fxjkssjk,
					url: '/risk/info',
					Component: Lawsuit,
					API: litigationCard,
				},
				{
					id: 4,
					title: '经营风险',
					rule: Object.values(operatingRisk).filter((i => i !== undefined)).length > 0 && operatingRisk,
					url: '/risk/operation',
					Component: Operation,
					API: riskCard,
				},
			].filter(i => this.isObject(i.rule)),
			loading: false,
			finish: false,
			bankruptcyPropsData: {},
			dishonestPropsData: {},
			litigationPropsData: {},
			riskPropsData: {},
			limitHeightPropsData: {},
			bankruptcyCount: undefined,
			dishonestCount: undefined,
			litigationCount: undefined,
			riskCount: undefined,
			limitCount: undefined,
		};
	}

	componentDidMount() {
		// 资产卡片列表
		this.getData();
	}

	getData = () => {
		const risk = new Map([
			['bankruptcy', this.getBankruptcyData],
			['dishonest', this.getDishonestData],
			['litigation', this.getLitigationData],
			['risk', this.getRiskData],
			['limitHeight', this.getLimitHeightData],
			['default', () => { console.log('未匹配'); }],
		]);

		const promiseArray = [];
		const { config } = this.state;
		config.forEach((item) => {
			promiseArray.push(item.API());
		});
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		this.setState({ loading: true });
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;
			this.setState({ loading: false, finish: true });
			if (isArray) {
				res.forEach((item) => {
					const excavateMap = risk.get(item.name) || risk.get('default');
					excavateMap.call(this, item);
				});
			}
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			this.setState({ loading: false });
			console.log('promise reject failed reason', reason);
		});
	};

	// 破产重组
	getBankruptcyData = (res) => {
		if (res && res.code === 200) {
			const { bankruptcy, gmtUpdate, obligorTotal } = res.data;
			const bankruptcyPropsData = {
				obligorTotal,
				totalCount: bankruptcy,
				gmtUpdate,
			};
			this.setState(() => ({
				bankruptcyPropsData,
				bankruptcyCount: bankruptcy,
			}));
		}
	};

	// 失信记录
	getDishonestData = (res) => {
		if (res && res.code === 200) {
			const {
				dishonest, gmtUpdate, onceDishonest, total,
			} = res.data;
			const dishonestPropsData = {
				dishonest,
				onceDishonest,
				totalCount: total,
				gmtUpdate,
			};
			this.setState(() => ({
				dishonestPropsData,
				dishonestCount: total,
			}));
		}
	};

	// 涉诉信息
	getLitigationData = (res) => {
		if (res && res.code === 200) {
			const {
				courtNotice, judgment, trial, gmtUpdate, obligorTotal,
			} = res.data;
			const dataSourceNum = courtNotice + judgment + trial;
			const litigationPropsData = {
				totalCount: dataSourceNum,
				gmtUpdate,
				obligorTotal,
			};
			this.setState(() => ({
				litigationPropsData,
				litigationCount: dataSourceNum,
			}));
		}
	};

	// 经营风险
	getRiskData = (res) => {
		if (res && res.code === 200) {
			const {
				abnormal, change, epb, gmtUpdate, illegal, punishment, tax,
			} = res.data;

			const dataSource = [];
			dataSource.push({ count: abnormal, typeName: '经营异常' });
			dataSource.push({ count: change, typeName: '工商变更' });
			dataSource.push({ count: tax, typeName: '税收违法' });
			dataSource.push({ count: illegal, typeName: '严重违法' });
			dataSource.push({ count: punishment, typeName: '行政处罚' });
			dataSource.push({ count: epb, typeName: '环保处罚' });
			const dataSourceNum = getCount(dataSource);

			const riskPropsData = {
				dataSource,
				totalCount: dataSourceNum,
				gmtUpdate,
			};
			this.setState(() => ({
				riskPropsData,
				riskCount: dataSourceNum,
			}));
		}
	};

	// 限制高消费
	getLimitHeightData = (res) => {
		if (res && res.code === 200) {
			const {
				onceLimitHeightCount, limitHeightCount, gmtUpdate, total,
			} = res.data;
			const limitHeightPropsData = {
				onceLimitHeightCount,
				limitHeightCount,
				gmtUpdate,
				totalCount: total,
			};
			this.setState(() => ({
				limitHeightPropsData,
				limitCount: total,
			}));
		}
	};

	isObject = value => value != null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';

	handleNavigate = (url) => { navigate(url); };

	getNumber = (arr) => {
		let sum = 0;
		const newArr = arr && Array.isArray(arr) && arr.length > 0;
		const arrTotalArr = newArr && arr.filter(item => item !== undefined);
		arrTotalArr.forEach((ele) => {
			sum += ele;
		});
		return sum;
	};

	render() {
		const {
			config, loading, finish, bankruptcyPropsData, dishonestPropsData, riskPropsData, litigationPropsData, limitHeightPropsData, bankruptcyCount, dishonestCount, litigationCount, riskCount, limitCount,
		} = this.state;
		const allNumber = this.getNumber([bankruptcyCount, dishonestCount, litigationCount, riskCount, limitCount]);
		const params = {
			bankruptcyPropsData,
			dishonestPropsData,
			litigationPropsData,
			riskPropsData,
			limitHeightPropsData,
		};
		// console.log('risk params === ', params);
		return (
			<Spin visible={loading} minHeight={700}>
				<div className="monitor-risk-container">
					{!loading && allNumber === 0 &&	(
						<div className="monitor-risk-container-nodata">
							暂未匹配到风险参考信息，建议
							<span className="monitor-risk-container-findMore" onClick={() => this.handleNavigate('/business')}>去导入更多债务人</span>
							，以匹配更多价值信息
						</div>
					)}
					 {
						 !finish ? null : config.map(Item => <Item.Component {...params} title={Item.title} url={Item.url} rule={Item.rule} />)
					 }
				</div>
			</Spin>
		);
	}
}
