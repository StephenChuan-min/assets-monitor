import React from 'react';
import {
	Form, Select,
} from 'antd';
import PropTypes from 'reactPropTypes';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { clearEmpty } from '@/utils';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';

const assetType = [
	{ name: '房产', key: '50025969' },
	{ name: '机动车', key: '50025972' },
	{ name: '奢侈品', key: '201290015' },
	{ name: '实物资产', key: '50025971' },
	{ name: '林权', key: '50025973' },
	{ name: '土地', key: '50025970' },
	{ name: '股权', key: '125088031' },
	{ name: '债权', key: '56956002' },
	{ name: '无形资产', key: '122406001' },
	{ name: '其他', key: '50025976' },
	{ name: '船舶', key: '125228021' },
	{ name: '其他交通工具', key: '200794003' },
	{ name: '矿权', key: '50025974' },
	{ name: '工程', key: '50025975' },
	{ name: '海域', key: '200778005' },
	{ name: '机械设备', key: '56936003' },
	{ name: '未知', key: '0' },
];

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const url = window.location.hash;
		if (url.indexOf('?') !== -1) {
			const dParams = getUrlParams(url, 'gmtModifyStart', 'gmtModifyEnd');
			const { form: { setFieldsValue } } = this.props;
			setFieldsValue({ gmtModifyStart: dParams.gmtModifyStart });
			setFieldsValue({ gmtModifyEnd: dParams.gmtModifyEnd });
			this.handleSubmit();
		}
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13 = (e) => {
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

	// 提交按钮
	handleSubmit = () => {
		const { form: { getFieldsValue }, onQueryChange, clearSelectRowNum } = this.props;
		clearSelectRowNum();// 清除选中项
		const condition = getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	// 重置操作
	handleReset = () => {
		const url = window.location.hash;
		if (url.indexOf('timeHorizon') !== -1) {
			reserUrl();
		} else {
			const { form, onQueryChange, clearSelectRowNum } = this.props;
			clearSelectRowNum();// 清除选中项
			form.resetFields();
			const condition = 	form.getFieldsValue();
			if (typeof onQueryChange === 'function')onQueryChange(clearEmpty(condition), '', '', 1);
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
					<Input
						title="债务人"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="企业债务人名称"
						{...getFieldProps('obligorName')}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="信息标题"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="拍卖信息标题"
						{...getFieldProps('title')}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">匹配精度：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 90 }}
						{...getFieldProps('accurateType', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value={1}>精准匹配</Select.Option>
						<Select.Option value={2}>全文匹配</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">资产类型：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 110 }}
						{...getFieldProps('category', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						{
							assetType.map(item => (
								<Select.Option key={item.key} value={item.key}>{item.name}</Select.Option>
							))
						}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">当前状态：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 100 }}
						{...getFieldProps('status', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value={1}>即将开始</Select.Option>
						<Select.Option value={3}>正在进行</Select.Option>
						<Select.Option value={5}>已成交</Select.Option>
						<Select.Option value={7}>已流拍</Select.Option>
						<Select.Option value={9}>中止</Select.Option>
						<Select.Option value={11}>撤回</Select.Option>
						<Select.Option value={13}>结束</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">发布日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('gmtPublishStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('gmtPublishEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('gmtPublishEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('gmtPublishStart'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('gmtModifyStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('gmtModifyEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('gmtModifyEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('gmtModifyStart'))}
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

QueryCondition.propTypes = {
	onQueryChange: PropTypes.func,
	clearSelectRowNum: PropTypes.func,
};

QueryCondition.defaultProps = {
	onQueryChange: () => {},
	clearSelectRowNum: () => {},
};

export default Form.create()(QueryCondition);
