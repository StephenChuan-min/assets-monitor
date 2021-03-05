import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { riskDishonestCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Broken extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			riskDishonestNum: 0,
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
		riskDishonestCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					riskDishonestNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, dishonestPropsData, dishonestPropsData: {
				dishonest, gmtUpdate, onceDishonest, totalCount,
			},
		} = this.props;
		const { riskDishonestNum } = this.state;
		return (
			<Card
				Risk
				IconType="broken"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="失信记录"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={riskDishonestNum}
			>
				{Object.keys(dishonestPropsData).length !== 0 && (
				<div className="risk-broken-container">
					<div className={`risk-broken-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
						曾失信债务人：
						<span className={`risk-broken-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{onceDishonest || 0 }</span>
						名
					</div>

					<div className={`risk-broken-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						已失信债务人：
						<span className={`risk-broken-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{dishonest || 0}</span>
						名
					</div>
				</div>
				)}
			</Card>
		);
	}
}
