import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { riskBankruptcyCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Bankruptcy extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			riskBankruptcyNum: 0,
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
		riskBankruptcyCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					riskBankruptcyNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, bankruptcyPropsData, bankruptcyPropsData: {
				totalCount, gmtUpdate, obligorTotal,
			},
		} = this.props;
		const { riskBankruptcyNum } = this.state;
		return (
			<Card
				Risk
				IconType="bankruptcy"
				IconColor={{ color: '#1C80E1' }}
				customStyle={hasCountStyle}
				text="破产重组"
				onClick={() => navigate(url)}
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={riskBankruptcyNum}
			>
				{Object.keys(bankruptcyPropsData).length !== 0 && (
					<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						破产/重整风险企业：
						<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{obligorTotal || 0}</span>
						家
					</div>
				)}
			</Card>
		);
	}
}
