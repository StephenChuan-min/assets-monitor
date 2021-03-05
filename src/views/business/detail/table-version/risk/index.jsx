import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import { roleState } from '@/utils/rule';
import { getHrefQuery } from '@/utils';
import Abnormal from './abnormal';
import Bankruptcy from './bankruptcy';
import Illegal from './illegal';
import Punishment from './punishment';
import Tax from './tax';
import Dishonest from './dishonest';
import Lawsuit from './lawsuit';
import LawsuitJudgment from './lawsuit-judgment';
import Environment from './environment';
import LimitHeight from './limit-height';


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

const subItems = (data, portrait) => {
	let status = 'normal';
	let onlyStatus = '';
	if (portrait === 'business') status = false;
	if (portrait === 'debtor_enterprise') status = false;
	if (portrait === 'debtor_personal') { status = 'normal'; onlyStatus = 'person'; }
	return [
		{
			id: 30200,
			baseId: 3020,
			name: '破产重组',
			total: data ? toGetTotal('3020', data) : 0,
			info: data ? data.filter(i => /3020/.test(i.id)) : '',
			role: roleState('fxjk', 'fxjkqypccz'),
			component: Bankruptcy,
			isStatus: 'only',
			tagName: 'e-manage-bankruptcy',
		},
		{
			id: 20603,
			baseId: 20603,
			name: '涉诉文书',
			total: data ? toGetTotal('20603', data) : 0,
			info: data ? data.filter(i => /20603/.test(i.id)) : '',
			tagName: 'e-manage-lawsuits',
			role: roleState('fxjk', 'fxjkssjk'),
			component: LawsuitJudgment,
			isOnlyStatus: 'person',
		},
		{
			id: 20400,
			baseId: 2040,
			name: '失信记录',
			total: data ? toGetTotal('2040', data) : 0,
			info: data ? data.filter(i => /2040/.test(i.id)) : '',
			tagName: 'e-manage-dishonest',
			role: roleState('fxjk', 'jkxxsxjl'),
			isStatus: 'normal',
			component: Dishonest,
		},
		{
			id: 20500,
			baseId: 2050,
			name: '限制高消费',
			total: data ? toGetTotal('2050', data) : 0,
			info: data ? data.filter(i => /2050/.test(i.id)) : '',
			tagName: 'e-manage-limitHeight',
			isStatus: 'normal',
			role: roleState('fxjk', 'fxjkxzgxf'),
			component: LimitHeight,
		},
		{
			id: 20600,
			baseId: 2060,
			name: '涉诉信息',
			total: data ? toGetTotal('2060', data) : 0,
			info: data ? data.filter(i => /2060/.test(i.id)) : '',
			tagName: 'e-manage-lawsuits',
			role: roleState('fxjk', 'fxjkssjk'),
			component: Lawsuit,
			isStatus: 'only',
		},
		{
			id: 30300,
			baseId: 3030,
			name: '经营异常',
			total: data ? toGetTotal('3030', data) : 0,
			info: data ? data.filter(i => /3030/.test(i.id)) : '',
			role: roleState('fxjk', 'jyfxjyyc'),
			component: Abnormal,
			isStatus: 'only',
			tagName: 'e-manage-abnormal',
		},
		{
			id: 30400,
			baseId: 3040,
			name: '严重违法',
			total: data ? toGetTotal('3040', data) : 0,
			info: data ? data.filter(i => /3040/.test(i.id)) : '',
			role: roleState('fxjk', 'jyfxyzwf'),
			component: Illegal,
			isStatus: 'only',
			tagName: 'e-manage-illegal',
		},
		{
			id: 30500,
			baseId: 3050,
			name: '税收违法',
			total: data ? toGetTotal('3050', data) : 0,
			info: data ? data.filter(i => /3050/.test(i.id)) : '',
			role: roleState('fxjk', 'jyfxsswf'),
			component: Tax,
			isStatus: 'normal',
			tagName: 'e-manage-tax',
		},
		{
			id: 30600,
			baseId: 3060,
			name: '行政处罚',
			total: data ? toGetTotal('3060', data) : 0,
			info: data ? data.filter(i => /3060/.test(i.id)) : '',
			role: roleState('fxjk', 'jyfxxzcf'),
			component: Punishment,
			isStatus: 'only',
			tagName: 'e-manage-punishment',
		},
		{
			id: 30700,
			baseId: 3070,
			name: '环保处罚',
			total: data ? toGetTotal('3070', data) : 0,
			info: data ? data.filter(i => /3070/.test(i.id)) : '',
			role: roleState('fxjk', 'jyfxhbcf'),
			component: Environment,
			isStatus: 'only',
			tagName: 'e-manage-environment',
		},
	].filter(i => (status ? (i.isStatus === status || i.isOnlyStatus === onlyStatus) : i.isStatus));
};

class Risk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: subItems(props.count, props.portrait),
		};
	}

	componentDidMount() {
		this.toPushAndScroll();
	}


	componentWillReceiveProps(nextProps) {
		const { count } = this.props;
		if (nextProps.count.length) {
			if (JSON.stringify(nextProps.count) !== JSON.stringify(count)) {
				this.setState({
					config: subItems(nextProps.count, nextProps.portrait),
				}, () => {
					this.toPushAndScroll();
				});
			}
		}
	}

	toPushAndScroll = () => {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems(), 103);
		setTimeout(() => {
			const ele = getHrefQuery('ele');
			if (ele) this.handleScroll(ele);
		}, 150);
	};

	handleScroll=(eleID) => {
		const eList = ['e-manage-abnormal', 'e-manage-illegal', 'e-manage-tax', 'e-manage-punishment', 'e-manage-environment'];
		let dom = '';
		if (eleID === 'e-manage') {
			for (let i = 0; i <= 4; i += 1) {
				const eleIdDom = document.getElementById(eList[i]);
				if (eleIdDom) {
					dom = eleIdDom;
					break;
				}
			}
		} else {
			dom = document.getElementById(eleID);
		}
		const { portrait } = this.props;
		const _height = portrait === 'business' ? 190 : 155;
		if (dom) {
			window.scrollTo(0, dom.offsetTop - _height);
		}
	};

	toGetSubItems=() => {
		const { config } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{
					config.map(item => (
						item.role && (
						<Button
							className="intro-btn-items"
							disabled={!item.total}
							onClick={() => this.handleScroll(item.tagName)}
						>
							{item.name}
							{item.total ? ` ${item.total}` : ' 0'}
						</Button>
						)
					))
				}
			</div>
		);
	};

	render() {
		const { config } = this.state;
		const { count, portrait, riskLoading } = this.props;
		const aryResult = (subItems(count, portrait).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets info-assets-padding">
				{ riskLoading ? <Spin minHeight={350} />
					: (
						aryResult ? config.map(Item => (
							// eslint-disable-next-line react/jsx-pascal-case
							Item.total && Item.role ? <Item.component id={Item.tagName} data={Item.info} portrait={portrait} /> : ''))
							: <NoContent />
					)
				}
			</div>
		);
	}
}
Risk.config = {
	items: p => subItems('', p),
	idList: p => (subItems('', p).filter(i => i.role)).map(i => i.baseId),
	status: p => Boolean((subItems('', p).filter(i => i.role)).length),
};

export default Risk;
