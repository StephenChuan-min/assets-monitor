import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import {
	emissionCount, miningCount, trademarkRightCount, constructCount,
} from 'api/monitor-info/excavate/count';
import { promiseAll } from '@/utils/promise';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Intangible extends PureComponent {
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
		const params = {
			isRead: 0,
		};
		const promiseArray = [];
		promiseArray.push(emissionCount(params));
		promiseArray.push(miningCount(params));
		promiseArray.push(trademarkRightCount(params));
		promiseArray.push(constructCount(params));
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
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
			url, intangiblePropsData, intangiblePropsData: {
				intangibleArray, totalCount, loading, gmtUpdate,
			},
		} = this.props;
		const { unReadCount } = this.state;
		return (
			<Card
				IconType="intangible"
				Loading={loading}
				onClick={() => navigate(url)}
				IconColor={{ color: '#FFC531' }}
				customStyle={hasCountStyle}
				text="无形资产"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(intangiblePropsData).length !== 0 && (
					<Row gutter={24} className="risk-intangible-container">
						{
							intangibleArray.map((item, index) => (
								<div>
									{
										index > 2 ? (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
													条
												</div>
											</Col>
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
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
