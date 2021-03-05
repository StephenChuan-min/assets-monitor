import React from 'react';
// import { Button } from 'antd';
import { Button } from '@/common';
import Portrait from './portrait';
import Visualize from './visualize';

const subItems = [
	{
		id: 1,
		name: '画像',
		tagName: 'e-assets-businessInfo',
		component: Portrait,
	},
	{
		id: 2,
		name: '可视化',
		tagName: 'e-assets-keyPersonnel',
		component: Visualize,
	},
];

export default class Overview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 1,
		};
	}

	componentDidMount() {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems(), 101);
	}

	toChangeItemType = (item) => {
		const { active } = this.state;
		if (active === item.id) return;
		this.setState({ active: item.id }, () => {
			window.scrollTo(0, 0);
			const { toPushChild } = this.props;
			toPushChild(this.toGetSubItems(), 101);
		});
	};

	toGetSubItems = () => {
		const { active } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{ subItems.map(item => (
					<Button
						className="yc-intro-btn-items"
							// type={item.id === active ? 'primary' : 'ghost'}
						active={item.id === active}
						onClick={() => this.toChangeItemType(item)}
						style={{ marginRight: '16px' }}
					>
						{item.name}
					</Button>
				))}
			</div>
		);
	};

	render() {
		const { active } = this.state;
		const { portrait, apiError } = this.props;
		return (
			<div className="inquiry-assets">
				{ !apiError && active === 1 ? <Portrait portrait={portrait} /> : null }
				{ !apiError && active === 2 ? <Visualize portrait={portrait} /> : null }
			</div>
		);
	}
}
