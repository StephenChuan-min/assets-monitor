import React from 'react';
import { Table } from 'od-table';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: 100,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
		width: 100,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
		width: 100,
	},	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
		width: 800,
	},
	{
		title: 'Operations',
		dataIndex: '',
		key: 'operations',
		width: 100,
		render: () => <a href="#/test">Delete</a>,
	},
];
const data = [
	{
		name: 'Jack', age: 28, address: 'some where', key: '1',
	},
	{
		name: 'Rose', age: 36, address: 'some where', key: '2',
	},
];


export default class TableCom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Table columns={columns} data={data} prefixCls="ant-table"	/>
		);
	}
}
