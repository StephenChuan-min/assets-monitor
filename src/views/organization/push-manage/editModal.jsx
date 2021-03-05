import React from 'react';
import {
	Modal, Select, message, Form,
} from 'antd';
import { Input } from '@/common';
import { saveList } from '@/utils/api/organization'; // 保存

const createForm = Form.create;

class DetailModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmLoading: false,
		};
	}

	componentWillUnmount() {
		// this.handleSave();
		this.setState = () => {};
	}

	// 关闭弹窗
	handleCancel = () => {
		const { handleCancel } = this.props;
		handleCancel();
	};

	getInMaxValue = (val, maxSize) => {
		let text = this.getVal(val);
		if (maxSize && (text && text.length > maxSize)) {
			text = text.substr(0, maxSize);
			val.target.blur();
		}
		return text;
	};

	getVal = (val) => {
		if (val && val.target) {
			return val.target.value ? val.target.value : null;
		}
		return val || null;
	};

	handleSave = () => {
		const {
			getTableData, form, propsData, searchValue, current,
		} = this.props;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		const params = {
			...fildes,
			id: propsData && propsData.id,
		};
		const validRule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/; // 手机号码校验规则
		const emialRule = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/; // 邮箱格式
		if (!fildes.name) {
			message.warning('请输入姓名');
			return;
		}
		if (!fildes.mobile && !fildes.email) {
			message.warning('手机号和邮箱至少需要填一个');
			return;
		}
		if (fildes.mobile && !validRule.test(fildes.mobile)) {
			message.warning('请输入正确的手机格式');
			return;
		}
		if (fildes.email && !emialRule.test(fildes.email)) {
			message.warning('请输入正确的邮箱格式');
			return;
		}
		this.setState({
			confirmLoading: true,
		});
		saveList(params).then((res) => {
			if (res.code === 200) {
				const searchVal = {
					page: current,
					...searchValue,
				};
				getTableData(searchVal);
				message.success(propsData ? '修改成功' : '新增成功');
				this.handleCancel();
				this.setState({
					confirmLoading: false,
				});
			} else {
				this.setState({
					confirmLoading: false,
				});
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({
				confirmLoading: false,
			});
			message.error('error');
		});
	};

	change = (val, type, maxSize) => {
		const { data } = this.state;
		data[type] = this.getInMaxValue(val, maxSize);
		this.setState({ data });
	};


	render() {
		const { confirmLoading } = this.state;
		const { modalState, form, propsData } = this.props;
		const { getFieldProps } = form;
		let title = '新增推送';
		if (modalState === 'add') {
			title = '新增推送';
		} else {
			title = '修改推送';
		}

		return (
			<Modal
				maskClosable={false}
				title={title}
				className="client-modal"
				width={518}
				visible
				confirmLoading={!global.GLOBAL_MEIE_BROWSER ? confirmLoading : false}
				onCancel={this.handleCancel}
				onOk={this.handleSave}
			>
				<div className="edit-debtor">
					<div style={{ margin: '4px 0 0 0' }}>
						<div className="line">
							<span
								style={{
									color: 'red',
									position: 'absolute',
									left: 27,
									top: 9,
								}}
							>
								*
							</span>
							<p className="yc-organization-lable">姓名：</p>
							<Input
								size="large"
								placeholder="请输入姓名"
								maxLength="20"
								style={{ width: 340 }}
								{...getFieldProps('name', {
									initialValue: propsData && propsData.name,
								})}
							/>
						</div>
						<div className="line">
							<p className="yc-organization-lable">手机号：</p>
							<Input
								size="large"
								placeholder="请输入手机号"
								style={{ width: 340 }}
								maxLength={11}
								{...getFieldProps('mobile', {
									initialValue: propsData && propsData.mobile,
								})}
							/>
						</div>
						<div className="line">
							<p className="yc-organization-lable">角色：</p>
							<Select
								size="large"
								style={{ width: 100 }}
								placeholder="请选择角色"
								onChange={(val) => {
									this.change(val, 'role');
								}}
								{...getFieldProps('role', {
									initialValue: propsData ? propsData.role : 0,
								})}
							>
								<Select.Option value={0}>系统账号</Select.Option>
								<Select.Option value={1}>非系统账号</Select.Option>
							</Select>
						</div>
						<div className="line">
							<p className="yc-organization-lable">邮箱：</p>
							<Input
								size="large"
								style={{ width: 340 }}
								maxLength="40"
								placeholder="请输入邮箱"
								{...getFieldProps('email', {
									initialValue: propsData && propsData.email,
								})}
							/>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}
export default createForm()(DetailModal);
