import React from 'react';
import { Select, Form } from 'antd';
import PropTypes from 'reactPropTypes';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { clearEmpty } from '@/utils';
import '../index.scss';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';

class QueryConstruct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
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

	// 点击查询按钮
	handleSubmit = () => {
		const { form: { getFieldsValue }, onQueryChange, clearSelectRowNum } = this.props;
		clearSelectRowNum();// 清除选中项
		const condition = getFieldsValue();
		if (typeof onQueryChange === 'function')onQueryChange(clearEmpty(condition), '', '', 1);
		return true;
	};

	// 重置查询条件
	handleReset = () => {
		const url = window.location.hash;
		if (url.indexOf('timeHorizon') !== -1) {
			reserUrl();
		} else {
			const { form, onQueryChange, clearSelectRowNum } = this.props;
			clearSelectRowNum();// 清除选中项
			form.resetFields();
			const condition = form.getFieldsValue();
			if (typeof onQueryChange === 'function')onQueryChange(clearEmpty(condition), '', '', 1);
		}
	};

	render() {
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const _style1 = { width: 278 };
		const _style2 = { width: 120 };
		const _style3 = { width: 164 };

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
					<span className="yc-query-item-title">工程类型：</span>
					<Select
						size="large"
						defaultValue="all"
						style={_style2}
						{...getFieldProps('projectType', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value="1">建筑工程</Select.Option>
						<Select.Option value="2">装饰工程</Select.Option>
						<Select.Option value="3">市政道路工程</Select.Option>
						<Select.Option value="4">其他</Select.Option>
						<Select.Option value="0">未知</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<Input
						title="项目标题"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="公告标题关键字"
						{...getFieldProps('title')}
					/>
				</div>
				<br />
				<div className="yc-query-item">
					<span className="yc-query-item-title">立项批复日期：</span>
					<DatePicker
						size="large"
						style={_style3}
						placeholder="开始日期"
						{...getFieldProps('startApprovalTime', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endApprovalTime'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style3}
						placeholder="结束日期"
						{...getFieldProps('endApprovalTime', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startApprovalTime'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">更新时间：</span>
					<DatePicker
						size="large"
						style={_style3}
						placeholder="开始日期"
						{...getFieldProps('startGmtModified', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtModified'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style3}
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

QueryConstruct.propTypes = {
	onQueryChange: PropTypes.func,
	clearSelectRowNum: PropTypes.func,
};

QueryConstruct.defaultProps = {
	onQueryChange: () => {},
	clearSelectRowNum: () => {},
};

export default Form.create()(QueryConstruct);
