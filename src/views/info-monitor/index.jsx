import React from 'react';
import { navigate } from '@reach/router';
import { NavTab, Button, Icon } from '@/common';
import {
	excavate, excavateEd, risk, riskEd,
} from '@/assets/img/nav-tab';
import Router from '@/utils/Router';
import ExcavateOverview from './excavate';
import RiskOverview from './risk';
import './style.scss';

export default class InfoSearch extends React.Component {
	constructor(props) {
		super(props);
		// console.log(props.rule, 333);
		this.state = {
			config: [
				{
					id: 1,
					title: '资产挖掘',
					img: excavate,
					selectImg: excavateEd,
					url: '/info/monitor/excavate/*',
					attention: '/info/monitor/attention?init=YC02',
					status: true,
					rule: props.rule.menu_zcwj,
					Component: ExcavateOverview,
				},
				{
					id: 2,
					title: '风险监控',
					img: risk,
					selectImg: riskEd,
					url: '/info/monitor/risk/*',
					rule: props.rule.menu_fxjk,
					attention: '/info/monitor/attention?init=YC03',
					status: true,
					Component: RiskOverview,
				},
			].filter(i => this.isObject(i.rule)),
		};
	}

	toGoAttentionPage =() => {
		const { hash } = window.location;
		if (hash === '#/info/monitor/excavate' || hash === '#/info/monitor') {
			navigate('/info/monitor/attention?init=YC02');
		}
		if (hash === '#/info/monitor/risk') {
			navigate('/info/monitor/attention?init=YC03');
		}
	};

	isObject = value => value != null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';

	render() {
		const { config } = this.state;
		return (
			<div style={{ fontFamily: 'Microsoft YaHei' }}>
				<NavTab
					source={config}
					suffix={(
						<div className="yc-suffix-wrapper">
							<Button
								style={{ margin: '14px 20px 10px', width: 95, padding: '2px 9px' }}
								onClick={this.toGoAttentionPage}
								size="large"
								className="attention-btn-icon"
								icon={() => <Icon type="icon-follow-ed" className="yc-btn-icon" />}
								title="我的收藏"
							/>
						</div>
				)}
				/>
				<Router>
					{ config.map(Item => <Item.Component path={Item.url} rule={Item.rule} />)}
				</Router>
			</div>
		);
	}
}
