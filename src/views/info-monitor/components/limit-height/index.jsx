import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { riskLimitCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class LimitHeight extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			limitHeightNum: 0,
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
		riskLimitCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					limitHeightNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, limitHeightPropsData, limitHeightPropsData: {
				limitHeightCount, onceLimitHeightCount, gmtUpdate, totalCount,
			},
		} = this.props;
		const { limitHeightNum } = this.state;
		return (
			<Card
				Risk
				IconType="limit"
				onClick={() => navigate(url)}
				IconColor={{ color: '#B927A6' }}
				customStyle={hasCountStyle}
				text="限制高消费"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={limitHeightNum}
			>
				{Object.keys(limitHeightPropsData).length !== 0 && (
					<div className="risk-limit-container">
						<div className={`risk-limit-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							限高记录数：
							<span className={`risk-limit-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{limitHeightCount || 0}</span>
							条
						</div>

						<div className={`risk-limit-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							曾限高记录数：
							<span className={`risk-limit-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{onceLimitHeightCount || 0}</span>
							条
						</div>
					</div>
				)}
			</Card>
		);
	}
}
