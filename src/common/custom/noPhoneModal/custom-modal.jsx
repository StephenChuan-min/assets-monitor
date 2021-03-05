import React from 'react';
import { Button, Modal, Icon } from 'antd';
import './custom.scss';


class CustomModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const {
			customVisible, onCancel, content, customWidth, customTitle, type, footer, icon, iconStyle,
		} = this.props;
		const title = icon ? (
			<span className="title-name">
				<Icon className="title-icon" type={icon} style={iconStyle} />
				{customTitle}
			</span>
		) : customTitle;
		return (
			<Modal
				maskClosable={false}
				title={title}
				width={customWidth}
				visible={customVisible}
				onOk={this.handleOk}
				onCancel={onCancel}
				footer={footer}
				className={type === 'small' ? 'custom-modal' : 'custom-normal'}
			>
				{
					content
				}
				<div className="custom-btn">
					<Button type="primary" className="yc-modal-btn" onClick={onCancel}>我知道了</Button>
				</div>
			</Modal>
		);
	}
}

export default CustomModal;
