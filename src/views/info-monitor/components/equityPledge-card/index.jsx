import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { pledgeCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Stock extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			pledgeNum: 0,
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
		pledgeCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					pledgeNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, stockPropsData, stockPropsData: {
				stockOwner, stockUser, gmtUpdate, totalCount,
			},
		} = this.props;
		const { pledgeNum } = this.state;
		return (
			<Card
				IconType="stock"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="股权质押"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={pledgeNum}
			>
				{Object.keys(stockPropsData).length !== 0 && (
					<div className="risk-stock-container">
						<div className={`risk-stock-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							股权持有人：
							<span className={`risk-stock-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{stockOwner || 0}</span>
							条
						</div>

						<div className={`risk-stock-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							股权质权人：
							<span className={`risk-stock-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{stockUser || 0}</span>
							条
						</div>
					</div>
				)}
			</Card>
		);
	}
}
