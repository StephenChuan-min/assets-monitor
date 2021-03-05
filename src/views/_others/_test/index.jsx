import React from 'react';
import TableCom from './table';
import './style.scss';

export default class TestPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="test-wrapper">
				<p className="test-title">测试页面</p>
				<TableCom />
			</div>
		);
	}
}
