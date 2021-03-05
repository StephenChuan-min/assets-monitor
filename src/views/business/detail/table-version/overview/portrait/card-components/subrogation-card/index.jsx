import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				execute, gmtCreate, restore, allNum, otherCase, obligorTotal,
			},
		} = this.props;
		return (
			<React.Fragment>
				{
					allNum > 0 ? (
						<Card
							IconType="subrogation"
							obligorTotal={obligorTotal}
							IconColor={{ color: '#948BFF' }}
							portrait={portrait}
							count={allNum}
							gmtCreate={gmtCreate}
							obligorName="人匹配到代位权信息"
							customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
							onClick={() => navigateDetail('e-assets-subrogation')}
							text={portrait === 'debtor_personal' ? '代位权-裁判文书' : '代位权'}
							styleName="subrogation-card"
						>
							<div className="business-subrogation-container">
								{execute ? (
									<div className="business-subrogation-container-card" style={{ paddingBottom: '16px' }}>
										执行案件：
										<span className="business-subrogation-container-card-num ">{execute || 0}</span>
										笔
										{restore > 0 ? (
											<div className="card-content-left-arrow">
												<div className="card-content-popover-content">
													{restore}
													笔执恢案件
												</div>
											</div>
										) : null}
									</div>
								) : null}

								{otherCase ? (
									<div className="business-subrogation-container-card ">
										其他案件：
										<span className="business-subrogation-container-card-num">{otherCase || 0}</span>
										笔
									</div>
								) : null}
							</div>
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
