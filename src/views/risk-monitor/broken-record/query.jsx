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
			const dParams = getUrlParams(url, 'startGmtModified', 'endGmtModified');
			const { form: { setFieldsValue } } = this.props;
			setFieldsValue({ startGmtModified: dParams.startGmtModified });
			setFieldsValue({ endGmtModified: dParams.endGmtModified });
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
		const { form: { getFieldsValue }, onQueryChange, clearSelectRowNum } = this.props;
		clearSelectRowNum();// 清除选中项
		const condition = getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	handleReset=() => {
		const url = window.location.hash;
		if (url.indexOf('timeHorizon') !== -1) {
			reserUrl();
		} else {
			const { form, onQueryChange, clearSelectRowNum } = this.props;
			clearSelectRowNum();// 清除选中项
			form.resetFields();
			const condition = form.getFieldsValue();
			if (onQueryChange)onQueryChange(condition, '', '', 1);
			// console.log(form.getFieldsValue());
		}
	};

	render() {
		const _style1 = { width: 278 };
		const _style2 = { width: 100 };
		const _style3 = { width: 150 };
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" maxLength="40" placeholder="债务人名称" {...getFieldProps('name')} />
				</div>
				<div className="yc-query-item">
					<Input title="相关案号" style={_style1} size="large" maxLength="40" placeholder="失信相关案号" {...getFieldProps('caseCode')} />
				</div>
				<div className="yc-query-item">
					<Input title="执行法院" style={_style1} size="large" maxLength="20" placeholder="列入失信法院" {...getFieldProps('court')} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">移除情况：</span>
					<Select size="large" style={_style3} {...getFieldProps('removeStatus')} placeholder="失信记录移除情况" allowClear>
						<Select.Option value={false} key={2}>未移除</Select.Option>
						<Select.Option value key={1}>已移除</Select.Option>
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-lable">发布日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmtPublishDate', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtPublishDate'))}
					/>
					<span className="yc-query-item-lable">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endGmtPublishDate', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startGmtPublishDate'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-lable">更新日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmtModified', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtModified'))}
					/>
					<span className="yc-query-item-lable">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endGmtModified', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startGmtModified'))}
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
