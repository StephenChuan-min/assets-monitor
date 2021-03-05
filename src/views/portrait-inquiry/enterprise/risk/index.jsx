import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import Abnormal from './abnormal';
import Bankruptcy from './bankruptcy';
import Illegal from './illegal';
import Punishment from './punishment';
import Tax from './tax';
import Dishonest from './dishonest';
import Involved from './involved';
import EnvironmentPunishment from './environmentPunishment';
// import LimitHeight from './limit-height';

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
	{
		id: 20100,
		name: '破产重组',
		total: data ? toGetTotal('2010', data) : 0,
		info: data ? data.filter(i => /2010/.test(i.id)) : '',
		component: Bankruptcy,
		tagName: 'e-risk-bankruptcy',
	},
	{
		id: 20200,
		name: '失信记录',
		total: data ? toGetTotal('2020', data) : 0,
		info: data ? data.filter(i => /2020/.test(i.id)) : '',
		tagName: 'e-risk-dishonest',
		component: Dishonest,
	},
	// {
	// 	id: 20900,
	// 	name: '限制高消费',
	// 	total: data ? toGetTotal('2090', data) : 0,
	// 	info: data ? data.filter(i => /2090/.test(i.id)) : '',
	// 	tagName: 'e-risk-limitHeight',
	// 	component: LimitHeight,
	// },
	{
		id: 20300,
		name: '涉诉信息',
		total: data ? toGetTotal('2030', data) : 0,
		info: data ? data.filter(i => /2030/.test(i.id)) : '',
		tagName: 'e-risk-involved',
		component: Involved,
	},
	{
		id: 20400,
		name: '经营异常',
		total: data ? toGetTotal('2040', data) : 0,
		info: data ? data.filter(i => /2040/.test(i.id)) : '',
		component: Abnormal,
		tagName: 'e-risk-abnormal',
	},
	{
		id: 20500,
		name: '严重违法',
		total: data ? toGetTotal('2050', data) : 0,
		info: data ? data.filter(i => /2050/.test(i.id)) : '',
		component: Illegal,
		tagName: 'e-risk-illegal',
	},
	{
		id: 20600,
		name: '税收违法',
		total: data ? toGetTotal('2060', data) : 0,
		info: data ? data.filter(i => /2060/.test(i.id)) : '',
		component: Tax,
		tagName: 'e-risk-tax',
	},
	{
		id: 20700,
		name: '行政处罚',
		total: data ? toGetTotal('2070', data) : 0,
		info: data ? data.filter(i => /2070/.test(i.id)) : '',
		component: Punishment,
		tagName: 'e-risk-punishment',
	},
	{
		id: 20800,
		name: '环保处罚',
		total: data ? toGetTotal('2080', data) : 0,
		info: data ? data.filter(i => /2080/.test(i.id)) : '',
		component: EnvironmentPunishment,
		tagName: 'e-risk-punishment',
	},
]);

export default class Risk extends React.Component {
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
		const { count, name } = this.props;
		const aryResult = (subItems(count).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				{
					loading ? <Spin visible minHeight={350} /> : (
						<div>
							{
								aryResult ? config.map(Item => (
									// eslint-disable-next-line react/jsx-pascal-case
									Item.total ? <Item.component name={name || ''} id={Item.tagName} data={Item.info} portrait="enterprise" /> : ''))
									: <NoContent />
							}
						</div>
					)
				}
			</div>
		);
	}
}
