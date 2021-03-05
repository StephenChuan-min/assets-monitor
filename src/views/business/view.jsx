import React from 'react';
import { NavTab } from '@/common';
import * as NavTabImg from '@/assets/img/nav-tab';
import Router from '@/utils/Router';
import Business from './business-views';
import Debtor from './debtor-views';

// 业务管理-主首页
export default class InfoBusiness extends React.Component {
	constructor(props) {
		super(props);
		const childRule = props.rule.children || {};
		this.state = {
			config: [
				{
					id: 1,
					title: '业务视图',
					img: NavTabImg.business,
					selectImg: NavTabImg.businessEd,
					url: '/business/view/*',
					rule: childRule.ywglywst,
					status: true,
					Component: Business,
				},
				{
					id: 2,
					title: '债务人',
					img: NavTabImg.debtor,
					selectImg: NavTabImg.debtorEd,
					url: '/business/view/debtor/*',
					rule: childRule.ywglzwr,
					status: true,
					Component: Debtor,
				},
			].filter(i => i.rule),
		};
	}

	render() {
		const { config } = this.state;
		return [
			<NavTab source={config} />,
			<Router>
				{ config.map(Item => <Item.Component path={Item.url} rule={Item.rule} />)}
			</Router>,
		];
	}
}
