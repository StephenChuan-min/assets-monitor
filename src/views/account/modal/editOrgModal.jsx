import React from 'react';
import { Form, Modal, message } from 'antd';
import { Input } from '@/common';
import { editOrg } from '@/utils/api/agency';
import { clearEmpty } from '@/utils';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 14 },
};

class EditOrgModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseEditOrg } = this.props;
		handleCloseEditOrg();
	};

	// 弹窗确认按钮，判断数据是否符合要求
	handleConfirmBtn = () => {
		const { form, orgData } = this.props;
		const values = form.getFieldsValue();
		const params = {
			...values,
			orgId: orgData.id,
			orgName: orgData.name,
		};
		const oldParams = {
			authorizeNumber: parseInt(orgData.portraitLimitCount, 10),
			monitorNum: parseInt(orgData.obligorLimitCount, 10),
			orgName: orgData.name,
		};
		const newParams = {
			authorizeNumber: parseInt(params.authorizeNumber, 10),
			monitorNum: parseInt(params.monitorNum, 10),
			orgName: params.newOrgName,
		};
		// console.log('oldParams 1111', oldParams);
		// console.log('newParams 2222', newParams);
		// console.log('orgData 333', orgData);

		// 可监控债务人数: monitorNum 已监控 orgData.obligorLimitUseCount
		// 查询授权次数: authorizeNumber 初始值：orgData.portraitLimitUseCount
		if (newParams.monitorNum < parseInt(orgData.obligorLimitUseCount, 10) && newParams.authorizeNumber < parseInt(orgData.portraitLimitUseCount, 10)) {
			message.warning('可监控债务人数不能小于已监控债务人数');
		} else if (newParams.monitorNum < parseInt(orgData.obligorLimitUseCount, 10) && newParams.authorizeNumber >= parseInt(orgData.portraitLimitUseCount, 10)) {
			message.warning('可监控债务人数不能小于已监控债务人数');
		} else if (newParams.monitorNum >= parseInt(orgData.obligorLimitUseCount, 10) && newParams.authorizeNumber < parseInt(orgData.portraitLimitUseCount, 10)) {
			message.warning('查询授权次数不能小于已使用查询次数');
		} else if (orgData.level === 1 && JSON.stringify(oldParams) === JSON.stringify(newParams)) {
			message.warning('请修改机构信息');
		} else if (orgData.level !== 1 && oldParams.orgName === newParams.orgName) {
			message.warning('请修改机构名称');
		} else if (!params.newOrgName) {
			message.warning('请输入机构名称');
		} else {
			this.handleEditOrg(orgData.level === 1 ? params : { newOrgName: params.newOrgName, orgName: params.orgName, orgId: orgData.id });
		}
	};

	// 手动请求编辑机构
	handleEditOrg = (params) => {
		const { handleCloseEditOrg, onSearchOrgTree, currentOrgDetail } = this.props;
		editOrg(clearEmpty(params)).then((res) => {
			if (res.code === 200) {
				if (res.data) {
					message.success('编辑成功');
					onSearchOrgTree(currentOrgDetail);
					handleCloseEditOrg();
				} else {
					message.error('编辑失败');
				}
			} else if (res.code === 9001) {
				message.error(res.message);
			} else {
				message.error('编辑失败' || res.message);
			}
		}).catch((err) => {
			console.log('err === ', err);
		});
	};

	render() {
		const { form, editOrgVisible, orgData } = this.props;
		const { getFieldProps } = form;
		return (
			<Modal
				title="编辑机构"
				width={396}
				visible={editOrgVisible}
				onCancel={this.handleCancel}
				onOk={this.handleConfirmBtn}
			>
				<Form horizontal className="org-form">
					<FormItem
						{...formItemLayout}
						label="机构名称"
					>
						<div className="yc-query-item">
							<Input
								style={{ width: 240 }}
								size="large"
								maxLength="20"
								placeholder="请输入机构名称"
								{...getFieldProps('newOrgName', {
									initialValue: orgData.name,
									getValueFromEvent: e => e.trim(),
								})}
							/>
						</div>
					</FormItem>
					{
						orgData.level === 1 && (
						<React.Fragment>
							<FormItem
								{...formItemLayout}
								label="可监控债务人数"
							>
								<div className="yc-query-item">
									<Input
										style={{ width: 240 }}
										size="large"
										maxLength="20"
										placeholder={`${orgData.level === 1 ? '' : '请输入可监控数'}`}
										unit="人"
										unitStyle={{ color: '#B2B8C9' }}
										suffix={`（已监控：${orgData.obligorLimitUseCount || 0}人）`}
										suffixRightStyle={{ width: 170 }}
										suffixSpanStyle={{ width: 120, color: '#20242E', fontWeight: 400 }}
										{...getFieldProps('monitorNum', {
											initialValue: orgData.obligorLimitCount || '0',
											getValueFromEvent: e => e.trim(),
										})}
									/>
								</div>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="查询授权次数"
							>
								<div className="yc-query-item">
									<Input
										style={{ width: 240 }}
										size="large"
										maxLength="20"
										placeholder={`${orgData.level === 1 ? '' : '请输入查询授权数'}`}
										unit="次"
										unitStyle={{ color: '#B2B8C9' }}
										suffix={`（已使用：${orgData.portraitLimitUseCount || 0}次）`}
										suffixRightStyle={{ width: 170 }}
										suffixSpanStyle={{ width: 120, color: '#20242E', fontWeight: 400 }}
										{...getFieldProps('authorizeNumber', {
											initialValue: orgData.portraitLimitCount || '0',
											getValueFromEvent: e => e.trim(),
										})}
									/>
								</div>
							</FormItem>
						</React.Fragment>
						)
					}
				</Form>
			</Modal>
		);
	}
}
export default createForm()(EditOrgModal);
