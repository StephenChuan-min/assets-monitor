import React from 'react';
import {
	Form, message, Select,
} from 'antd';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import InputPrice from '@/common/input/input-price';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';
import provinceList from '../../../../utils/provinceList';

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
		const { form: { getFieldsValue }, onQueryChange, clearSelectRowNum } = this.props;
		clearSelectRowNum();// 清除选中项
		const condition = getFieldsValue();
		if (condition.lowPrice && Number(condition.lowPrice) > condition.highPrice && Number(condition.highPrice)) {
			message.error('成交价格最低价不能高于成交价格最高价！');
			return;
		}
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
			const condition = 	form.getFieldsValue();
			if (onQueryChange)onQueryChange(condition, '', '', 1);
		}
	};

	render() {
		const _style1 = { width: 278 };
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
					<Input title="债务人" style={_style1} size="large" maxLength="40" placeholder="企业债务人名称" {...getFieldProps('obligorName')} />
				</div>
				<div className="yc-query-item">
					<Input title="土地用途" style={_style1} size="large" maxLength="20" placeholder="土地用途" {...getFieldProps('landUse')} />
				</div>

				<div className="yc-query-item">
					<InputPrice
						title="抵押金额"
						style={_style1}
						size="large"
						suffix="万元"
						maxLength="9"
						inputFirstProps={getFieldProps('lowPrice', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
							rules: [
								{
									required: true,
									validator(rule, value, callback) {
										const consultPriceEnd = getFieldValue('highPrice');
										if (consultPriceEnd && value) {
											if (Number(value) > Number(consultPriceEnd)) {
												message.error('评估价最低价不得高过最高价', 2);
												// setFieldsValue({ consultPriceStart: '' });
											}
										}
										if (Number.isNaN(Number(value)) || Number(value) % 1 !== 0 || Number(value) < 0) {
											message.error('只能输入正整数！', 2);
											// setFieldsValue({ consultPriceStart: '' });
										}
										callback();
									},
								}],
						})}
						inputSecondProps={getFieldProps('highPrice', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
							rules: [
								{
									required: true,
									validator(rule, value, callback) {
										const consultPriceStart = getFieldValue('lowPrice');
										if (consultPriceStart && value) {
											if (Number(value) < Number(consultPriceStart)) {
												message.error('评估价最高价不得低于最低价', 2);
												// setFieldsValue({ consultPriceEnd: '' });
											}
										}
										if (Number.isNaN(Number(value)) || Number(value) % 1 !== 0 || Number(value) < 0) {
											message.error('只能输入正整数', 2);
											// setFieldsValue({ consultPriceEnd: '' });
										}
										// if (Number(value) > 9999999) {
										// 	message.error('数值上限不得超过9999999', 2);
										// 	// setFieldsValue({ consultPriceEnd: '' });
										// }
										callback();
									},
								}],
						})}
					/>
				</div>

				<div className="yc-query-item" style={{ marginRight: 0 }}>
					<span className="yc-query-item-title">土地省份：</span>
					<Select
						allowClear
						size="large"
						style={{ width: 212 }}
						placeholder="请选择土地省份"
						{...getFieldProps('province')}
					>
						{
							provinceList && provinceList.provinceList.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)
						}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">登记日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('startTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('startTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTimeStart'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
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
