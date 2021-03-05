import React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'reactPropTypes';
import './index.scss';

class ViewContentModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { visible, data, className } = this.props;
		return (
			<Modal
				className={className}
				title="限制消费令"
				width={800}
				visible={visible}
				onCancel={this.handleCancel}
				footer={[
					<Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>,
				]}
			>
				<p className="modal-content">{data}</p>
			</Modal>
		);
	}
}

ViewContentModal.propTypes = {
	visible: PropTypes.bool,
	data: PropTypes.string,
	className: PropTypes.string,
};

ViewContentModal.defaultProps = {
	visible: false,
	data: null,
	className: null,
};

export default ViewContentModal;
