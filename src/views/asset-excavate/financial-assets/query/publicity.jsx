import React from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'reactPropTypes';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { clearEmpty } from '@/utils';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';

const projectType = [
	{ name: '股权项目', key: '1' },
	{ name: '债权项目', key: '2' },
	{ name: '资产项目', key: '3' },
	{ name: '租赁项目', key: '4' },
	{ name: '增资项目', key: '5' },
	{ name: '其他项目', key: '6' },
	{ name: '未知', key: '-1' },
];

const projectStatus = [
	{ name: '预披露', key: '1' },
	{ name: '等待挂牌', key: '2' },
	{ name: '挂牌中', key: '3' },
	{ name: '挂牌结束', key: '4' },
	{ name: '报名中', key: '5' },
	{ name: '报名结束', key: '6' },
	{ name: '竞价中', key: '7' },
	{ name: '竞价结束', key: '8' },
	{ name: '已成交', key: '9' },
	{ name: '已结束', key: '10' },
	{ name: '中止', key: '11' },
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
			const dParams = getUrlParams(url, 'gmtModifiedStart', 'gmtModifiedEnd');
			const { form: { setFieldsValue } } = this.props;
			setFieldsValue({ gmtModifiedStart: dParams.gmtModifiedStart });
			setFieldsValue({ gmtModifiedEnd: dParams.gmtModifiedEnd });
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
		if (typeof onQueryChange === 'function')onQueryChange(clearEmpty(condition), '', '', 1);
	};

	// 重置按钮
	handleReset=() => {
		const url = window.location.hash;
		if (url.indexOf('timeHorizon') !== -1) {
			reserUrl();
		} else {
			const { form, onQueryChange, clearSelectRowNum } = this.props;
			clearSelectRowNum();// 清除选中项
			form.resetFields();
			const condition = form.getFieldsValue();
			if (typeof onQueryChange === 'function')onQueryChange(clearEmpty(condition), '', '', 1);
			// console.log('reset:', form.getFieldsValue());
		}
	};

	render() {
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const _style1 = { width: 278 };
		const _style2 = { width: 164 };
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
						placeholder="债务人姓名/公司名称"
						{...getFieldProps('obligorName')}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">项目类型：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 90 }}
						{...getFieldProps('projectType', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						{
							projectType.map(item => (
								<Select.Option value={item.key}>{item.name}</Select.Option>
							))
						}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">项目状态：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 90 }}
						{...getFieldProps('projectStatus', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						{
							projectStatus.map(item => (
								<Select.Option value={item.key}>{item.name}</Select.Option>
							))
						}
					</Select>
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
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('gmtModifiedStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('gmtModifiedEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('gmtModifiedEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('gmtModifiedStart'))}
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
