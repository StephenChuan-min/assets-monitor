import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import {
	riskChangeCount, riskPunishmentCount, riskEpbCount, riskIllegalCount, riskAbnormalCount, riskTaxCount,
} from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';
import { promiseAll } from '@/utils/promise';


const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Operation extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			unReadCount: 0,
		};
	}

	componentDidMount() {
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		const {
			rule: {
				jyfxgsbg, jyfxhbcf, jyfxjyyc, jyfxsswf, jyfxxzcf, jyfxyzwf,
			},
		} = this.props;
		const config = [
			{ rule: jyfxgsbg, API: riskChangeCount },
			{ rule: jyfxxzcf, API: riskPunishmentCount },
			{ rule: jyfxhbcf, API: riskEpbCount },
			{ rule: jyfxyzwf, API: riskIllegalCount },
			{ rule: jyfxjyyc, API: riskAbnormalCount },
			{ rule: jyfxsswf, API: riskTaxCount },
		].filter(i => i.rule !== undefined);
		const params = {
			isRead: 0,
		};
		const promiseArray = [];
		config.forEach((item) => {
			promiseArray.push(item.API(params));
		});
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			// console.log(res);
			let total = 0;
			res.forEach((i) => {
				total += i.data;
			});
			this.setState(() => ({
				unReadCount: total,
			}));
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	render() {
		const {
			url, riskPropsData, riskPropsData: {
				dataSource, totalCount, gmtUpdate,
			},
		} = this.props;

		const { unReadCount } = this.state;
		const newData = dataSource && dataSource.length > 0 && dataSource.filter((i => i.count !== null));
		if (newData && newData.length === 0) {
			navigate('/');
			window.location.reload();
		}
		return (
			<Card
				Risk
				IconType="operation-risk"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="经营风险"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(riskPropsData).length !== 0 && (
					<Row gutter={24} className="risk-operation-container">
						{
							newData.map((item, index) => (
								<div>
									{
										index > 2 ? (
											<Col className="gutter-row" span={12}>
												<div className="risk-operation-container-card">
													{item.typeName}
													：
													<span className={`risk-operation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count}</span>
													条
												</div>
											</Col>
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-operation-container-card">
													{item.typeName}
													：
													<span className={`risk-operation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count}</span>
													条
												</div>
											</Col>
										)
									}
								</div>
							))
						}
					</Row>
				)}
			</Card>
		);
	}
}
