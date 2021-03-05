import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { carCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Bidding extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			assetNum: 0,
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
		carCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					assetNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, carPropsData, carPropsData: {
				vehicleInformationCount, gmtUpdate, totalCount,
			},
		} = this.props;
		const { assetNum } = this.state;
		return (
			<Card
				IconType="cheliangxinxi"
				IconColor={{ color: '#3DBD7D' }}
				customStyle={hasCountStyle}
				text="车辆信息"
				onClick={() => navigate(url)}
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={assetNum}
			>
				{Object.keys(carPropsData).length !== 0 && (
					<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{vehicleInformationCount || 0}</span>
						条车辆信息
					</div>
				)}
			</Card>
		);
	}
}
