import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { assetUnBlockCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class UnBlock extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			assetUnBlockNum: 0,
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
		assetUnBlockCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					assetUnBlockNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, unBlockPropsData, unBlockPropsData: {
				unBlock, gmtUpdate, totalCount,
			},
		} = this.props;
		const { assetUnBlockNum } = this.state;
		return (
			<Card
				IconType="unlock"
				IconColor={{ color: '#FB8E3C' }}
				customStyle={hasCountStyle}
				text="查/解封资产"
				onClick={() => navigate(url)}
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={assetUnBlockNum}
			>
				{Object.keys(unBlockPropsData).length !== 0 && (
					<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{unBlock || 0}</span>
						条相关匹配信息
						{totalCount ? '，请核实' : ''}
					</div>
				)}
			</Card>
		);
	}
}
