import React, { PureComponent } from 'react';
import { Col, Row } from 'antd';
import { navigate } from '@reach/router';
import { promiseAll } from '@/utils/promise';
import { buildConstructCount, buildWinbidCount, buildUnderwayCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Construct extends PureComponent {
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
	toInfoCount = () => {
		const params = {
			isRead: 0,
		};
		const promiseArray = [];
		if (global.authRoleList.indexOf('zjgcjsdw') > -1) {
			promiseArray.push(buildConstructCount(params));
		}
		if (global.authRoleList.indexOf('zjgczbdw') > -1) {
			promiseArray.push(buildWinbidCount(params));
		}
		if (global.authRoleList.indexOf('zjgcsgdw') > -1) {
			promiseArray.push(buildUnderwayCount(params));
		}

		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			let total = 0;
			res.forEach((i) => {
				total += i.data || 0;
			});
			this.setState(() => ({
				unReadCount: total,
			}));
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	render() {
		const {
			url, buildPropsData, buildPropsData: {
				gmtUpdate, totalCount, dataSource,
			},
		} = this.props;
		console.log('buildPropsData === ', buildPropsData);
		const { unReadCount } = this.state;
		return (
			<Card
				IconType="construct-circle"
				onClick={() => navigate(url)}
				IconColor={{ color: '#E9B700' }}
				customStyle={hasCountStyle}
				text="在建工程"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(buildPropsData).length !== 0 && (
					<Row gutter={24} className="assets-construct-container">
						{
							dataSource.map((item, index) => (
								<div>
									{
										index > 2 ? (
											(
												<Col className="gutter-row" span={12}>
													<div className="assets-construct-container-card">
														<span className="assets-construct-container-card-name">{item.typeName}</span>
														<span className="assets-construct-container-card-info">：</span>
														<span className={`assets-construct-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
														条
													</div>
												</Col>
											)
										) : (
											<Col className="gutter-row" span={12}>
												<div className="assets-construct-container-card">
													<span className="assets-construct-container-card-name">{item.typeName}</span>
													<span className="assets-construct-container-card-info">：</span>
													<span className={`assets-construct-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
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
