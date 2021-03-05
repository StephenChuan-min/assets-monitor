import React from 'react';
import {
	Button, Form, message,
} from 'antd';
import { navigate } from '@reach/router';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import { Input } from '@/common';
import './style.scss';

const createForm = Form.create;
class FINANCE extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTimeStart: undefined,
			startTimeEnd: undefined,
			endTimeStart: undefined,
			endTimeEnd: undefined,
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
		const {
			startTimeStart, startTimeEnd, endTimeStart, endTimeEnd,
		} = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startTimeStart = startTimeStart;
		fildes.startTimeEnd = startTimeEnd;
		fildes.endTimeStart = endTimeStart;
		fildes.endTimeEnd = endTimeEnd;

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/finance', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		this.setState({
			startTimeStart: undefined,
			startTimeEnd: undefined,
			endTimeStart: undefined,
			endTimeEnd: undefined,
		});
		resetFields('');
	};

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-tabs-data">
				<div className="yc-tabs-items">
					<div className="item" style={{ marginRight: 16, width: 259 }}>
						<Input
							title="全文"
							placeholder="全文搜索关键词"
							{...getFieldProps('content', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ width: 243 }}>
						<Input
							title="项目名称"
							placeholder="项目标题"
							maxLength="40"
							{...getFieldProps('projectName', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
				</div>
				{/* <div className="other">
					<span>挂牌起始日期：</span>
					<DatePicker
						placeholder="开始日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('startTimeEnd'))}
						{...getFieldProps('startTimeStart', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									startTimeStart: dateString,
								});
							},
						})}
						allowClear
					/>
					<span style={{ margin: '0 2px ' }}>至</span>
					<DatePicker
						placeholder="结束日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTimeStart'))}
						{...getFieldProps('startTimeEnd', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									startTimeEnd: dateString,
								});
							},
						})}
						allowClear
					/>
				</div>
				<div className="other">
					<span>挂牌期满日期：</span>
					<DatePicker
						placeholder="开始日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endTimeEnd'))}
						{...getFieldProps('endTimeStart', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									endTimeStart: dateString,
								});
							},
						})}
						allowClear
					/>
					<span style={{ margin: '0 2px ' }}>至</span>
					<DatePicker
						placeholder="结束日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('endTimeStart'))}
						{...getFieldProps('endTimeEnd', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									endTimeEnd: dateString,
								});
							},
						})}
						allowClear
					/>
				</div> */}
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
export default createForm()(FINANCE);
export const Name = 'FINANCE';
