import React from 'react';
import Dishonest from '../../../enterprise/lawsuits/dishonest';

export default class lawsuitsMonitor extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
	}

	render() {
		const { id } = this.props;

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="inquiry-public-table">
					<Dishonest portrait="personal" />
				</div>
			</div>
		);
	}
}
