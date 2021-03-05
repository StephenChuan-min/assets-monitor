import React from 'react';
import { Row, Col } from 'antd';
import intangibleImg from '@/assets/img/business/intangibleCard.png';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				dataSource, dataSourceNum, gmtCreate, obligorTotal,
			},
		} = this.props;
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<React.Fragment>
				{dataSourceNum > 0
					? (
						<Card
							IconType="intangible"
							IconColor={{ color: '#FFC531' }}
							portrait={portrait}
							imgCard={intangibleImg}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							obligorTotal={obligorTotal}
							customStyle={hasCountStyle}
							obligorName="人匹配到无形资产"
							text="无形资产"
							onClick={() => navigateDetail('e-assets-intangible')}
							styleName="intangible-card"
						>
							<Row gutter={24} className="business-intangible-container">
								{
									newDataSource && newDataSource.map((item, index) => (
										<div>
											{
													index > 2 ? (
														<Col className="gutter-row" span={12}>
															<div className="business-intangible-container-card">
																<span className="business-intangible-container-card-name">{item.typeName}</span>
																：
																<span className="business-intangible-container-card-num">{item.count || 0}</span>
																条
															</div>
														</Col>
													) : (
														<Col className="gutter-row" span={12}>
															<div className="business-intangible-container-card">
																<span className="business-intangible-container-card-name">{item.typeName}</span>
																：
																<span className="business-intangible-container-card-num">{item.count || 0}</span>
																条
															</div>
														</Col>
													)
												}
										</div>
									))
									}
							</Row>
						</Card>
					) : null
				}
			</React.Fragment>

		);
	}
}
