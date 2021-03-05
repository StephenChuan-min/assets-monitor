import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class EquityPledge extends React.Component {
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
				{dataSourceNum > 0 ? (
					<Card
						IconType="stock"
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconColor={{ color: '#FB5A5C' }}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						onClick={() => navigateDetail('e-assets-stock')}
						customStyle={hasCountStyle}
						obligorName="人匹配到股权质押"
						text="股权质押"
						styleName="equityPledge-card"
					>
						<div className="business-stock-container">
							{
								newDataSource && newDataSource.map(item => (
									<div className="business-stock-container-card" style={{ paddingBottom: '16px' }}>
										{item.type === 1 ? '股权持有人' : '股权质权人'}
										<span className="card-content-role-info">：</span>
										<span className="business-stock-container-card-num ">{item.count || 0}</span>
										条
									</div>
								))
							}
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
