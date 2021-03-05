import React from 'react';
import { Row, Col } from 'antd';
import { toThousands } from '@/utils/changeTime';
import { Icon } from '@/common';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '754px', height: '155px', marginBottom: '20px' };
const lessCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	newRoleDistributions = () => {
		const { dataSource: { auctionPropsData } } = this.props;
		const unKnownRoleArray = [];
		const newArray = [];
		auctionPropsData.roleDistributions.forEach((item) => {
			if (item.type === -1) {
				unKnownRoleArray.push(item);
			}
			if (item.type !== -1) {
				newArray.push(item);
			}
		});
		return [...newArray, ...unKnownRoleArray];
	};

	render() {
		const { portrait, dataSource: { auctionPropsData } } = this.props;
		const roleDistributions = auctionPropsData && Array.isArray((auctionPropsData.roleDistributions)) && auctionPropsData.roleDistributions.length > 0;
		return (
			<React.Fragment>
				{auctionPropsData.count > 0 ? (
					<Card
						asset
						text="资产拍卖"
						IconType="auction"
						portrait={portrait}
						customStyle={roleDistributions && this.newRoleDistributions().length > 2 ? hasCountStyle : lessCountStyle}
						count={auctionPropsData.count}
						IconColor={{ color: '#FB8E3C' }}
						gmtCreate={auctionPropsData.gmtCreate}
						obligorTotal={auctionPropsData.obligorTotal}
						obligorName="人匹配到资产拍卖信息"
						onClick={() => navigateDetail('e-assets-auction')}
					>
						{
							roleDistributions && this.newRoleDistributions().length > 2 ? (
								<div className="business-auction-container">
									<Row gutter={20} style={{ marginRight: '0', marginLeft: '0' }}>
										<Col className="gutter-row" span={8}>
											<div className="business-auction-container-price">
												<Icon className="business-auction-container-price-icon" type="icon-assets" style={{ color: '#FB8E3C' }} />
												<div style={{ fontSize: '12px', color: '#20242E' }}>相关资产价值约</div>
												<div>
													<span style={{ color: '#FB5A5C', fontSize: '16px', marginRight: '5px' }}>
														{auctionPropsData.assetTotal ? toThousands(auctionPropsData.assetTotal) : '0'}
													</span>
													元
												</div>
												<span className="business-auction-container-price-line" />
											</div>
										</Col>
										{
										roleDistributions && this.newRoleDistributions().map((item, index) => (
											<div>
												{
													index > 2 ? (
														(
															<Col className="gutter-row" span={5}>
																<div className="business-auction-container-card">
																	<span className="business-auction-container-card-name">{item.typeName}</span>
																	<span className="business-auction-container-card-info">：</span>
																	<span className="business-auction-container-card-num">{item.count || 0}</span>
																	条
																</div>
															</Col>
														)
													) : (
														<Col className="gutter-row" span={5}>
															<div className="business-auction-container-card">
																<span className="business-auction-container-card-name">{item.typeName}</span>
																<span className="business-auction-container-card-info">：</span>
																<span className="business-auction-container-card-num">{item.count || 0}</span>
																条
															</div>
														</Col>
													)
												}
											</div>
										))
									}
									</Row>
								</div>
							) : (
								<div className="business-auction-container">
									<Row gutter={20} style={{ marginRight: '0', marginLeft: '0' }}>
										<Col className="gutter-row" span={12}>
											<div className="business-auction-container-price" style={{ width: '144px' }}>
												<Icon className="business-auction-container-price-icon" type="icon-assets" style={{ color: '#FB8E3C' }} />
												<div style={{ fontSize: '12px', color: '#20242E' }}>相关资产价值约</div>
												<div>
													<span style={{ color: '#FB5A5C', fontSize: '16px', marginRight: '5px' }}>
														{auctionPropsData.assetTotal ? toThousands(auctionPropsData.assetTotal) : '0'}
													</span>
													元
												</div>
												<span className="business-auction-container-price-line" />
											</div>
										</Col>
										<Col className="gutter-row" span={12}>
											{
												roleDistributions && this.newRoleDistributions().map(item => (
													<Row gutter={20} style={{ marginRight: '0', marginLeft: '0' }}>
														<div className="business-auction-container-card">
															<span className="business-auction-container-card-name">{item.typeName}</span>
															<span className="business-auction-container-card-info">：</span>
															<span className="business-auction-container-card-num">{item.count || 0}</span>
															条
														</div>
													</Row>
												))
											}
										</Col>
									</Row>
								</div>
							)
						}
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
