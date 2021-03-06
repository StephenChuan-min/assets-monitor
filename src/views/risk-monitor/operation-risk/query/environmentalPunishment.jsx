import React from 'react';
import { Form } from 'antd';
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
			const dParams = getUrlParams(url, 'startCreateTime', 'endCreateTime');
			const { form: { setFieldsValue } } = this.props;
			setFieldsValue({ startCreateTime: dParams.startCreateTime });
			setFieldsValue({ endCreateTime: dParams.endCreateTime });
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
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	handleReset=() => {
		const url = window.location.hash;
		if (url.indexOf('timeHorizon') !== -1) {
			reserUrl();
		} else {
			const { form, onQueryChange } = this.props;
			form.resetFields();
			const condition = form.getFieldsValue();
			if (onQueryChange)onQueryChange(condition, '', '', 1);
		}
	};

	render() {
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="????????????" style={_style1} size="large" maxLength="40" placeholder="????????????" {...getFieldProps('obName')} />
				</div>
				<div className="yc-query-item">
					<Input title="??????" style={_style1} size="large" maxLength="40" placeholder="????????????" {...getFieldProps('title')} />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">???????????????</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="????????????"
						{...getFieldProps('startPublishTime', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endPublishTime'))}
					/>
					<span className="yc-query-item-title">???</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="????????????"
						{...getFieldProps('endPublishTime', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startPublishTime'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}???`}</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="????????????"
						{...getFieldProps('startCreateTime', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endCreateTime'))}
					/>
					<span className="yc-query-item-title">???</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="????????????"
						{...getFieldProps('endCreateTime', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startCreateTime'))}
					/>
				</div>


				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="common" style={{ width: 84 }} onClick={this.handleSubmit}>??????</Button>
					<Button size="large" style={{ width: 120 }} onClick={this.handleReset}>??????????????????</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
