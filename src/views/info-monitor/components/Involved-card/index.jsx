import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import {
	lawsuitCourtCount, lawsuitJudgmentCount, lawsuitTrialCount,
} from 'api/monitor-info/excavate/count';
import { promiseAll } from '@/utils/promise';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Lawsuit extends PureComponent {
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
		promiseArray.push(lawsuitTrialCount(params));
		promiseArray.push(lawsuitCourtCount(params));
		promiseArray.push(lawsuitJudgmentCount(params));
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
			url, litigationPropsData, litigationPropsData: {
				gmtUpdate, obligorTotal, totalCount,
			},
		} = this.props;
		const { unReadCount } = this.state;
		return (
			<Card
				Risk
				IconType="lawsuit"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB8E3C' }}
				customStyle={hasCountStyle}
				text="涉诉信息"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(litigationPropsData).length !== 0 && (
					<div className="risk-lawsuit-card">
						涉诉风险债务人：
						<span className={`risk-lawsuit-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{obligorTotal || 0}</span>
						名
						{totalCount ? '，点击查看涉诉详情' : ''}
					</div>
				)}
			</Card>
		);
	}
}
