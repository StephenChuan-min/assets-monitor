import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { mortgageCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Chattel extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			mortgageNum: 0,
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
		mortgageCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					mortgageNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, mortgagePropsData, mortgagePropsData: {
				owner, people, gmtUpdate, totalCount,
			},
		} = this.props;
		const { mortgageNum } = this.state;
		return (
			<Card
				IconType="chattel"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="动产抵押"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={mortgageNum}
			>
				{Object.keys(mortgagePropsData).length !== 0 && (
					<div className="risk-chattel-container">
						<div className={`risk-chattel-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							抵押物所有人：
							<span className={`risk-chattel-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{owner || 0}</span>
							条
						</div>

						<div className={`risk-chattel-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							抵押权人：
							<span className={`risk-chattel-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{people || 0}</span>
							条
						</div>
					</div>
				)}
			</Card>
		);
	}
}
