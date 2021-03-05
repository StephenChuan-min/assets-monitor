import React from 'react';

import {
	Icon, Button, Form,
} from 'antd';
import { Input } from '@/common';
import './style.scss';

const createForm = Form.create;
class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
		};
	}

	onInput=(val) => {
		this.setState({ data: val.target.value });
		// val.target.value.replace(/\s+/g, '');
	};

	onClear=() => {
		const {
			getTableData, clearInput, role, form: { resetFields },
		} = this.props;
		resetFields(['obligorName']);
		this.setState({ data: '' });

		const params = {
			role,
		};
		getTableData(params);
		clearInput();
	};

	onSearch=() => {
		const {
			getTableData, role, form, getSearchValue,
		} = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();

		const params = {
			keyword: fields.obligorName && fields.obligorName.trim(),
			role,
			groupId: role,
		};
		getSearchValue(params);
		getTableData(params);
	};

	renderIcon=() => {
		const { data } = this.state;
		if (data) {
			return (
				<div className="search-icon" onClick={() => this.onClear()}>
					<Icon type="cross-circle" />
				</div>
			);
		}
		return null;
	};

	onPlaceholder=() => {
		if (global.GLOBAL_MEIE_BROWSER) {
			document.getElementById('inputFocus').focus();
		}
	};

	render() {
		const { placeholder, form } = this.props;
		const { getFieldProps } = form;
		return (
			<div className="search-input">
				<Input
					size="large"
					autocomplete="off"
					id="inputFocus"
					placeholder={placeholder}
					{...this.props}
					{...getFieldProps('obligorName', {
						onChange: (value) => {
							console.log(value);
							this.setState({ data: value });
							// this.onInput(event);
						},
						getValueFromEvent: value => value.trim(),
					})}
				/>
				{
					this.renderIcon()
				}
				<Button type="ghost" style={global.GLOBAL_MEIE_BROWSER && { height: 35 }} className="search-click" onClick={() => this.onSearch()}>搜索</Button>
			</div>
		);
	}
}
export default createForm()(BasicTable);
