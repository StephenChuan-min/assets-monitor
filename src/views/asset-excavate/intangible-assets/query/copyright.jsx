import React from 'react';
import { Form, Select } from 'antd';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const url = window.location.hash;
		if (url.indexOf('?') !== -1) {
			const dParams = getUrlParams(url, 'gmtCreateStart', 'gmtCreateEnd');
			const { form: { setFieldsValue } } = this.props;
			setFieldsValue({ gmtCreateStart: dParams.gmtCreateStart });
			setFieldsValue({ gmtCreateEnd: dParams.gmtCreateEnd });
			this.handleSubmit();
		}
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
				this.handleSubmit();
				document.activeElement.blur();
			}
		}
	};

	handleSubmit=() => {
		const { form: { getFieldsValue }, onQueryChange } = this.props;
		const condition = getFieldsValue();
		if (onQueryChange)onQueryChange(condition);
	};

	handleReset=() => {
		const url = window.location.hash;
		if (url.indexOf('timeHorizon') !== -1) {
			reserUrl();
		} else {
			const { form, onQueryChange } = this.props;
			form.resetFields();
			const condition = 	form.getFieldsValue();
			if (onQueryChange)onQueryChange(condition);
		}
	};

	render() {
		const _style1 = { width: 278 };
		const _style2 = { width: 100 };
		const _style3 = { width: 210 };

		const { form: { getFieldProps, getFieldValue } } = this.props;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} maxLength="40" size="large" placeholder="企业债务人名称" {...getFieldProps('obligorName')} />
				</div>
				<div className="yc-query-item">
					<Input title="商标/专利名称" titleWidth={100} maxLength="40" style={_style1} size="large" placeholder="商标/专利名称" {...getFieldProps('rightsName')} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">权利类型：</span>
					<Select size="large" style={_style3} placeholder="请选择权利类型" {...getFieldProps('rightsType')} allowClear>
						<Select.Option value={1}>商标</Select.Option>
						<Select.Option value={2}>专利</Select.Option>
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">公告日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('noticeTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('noticeTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('noticeTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('noticeTimeStart'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('gmtCreateStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('gmtCreateEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('gmtCreateEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('gmtCreateStart'))}
					/>
				</div>


				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="common" style={{ width: 84 }} onClick={this.handleSubmit}>查询</Button>
					<Button size="large" style={{ width: 120 }} onClick={this.handleReset}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
