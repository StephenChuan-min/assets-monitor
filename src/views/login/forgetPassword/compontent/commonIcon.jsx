/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Icon,
} from 'antd';
import './style.scss';

const createForm = Form.create;

class commonIcon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	clear = () => {
		const { clearInputValue } = this.props;
		clearInputValue();
	};

	render() {
		return (
			<Icon {...this.props} onClick={this.clear} className="yc-clear-icon" type="cross-circle" />
		);
	}
}

export default createForm()(commonIcon);
