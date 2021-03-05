import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { estateRegisterCount as estateRegisterCountApi } from 'api/monitor-info/excavate/count';
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
		estateRegisterCountApi(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					assetNum: res.data,
				});
			}
		});
	};

	render() {
		const { url, realEstatePropsData, realEstatePropsData: { estateRegisterCount, gmtUpdate, totalCount } } = this.props;
		const { assetNum } = this.state;
		return (
			<Card
				IconType="budongchandengji"
				IconColor={{ color: '#1C80E1' }}
				customStyle={hasCountStyle}
				text="不动产登记"
				onClick={() => navigate(url)}
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={assetNum}
			>
				{Object.keys(realEstatePropsData).length !== 0 && (
					<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{estateRegisterCount || 0}</span>
						条不动产登记信息
					</div>
				)}
			</Card>
		);
	}
}
