import React from 'react';
import { Form, Modal, message } from 'antd';
import { Input } from '@/common';
import { addNextOrg } from '@/utils/api/agency';
import './modal.scss';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 14 },
};

class AddOrgModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseAddOrg } = this.props;
		handleCloseAddOrg();
	};

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const { form, orgData } = this.props;
		const values = form.getFieldsValue();
		const params = {
			orgId: orgData.id,
			orgName: orgData.name,
			...values,
		};
		if (params.newOrgName) {
			if (orgData.level < 1) {
				if (!params.monitorNum) {
					message.error('请输入可监控债务人数');
				} else if (params.monitorNum < 0) {
					message.error('可监控债务人数应为大于等于0的整数');
				} else if (!params.authorizeNumber) {
					message.error('请输入查询授权次数');
				} else if (params.authorizeNumber < 0) {
					message.error('查询授权次数应为大于等于0的整数');
				} else {
					// 机构只有是顶级虚拟机构添加下级机构的时候可以分配次数，其他的机构添加下级没有次数分配。
					this.handleSubmitRequest(params);
				}
			} else {
				// 机构只有是顶级虚拟机构添加下级机构的时候可以分配次数，其他的机构添加下级没有次数分配。
				this.handleSubmitRequest({ orgId: orgData.id, newOrgName: params.newOrgName });
			}
		} else {
			message.error('请输入机构名称');
		}
	};

	// 手动提交请求
	handleSubmitRequest = (params) => {
		const { handleCloseAddOrg, onSearchOrgTree, currentOrgDetail } = this.props;
		addNextOrg(params).then((res) => {
			if (res.code === 200) {
				if (res.data) {
					message.success('添加成功');
					onSearchOrgTree(currentOrgDetail);
					handleCloseAddOrg();
				} else {
					message.error(res.message || '添加机构失败');
				}
			} else {
				message.error(res.message || '添加机构失败');
			}
		}).catch(() => {});
	};

	render() {
		const { form, orgData, addOrgVisible } = this.props;
		// console.log('orgData === ', orgData);
		const { getFieldProps } = form;
		return (
			<Modal
				title="添加机构"
				width={396}
				visible={addOrgVisible}
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
									getValueFromEvent: e => e.trim(),
								})}
							/>
						</div>
					</FormItem>
					{
						orgData.level < 1 ? (
							<React.Fragment>
								<FormItem
									{...formItemLayout}
									label="可监控债务人数"
								>
									<div className="yc-query-item">
										<Input
											type="number"
											style={{ width: 240 }}
											size="large"
											maxLength="20"
											onlyUnit="人"
											placeholder="请输入可监控债务人数"
											{...getFieldProps('monitorNum', {
												getValueFromEvent: e => parseInt(e.trim(), 10),
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
											type="number"
											style={{ width: 240 }}
											size="large"
											maxLength="20"
											onlyUnit="次"
											placeholder="请输入查询授权次数"
											{...getFieldProps('authorizeNumber', {
												getValueFromEvent: e => parseInt(e.trim(), 10),
											})}
										/>
									</div>
								</FormItem>
							</React.Fragment>
						) : null
					}
				</Form>
			</Modal>
		);
	}
}
export default createForm()(AddOrgModal);
