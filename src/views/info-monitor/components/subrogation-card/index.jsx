import React, { PureComponent } from 'react';
import {
	subrogationTrialCount, subrogationCourtCount, subrogationJudgmentCount,
} from 'api/monitor-info/excavate/count';
import { navigate } from '@reach/router';
import { promiseAll } from '@/utils/promise';
import Card from '../card';
import './style.scss';

export default class Subrogation extends PureComponent {
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
		promiseArray.push(subrogationTrialCount(params));
		promiseArray.push(subrogationCourtCount(params));
		promiseArray.push(subrogationJudgmentCount(params));
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
			url, subrogationPropsData, subrogationPropsData: {
				restore, execute, otherCase, gmtUpdate, totalCount,
			},
		} = this.props;
		const { unReadCount } = this.state;
		return (
			<Card
				IconType="subrogation"
				onClick={() => navigate(url)}
				IconColor={{ color: '#948BFF' }}
				customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
				text="代位权"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(subrogationPropsData).length !== 0 && (
					<div className="risk-subrogation-container">
						<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							执行案件：
							<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{execute || 0}</span>
							笔
							{restore > 0 ? (
								<span className="risk-subrogation-container-card-tips">
									（
									<span className="risk-subrogation-container-card-tips-num">{restore}</span>
									笔执恢案件）
								</span>
							) : null}
						</div>
						<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							其他案件：
							<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{otherCase || 0}</span>
							笔
						</div>
					</div>
				)}
			</Card>
		);
	}
}
