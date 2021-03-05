import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import '../../style.scss';
import Sewage from './sewage';
import Mining from './mining';
import Trademark from './trademark';
import Building from './building';

class IntangibleAssets extends Component {
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
		const peopleProps = {
			stationId,
			obligorId,
		};
		const config = childrenCount && childrenCount.filter(item => item.count > 0);
		return (
			<React.Fragment>
				{
					config.length > 0 && (
						<div>
							<div className="messageDetail-table-title" id={id}>
								{title}
								<span className="messageDetail-table-total">{total}</span>
							</div>
							<div className="messageDetail-table-headerLine" />
							<div className="messageDetail-table-container">
								{
									config.map(item => (
										item.count > 0
										&& (
											<div>
												<div className="messageDetail-table-subTitle" style={{ width: parseInt(item.name.length * 10 + 35, 10) }}>
													{item.name}
													<span>{item.count}</span>
												</div>
												{ item.dataType === 10801 && <Sewage dataType={10801} {...peopleProps} />}
												{ item.dataType === 10802 && <Mining dataType={10802} {...peopleProps} />}
												{ item.dataType === 10803 && <Trademark dataType={10803} {...peopleProps} />}
												{ item.dataType === 10804 && <Building dataType={10804} {...peopleProps} />}
											</div>
										)
									))
								}
							</div>
						</div>
					)
				}
			</React.Fragment>
		);
	}
}

IntangibleAssets.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	obligorId: PropTypes.any,
	id: PropTypes.string,
	total: PropTypes.number,
	stationId: PropTypes.number,
	title: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	childrenCount: PropTypes.array,
};

IntangibleAssets.defaultProps = {
	obligorId: undefined,
	total: 0,
	stationId: 0,
	id: 'message-invisibleAssets',
	title: '无形资产',
	childrenCount: [],
};


export default IntangibleAssets;
