import React from 'react';
import {
	Modal, Form, Popover, Input, message,
} from 'antd';
import {
	changePassword, // 修改密码,
} from '@/utils/api/user';

const FormItem = Form.Item;
const createForm = Form.create;
const regx = /^[ \x21-\x7E]{6,20}$/; // 判断6到20的字符
const numAndWorld = /^(?=[a-zA-Z]*.*[0-9])(?=[0-9]*.*[a-zA-Z])[a-zA-Z0-9 \x21-\x7E]{2,}$/; // 必须包涵数字和字母
const regx1 = /^[\x21-\x7Ea-zA-Z0-9]{1,}$/; // 无标点空格

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};
class ChangeWorldModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			PopoverVisible: false,
			againPasswordVisible: false,
			firstVali: null, // 第一次～第四次验证判断
			secondVali: null,
			thirdVali: null,
			fouthVali: null,
			againText: '请再次输入密码',
		};
	}
	// ===========
	// 新密码验证

	// 第一个输入框
	handleNewPassword= () => {
		this.setState({
			PopoverVisible: true,
		});
	};

	// 实时输入新密码
	changeValue = (e) => {
		const newWorld = e.target.value;
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
		// 重置输入样式
		if (newWorld.length === 0) {
			this.setState({
				firstVali: null, // 第一次～第四次验证判断
				secondVali: null,
				thirdVali: null,
			});
		}
	};

	onBlurValue = (e) => {
		const newWorld = e.target.value;
		if (!newWorld) {
			this.setState({
				PopoverVisible: false,
			});
		}
		// 三个都输入正确时
		if (regx.test(newWorld) && numAndWorld.test(newWorld) && regx1.test(newWorld)) {
			this.setState({
				PopoverVisible: false,
			});
		}
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
		}
	};
	// ============


	// ============
	// 再次输入密码
	// 第二个
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
		if (fields.Password === fields.newPassword) {
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
			});
		}
	};

	onAgainBlurValue = () => {
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();

		if (fields.Password === fields.newPassword) {
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
		if (fields.Password === fields.newPassword) {
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

		if (e.target.value.length === 0) {
			this.setState({
				fouthVali: null,
				againText: '请再次输入密码',
			});
		}
	};

	// ============

	clearInputValue = (type) => {
		const {
			form,
		} = this.props; // 会提示props is not defined
		const { resetFields, getFieldsValue } = form;
		const fields = getFieldsValue();
		if (type === 'first') {
			if (fields.Password && fields.Password.length) {
				resetFields(['Password']);
				this.setState({
					firstVali: null, // 第一次～第四次验证判断
					secondVali: null,
					thirdVali: null,
					PopoverVisible: false,
				});
			}
		}

		if (type === 'second') {
			if (fields.newPassword && fields.newPassword.length) {
				resetFields(['newPassword']);
				this.setState({
					fouthVali: null,
					againText: '请再次输入密码',
					againPasswordVisible: false,
				});
			}
		}
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		this.setState({
			PopoverVisible: false,
			againPasswordVisible: false,
		});
		setTimeout(() => {
			onCancel();
		}, 0);
	}

	// 确认修改密码
	handleOk = () => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		form.validateFields((errors) => {
			if (errors) {
				return;
			}
			const firstWorld = fields.Password;
			const newWorld = fields.newPassword;
			// && numAndWorld.test(newWorld) && regx1.test(newWorld)
			console.log(regx, newWorld, regx.test(newWorld));
			if (!fields.currentPassword) {
				message.warning('请输入原密码');
				return;
			}
			// 两次密码要输入一致
			if (firstWorld !== newWorld) {
				message.warning('两次密码不一致');
				return;
			}
			if (!regx.test(newWorld)) {
				message.warning('长度6-20位字符');
				return;
			}
			if (!numAndWorld.test(newWorld)) {
				message.warning('同时包含数字、字母');
				return;
			}
			if (!regx1.test(newWorld)) {
				message.warning('不支持空格');
				return;
			}
			const params = {
				...fields,
			};
			changePassword(params).then((res) => {
				if (res.code === 200) {
					message.success('修改成功,请重新登录');
					this.handleCancel();
				} else {
					message.error(res.message);
				}
			});
		});
	}

	render() {
		const { passwordModalVisible, form: { getFieldProps } } = this.props;
		const {
			firstVali, secondVali, thirdVali, fouthVali, againText, PopoverVisible, againPasswordVisible,
		} = this.state;
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
			<Modal title="第一次登录请先修改密码" width={600} visible={passwordModalVisible} onCancel={this.handleCancel} onOk={this.handleOk}>
				<div className="yc-form-wapper">
					<FormItem
						{...formItemLayout}
						label="原密码"
					>
						<Input
							type="password"
							autocomplete="off"
							style={{ width: 234, height: 34 }}
							placeholder="请输入原密码"
							maxlength="20"
							{...getFieldProps('currentPassword', {})}
						/>
					</FormItem>
				</div>
				<div className="yc-form-wapper">
					<FormItem
						{...formItemLayout}
						label="新密码"
					>
						<Popover
							content={newPassword}
							trigger="click"
							visible={PopoverVisible}
							onVisibleChange={this.handleNewPassword}
							placement="right"
						>
							<Input
								autocomplete="off"
								type="password"
								style={{ width: 234, height: 34 }}
								placeholder="请输入新密码"
								maxlength="20"
								onInput={e => this.changeValue(e)}
								onBlur={e => this.onBlurValue(e)}
								onFocus={e => this.newPasswordFoucs(e)}
								{...getFieldProps('Password', {})}
							/>
						</Popover>
					</FormItem>
				</div>
				<div className="yc-form-wapper">
					<FormItem
						{...formItemLayout}
						label="确认新密码"
					>
						<Popover
							content={newAgainPassword}
							trigger="click"
							visible={againPasswordVisible}
							onVisibleChange={this.handleAgainPassword}
							placement="right"
							className="yc-form-popover"
						>
							<Input
								type="password"
								autocomplete="off"
								style={{ width: 234, height: 34 }}
								placeholder="请再次输入新密码"
								maxlength="20"
								onInput={e => this.againPasswordValue(e)}
								onBlur={e => this.onAgainBlurValue(e)}
								onFocus={e => this.againPasswordFoucs(e)}
								{...getFieldProps('newPassword', {
									// rules: [
									// 	{
									// 		required: true,
									// 		message: '请输入验证码',
									// 	},
									// ],
								})}
							/>
						</Popover>
					</FormItem>
				</div>
			</Modal>
		);
	}
}
export default createForm()(ChangeWorldModal);
