import React from 'react';

export default class Basic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { baseInfo } = this.props;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">基本信息</span>
				</div>
				<div className="overview-container-content">

					<div className="yc-basic">
						<div className="yc-basic-name">法定代表人:</div>
						<div className="yc-basic-description">{baseInfo.legalPersonName || '-'}</div>
					</div>
					<div className="yc-basic">
						<div className="yc-basic-name">经营状态:</div>
						<div className="yc-basic-description">{baseInfo.regStatus || '-'}</div>
					</div>
					<div className="yc-basic">
						<div className="yc-basic-name">注册资本:</div>
						<div className="yc-basic-description">{baseInfo.regCapital || '-'}</div>
					</div>
					<div className="yc-basic">
						<div className="yc-basic-name">成立日期:</div>
						<div className="yc-basic-description">{baseInfo.establishTime || '-'}</div>
					</div>
					<div className="yc-basic" style={{ width: '100%', marginBottom: 10 }}>
						<div className="yc-basic-name">注册地址:</div>
						<div className="yc-basic-description">{baseInfo.regLocation || '-'}</div>
					</div>
				</div>
			</div>
		);
	}
}
