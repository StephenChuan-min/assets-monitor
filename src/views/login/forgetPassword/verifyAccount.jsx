/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================

import {
	Form, Input, Button, message, Spin,
} from 'antd';
import {
	forgetPasswordStep1, // 忘记密码-step1
} from '@/utils/api/user';
// import server from '@/utils/service';
import BASE_URL from '@/utils/api/config';
import './style.scss';

const verificationCodeImg = `${BASE_URL}/yc/open/verificationCode`;
const FormItem = Form.Item;
const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		document.title = '重置密码';
		this.state = {
			loading: false,
			codeImg: verificationCodeImg,
		};
	}

	handleSubmit = () => {
		const {
			form, changeType, inputPhoneNum,
		} = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		form.validateFields((errors) => {
			if (errors) {
				return;
			}
			if (!fields.code) {
				message.error('请输入验证码');
				return;
			}
			const params = {
				phone: fields.phone,
				code: fields.code,
			};
			forgetPasswordStep1(params).then((res) => {
				if (res.code === 200) {
					changeType(3);
					inputPhoneNum(fields.phone);
					message.success('验证成功');
				} else {
					message.warning(res.message);
					this.verificationCode(); // 错误刷新验证码
				}
			});
		});
	};

	verificationCode = () => {
		// const imgs = server.get(`${verificationCodeImg}?${Math.random()}`);
		this.setState({
			codeImg: `${verificationCodeImg}?${Math.random()}`,
		});
	};

	render() {
		const {
			loading, codeImg,
		} = this.state;
		const {
			form: { getFieldProps }, changeType,
		} = this.props; // 会提示props is not defined
		console.log(codeImg);

		return (

			<div className="yc-verifyAccount-main">
				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">验证账号</li>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">账号</span>
							<FormItem>
								<Input
									className="yc-login-input"
									placeholder="请输入11位数字"
									maxlength="11"
									{...getFieldProps('phone', {
										validateTrigger: 'onBlur',
										// initialValue: userName && userName.length > 0 ? userName : '',
										rules: [
											{
												required: true,
												message: '请输入账号',
											},
											{
												pattern: new RegExp('^[0-9a-zA-Z-]{1,}$', 'g'),
												message: '请勿输入空格,中文和特殊字符',
											},
										],
									})}
								/>
							</FormItem>
						</div>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">图形验证码</span>
							<FormItem>
								<Input
									className="yc-login-input"
									placeholder="请输入验证码"
									maxlength={4}
									style={{ parringRight: 160 }}
									{...getFieldProps('code', {
										// getValueFromEvent: e => e.target.value.trim().replace(/[^0-9a-zA-Z]/g, ''),
										validateTrigger: 'onBlur',
										rules: [
											{
												required: true,
												message: '请输入验证码',
											},
											{
												pattern: new RegExp('^[0-9a-zA-Z]{1,}$', 'g'),
												message: '请勿输入空格,中文和特殊字符',
											},
										],
									})}
								/>
								<img onClick={this.verificationCode} className="yc-verificationCode" src={codeImg} alt="" referrerPolicy="no-referrer" />
							</FormItem>
						</div>
						<Button type="primary" className="yc-login-btn" onClick={this.handleSubmit}>下一步</Button>
						<div className="yc-login-back" onClick={() => changeType(1)}>返回登录</div>
					</Spin>
				</Form>
			</div>
		);
	}
}

export default createForm()(Login);
