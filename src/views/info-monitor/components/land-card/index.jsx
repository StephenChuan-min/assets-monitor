import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { landTransferCount, landMortgageCount, landTransactionCount } from 'api/monitor-info/excavate/count';
import { promiseAll } from '@/utils/promise';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Land extends PureComponent {
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
		promiseArray.push(landTransferCount(params));
		promiseArray.push(landMortgageCount(params));
		promiseArray.push(landTransactionCount(params));
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
			url, landPropsData, landPropsData: {
				totalCount, loading, gmtUpdate, mortgagee, owner,
			},
		} = this.props;
		const { unReadCount } = this.state;
		return (
			<Card
				IconType="land"
				Loading={loading}
				onClick={() => navigate(url)}
				IconColor={{ color: '#1C80E1' }}
				customStyle={hasCountStyle}
				text="土地信息"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(landPropsData).length !== 0 && (
					<div className="risk-land-container">
						{totalCount ? (
							<div className="risk-land-container-card" style={{ paddingBottom: '10px', color: '#7D8699' }}>
								<span style={{ color: '#FB5A5C' }}>*</span>
								原土地使用权人不计入角色统计
							</div>
						) : null}
						<div className={`risk-land-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							使用权人：
							<span className={`risk-land-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{owner || 0}</span>
							条
						</div>

						<div className={`risk-land-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							抵押权人：
							<span className={`risk-land-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{mortgagee || 0}</span>
							条
						</div>
					</div>
				)}
			</Card>
		);
	}
}
