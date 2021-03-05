import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

export default class ConstructCard extends React.Component {
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
							IconType="construct-circle"
							obligorTotal={obligorTotal}
							IconColor={{ color: '#E9B700' }}
							portrait={portrait}
							count={allNum}
							gmtCreate={gmtModified}
							obligorName="人匹配到在建工程信息"
							customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
							onClick={() => navigateDetail('e-assets-construct')}
							text="在建工程"
							styleName="construct-card"
						>
							<div className="business-construct-container">
								{
									Object.keys(dataSource).length !== 0 && dataArray.map((item, index) => (index % 2 > 0 ? (
										<div className="business-construct-container-card" style={{ paddingBottom: 16, paddingLeft: 16 }}>
											{item.typeName}
											：
											<span className={`business-construct-container-card-num ${!allNum && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
											条
										</div>
									) : (
										<div className="business-construct-container-card" style={{ paddingBottom: 16 }}>
											{item.typeName}
											：
											<span className={`business-construct-container-card-num ${!allNum && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
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
