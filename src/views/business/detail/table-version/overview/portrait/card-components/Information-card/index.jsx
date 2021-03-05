import React from 'react';
import { Row, Col } from 'antd';
import { navigateDetailRisk } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Information extends React.Component {
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
							Risk
							IconType="operation-risk"
							IconColor={{ color: '#FB5A5C' }}
							customStyle={hasCountStyle}
							portrait={portrait}
							obligorTotal={obligorTotal}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							obligorName="人匹配到经营风险信息"
							text="经营风险"
							onClick={() => navigateDetailRisk('e-manage')}
							styleName="information-card"
						>
							<Row gutter={24} className="business-operation-container">
								{
									newDataSource && newDataSource.map((item, index) => (
										<div>
											{
												index > 2 ? (
													<Col className="gutter-row" span={12}>
														<div className="business-operation-container-card">
															{item.typeName}
															：
															<span className="business-operation-container-card-num ">{item.count}</span>
															条
														</div>
													</Col>
												) : (
													<Col className="gutter-row" span={12}>
														<div className="business-operation-container-card">
															{item.typeName}
															：
															<span className="business-operation-container-card-num ">{item.count}</span>
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
