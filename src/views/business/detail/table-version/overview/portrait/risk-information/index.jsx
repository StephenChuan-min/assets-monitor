import React from 'react';
import {
	overviewBankruptcy, // 债务人破产重组
	businessOverviewBankruptcy, // 业务破产重组
	overviewLitigation, // 债务人涉诉信息
	businessOverviewLitigation, // 业务涉诉
	overviewRisk, // 债务人经营风险
	businessOverviewRisk, // 业务经营风险
	overviewDishonest, // 债务人失信
	overviewLimitHeight, // 债务人限制高消费
	businessOverviewDishonest, // 业务失信
	OverviewTax, // 个人债务人税收违法
} from '@/utils/api/professional-work/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';
import { promiseAll } from '@/utils/promise';
import getCount from '@/views/portrait-inquiry/common/getCount';
import Bankruptcy from '../card-components/Bankruptcy-card';
import Involved from '../card-components/Involved-card';
import Information from '../card-components/Information-card';
import Break from '../card-components/break-card';
import Tax from '../card-components/taxViolation-card';
import LimitHeightCard from '../card-components/limit-height-card';
import './style.scss';

const constantNumber = 99999999; // 默认值
const apiType = (value, portrait) => {
	switch (value) {
	case 'Bankruptcy': return portrait === 'business' ? businessOverviewBankruptcy : overviewBankruptcy;
	case 'Dishonest': return portrait === 'business' ? businessOverviewDishonest : overviewDishonest;
	case 'Litigation': return portrait === 'business' ? businessOverviewLitigation : overviewLitigation;
	case 'Risk': return portrait === 'business' ? businessOverviewRisk : overviewRisk;
	case 'Tax': return OverviewTax;
	case 'Limit': return overviewLimitHeight; // 只是债务人的限制高消费，没有做业务的

	default: return {};
	}
};
export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			bankruptcyPropsData: {}, // 破产重组
			dishonestPropsData: {}, // 失信记录
			litigationPropsData: {}, // 涉诉信息
			riskPropsData: {}, // 经营风险
			taxPropsData: {}, // 税收违法
			limitHeightPropsData: {}, // 限制高消费
		};
	}

	componentDidMount() {
		const urlId = getQueryByName(window.location.href, 'id') || constantNumber;
		const obligorId = urlId;
		const businessId = urlId;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId, type: 1 } : { obligorId, type: 1 };
		this.setState(() => ({ isLoading: true }));
		// 风险卡片列表
		this.getData(params, portrait);
	}

	getData = (value, portrait) => {
		const params = { ...value };
		const promiseArray = [];
		promiseArray.push(apiType('Bankruptcy', portrait)(params)); // 破产重组
		promiseArray.push(apiType('Dishonest', portrait)(params)); // 失信记录
		promiseArray.push(apiType('Litigation', portrait)(params)); // 涉诉信息
		promiseArray.push(apiType('Risk', portrait)(params)); // 经营风险
		promiseArray.push(apiType('Limit', portrait)(params)); // 限制高消费
		if (portrait === 'debtor_personal') {
			promiseArray.push(apiType('Tax', portrait)(params)); // 税收违法
		}
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((values) => {
			const isArray = Array.isArray(values) && values.length > 0;
			this.setState({ isLoading: false });
			// 破产重组
			this.getBankruptcyData(isArray, values);
			// 失信记录
			this.getDishonestData(isArray, values);
			// 涉诉信息
			this.getLitigationData(isArray, values);
			// 经营风险
			this.getRiskData(isArray, values);
			// 个人债务人税收违法
			this.getTaxViolationData(isArray, values);
			// 限制高消费
			this.getLimitHeightData(isArray, values);
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	// 破产重组
	getBankruptcyData = (isArray, values) => {
		const res = values[0];
		if (isArray && res && res.code === 200) {
			const { gmtCreate } = res.data;
			// console.log(bankruptcy);
			const dataSourceNum = res.data.bankruptcy || 0;
			const bankruptcyPropsData = {
				bankruptcyNum: dataSourceNum,
				gmtCreate,
				obligorTotal: res.data.obligorTotal || 0,
			};
			this.setState(() => ({
				bankruptcyPropsData,
			}));
		}
	};

	// 失信记录
	getDishonestData = (isArray, values) => {
		const { portrait } = this.props;
		const isBusiness = portrait && portrait === 'business';
		const res = values[1];
		if (isArray && res && res.code === 200) {
			const {
				remove, gmtCreate, included, obligorStatusList,
			} = res.data;

			const dataSource = [];
			const debtorArray = [];
			const isOligorStatusList = Array.isArray(obligorStatusList) && obligorStatusList.length > 0;
			const isDishonest = isOligorStatusList ? obligorStatusList.filter(item => item.dishonestStatus === 1).length : 0; // 已失信
			const beforeDishonest = isOligorStatusList ? obligorStatusList.filter(item => item.dishonestStatus === 2).length : 0; // 曾失信

			// console.log(isDishonest, 11, beforeDishonest);
			if (isBusiness) {
				debtorArray.push({ count: beforeDishonest, typeName: '曾失信债务人' });
				debtorArray.push({ count: isDishonest, typeName: '已失信债务人' });
				dataSource.push({ count: included, typeName: '列入' });
				dataSource.push({ count: remove, typeName: '已移除' });
			} else {
				dataSource.push({ count: included, typeName: '列入' });
				dataSource.push({ count: remove, typeName: '已移除' });
			}

			const dataSourceNum = getCount(dataSource);
			const dishonestPropsData = {
				removeNum: remove, // 移除数量
				includedNum: included, // 列入数量
				dataSource,
				debtorArray,
				gmtCreate,
				dataSourceNum,
				dishonestStatusArray: obligorStatusList || [],
			};
			this.setState(() => ({
				dishonestPropsData,
			}));
		}
	};

	// 涉诉信息
	getLitigationData = (isArray, values) => {
		const res = values[2];
		if (isArray && res && res.code === 200) {
			const {
				 execute, trial, judgment, courtNotice,
			} = res.data;
			const dataSource = [];
			dataSource.push({ count: res.data.trial, typeName: '立案' });
			dataSource.push({ count: res.data.courtNotice, typeName: '开庭' });
			dataSource.push({ count: res.data.judgment, typeName: '裁判文书' });
			const dataSourceNum = getCount(dataSource);
			const otherCase = (trial + judgment + courtNotice) - execute;
			const litigationPropsData = {
				dataSource,
				otherCase,
				dataSourceNum,
				execute,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				litigationPropsData,
			}));
		}
	};

	// 经营风险
	getRiskData = (isArray, values) => {
		const res = values[3];
		if (isArray && res && res.code === 200) {
			const dataSource = [];
			dataSource.push({ count: res.data.abnormal, typeName: '经营异常' });
			dataSource.push({ count: res.data.tax, typeName: '税收违法' });
			dataSource.push({ count: res.data.punishment, typeName: '行政处罚' });
			// dataSource.push({ count: res.data.change, typeName: '工商变更' });
			dataSource.push({ count: res.data.illegal, typeName: '严重违法' });
			dataSource.push({ count: res.data.epb, typeName: '环保处罚' });
			const dataSourceNum = getCount(dataSource);
			const riskPropsData = {
				dataSource,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				riskPropsData,
			}));
		}
	};

	// 税收违法
	getTaxViolationData = (isArray, values) => {
		const res = values[5];
		if (isArray && res && res.code === 200) {
			const { roleDistributions } = res.data;
			const dataSourceNum = getCount(roleDistributions);
			const taxPropsData = {
				roleDistributions,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate || '2020-04-01',
			};
			this.setState(() => ({
				taxPropsData,
			}));
		}
	};

	// 限制高消费
	getLimitHeightData = (isArray, values) => {
		const res = values[4];
		if (isArray && res && res.code === 200) {
			const { gmtModified, limitHeightCount, limitHeightRemovedCount } = res.data;
			const limitHeightPropsData = {
				gmtModified,
				limitHeightCount,
				limitHeightRemovedCount,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				limitHeightPropsData,
			}));
		}
	};

	// 判断内部是否存数据
	isHasValue = () => {
		const { portrait } = this.props;
		const {
			bankruptcyPropsData, litigationPropsData, riskPropsData, dishonestPropsData, taxPropsData, limitHeightPropsData,
		} = this.state;
		return (bankruptcyPropsData.bankruptcyNum > 0 && portrait !== 'debtor_personal') || litigationPropsData.dataSourceNum > 0
			|| (riskPropsData.dataSourceNum > 0 && portrait !== 'debtor_personal') || dishonestPropsData.dataSourceNum > 0 || taxPropsData.dataSourceNum > 0 || limitHeightPropsData.limitHeightCount > 0;
	};

	render() {
		const { portrait } = this.props;
		const {
			bankruptcyPropsData, dishonestPropsData, litigationPropsData, riskPropsData, taxPropsData, isLoading, limitHeightPropsData,
		} = this.state;
		const isHasValue = this.isHasValue();
		return (
			<div>
				<Spin visible={isLoading}>
					{isHasValue ? (
						<div>
							<div className="overview-container-title" style={{ marginTop: '20px' }}>
								<div className="overview-left-item" />
								<span className="container-title-name">风险信息</span>
							</div>
							<div className="overview-container-cardContent">
								{/* 破产重组 */}
								{portrait !== 'debtor_personal' && Object.keys(bankruptcyPropsData).length !== 0 && <Bankruptcy dataSource={bankruptcyPropsData} portrait={portrait} />}
								{/* 失信记录 */}
								{Object.keys(dishonestPropsData).length !== 0 && <Break dataSource={dishonestPropsData} portrait={portrait} />}
								{/* 涉诉信息 */}
								{Object.keys(litigationPropsData).length !== 0 && <Involved dataSource={litigationPropsData} portrait={portrait} />}
								{/* 经营风险 */}
								{portrait !== 'debtor_personal' && Object.keys(riskPropsData).length !== 0 && <Information dataSource={riskPropsData} portrait={portrait} />}
								{/* 税收违法 */}
								{portrait === 'debtor_personal' && Object.keys(taxPropsData).length !== 0 && <Tax dataSource={taxPropsData} />}
								{/* 限制高消费 */}
								{Object.keys(limitHeightPropsData).length !== 0 && <LimitHeightCard dataSource={limitHeightPropsData} portrait={portrait} />}
							</div>
						</div>
					) : null}
				</Spin>
			</div>
		);
	}
}
