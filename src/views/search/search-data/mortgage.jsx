import React from 'react';
import {
	Button, Form, message, Select,
} from 'antd';
import { navigate } from '@reach/router';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import { Input, timeRule, DatePicker } from '@/common';

const createForm = Form.create;
const _style1 = { width: 116 };
class MORTGAGE extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 搜索
	search = () => {
		const { form } = this.props;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			navigate(generateUrlWithParams('/search/detail/mortgage', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props;
		const { resetFields } = form;
		resetFields('');
	};

	render() {
		const { form } = this.props;
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-tabs-data">
				<div className="yc-tabs-items">
					<div className="item" style={{ marginRight: 16, width: 259 }}>
						<Input
							title="个人/企业"
							placeholder="个人/企业名称"
							maxLength="40"
							{...getFieldProps('name', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ marginRight: 16, width: 181 }}>
						<span>抵押角色：</span>
						<Select
							allowClear
							style={{ width: 120 }}
							placeholder="请选择抵押角色"
							size="large"
							{...getFieldProps('role')}
						>
							<Select.Option key="0" value="0">抵押物所有人</Select.Option>
							<Select.Option key="1" value="1">抵押权人</Select.Option>
						</Select>
					</div>
					<div className="other">
						<span>登记状态：</span>
						<Select
							allowClear
							style={{ width: 120 }}
							placeholder="请选择登记状态"
							size="large"
							{...getFieldProps('status')}
						>
							<Select.Option key="0" value="0">无效</Select.Option>
							<Select.Option key="1" value="1">有效</Select.Option>
						</Select>
					</div>
				</div>
				<div className="yc-tabs-items">
					<div className="item" style={{ 'margin-right': 0, width: 325 }}>
						<span>登记日期：</span>
						<DatePicker
							placeholder="开始日期"
							size="large"
							style={_style1}
							{...getFieldProps('regDateStart', {
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('regDateEnd'))}
							allowClear
						/>
						<span style={{ margin: '0 6px ' }}>至</span>
						<DatePicker
							placeholder="结束日期"
							size="large"
							style={_style1}
							{...getFieldProps('regDateEnd', {
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('regDateStart'))}
							allowClear
						/>
					</div>
				</div>
				<div className="btn">
					<Button
						type="primary"
						size="large"
						className="yc-high-search"
						onClick={this.search}
					>
						搜索
					</Button>
					<Button onClick={this.queryReset} type="ghost" size="large">
						重置搜索条件
					</Button>
				</div>
			</div>
		);
	}
}
export default createForm()(MORTGAGE);
export const Name = 'MORTGAGE';
