import React from 'react';

export default class BusinessScale extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { businessScaleInfo } = this.props;

		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name"> 企业规模</span>
				</div>
				<div>
					<div className="yc-role-container">
						<span className="yc-role-icon" />
						<div className="yc-role-name">
							人员规模
						</div>
						<div className="yc-role-num">
							{businessScaleInfo.employeeNum || '未知'}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
