import React from 'react';
import {
	Form, Input, message, Modal,
} from 'antd';
import { navigate } from '@reach/router';
import { businessInfo } from '@/utils/api/professional-work';
import { save } from '@/utils/api/business'; // 保存使用原接口
import { businessList } from '@/utils/api/professional-work/overview';
import { getQueryByName } from '@/utils';
import { BreadCrumb, Button } from '@/common';
import { getSource } from '@/views/business/detail/business/cache';
import Edit from './edit';
import './style.scss';

const createForm = Form.create;
const { confirm } = Modal;

class EditBusiness extends React.Component {
	constructor(props) {
		document.title = '业务详情';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		super(props);
		this.state = {
			id: getQueryByName(window.location.href, 'id'),
			source: getSource() || {},
			loading: false,
			businessData: [],
		};
	}

	componentDidMount() {
		const businessId = getQueryByName(window.location.href, 'id') || 9999999;
		const { source } = this.state;
		const params = { businessId };
		if (Object.keys(source).length === 0) {
			businessInfo({ businessId }).then((res) => {
				if (res.code === 200) {
					this.setState({
						source: res.data,
						loading: false,
					});
				}
			}).catch(() => {});
		}

		this.getData(params);
	}

	getData = (value) => {
		const params = { ...value };
		this.setState({ loading: true });
		// 业务列表信息
		businessList(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					businessData: res.data,
					loading: false,
				});
			} else {
				this.setState({ businessData: [] });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 保存
	handleSave = () => {
		const { businessData } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'id');
		const fields = getFieldsValue();
		const that = this;
		const value = businessData && businessData.filter(res => res.obligorName === ''); // 过滤相关人内容为空
		const roleText = businessData && businessData.filter(res => res.roleText === '借款人'); // 输入角色不能为借款人
		const emptyRoleText = businessData && businessData.filter(res => res.roleText === ''); // 输入角色不能为借款人
		const obligorNameLength = businessData && businessData.filter(res => res.obligorName.length < 5 && res.obligorNumber === ''); // 过滤相关人内容小于5身份证为空
		if (!fields.obligorName) {
			message.error('请填写借款人名称');
			return;
		}
		if (roleText.length > 0) {
			message.error('输入角色不能为借款人！');
			return;
		}
		if (emptyRoleText.length > 0) {
			message.error('输入角色不能为空！');
			return;
		}
		if (fields.obligorName.length < 5 && !fields.obligorNumber) {
			message.error('借款人为自然人时证件号不能为空！');
			return;
		}

		if (value.length > 0) {
			message.error('业务人相关列表中，相关人名称不能为空！');
			return;
		}
		if (obligorNameLength.length > 0) {
			message.error('业务人相关列表中，当相关人为自然人时证件号不可为空！');
			return;
		}
		confirm({
			title: '确认修改业务信息?',
			iconType: 'exclamation-circle',
			width: 500,
			// content: '若本次编辑涉及债务人名称或身份证号，该债务人的<span style="color: red">历史数据匹配将被删除</span>，并以新名称、身份证号重新进行匹配。',
			content:
				(
					<div>
						若本次编辑涉及债务人名称或身份证号，该债务人的
						<span style={{ color: 'red' }}>历史匹配数据将被删除</span>
						，并以新名称、身份证号重新进行匹配。
					</div>
				),
			onOk() {
				const params = {
					detail: {
						...fields,
						id: Number(userId),
					},
					obligorList: businessData,
				};
				that.setState({
					codeLoading: true,
				});
				const start = new Date().getTime(); // 获取接口响应时间
				save(userId, params).then((res) => {
					if (res.code === 200) {
						const hide = message.loading('正在刷新,请稍后...', 0);

						const now = new Date().getTime();
						const latency = now - start;
						setTimeout(() => {
							that.handleBack();
							// window.location.reload(); // 实现页面重新加载
						}, latency);
						// 异步手动移除
						setTimeout(hide, latency);
						// that.getTableData();
					} else {
						message.error(res.message);
						// 异步手动移除
						// setTimeout(hide, 0);
					}
					that.setState({
						codeLoading: false,
					});
				}).catch(() => {
					message.error('服务端错误');
					that.setState({
						codeLoading: false,
					});
				});
			},
			onCancel() {},
		});
	};

	handleBack = () => {
		const { hash } = window.location;
		const id = getQueryByName(hash, 'id');
		navigate(`/business/detail/info?id=${id}`);
	};

	// 判断是否已经编辑
	isEdit = () => {
		this.setState({
			isEdit: true,
		});
	};

	render() {
		const {
			id, source, businessData, loading, isEdit,
		} = this.state;
		const { form: { getFieldProps } } = this.props; // 会提示props is not defined

		return (
			<div className="edit-info-wrapper">
				<div className="info-navigation info-wrapper">
					<BreadCrumb
						list={[
							{ id: 1, name: '业务视图', link: '/business/view' },
							{ id: 2, name: '业务详情', link: `/business/detail/info?id=${id}` },
							{ id: 3, name: '编辑', link: '' },
						]}
						suffix={(
							<div className="info-navigation-suffix" style={{ zIndex: 1 }}>
								<Button disabled={!isEdit || loading} className="info-navigation-suffix__button" type="primary" onClick={() => this.handleSave()}>保存</Button>
								<Button className="info-navigation-suffix__button" onClick={this.handleBack}>取消</Button>
							</div>
						)}
					/>
				</div>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<div className="info-content info-wrapper">
					<div className="info-edit-title">
						<div className="info-edit-left-item" />
						<span className="info-edit-title-name">基本信息</span>
					</div>
					<div style={{ padding: '0 10px' }}>
						<div className="yc-from-container">
							<span className="yc-from-label1">业务编号：</span>
							<Input
								onInput={this.isEdit}
								placeholder="请输入业务编号"
								maxLength="32"
								autocomplete="off"
								{...getFieldProps('caseNumber', {
									initialValue: source && source.caseNumber,
									getValueFromEvent: e => e.target.value.trim(),
								})}
								className="yc-from-input"
							/>
						</div>
						<div className="yc-from-container">
							<span className="yc-from-label2">
								<span className="yc-red">*</span>
								借款人名称：
							</span>
							<Input
								onInput={this.isEdit}
								placeholder="请输入借款人名称"
								maxLength="40"
								autocomplete="off"
								{...getFieldProps('obligorName', {
									initialValue: source && source.obligorName,
									getValueFromEvent: e => e.target.value.trim(),
								})}
								className="yc-from-input"
							/>
						</div>
						<div className="yc-from-container">
							<span className="yc-from-label1">负责人/机构：</span>
							<Input
								onInput={this.isEdit}
								placeholder="请输入负责人/机构"
								autocomplete="off"
								maxLength="40"
								{...getFieldProps('orgName', {
									initialValue: source && source.orgName,
									getValueFromEvent: e => e.target.value.trim(),
								})}
								className="yc-from-input"
							/>
						</div>
						<div className="yc-from-container">
							<span className="yc-from-label2">身份证号/统一社会信用代码：</span>
							<Input
								onInput={this.isEdit}
								maxLength="18"
								placeholder="请输入身份证号/统一社会信用代码"
								autocomplete="off"
								{...getFieldProps('obligorNumber', {
									initialValue: source && source.obligorNumber,
									getValueFromEvent: e => e.target.value.trim().replace(/[^0-9a-zA-Z-*()（）]/g, ''),
								})}
								className="yc-from-input"
							/>
						</div>
					</div>
					<div className="info-edit-title" style={{ margin: '40px 0 20px' }}>
						<div className="info-edit-left-item" />
						<span className="info-edit-title-name">业务相关人列表</span>
					</div>
					<Edit editSave={this.editSave} isEdit={this.isEdit} data={businessData} loading={loading} />
				</div>
			</div>
		);
	}
}

export default createForm({})(EditBusiness);
