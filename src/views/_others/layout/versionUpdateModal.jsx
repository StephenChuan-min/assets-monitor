import React from 'react';
import { Modal, Button } from 'antd';
import version from 'img/icon/version.png';
import './style.scss';

export default class VersionUpdateModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { VersionUpdateModalVisible } = this.props;
		return (
			<Modal
				width={540}
				style={{ 'max-height': 770 }}
				className="yc-versionUpdate"
				closable={false}
				visible={VersionUpdateModalVisible}
				footer={null}
				// onCancel={this.handleCancel}
			>
				<div className="yc-title-box">
					<img className="yc-title-img" src={version} alt="" />
				</div>
				<div className="yc-modal-box">
					<div className="yc-modal-content">
						<div className="yc-modal-title">【版本更新通知】</div>
						<div className="yc-label-box">
							<div className="yc-label-title">
								<div>
									<span className="yc-modal-icon" />
									<span className="yc-label-tips">资产挖掘</span>
								</div>
								<div className="yc-label-subTips">新增在建工程信息</div>
							</div>
							<div className="yc-label-title">
								<div>
									<span className="yc-modal-icon" />
									<span className="yc-label-tips">债务人详情和画像详情</span>
								</div>
								<div className="yc-label-subTips">增加不动产登记、车辆信息、在建工程信息</div>
							</div>
							<div className="yc-label-title">
								<div>
									<span className="yc-modal-icon" />
									<span className="yc-label-tips">展示内容调整</span>
								</div>
								<div className="yc-label-subTips">调整业务详情和资产挖掘-限制高消费的展示内容</div>
							</div>
							<div className="yc-label-title">
								<div>
									<span className="yc-modal-icon" />
									<span className="yc-label-tips">债务人列表</span>
								</div>
								<div className="yc-label-subTips">增加异常工商登记状态和限高状态的展示</div>
							</div>
						</div>
						<Button className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
					</div>
				</div>
			</Modal>
		);
	}
}
