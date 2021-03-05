import React from 'react';
import {
	Button, Form, message,
} from 'antd';
import { navigate } from '@reach/router';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import { Input } from '@/common';

const createForm = Form.create;
const _style1 = { width: 290 };
class DISHONESTY extends React.Component {
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
		const { form } = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fields)) {
			if (fields.obligorName) {
				if (/^[\u4E00-\u9FA5]{2,}/.test(fields.obligorName)) {
					if (fields.obligorName.length <= 4 && !fields.obligorNumber) {
						message.error('请输入证件号');
					} else {
						navigate(generateUrlWithParams('/search/detail/dishonesty', fields));
					}
				} else {
					message.error('被执行人至少输入两个汉字');
				}
			} else {
				message.error('被执行人至少输入两个汉字');
			}
		} else {
			message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props;
		const { resetFields } = form;
		resetFields('');
	};

	render() {
		const { form } = this.props;
		const { getFieldProps } = form;
		return (
			<div className="yc-tabs-data">
				<div className="yc-tabs-items">
					<div className="item" style={{ marginRight: 16, width: 290 }}>
						<Input
							style={_style1}
							title="被执行人"
							placeholder="个人/企业名称，请填写至少2个汉字"
							maxLength="40"
							{...getFieldProps('obligorName', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item">
						<Input
							title="证件号"
							style={_style1}
							size="large"
							maxLength="18"
							placeholder="身份证号/组织机构代码"
							{...getFieldProps('obligorNumber', {
								getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-*（）()]/g, ''),
							})}
						/>
					</div>
				</div>
				<div className="btn">
					<Button
						type="primary"
						size="large"
						className="yc-high-search"
						onClick={this.search}
					>
						搜索
					</Button>
					<Button onClick={this.queryReset} type="ghost" size="large">
						重置搜索条件
					</Button>
				</div>
			</div>
		);
	}
}
export default createForm()(DISHONESTY);
export const Name = 'DISHONESTY';
