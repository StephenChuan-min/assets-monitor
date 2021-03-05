import React from 'react';
import { DatePicker } from 'antd';

export default class NewDatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	onHandleChange=(val) => {
		const { onChange } = this.props;
		if (val) {
			this.setState({ value: val });
			onChange(val);
		}
	};

	render() {
		const { value } = this.state;
		const { placeholder } = this.props;
		return (
			<div style={{ position: 'relative', background: '#ffffff' }}>
				<div
					className={`yc-public-placeholder ${!value ? 'yc-visibility-none' : ''}`}
					style={{ paddingLeft: 7 }}
					onClick={ this.onPlaceholder}
				>
					{placeholder || '请输入'}
				</div>
				<DatePicker {...this.props} onChange={this.onHandleChange} />
			</div>
		);
	}
}
