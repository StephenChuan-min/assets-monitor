import React from 'react';
import { Form, Button, Modal } from 'antd';
import { Input } from '@/common';
import addImg from '@/assets/img/business/icon_follow_add_n.png';
import './style.scss';

const { confirm } = Modal;
const createForm = Form.create;
let uuid = 0; // 定义uuid为添加唯一id
class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { data } = this.props; // 会提示props is not defined
		if (nextProps.data !== data) {
			this.setState({
				dataList: nextProps.data,
			});
		}
	}

	// 相关人名称
	handleInputName = (value, id) => {
		const { dataList } = this.state;
		const that = this;
		const { isEdit } = this.props;
		isEdit();
		// console.log(target.value.trim(), 3333333);
		if (dataList && dataList.length > 0) {
			dataList.forEach((i, index) => {
				if (i.id === id) {
					dataList[index].obligorName = value.trim();
				}
			});
			that.setState({
				dataList,
			});
		}
	};

	// 身份证号/统一社会信用代码
	handleInputNumber = (value, id) => {
		const { dataList } = this.state;
		const { isEdit } = this.props;
		isEdit();
		const that = this;
		if (dataList && dataList.length > 0) {
			dataList.forEach((i, index) => {
				if (i.id === id) {
					dataList[index].obligorNumber = value.replace(/[^0-9a-zA-Z-*()（）]/g, '');
				}
			});
			that.setState({
				dataList,
			});
		}
	};

	// 角色
	changeValue = (value, id) => {
		const { dataList } = this.state;
		const that = this;
		const { isEdit } = this.props;
		isEdit();
		if (dataList && dataList.length > 0) {
			dataList.forEach((i, index) => {
				if (i.id === id) {
					dataList[index].roleText = value;
				}
			});
			that.setState({
				dataList,
			});
		}
	};

	add = () => {
		uuid += 1;
		// keys = keys.concat(uuid);
		const { dataList } = this.state;
		// console.log(dataList, uuid, 333);
		dataList.push({
			dishonestStatus: null,
			id: -(uuid),
			obligorName: '',
			obligorNumber: '',
			role: 2,
			roleText: '担保人',
		});
		this.setState({
			dataList,
		});
	};

	// 删除
	delete = (id) => {
		const { dataList } = this.state;
		const { isEdit } = this.props;
		const that = this;
		confirm({
			title: '您是否确认要删除该条业务相关人？',
			iconType: 'exclamation-circle',
			onOk() {
				isEdit();

				if (dataList && dataList.length > 0) {
					dataList.forEach((i, index) => {
						if (i.id === id) {
							dataList.splice(index, 1);
						}
					});
					that.setState({
						dataList,
					});
				}
			},
			onCancel() {},
		});
	};

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		const { dataList } = this.state;

		return (
			<div>
				<table className="table" style={{ marginBottom: 0 }}>
					<thead className="ant-table-thead">
						<tr>
							<th style={{ width: 400, color: '#4E5566' }}>相关人名称</th>
							<th style={{ width: 400, color: '#4E5566' }}>身份证号/统一社会信用代码</th>
							<th style={{ width: 250, color: '#4E5566' }}>角色</th>
							<th style={{ width: 110, color: '#4E5566', textAlign: 'center' }}>操作</th>
						</tr>
					</thead>
					<tbody className="ant-table-tbody">
						{
						dataList && dataList.map(item => (
							<tr key={item.id}>
								<td>
									<Input
										size="large"
										placeholder="请输入相关人名称"
										maxLength="40"
										{...getFieldProps(`obligorName${item.id}`, {
											id: item.id,
											initialValue: item && item.obligorName,
											onChange: (e) => {
												this.handleInputName(e, item.id);
											},
											getValueFromEvent: value => value.trim(),
										})}
										className="yc-from-input"
									/>
								</td>
								<td>
									<Input
										size="large"
										placeholder="请输入身份证号/统一社会信用代码"
										maxLength="18"
										{...getFieldProps(`obligorNumber${item.id}`, {
											initialValue: item && item.obligorNumber,
											onChange: (e) => {
												this.handleInputNumber(e, item.id);
											},
											getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-*()（）]/g, ''),
										})}
										className="yc-from-input"
									/>
								</td>
								<td>
									<Input
										style={{ width: 200 }}
										placeholder="请选择人员"
										size="large"
										maxLength={20}
										{...getFieldProps(`roleText${item.id}`, {
											initialValue: item && item.roleText,
											onChange: (e) => {
												this.changeValue(e, item.id);
											},
											getValueFromEvent: value => value.trim(),
										})}
									/>
								</td>
								<td style={{ textAlign: 'center' }}>
									<Button type="ghost" onClick={() => this.delete(item.id)}>
										删除
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div onClick={() => this.add()} className="yc-table-addList">
					<img className="yc-table-addList-img" src={addImg} alt="" />
					添加相关人
				</div>
			</div>
		);
	}
}
export default createForm({
	// 判断表单是否编辑
	onFieldsChange(props, fields) {
		const { isEdit } = props;
		isEdit();
		console.log(props, fields);
	},
})(DebtorDetail);
