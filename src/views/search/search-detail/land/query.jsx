import React from 'react';
import { navigate } from '@reach/router';
import { Form, Select } from 'antd';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import provinceList from '@/utils/provinceList';

const createForm = Form.create;
const _style1 = { width: 278 };
const _style2 = { width: 140 };

class QUERYLAND extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
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
		const {
			form: { getFieldsValue }, type, getQueryData, getData, getCount,
		} = this.props;
		const Fields = getFieldsValue();
		const { pageSize } = this.state;
		Fields.type = type;
		navigate(generateUrlWithParams('/search/detail/land', Fields));

		const params = {
			...Fields,
			page: 1,
			num: pageSize,
		};
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(Fields)) {
			getData(params, type); // 进入页面请求数据
			getCount(Fields);
		} else {
			this.queryReset();
		}
		// 实际上就是把查询的表单参数给父组件，改变父组件里面的state的值
		getQueryData(params);
	};

	// 重置输入框
	queryReset = () => {
		const { form, queryReset } = this.props;
		const { resetFields } = form;
		this.setState({
			pageSize: 10,
		});
		navigate(generateUrlWithParams('/search/detail/land', { }));
		resetFields('');
		queryReset();
	};

	render() {
		const {
			form, urlObj,
		} = this.props;
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div>
				<div>
					<div className="yc-query-item">
						<Input
							title="个人/企业"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="个人/企业名称"
							{...getFieldProps('name', {
								initialValue: urlObj.name || undefined,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span>土地省份：</span>
						<Select
							allowClear
							style={{ width: 140 }}
							placeholder="请选择"
							size="large"
							{...getFieldProps('province', { initialValue: urlObj.province })}
						>
							{
								provinceList && provinceList.provinceList.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)
							}
						</Select>
					</div>
					<div className="yc-query-item">
						<Input
							title="宗地坐落"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="土地具体坐落位置"
							{...getFieldProps('landAddress', {
								initialValue: urlObj.landAddress || undefined,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="土地用途"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="土地用途"
							{...getFieldProps('landUse', {
								initialValue: urlObj.landUse || undefined,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-lable" style={{ fontSize: 14 }}>日期选择: </span>
						<DatePicker
							{...getFieldProps('startTime', {
								initialValue: urlObj.startTime,
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endTime'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-lable" style={{ fontSize: 14 }}>至</span>
						<DatePicker
							{...getFieldProps('endTime', {
								initialValue: urlObj.endTime || undefined,
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTime'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={() => this.search()} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={() => this.queryReset()} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
			</div>
		);
	}
}

export default createForm()(QUERYLAND);
