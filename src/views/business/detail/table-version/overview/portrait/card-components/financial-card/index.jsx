import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

export default class FinancialCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource, dataSource: {
				dataArray, allNum, gmtModified, obligorTotal,
			},
		} = this.props;
		return (
			<React.Fragment>
				{
					allNum > 0 ? (
						<Card
							IconType="finance"
							obligorTotal={obligorTotal}
							IconColor={{ color: '#FB8E3C' }}
							portrait={portrait}
							count={allNum}
							gmtCreate={gmtModified}
							obligorName="人匹配到代位权信息"
							customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
							onClick={() => navigateDetail('e-assets-financial')}
							text="金融资产"
							styleName="financial-card"
						>
							<div className="business-financial-container">
								{
									Object.keys(dataSource).length !== 0 && dataArray.map((item, index) => (index % 2 > 0 ? (
										<div className="business-financial-container-card" style={{ paddingBottom: 16, paddingLeft: 16 }}>
											{item.typeName}
											：
											<span className={`business-financial-container-card-num ${!allNum && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
											条
										</div>
									) : (
										<div className="business-financial-container-card" style={{ paddingBottom: 16 }}>
											{item.typeName}
											：
											<span className={`business-financial-container-card-num ${!allNum && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
											条
										</div>
									)))
								}

							</div>
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
