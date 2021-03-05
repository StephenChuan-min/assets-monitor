import React from 'react';
import { toThousands } from '@/utils/changeTime';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Land extends React.Component {
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
		const newDataSource = isArray && dataSource.slice(0, 2).filter(i => i.count > 0);
		const owner = newDataSource && newDataSource[0];
		const mortgagee = newDataSource && newDataSource[1];

		return (
			<React.Fragment>
				{dataSourceNum > 0 ? (
					<Card
						IconType="land"
						portrait={portrait}
						count={dataSourceNum}
						IconColor={{ color: '#1C80E1' }}
						gmtCreate={gmtCreate}
						customStyle={hasCountStyle}
						obligorTotal={obligorTotal}
						text="土地信息"
						obligorName="人匹配到土地信息"
						onClick={() => navigateDetail('e-assets-land')}
					>
						<div
							className="business-land-container"
							style={(owner && owner.amount > 10000000000) || (mortgagee && mortgagee.amount > 10000000000) ? { position: 'relative', left: '-24px' } : {}}
						>
							<div className="business-land-container-card" style={{ paddingBottom: '10px', color: '#7D8699' }}>
								<span style={{ color: '#FB5A5C' }}>*</span>
								原土地使用权人不计入角色统计
							</div>
							{owner ? (
								<div className="business-land-container-card" style={{ paddingBottom: '16px' }}>
									使用权人：
									<span className="business-land-container-card-num">{owner.count || 0}</span>
									条
									{owner.amount ? (
										<span style={{ paddingLeft: '5px' }}>
											(涉及土地价值
											<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(owner.amount)}</span>
											元)
										</span>
									) : null}
								</div>
							) : null}

							{mortgagee ? (
								<div className="business-land-container-card ">
									抵押权人：
									<span className="business-land-container-card-num ">{mortgagee.count || 0}</span>
									条
									{mortgagee.amount ? (
										<span style={{ paddingLeft: '5px' }}>
											(涉及抵押额
											<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(mortgagee.amount)}</span>
											元)
										</span>
									) : null}
								</div>
							) : null}
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
