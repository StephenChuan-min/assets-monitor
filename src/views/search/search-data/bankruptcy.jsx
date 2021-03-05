import React from 'react';
import {
	Button, Form, message,
} from 'antd';
import { navigate } from '@reach/router';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import { Input, timeRule, DatePicker } from '@/common';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 116 };
class BANKRUPTCY extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			publishDateStart: undefined,
			publishDateEnd: undefined,
		};
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
		const { form } = this.props; // 会提示props is not defined
		const { publishDateStart, publishDateEnd } = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.publishDateStart = publishDateStart;
		fildes.publishDateEnd = publishDateEnd;

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/bankruptcy', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		this.setState({
			publishDateStart: undefined,
			publishDateEnd: undefined,
		});
		resetFields('');
	};

	render() {
		const { form } = this.props; // 会提示props is not defined
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
							title="全文"
							placeholder="企业名称、关键字"
							maxLength="40"
							{...getFieldProps('brcompanyname', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ marginRight: 16, width: 259 }}>
						<Input
							title="案号/标题"
							maxLength="40"
							placeholder="破产案号/公告标题"
							{...getFieldProps('title', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ width: 259 }}>
						<Input
							title="受理法院"
							maxLength="20"
							placeholder="破产案件受理法院"
							{...getFieldProps('court', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
				</div>
				<div className="other">
					<span>发布日期：</span>
					<DatePicker
						placeholder="开始日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishDateEnd'))}
						{...getFieldProps('publishDateStart', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									publishDateStart: dateString,
								});
							},
							...timeOption,
						})}
						allowClear
					/>
					<span style={{ margin: '0 2px ' }}>至</span>
					<DatePicker
						placeholder="结束日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishDateStart'))}
						{...getFieldProps('publishDateEnd', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									publishDateEnd: dateString,
								});
							},
							...timeOption,
						})}
						allowClear
					/>
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
export default createForm()(BANKRUPTCY);
export const Name = 'BANKRUPTCY';
