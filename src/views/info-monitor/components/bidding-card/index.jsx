import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { assetBiddingCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Bidding extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			assetBiddingNum: 0,
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
		assetBiddingCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					assetBiddingNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, biddingPropsData, biddingPropsData: {
				bidding, gmtUpdate, totalCount,
			},
		} = this.props;
		const { assetBiddingNum } = this.state;
		return (
			<Card
				IconType="bidding"
				IconColor={{ color: '#3DBD7D' }}
				customStyle={hasCountStyle}
				text="招投标"
				onClick={() => navigate(url)}
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={assetBiddingNum}
			>
				{Object.keys(biddingPropsData).length !== 0 && (
				<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
					<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{bidding || 0}</span>
					条相关匹配信息
					{totalCount ? '，请核实' : ''}
				</div>
				)}
			</Card>
		);
	}
}
