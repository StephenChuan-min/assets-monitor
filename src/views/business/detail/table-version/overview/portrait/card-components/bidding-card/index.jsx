import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Bidding extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { portrait, dataSource: { biddingNum, gmtCreate, obligorTotal } } = this.props;
		return (
			<React.Fragment>
				{biddingNum > 0 ? (
					<Card
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconType="bidding"
						IconColor={{ color: '#3DBD7D' }}
						customStyle={hasCountStyle}
						count={biddingNum}
						gmtCreate={gmtCreate}
						obligorName="人匹配到招投标信息"
						text="招投标"
						onClick={() => navigateDetail('e-assets-bidding')}
						styleName="bidding-card"
					>
						<div className="business-bankruptcy-card">
							<span className="business-bankruptcy-card-num">{biddingNum || 0}</span>
							条相关匹配信息，请核实
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
