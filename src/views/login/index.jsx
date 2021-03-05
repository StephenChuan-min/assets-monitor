/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	bankConf, // 个性配置
} from '@/utils/api/user';
import CustomAgency from '@/common/custom/agency';
// import leftBackground from '@/assets/img/login/left_background.png';
import { Form } from 'antd';
import Header from './header';
import Footer from './footer';
import Register from './register';
import VerifyAccount from './forgetPassword/verifyAccount';
import WriteCode from './forgetPassword/writeCode';
import ChangePassword from './forgetPassword/changePassword';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import './style.scss';

const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			phoneNum: '',
			btnColor: '#1C80E1',
			imgUrl: undefined,
			imgLoading: false,
		};
	}

	componentDidMount() {
		global.REQ_STATUS = '';
		bankConf().then((_res) => {
			if (_res.code === 200) {
				this.setState({
					btnColor: _res.data.btnColor,
					imgUrl: _res.data.url,
				});
			} else {
				this.setState({
					imgLoading: true,
				});
			}
		});
	}

	changeType = (childType) => {
		console.log(childType);

		this.setState({
			type: childType,
		});
	};

	inputPhoneNum = (num) => {
		this.setState({
			phoneNum: num,
		});
	};


	render() {
		const {
			type, phoneNum, btnColor, imgUrl, imgLoading,
		} = this.state;
		return (
			<div className="yc-login">
				<Header imgLoading={imgLoading} imgUrl={imgUrl} />
				<div className="yc-login-wapper">
					<div className="yc-login-content">
						<CustomAgency nodeName="loginPic" />
						{/* <img className="yc-login-left-img" src={leftBackground} alt="" /> */}
						{/* 登录页面 */}
						{
							type === 1 && <Register btnColor={btnColor} changeType={this.changeType} />
						}
						{/* 忘记密码验证吗界面 */}
						{
							type === 2 && <VerifyAccount inputPhoneNum={this.inputPhoneNum} changeType={this.changeType} />
						}
						{/* 填写手机验证码 */}
						{
							type === 3 && <WriteCode phoneNum={phoneNum} changeType={this.changeType} />
						}
						{/* 修改密码 */}
						{
							type === 4 && <ChangePassword changeType={this.changeType} />
						}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default createForm()(Login);
