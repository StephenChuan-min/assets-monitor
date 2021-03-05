import React from 'react';
import { navigateDetailRisk } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Bankruptcy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { portrait, dataSource: { bankruptcyNum, gmtCreate, obligorTotal } } = this.props;
		const isBusiness = portrait && portrait === 'business';

		return (
			<React.Fragment>
				{bankruptcyNum > 0 ? (
					<Card
						Risk
						IconType="bankruptcy"
						IconColor={{ color: '#1C80E1' }}
						count={bankruptcyNum}
						gmtCreate={gmtCreate}
						customStyle={hasCountStyle}
						text="破产重组"
						onClick={() => navigateDetailRisk('e-manage-bankruptcy')}
						styleName="bankruptcy-card"
					>
						<div className="card-content">
							<div className="card-content-role">
								{
									isBusiness ? (
										<div className="business-bankruptcy-card">
											破产/重整风险企业：
											<span className="business-bankruptcy-card-num ">{obligorTotal || 0}</span>
											家
										</div>
									) : (
										<div>
											{bankruptcyNum}
											<span style={{ fontSize: '12px', color: '#4E5566', paddingLeft: '5px' }}>条破产重组风险信息</span>
										</div>
									)
								}
							</div>
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
