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
					<Input title="债务人" style={_style1} maxLength="40" size="large" placeholder="企业债务人名称" {...getFieldProps('companyName')} />
				</div>
				<div className="yc-query-item">
					<Input title="许可证编号" titleWidth={90} maxLength="25" style={_style1} size="large" placeholder="许可证编号" {...getFieldProps('licenseNumber')} />
				</div>
				<div className="yc-query-item" style={{ marginRight: 30 }}>
					<span className="yc-query-item-title">状态：</span>
					<Select size="large" style={_style3} placeholder="请选择证书当前状态" {...getFieldProps('status')} allowClear>
						<Select.Option value="注销">注销</Select.Option>
						<Select.Option value="撤销">撤销</Select.Option>
						<Select.Option value="遗失">遗失</Select.Option>
						<Select.Option value="正常">正常</Select.Option>
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">发证日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmtPublishTime', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtPublishTime'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endGmtPublishTime', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startGmtPublishTime'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmtModified', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtModified'))}
					/>
					<span className="yc-query-item-title">至</span>
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
