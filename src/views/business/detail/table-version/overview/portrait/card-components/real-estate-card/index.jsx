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
		const { portrait, dataSource: { realRegisterCount, gmtModified, obligorTotal } } = this.props;
		return (
			<React.Fragment>
				{realRegisterCount > 0 ? (
					<Card
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconType="budongchandengji"
						IconColor={{ color: '#1C80E1' }}
						customStyle={hasCountStyle}
						count={realRegisterCount}
						gmtCreate={gmtModified}
						obligorName="条相关匹配信息"
						text="不动产登记"
						onClick={() => navigateDetail('e-assets-real-estate')}
						styleName="real-estate-card"
					>
						<div className="business-unblock-card">
							<span className="business-unblock-card-num">{realRegisterCount || 0}</span>
							条相关匹配信息
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
