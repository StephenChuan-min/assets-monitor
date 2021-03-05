import React from 'react';
import {
	Form, Input, Button, message, Spin,
} from 'antd';
import {
	forgetPasswordStep2Sms, // 发送短信
	smsValid, // 验证短信忘记密码-step1
} from '@/utils/api/user';
import CustomAgency from '@/common/custom/agency';
// import PhoneModal from './noPhoneModal';
import './style.scss';

const FormItem = Form.Item;
const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			btnDisabled: false,
			phoneCode: '获取验证码',
			noPhoneModalVisible: false,
		};
	}

	getCode = () => {
		let time = 60;
		this.setState({
			btnDisabled: true,
		});
		const {
			phoneNum,
		} = this.props;
		if (phoneNum) {
			forgetPasswordStep2Sms(); // 发送验证码
		} else {
			message.warning('手机号错误');
		}
		const timer = setInterval(() => {
			time -= 1;
			this.setState({
				phoneCode: `${time}s后重新发送`,
			});
			if (time === -1) {
				this.setState({
					phoneCode: '获取验证码',
					btnDisabled: false,
				});
				clearInterval(timer);
			}
		}, 1000);
	};

	openModal = () => {
		console.log(1);

		this.setState({
			noPhoneModalVisible: true,
		});
	};

	handleSubmit = () => {
		const {
			form, changeType,
		} = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		form.validateFields((errors) => {
			console.log(errors);
			if (!fields.phoneCode) {
				message.error('请输入验证码');
				return;
			}
			const params = {
				smsCode: fields.phoneCode,
				phone: fields.phone,
			};
			smsValid(params).then((res) => {
				if (res.code === 200) {
					changeType(4);
					message.success('验证成功');
				} else {
					message.error(res.message);
				}
			});
		});
	};

	render() {
		const {
			loading, phoneCode, btnDisabled, noPhoneModalVisible,
		} = this.state;
		const {
			form: { getFieldProps }, phoneNum, changeType,
		} = this.props; // 会提示props is not defined

		const nodeProps = {
			noPhoneModalVisible,
			onCancel: () => this.setState({ noPhoneModalVisible: false }),
		};

		return (

			<div className="yc-verifyAccount-main">
				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">填写验证码</li>
						<div className="yc-form-wapper writeCode">
							<span className="yc-form-lable">手机号</span>
							<FormItem>
								<span className="yc-writeCode-phone">{phoneNum && phoneNum}</span>
								<Button type="primary" disabled={btnDisabled} onClick={this.getCode} className="yc-form-writeCode">{phoneCode}</Button>
							</FormItem>
						</div>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">短信验证码</span>
							<FormItem style={{ marginBottom: 16 }}>
								<Input
									className="yc-login-input"
									placeholder="请输入短信验证码"
									maxlength={4}
									{...getFieldProps('phoneCode', {
										validateTrigger: 'onBlur',
										getValueFromEvent: e => e.target.value.trim().replace(/[^0-9a-zA-Z]/g, ''),
										// rules: [
										// 	{
										// 		required: true,
										// 		message: '请输入验证码',
										// 	},
										// ],
									})}
								/>
							</FormItem>
						</div>
						<div onClick={this.openModal} className="yc-from-noPhone">手机号不可用?</div>
						<Button type="primary" className="yc-login-btn" style={{ marginTop: 25 }} onClick={this.handleSubmit}>下一步</Button>
						<div className="yc-login-back" onClick={() => changeType(1)}>返回登录</div>
					</Spin>
				</Form>
				{/** 新增跟进Modal */}
				{
					noPhoneModalVisible && (
						<CustomAgency nodeName="noPhone" nodeProps={{ ...nodeProps }} />
					)}
				{/* <PhoneModal noPhoneModalVisible={noPhoneModalVisible} onCancel={() => this.setState({ noPhoneModalVisible: false })} /> */}
			</div>
		);
	}
}

export default createForm()(Login);
