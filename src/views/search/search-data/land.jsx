import React from 'react';
import {
	Button, Form, message, Select,
} from 'antd';
import { navigate } from '@reach/router';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import { Input, timeRule, DatePicker } from '@/common';
import provinceList from '@/utils/provinceList';

const createForm = Form.create;
const _style1 = { width: 116 };
class LAND extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: undefined,
			endTime: undefined,
			type: 1,
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
		const { form } = this.props;
		const { startTime, endTime, type } = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startTime = startTime;
		fildes.endTime = endTime;
		fildes.type = type;

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			navigate(generateUrlWithParams('/search/detail/land', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props;
		const { resetFields } = form;
		this.setState({
			startTime: undefined,
			endTime: undefined,
		});
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
					<div className="item" style={{ marginRight: 16, width: 200 }}>
						<span>土地省份：</span>
						<Select
							allowClear
							style={{ width: 140 }}
							placeholder="请选择土地省份"
							size="large"
							{...getFieldProps('province')}
						>
							{
								provinceList && provinceList.provinceList.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)
							}
						</Select>
					</div>
					<div className="item" style={{ width: 259 }}>
						<Input
							title="宗地坐落"
							maxLength="20"
							placeholder="宗地坐落具体位置"
							{...getFieldProps('landAddress', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
				</div>
				<div className="yc-tabs-items">
					<div className="item" style={{ 'margin-right': 16 }}>
						<Input
							title="土地用途"
							placeholder="土地用途"
							maxLength="20"
							{...getFieldProps('landUse', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ 'margin-right': 0, width: 400 }}>
						<span>日期选择：</span>
						<DatePicker
							placeholder="开始日期"
							size="large"
							style={_style1}
							{...getFieldProps('startTime', {
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endTime'))}
							allowClear
						/>
						<span style={{ margin: '0 6px ' }}>至</span>
						<DatePicker
							placeholder="结束日期"
							size="large"
							style={_style1}
							{...getFieldProps('endTime', {
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTime'))}
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
export default createForm()(LAND);
export const Name = 'LAND';
