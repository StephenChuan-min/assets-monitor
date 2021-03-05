import React from 'react';
import { navigateDetailRisk } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Involved extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				dataSource, dataSourceNum, gmtCreate, obligorTotal, otherCase, execute,
			},
		} = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<React.Fragment>
				{dataSourceNum > 0 ? (
					<Card
						Risk
						IconType="lawsuit"
						IconColor={{ color: '#FB8E3C' }}
						customStyle={hasCountStyle}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						text={portrait === 'debtor_personal' ? '涉诉信息-裁判文书' : '涉诉信息'}
						onClick={() => navigateDetailRisk('e-manage-lawsuits')}
					>
						<div className="business-lawsuit-container">
							{
									isBusiness
										? (
											<div className="business-lawsuit-card">
												<span style={{ fontSize: '12px', color: '#4E5566', paddingRight: '5px' }}>涉诉风险债务人：</span>
												<span className="business-bankruptcy-card-num">{obligorTotal || 0}</span>
												名
											</div>
										) : (portrait === 'debtor_personal' ? (
											<div>
												{execute > 0 ? (
													<div className="business-lawsuit-container-card" style={{ paddingBottom: '16px' }}>
														<span className="card-content-role-text">执行案件</span>
														<span className="card-content-role-info">：</span>
														<span className="business-lawsuit-container-card-num ">{execute || 0}</span>
														条
													</div>
												) : null}

												{otherCase > 0 ? (
													<div className="business-lawsuit-container-card" style={{ paddingBottom: '16px' }}>
														<span className="card-content-role-text">其他案件</span>
														<span className="card-content-role-info">：</span>
														<span className="business-lawsuit-container-card-num ">{otherCase || 0}</span>
														条
													</div>
												) : null}
											</div>
										) : newDataSource && newDataSource.map(item => (
											<div className="business-lawsuit-container-card" style={{ paddingBottom: '16px' }}>
												<span className="card-content-role-text">{item.typeName}</span>
												<span className="card-content-role-info">：</span>
												<span className="business-lawsuit-container-card-num ">{item.count || 0}</span>
												条
											</div>
										)))
								}
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
