import React from 'react';
import { Row, Col } from 'antd';
import Card from '../card';
import './style.scss';
import { navigateDetailRisk } from '@/utils';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Break extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const {
			portrait, dataSource: {
				dataSource, gmtCreate, dishonestStatusArray, dataSourceNum, debtorArray,
			},
		} = this.props;
		const isDishonestStatusArray = Array.isArray(dishonestStatusArray) && dishonestStatusArray.length > 0;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const isDebtorArray = debtorArray && Array.isArray((debtorArray)) && debtorArray.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		const newDebtorArray = isDebtorArray && debtorArray.filter(i => i.count > 0);
		const isDishonest = isDishonestStatusArray && dishonestStatusArray && dishonestStatusArray[0].dishonestStatus === 1;

		return (
			<React.Fragment>
				{dataSourceNum > 0
					? (
						<Card
							Risk
							IconType="broken"
							IconColor={{ color: '#FB5A5C' }}
							customStyle={hasCountStyle}
							gmtCreate={gmtCreate}
							count={dataSourceNum}
							text="失信记录"
							onClick={() => navigateDetailRisk('e-manage-dishonest')}
						>
							{!isBusiness && (
								<div className="business-broken-container">
									{
										<span style={{ fontSize: '12px' }}>
											当前失信状态：
											<span
												style={isDishonest ? { color: '#FB5A5C' } : { color: '#B2B8C9' }}
											>
												{isDishonest ? '已失信' : '曾失信'}
											</span>
										</span>
									}
									{
										<Row gutter={24} className="business-intangible-container">
											{
													newDataSource && newDataSource.map(item => (
														<Col className="gutter-row" span={12}>
															<div className="business-broken-container-card">
																<span className="business-broken-container-card-name">{item.typeName}</span>
																<span className="card-content-role-info">：</span>
																<span className="business-broken-container-card-num">{item.count || 0}</span>
																条
															</div>
														</Col>
													))
												}
										</Row>
									}
								</div>
							)}

							{isBusiness && (
								<div className="business-broken-container">
									<Row gutter={24} className="business-intangible-container">
										<Col className="gutter-row" span={10}>
											{
												newDebtorArray && newDebtorArray.map(item => (
													<Row className="gutter-row" span={12}>
														<div className="business-broken-container-card" style={{ paddingBottom: '16px' }}>
															<span className="business-broken-container-card-name">{item.typeName}</span>
															：
															<span className="business-broken-container-card-num">{item.count || 0}</span>
															名
														</div>
													</Row>
												))
											}
										</Col>
										<Col className="gutter-row" span={2}>
											<div className="card-content-role-line" />
										</Col>
										<Col className="gutter-row" span={10}>
											{
												newDataSource && newDataSource.map(item => (
													<Row className="gutter-row" span={12}>
														<div className="business-broken-container-card" style={{ paddingBottom: '16px' }}>
															<span className="business-broken-container-card-name typeName">{item.typeName}</span>
															：
															<span className="business-broken-container-card-num">{item.count || 0}</span>
															条
														</div>
													</Row>
												))
											}
										</Col>
									</Row>
								</div>
							)}
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
