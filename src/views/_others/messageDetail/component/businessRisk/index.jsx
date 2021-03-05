import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import AbnormalOperation from './abnormalOperation';
import BusinessChange from './businessChange';
import AdministrativePenalties from './administrativePenalties';
import IllegalTaxation from './illegalTaxation';
import EnvironmentPunishment from './environmentPunishment';
import Illegal from './illegal';
import '../../style.scss';

class BusinessRisk extends Component {
	constructor(props) {
		super(props);
		this.state = {
			obligorId: props.obligorId,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { obligorId } = this.props;
		if (nextProps.obligorId !== obligorId) {
			this.setState({
				obligorId: nextProps.obligorId,
			});
		}
	}

	render() {
		const {
			id, title, total, childrenCount, stationId,
		} = this.props;
		const { obligorId } = this.state;
		const peopleProps = { stationId, obligorId };
		const config = childrenCount && childrenCount.filter(item => item.count > 0);
		return (
			<React.Fragment>
				{
					config.length > 0 && (
						<React.Fragment>
							<div className="messageDetail-table-title" id={id}>
								{title}
								<span className="messageDetail-table-total">{total}</span>
							</div>
							<div className="messageDetail-table-headerLine" />
							<div className="messageDetail-table-container">
								{
									config.map(item => (
										item.count > 0 && item.status
										&& (
											<div>
												<div className="messageDetail-table-subTitle" style={{ width: parseInt(item.name.length * 10 + 35, 10) }}>
													{item.name}
													<span>{item.count}</span>
												</div>
												{/* 经营异常 */}
												{ item.dataType === 11203 && <AbnormalOperation dataType={11203} {...peopleProps} />}
												{/* 工商变更 */}
												{ item.dataType === 11204 && <BusinessChange dataType={11204} {...peopleProps} />}
												{/* 严重违法 */}
												{ item.dataType === 11205 && <Illegal dataType={11205} {...peopleProps} />}
												{/* 税收违法 */}
												{ item.dataType === 11201 && <IllegalTaxation dataType={11201} {...peopleProps} />}
												{/* 行政处罚 */}
												{ item.dataType === 11206 && <AdministrativePenalties dataType={11206} {...peopleProps} />}
												{/* 环保处罚 */}
												{ item.dataType === 11202 && <EnvironmentPunishment dataType={11202} {...peopleProps} />}
											</div>
										)
									))
								}
							</div>
						</React.Fragment>
					)
				}
			</React.Fragment>
		);
	}
}

BusinessRisk.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	total: PropTypes.number,
	// eslint-disable-next-line react/forbid-prop-types
	obligorId: PropTypes.any,
	stationId: PropTypes.number,
	// eslint-disable-next-line react/forbid-prop-types
	childrenCount: PropTypes.array,
};

BusinessRisk.defaultProps = {
	id: 'message-intangible',
	title: '动产抵押',
	total: 0,
	obligorId: undefined,
	stationId: 0,
	childrenCount: [],
};

export default BusinessRisk;
