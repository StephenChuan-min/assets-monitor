/** 登录页 * */

import React from 'react';

import {
	Form,
} from 'antd';
import CustomAgency from '@/common/custom/agency';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import { Icon } from '@/common';

import './style.scss';

const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		return (
			<div className="yc-login-footer">
				<div className="yc-footer-content">
					<span className="yc-footer-text">
						<span className="yc-footer-img" />
						<CustomAgency nodeName="footerIcon" />
						{/* <Icon */}
						{/*	type="icon-logo" */}
						{/*	className="yc-logo-icon" */}
						{/* /> */}
						<CustomAgency nodeName="footerTitle" />
						技术支持
					</span>
					<span className="yc-footer-text">
						<CustomAgency nodeName="Copyright" />
						{/* {' Copyright © 2018 杭州源诚科技有限公司 '} */}
						{/* eslint-disable-next-line react/jsx-no-target-blank */}
						<a target="_blank" href="http://beian.miit.gov.cn" rel="nofollow" style={{ display: 'inline-block', color: 'inherit' }}>
							{/* 浙ICP备17030014号 */}
							<CustomAgency nodeName="caseNum" />
						</a>
					</span>
					{/* eslint-disable-next-line react/jsx-no-target-blank */}

				</div>
			</div>
		);
	}
}

export default createForm()(Login);
