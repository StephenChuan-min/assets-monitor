import React from 'react';
import { toThousands } from '@/utils/changeTime';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class ChattelMortgage extends React.Component {
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

		const owner = newDataSource && newDataSource[0];
		const people = newDataSource && newDataSource[1];
		return (
			<React.Fragment>
				{dataSourceNum > 0 ? (
					<Card
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconColor={{ color: '#FB5A5C' }}
						IconType="chattel"
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={hasCountStyle}
						obligorName="人匹配到动产抵押信息"
						onClick={() => navigateDetail('e-assets-chattel')}
						text="动产抵押"
					>
						<div className="business-chattel-container">
							{owner ? (
								<div className="business-chattel-container-card" style={{ paddingBottom: '16px' }}>
									抵押物所有人：
									<span className="business-chattel-container-card-num ">{owner.count || 0}</span>
									条
								</div>
							) : null}

							{people ? (
								<div className="business-chattel-container-card ">
									抵押权人：
									<span className="business-chattel-container-card-num ">{people.count || 0}</span>
									条
									{people.amount ? (
										<span style={{ paddingLeft: '5px' }}>
											(涉及债权额
											<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(people.amount)}</span>
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
