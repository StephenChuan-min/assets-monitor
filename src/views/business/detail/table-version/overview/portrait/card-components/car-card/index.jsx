import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class UnBlockCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				vehicleInformationCount, gmtModified, obligorTotal, totalVehicleNum,
			},
		} = this.props;
		return (
			<React.Fragment>
				{vehicleInformationCount > 0 || totalVehicleNum > 0 ? (
					<Card
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconType="cheliangxinxi"
						IconColor={{ color: '#3DBD7D' }}
						customStyle={hasCountStyle}
						count={vehicleInformationCount}
						gmtCreate={gmtModified}
						obligorName="条相关匹配信息"
						text="车辆信息"
						onClick={() => navigateDetail('e-assets-car')}
						styleName="car-card"
					>
						<div className="business-unblock-card">
							共匹配到
							<span className="business-unblock-card-num" style={{ paddingLeft: 5 }}>{totalVehicleNum || 0}</span>
							辆车
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
