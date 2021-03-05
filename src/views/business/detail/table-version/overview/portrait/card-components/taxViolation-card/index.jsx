import React from 'react';
import taxImg from '@/assets/img/business/taxCard.png';
import Card from '../card';
import './style.scss';
import { navigateDetailRisk } from '@/utils';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Tax extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			 dataSource: {
				roleDistributions, dataSourceNum, gmtCreate,
			},
		} = this.props;
		const isArray = roleDistributions && Array.isArray((roleDistributions)) && roleDistributions.length > 0;
		return (
			<React.Fragment>
				{dataSourceNum > 0
					? (
						<Card
							Risk
							IconType="tax"
							IconColor={{ color: '#FB5A5C' }}
							customStyle={hasCountStyle}
							imgCard={taxImg}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							text="税收违法"
							onClick={() => navigateDetailRisk('e-manage-tax')}
						>
							<div className="business-tax-container">
								{
										isArray && roleDistributions.map(item => (
											<div className="business-tax-container-card" style={{ paddingBottom: '16px' }}>
												<span className="card-content-role-text">{item.typeName}</span>
												<span className="card-content-role-info">：</span>
												<span className="business-tax-container-card-num ">{item.count || 0}</span>
												条
											</div>
										))
									}
							</div>
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
