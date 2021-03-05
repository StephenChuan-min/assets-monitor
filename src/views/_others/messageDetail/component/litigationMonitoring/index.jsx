import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import '../../style.scss';
import FileCase from './fileCase';
import Court from './court';
import JudgmentDocument from './judgmentDocument';

class LitigationMonitoring extends Component {
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
		const config = childrenCount ? childrenCount.filter(item => item.count > 0) : [];
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
									item.count > 0
									&& (
										<div className="messageDetail-table-single">
											<div className="messageDetail-table-subTitle" style={{ width: parseInt(item.name.length * 10 + 35, 10) }}>
												{item.name}
												<span>{item.count}</span>
											</div>
											{ item.dataType === 10901 && <FileCase dataType={10901} {...peopleProps} />}
											{ item.dataType === 10902 && <Court dataType={10902} {...peopleProps} />}
											{ item.dataType === 10903 && <JudgmentDocument dataType={10903} {...peopleProps} />}
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

LitigationMonitoring.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	obligorId: PropTypes.any,
	id: PropTypes.string,
	total: PropTypes.number,
	stationId: PropTypes.number,
	title: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	childrenCount: PropTypes.array,
};

LitigationMonitoring.defaultProps = {
	obligorId: undefined,
	total: 0,
	stationId: 0,
	id: 'message-litigation',
	title: '涉诉监控',
	childrenCount: [],
};

export default LitigationMonitoring;
