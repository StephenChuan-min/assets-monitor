import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import { toGetTotal } from '@/utils/promise';
import Auction from './auction';
import Subrogation from './subrogation';

const subItems = data => ([
	{
		id: 10100,
		name: '资产拍卖',
		total: data ? toGetTotal('1010', data) : 0,
		info: data ? data.filter(i => /1010/.test(i.id)) : '',
		tagName: 'e-assets-auction',
		component: Auction,
	},
	{
		id: 10200,
		name: '代位权',
		total: data ? toGetTotal('1020', data) : 0,
		info: data ? data.filter(i => /1020/.test(i.id)) : '',
		tagName: 'e-assets-subrogation',
		component: Subrogation,
	},
]);

export default class Assets extends React.Component {
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
						<Button
							className="intro-btn-items"
							disabled={item.total === 0}
							onClick={() => this.handleScroll(item.tagName)}
						>
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
									Item.total ? <Item.component obligorName={obligorName} id={Item.tagName} data={Item.info} /> : ''))
									: <NoContent />
							}
						</div>
					)
				}
			</div>
		);
	}
}
