import React from 'react';
import { Form, Modal, message } from 'antd';
import { Input } from '@/common';
import { modifyUser } from '@/utils/api/agency';
import './modal.scss';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 15 },
};

class EditAccountModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseEditAccount } = this.props;
		handleCloseEditAccount();
	};

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const { form, accountData } = this.props;
		form.validateFields((errors, values) => {
			if (errors) {
				console.log(errors);
				return;
			}
			const params = {
				username: values.username,
				userId: accountData.id,
			};
			if (values.username === accountData.name) {
				message.warning('姓名未修改');
			} else {
				this.handleSubmitRequest(params);
			}
		});
	};


	handleSubmitRequest = (params) => {
		const { handleCloseEditAccount, onGetUserList, currentOrgDetail } = this.props;
		modifyUser(params).then((res) => {
			if (res.code === 200) {
				if (res.data) {
					message.success('编辑修改成功');
					onGetUserList(currentOrgDetail.id);
					handleCloseEditAccount();
				} else {
					message.error('编辑修改失败');
				}
			} else if (res.code === 9001) {
				message.error(res.message);
			} else {
				message.error('编辑修改失败');
			}
		}).catch();
	};

	render() {
		const { form, editAccountVisible, accountData } = this.props;
		// console.log('accountData=== ', accountData);
		const { getFieldProps } = form;
		return (
			<Modal
				title="编辑账号"
				width={396}
				visible={editAccountVisible}
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
								initialValue: accountData.name,
								rules: [{
									required: true,
									whitespace: true,
									message: '请再次填写姓名',
								}],
							})}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="账号"
					>
						<Input
							style={{ width: 240 }}
							disabled
							placeholder="请填写账号（手机号）"
							{...getFieldProps('account', {
								initialValue: accountData.mobile,
							})}
						/>
					</FormItem>
				</Form>
			</Modal>
		);
	}
}
export default createForm()(EditAccountModal);
