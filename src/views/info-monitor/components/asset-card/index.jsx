import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { navigate } from '@reach/router';
import { infoCount } from '@/utils/api/monitor-info/assets';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Asset extends PureComponent {
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
		infoCount(this.condition).then((res) => {
			if (res.code === 200) {
				this.setState({
					unReadCount: res.data.unfollowedCount,
				});
			}
		});
	};


	render() {
		const {
			url, auctionPropsData, auctionPropsData: {
				totalCount, auctionArray, loading, gmtUpdate,
			},
		} = this.props;
		const { unReadCount } = this.state;
		// console.log(auctionPropsData);
		return (
			<React.Fragment>
				<Card
					IconType="auction"
					Loading={loading}
					onClick={() => navigate(url)}
					IconColor={{ color: '#FB8E3C' }}
					customStyle={hasCountStyle}
					text="资产拍卖"
					totalCount={totalCount}
					updateTime={gmtUpdate}
					unReadText="条未跟进信息"
					unReadNum={unReadCount}
				>
					{Object.keys(auctionPropsData).length !== 0 && (
						<Row gutter={24} className="risk-auction-container">
							{
							auctionArray.map((item, index) => (
								<div>
									{
										index > 2 ? (
											 (
												<Col className="gutter-row" span={12}>
													<div className="risk-auction-container-card">
														<span className="risk-auction-container-card-name">{item.typeName}</span>
														<span className="risk-auction-container-card-info">：</span>
														<span className={`risk-auction-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
														条
													</div>
												</Col>
											)
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-auction-container-card">
													<span className="risk-auction-container-card-name">{item.typeName}</span>
													<span className="risk-auction-container-card-info">：</span>
													<span className={`risk-auction-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
													条
												</div>
											</Col>
										)
									}
								</div>
							))
							}
						</Row>
					)}
				</Card>
			</React.Fragment>
		);
	}
}
