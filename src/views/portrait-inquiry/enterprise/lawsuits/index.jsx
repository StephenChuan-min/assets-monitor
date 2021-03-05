import React from 'react';
import { Button, Spin, NoContent } from '@/common';
import Trial from './trial';
import Court from './court';
import Judgment from './judgment';
import Dishonest from './dishonest';

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
		name: '立案',
		total: data ? toGetTotal('2010', data) : 0,
		info: data ? data.filter(i => /2010/.test(i.id)) : '',
		tagName: 'e-lawsuits-trial',
		component: Trial,
	},
	{
		id: 20200,
		name: '开庭',
		total: data ? toGetTotal('2020', data) : 0,
		info: data ? data.filter(i => /2020/.test(i.id)) : '',
		tagName: 'e-lawsuits-court',
		component: Court,
	},
	{
		id: 20300,
		name: '涉诉文书',
		total: data ? toGetTotal('2030', data) : 0,
		info: data ? data.filter(i => /2030/.test(i.id)) : '',
		tagName: 'e-lawsuits-judgment',
		component: Judgment,
	},
	{
		id: 20400,
		name: '失信记录',
		total: data ? toGetTotal('2040', data) : 0,
		info: data ? data.filter(i => /2040/.test(i.id)) : '',
		tagName: 'e-lawsuits-dishonest',
		component: Dishonest,
	},
]
);
export default class Lawsuits extends React.Component {
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
		// const _height = document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop - 168);
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
