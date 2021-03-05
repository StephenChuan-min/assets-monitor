import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import Construct from './construct';
import Winbid from './winbid';
import Underway from './underway';
import '../../style.scss';

class ConstructTable extends Component {
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
		const peopleProps = obligorId ? { stationId, obligorId } : { stationId };
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
										item.count > 0 && item.status
										&& (
											<div>
												<div className="messageDetail-table-subTitle" style={{ width: parseInt(item.name.length * 10 + 35, 10) }}>
													{item.name}
													<span>{item.count}</span>
												</div>
												{ item.dataType === 11701 && <Construct dataType={11701} {...peopleProps} />}
												{ item.dataType === 11702 && <Winbid dataType={11702} {...peopleProps} />}
												{ item.dataType === 11703 && <Underway dataType={11703} {...peopleProps} />}
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

ConstructTable.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	obligorId: PropTypes.any,
	id: PropTypes.string,
	total: PropTypes.number,
	stationId: PropTypes.number,
	title: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	childrenCount: PropTypes.array,
};

ConstructTable.defaultProps = {
	obligorId: undefined,
	total: 0,
	stationId: 0,
	id: 'message-construct',
	title: '在建工程',
	childrenCount: [],
};

export default ConstructTable;
