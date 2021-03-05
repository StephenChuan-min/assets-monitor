/*
* 这个页面的修改密码是忘记密码的时候进行修改密码
*/

import React from 'react';
// ==================
// 所需的所有组件
// ==================

import {
	Form, Input, Button, Spin, Popover, message,
} from 'antd';
import Cookies from 'universal-cookie';
import { navigate } from '@reach/router';
import rsaEncrypt from '@/utils/encrypt';
import {
	forgetPasswordStep3, // 修改密码
} from '@/utils/api/user';
import CommonIcon from './compontent/commonIcon';
import './style.scss';

const cookie = new Cookies();
const FormItem = Form.Item;
const createForm = Form.create;
const regx = /^[ \x21-\x7E]{6,20}$/; // 判断6到20的字符
const numAndWorld = /^(?=[a-zA-Z]*.*[0-9])(?=[0-9]*.*[a-zA-Z])[a-zA-Z0-9 \x21-\x7E]{2,}$/; // 必须包涵数字和字母
const regx1 = /^[\x21-\x7Ea-zA-Z0-9]{1,}$/; // 无标点空格

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			// PopoverVisible: false,
			againPasswordVisible: false,
			firstClearIcon: false,
			secondClearIcon: false,
			firstVali: null, // 第一次～第四次验证判断
			secondVali: null,
			thirdVali: null,
			fouthVali: null,
			newPasswordLength: null,
			againText: '请再次输入密码',
		};
	}

	// ===========
	// 新密码验证

	// 第一个输入框
	// handleNewPassword= () => {
	// 	this.setState({
	// 		PopoverVisible: true,
	// 	});
	// };

	// 实时输入新密码
	changeValue = (e) => {
		const newWorld = e.target.value;
		const { newPasswordLength } = this.state;
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		// 第1个节点变化，判断是否正确
		if (!regx.test(newWorld)) {
			this.setState({
				firstVali: false,
			});
		} else {
			this.setState({
				firstVali: true,
			});
		}
		// 第2个节点变化，判断是否正确
		if (!numAndWorld.test(newWorld)) {
			this.setState({
				secondVali: false,
			});
		} else {
			this.setState({
				secondVali: true,
			});
		}
		// 第3个节点变化，判断是否正确
		if (!regx1.test(newWorld)) {
			this.setState({
				thirdVali: false,
			});
		} else {
			this.setState({
				thirdVali: true,
			});
		}
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				fouthVali: true,
				againText: '两次密码输入一致',
			});
		} else if (fields.newPassword && newPasswordLength) {
			this.setState({
				fouthVali: false,
				againText: '密码不一致，请重新输入',
				againPasswordVisible: true,
			});
		}
		// 重置输入样式
		if (newWorld.length === 0) {
			this.setState({
				firstVali: null, // 第一次～第四次验证判断
				secondVali: null,
				thirdVali: null,
				firstClearIcon: false,
			});
		} else {
			this.setState({
				firstClearIcon: true,
			});
		}
	};

	onBlurValue = () => {
		// const newWorld = e.target.value;
		// if (!newWorld) {
		// 	this.setState({
		// 		PopoverVisible: false,
		// 	});
		// }
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				againPasswordVisible: false,
			});
		}
		setTimeout(() => {
			this.setState({
				firstClearIcon: false,
			});
		}, 200);

		// 三个都输入正确时
		// if (regx.test(newWorld) && numAndWorld.test(newWorld) && regx1.test(newWorld)) {
		// 	this.setState({
		// 		PopoverVisible: false,
		// 	});
		// }
	};

	newPasswordFoucs = (e) => {
		const newWorld = e.target.value;

		// 三个都输入正确时
		if (newWorld.length === 0) {
			this.setState({
				firstVali: null, // 第一次～第四次验证判断
				secondVali: null,
				thirdVali: null,
			});
		} else {
			this.setState({
				firstClearIcon: true,
			});
		}
	};

	// 再次输入第二个密码
	handleAgainPassword = () => {
		this.setState({
			againPasswordVisible: true,
		});
	};

	againPasswordValue = (e) => {
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		this.setState({
			newPasswordLength: e.target.value.length,
		});
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				fouthVali: true,
				againText: '两次密码输入一致',
			});
		} else {
			this.setState({
				fouthVali: false,
				againText: '密码不一致，请重新输入',
			});
		}
		// 重置输入样式
		if (e.target.value.length === 0) {
			this.setState({
				fouthVali: null,
				againText: '请再次输入密码',
			});
		} else {
			this.setState({
				secondClearIcon: true,
			});
		}
	};

	onAgainBlurValue = () => {
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		setTimeout(() => {
			this.setState({
				secondClearIcon: false,
			});
		}, 200);
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				againPasswordVisible: false,
			});
		}
	};

	againPasswordFoucs = (e) => {
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				fouthVali: true,
				againText: '两次密码输入一致',
			});
		} else {
			this.setState({
				fouthVali: false,
				againText: '密码不一致，请重新输入',
			});
		}
		console.log(e.target.value.length);
		if (e.target.value.length > 0) {
			this.setState({
				secondClearIcon: true,
			});
		}
		if (e.target.value.length === 0) {
			this.setState({
				fouthVali: null,
				againText: '请再次输入密码',
			});
		}
	};

	clearInputValue = (type) => {
		const {
			form,
		} = this.props; // 会提示props is not defined
		const { resetFields, getFieldsValue } = form;
		const fields = getFieldsValue();
		if (type === 'first') {
			if (fields.newPassword && fields.newPassword.length) {
				resetFields(['newPassword']);
				this.setState({
					firstVali: null, // 第一次～第四次验证判断
					secondVali: null,
					thirdVali: null,
				});
			}
		}

		if (type === 'second') {
			if (fields.newPasswordAgain && fields.newPasswordAgain.length) {
				resetFields(['newPasswordAgain']);
				this.setState({
					// fouthVali: null,
					// againText: '请再次输入密码',
					newPasswordLength: 0,
					againPasswordVisible: false,
				});
			}
		}
	};

	handleSubmit = () => {
		const { form } = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		form.validateFields((errors) => {
			if (errors) {
				return;
			}
			const firstWorld = fields.newPassword;
			const newWorld = fields.newPasswordAgain;
			// && numAndWorld.test(newWorld) && regx1.test(newWorld)
			// console.log(regx, newWorld, regx.test(newWorld));

			if (!firstWorld || !newWorld) {
				message.warning('必须新输入密码');
				return;
			}
			// 两次密码要输入一致
			if (firstWorld !== newWorld) {
				message.warning('两次密码不一致');
				return;
			}
			if (!regx.test(newWorld)) {
				message.warning('长度必须6-20位字符');
				return;
			}
			if (!numAndWorld.test(newWorld)) {
				message.warning('必须同时包含数字、字母');
				return;
			}
			if (!regx1.test(newWorld)) {
				message.warning('不支持空格');
				return;
			}
			const params = {
				newPassword: rsaEncrypt(newWorld),
			};
			// 密码修改成功之后，进入首页
			forgetPasswordStep3(params).then((res) => {
				if (res.code === 200) {
					cookie.set('token', res.data.token);
					cookie.set('firstLogin', res.data.firstLogin);
					global.PORTRAIT_INQUIRY_ALLOW = res.data.isPortraitLimit;
					message.success('密码修改成功', 2);
					setTimeout(() => {
						navigate('/');
					}, 1500);
					// const hide = message.loading('验证成功,两秒后跳转跳转登录页面...', 0);
					// 异步手动移除
					// setTimeout(() => {
					// 	changeType(1);
					// }, 2000);
					// setTimeout(hide, 2000);
				} else {
					message.error(res.message);
				}
			});
		});
	};

	render() {
		const {
			loading, userName, againPasswordVisible, firstVali, secondVali, thirdVali, fouthVali, againText, firstClearIcon, secondClearIcon,
		} = this.state;
		const {
			form: { getFieldProps }, changeType,
		} = this.props; // 会提示props is not defined
		// console.log(PopoverVisible); // 控制提示显隐
		const popverTypes = (type) => {
			let popverType;
			if (type === true) {
				popverType = 'yc-poprver-true';
			} else if (type === false) {
				popverType = 'yc-poprver-false';
			} else {
				popverType = null;
			}
			return popverType;
		};
		// ===========
		// 新密码验证
		const newPassword = (
			<div>
				<p className={popverTypes(firstVali)}>• 长度6-20位字符 </p>
				<p className={popverTypes(secondVali)}>• 同时包含数字、字母</p>
				<p className={popverTypes(thirdVali)}>• 不支持空格</p>
			</div>
		);
		// ============

		// ============
		// 再次输入密码
		const newAgainPassword = (
			<div>
				<p className={popverTypes(fouthVali)}>{againText}</p>
			</div>
		);
		// ==========
		return (

			<div className="yc-changePassword-main">
				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">设置新密码</li>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">新密码</span>
							<FormItem>
								<Popover
									content={newPassword}
									trigger="focus"
									visible
									onVisibleChange={this.handleNewPassword}
									placement="right"
									className="yc-form-popover"
								>
									<Input
										type="password"
										autocomplete="off"
										className="yc-login-input"
										placeholder="请输入新密码"
										maxlength="20"
										onInput={e => this.changeValue(e)}
										onBlur={e => this.onBlurValue(e)}
										onFocus={e => this.newPasswordFoucs(e)}
										// onFocus={e => this.newPasswordFoucs(e)}
										{...getFieldProps('newPassword', {
											initialValue: userName && userName.length > 0 ? userName : '',
											validateTrigger: 'onBlur',
											// rules: [
											// 	{
											// 		required: true,
											// 		message: '请输入新密码',
											// 	},
											// ],
										})}
									/>
								</Popover>
								{firstClearIcon && <CommonIcon clearInputValue={() => this.clearInputValue('first')} />}
							</FormItem>
						</div>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">确认新密码</span>
							<FormItem>
								<Popover
									content={newAgainPassword}
									trigger="focus"
									visible={againPasswordVisible}
									onVisibleChange={this.handleAgainPassword}
									placement="right"
									className="yc-form-popover"
								>
									<Input
										type="password"
										autocomplete="off"
										className="yc-login-input"
										placeholder="请再次输入新密码"
										maxlength="20"
										onInput={e => this.againPasswordValue(e)}
										onBlur={e => this.onAgainBlurValue(e)}
										onFocus={e => this.againPasswordFoucs(e)}
										{...getFieldProps('newPasswordAgain', {
											validateTrigger: 'onBlur',
											// rules: [
											// 	{
											// 		required: true,
											// 		message: '请再次输入新密码',
											// 	},
											// ],
										})}
									/>
								</Popover>
								{secondClearIcon && <CommonIcon clearInputValue={() => this.clearInputValue('second')} />}
							</FormItem>
						</div>
						<Button type="primary" className="yc-login-btn" onClick={this.handleSubmit}>确定</Button>
						<div className="yc-login-back" onClick={() => changeType(1)}>返回登录</div>
					</Spin>
				</Form>
			</div>
		);
	}
}

export default createForm()(Login);
