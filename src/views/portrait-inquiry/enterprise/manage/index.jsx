import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import Abnormal from './abnormal';
import Bankruptcy from './bankruptcy';
// import Bidding from './bidding';
import Illegal from './illegal';
import Punishment from './punishment';
import Tax from './tax';

const toGetTotal = (field, data) => {
	let count = 0;
	const reg = new RegExp(field);
	data.forEach((item) => {
		if (reg.test(item.id)) {
			count += item.field ? item.data[item.field] : item.data;
		}
	});
	return count;
};

const subItems = data => ([
	// {
	// 	id: 30100,
	// 	name: '招投标',
	// 	total: data ? toGetTotal('3010', data) : 0,
	// 	info: data ? data.filter(i => /3010/.test(i.id)) : '',
	// 	tagName: 'e-manage-bidding',
	// 	component: Bidding,
	// },
	{
		id: 30200,
		name: '破产重组',
		total: data ? toGetTotal('3020', data) : 0,
		info: data ? data.filter(i => /3020/.test(i.id)) : '',
		component: Bankruptcy,
		tagName: 'e-manage-bankruptcy',
	},
	{
		id: 30300,
		name: '经营异常',
		total: data ? toGetTotal('3030', data) : 0,
		info: data ? data.filter(i => /3030/.test(i.id)) : '',
		component: Abnormal,
		tagName: 'e-manage-abnormal',
	},
	{
		id: 30400,
		name: '严重违法',
		total: data ? toGetTotal('3040', data) : 0,
		info: data ? data.filter(i => /3040/.test(i.id)) : '',
		component: Illegal,
		tagName: 'e-manage-illegal',
	},
	{
		id: 30500,
		name: '税收违法',
		total: data ? toGetTotal('3050', data) : 0,
		info: data ? data.filter(i => /3050/.test(i.id)) : '',
		component: Tax,
		tagName: 'e-manage-tax',

	},
	{
		id: 30600,
		name: '行政处罚',
		total: data ? toGetTotal('3060', data) : 0,
		info: data ? data.filter(i => /3060/.test(i.id)) : '',
		component: Punishment,
		tagName: 'e-manage-punishment',

	},
]);
export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: subItems(props.count),
			loading: Boolean(props.count.length === 0),
		};
	}

	componentDidMount() {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems());
	}


	componentWillReceiveProps(nextProps) {
		const { count } = this.props;
		if (nextProps.count.length) {
			if (JSON.stringify(nextProps.count) !== JSON.stringify(count)) {
				this.setState({
					loading: nextProps.count.length === 0,
					config: subItems(nextProps.count),
				}, () => {
					const { toPushChild } = this.props;
					toPushChild(this.toGetSubItems());
				});
			}
		}
	}

	handleScroll=(eleID) => {
		const dom = document.getElementById(eleID);
		const _height = 168 || document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop - _height);
		}
	};

	toGetSubItems=() => {
		const { config } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{
					config.map(item => (
						<Button
							className="intro-btn-items"
							disabled={!item.total}
							onClick={() => this.handleScroll(item.tagName)}
						>
							{item.name}
							{item.total ? ` ${item.total}` : ' 0'}
						</Button>
					))
				}
			</div>
		);
	};

	render() {
		const { config, loading } = this.state;
		const { count } = this.props;
		const aryResult = (subItems(count).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				{
					loading ? <Spin visible minHeight={350} /> : (
						<div>
							{
								aryResult ? config.map(Item => (
									Item.total ? <Item.component id={Item.tagName} data={Item.info} /> : ''))
									: <NoContent />
							}
						</div>
					)
				}
			</div>
		);
	}
}
