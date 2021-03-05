import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import { toGetTotal } from '@/utils/promise';
import LawsuitsMonitor from './components/lawsuitsMonitor';
import BreakFaith from './components/breakFaith';
import TaxViolation from './components/taxViolation';

const subItems = data => ([
	{
		id: 20101,
		name: '涉诉文书',
		total: data ? toGetTotal('2010', data) : 0,
		info: data ? data.filter(i => /2010/.test(i.id)) : '',
		tagName: 'e-assets-lawsuitsMonitor',
		component: LawsuitsMonitor,
	},
	{
		id: 20201,
		name: '失信记录',
		total: data ? toGetTotal('2020', data) : 0,
		info: data ? data.filter(i => /2020/.test(i.id)) : '',
		tagName: 'e-assets-breakFaith',
		component: BreakFaith,
	},
	{
		id: 20301,
		name: '税收违法',
		total: data ? toGetTotal('2030', data) : 0,
		info: data ? data.filter(i => /2030/.test(i.id)) : '',
		tagName: 'e-assets-taxViolation',
		component: TaxViolation,
	},
]);
export default class Risk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: subItems(props.count),
			loading: !props.count.length,
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
		const _height = document.getElementById('personal-intro').clientHeight;
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
						<Button className="intro-btn-items" disabled={item.total === 0} onClick={() => this.handleScroll(item.tagName)}>
							{`${item.name}${item.total ? ` ${item.total}` : ' 0'}`}
						</Button>
					))
				}
			</div>
		);
	};


	render() {
		const { config, loading } = this.state;
		const { count, obligorName } = this.props;
		const aryResult = (subItems(count).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				{
					loading ? <Spin visible minHeight={350} /> : (
						<div>
							{
								aryResult ? config.map(Item => (
									// eslint-disable-next-line react/jsx-pascal-case
									Item.total ? <Item.component obligorName={obligorName || ''} id={Item.tagName} data={Item.info} /> : ''))
									: <NoContent />
							}
						</div>
					)
				}
			</div>
		);
	}
}
