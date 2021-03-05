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
			const dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			const { form: { setFieldsValue } } = this.props;
			setFieldsValue({ startGmtCreate: dParams.startGmtCreate });
			setFieldsValue({ endGmtCreate: dParams.endGmtCreate });
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
					<Input title="债务人" style={_style1} size="large" maxLength="40" placeholder="企业债务人名称" {...getFieldProps('name')} />
				</div>
				<div className="yc-query-item">
					<Input title="列入原因" style={_style1} size="large" maxLength="40" placeholder="列入严重违法原因" {...getFieldProps('putReason')} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">移除情况：</span>
					<Select size="large" style={_style3} placeholder="请选择严重违法移除情况" {...getFieldProps('isRemove')} allowClear>
						<Select.Option value={false}>未移除</Select.Option>
						<Select.Option value>已移除</Select.Option>
					</Select>
				</div>
				<div className="yc-query-item" style={{ marginRight: 0 }}>
					<Input title="决定机关" style={_style1} size="large" maxLength="40" placeholder="作出处罚决定机关" {...getFieldProps('putDepartment')} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">列入日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmtPutDate', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtPutDate'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endGmtPutDate', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startGmtPutDate'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmtCreate', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtCreate'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endGmtCreate', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startGmtCreate'))}
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
