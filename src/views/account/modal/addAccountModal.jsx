import React from 'react';
import {
	Form, Modal, message,
} from 'antd';
import { formatEight } from '@/utils/changeTime';
import { addUser } from '@/utils/api/agency';
import { Input } from '@/common';
import './modal.scss';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 15 },
};

class AddAccountModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			today: '',
		};
	}

	componentWillMount() {
		const currentDay = new Date();
		this.setState({
			today: formatEight(currentDay),
		});
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseAddAccount } = this.props;
		handleCloseAddAccount();
	};

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const { today } = this.state;
		const {
			form, handleCloseAddAccount, currentOrgDetail, onGetUserList,
		} = this.props;
		form.validateFields((errors, values) => {
			if (errors) {
				console.log(errors);
				return;
			}
			const params = {
				...values,
				orgId: currentOrgDetail.id,
				password: today,
			};
			addUser(params).then((res) => {
				if (res.code === 200) {
					if (res.data) {
						message.success('添加成功');
						handleCloseAddAccount();
						onGetUserList(currentOrgDetail.id);
					} else {
						message.error('添加失败');
					}
				} else if (res.code === 9001) {
					message.error(res.message);
				} else {
					message.error('添加失败');
				}
			}).catch();
		});
	};

	render() {
		const { today } = this.state;
		const { form, addAccountVisible } = this.props;
		const { getFieldProps } = form;
		return (
			<Modal
				title="添加账号"
				width={396}
				visible={addAccountVisible}
				onCancel={this.handleCancel}
				onOk={this.handleConfirmBtn}
			>
				<Form horizontal className="account-form">
					<FormItem
						{...formItemLayout}
						label="姓名"
						required
					>
						<Input
							style={{ width: 240 }}
							placeholder="请填写姓名"
							{...getFieldProps('username', {
								rules: [{
									required: true,
									whitespace: true,
									message: '请填写姓名',
								}],
							})}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="账号"
						required
					>
						<Input
							style={{ width: 240 }}
							maxLength="11"
							placeholder="请填写账号（手机号）"
							{...getFieldProps('mobile',
								{
									rules: [
										{
											required: true,
											message: '请输入手机号',
										},
										{
											pattern: new RegExp(/^[0-9]{11}$/, 'g'),
											message: '手机号格式不正确',
										},
									],
								})}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="密码"
					>
						<Input
							style={{ width: 240 }}
							disabled
							placeholder={today}
							{...getFieldProps('password')}
						/>
					</FormItem>
				</Form>
			</Modal>
		);
	}
}
export default createForm()(AddAccountModal);
