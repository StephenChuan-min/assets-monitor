import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import { roleState } from '@/utils/rule';
import { getHrefQuery } from '@/utils';
import Auction from './auction';
import Subrogation from './subrogation';
import Land from './land';
import Intangible from './intangible';
import Stock from './stock';
import Chattel from './chattel';
import Bidding from './bidding';
import Financial from './financial';
import Unblock from './unblock';
import RealEstate from './real-estate';
import Car from './car';
import Construct from './construct';

const toGetTotal = (field, data) => {
	let count = 0;
	const reg = new RegExp(field);
	data.forEach((item) => {
		if (reg.test(item.id)) {
			const isObj = item.data instanceof Object;
			const isNum = typeof item.data === 'number';
			if (isObj) {
				count += item.field ? item.data[item.field] : item.data;
			} else if (isNum) {
				count += item.data;
			} else {
				count = 0;
			}
		}
	});
	return count;
};

const subItems = (data, portrait) => {
	let status = 'normal';
	if (portrait === 'business') status = false;
	if (portrait === 'debtor_enterprise') status = false;
	if (portrait === 'debtor_personal') status = 'normal';
	return [
		{
			id: 10100,
			baseId: 1010,
			name: '资产拍卖',
			total: data ? toGetTotal('1010', data) : 0,
			info: data ? data.filter(i => /1010/.test(i.id)) : '',
			tagName: 'e-assets-auction',
			component: Auction,
			isStatus: 'normal',
			role: roleState('zcwj', 'zcwjzcpm'),
		},
		{
			id: 10300,
			baseId: 1030,
			name: '土地信息',
			total: data ? toGetTotal('1030', data) : 0,
			info: data ? data.filter(i => /1030/.test(i.id)) : '',
			tagName: 'e-assets-land',
			component: Land,
			isStatus: 'only',
			role: roleState('zcwj', 'zcwjtdsj'),
		},
		{
			id: 10400,
			baseId: 1040,
			name: '无形资产',
			total: data ? toGetTotal('1040', data) : 0,
			info: data ? data.filter(i => /1040/.test(i.id)) : '',
			disabled: true,
			tagName: 'e-assets-intangible',
			component: Intangible,
			isStatus: 'only',
			role: roleState('zcwj', 'zcwjwxzc'),
		},
		{
			id: 10200,
			baseId: 1020,
			name: '代位权',
			total: data ? toGetTotal('1020', data) : 0,
			info: data ? data.filter(i => /1020/.test(i.id)) : '',
			tagName: 'e-assets-subrogation',
			component: Subrogation,
			isStatus: 'normal',
			role: roleState('zcwj', 'zcwjdwq'),
		},
		{
			id: 10500,
			baseId: 1050,
			name: '股权质押',
			total: data ? toGetTotal('1050', data) : 0,
			info: data ? data.filter(i => /1050/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjgqzy'),
			tagName: 'e-assets-stock',
			component: Stock,
			isStatus: 'only',
		},
		{
			id: 10600,
			baseId: 1060,
			name: '动产抵押',
			total: data ? toGetTotal('1060', data) : 0,
			info: data ? data.filter(i => /1060/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjdcdy'),
			tagName: 'e-assets-chattel',
			component: Chattel,
			isStatus: 'only',
		},
		{
			id: 10900,
			baseId: 1090,
			name: '查/解封资产',
			total: data ? toGetTotal('1090', data) : 0,
			info: data ? data.filter(i => /1090/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjcjfzc'),
			disabled: true,
			tagName: 'e-assets-unblock',
			component: Unblock,
			isStatus: 'only',
		},
		{
			id: 10800,
			baseId: 1080,
			name: '金融资产',
			total: data ? toGetTotal('1080', data) : 0,
			info: data ? data.filter(i => /1080/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjjrzj'),
			disabled: true,
			tagName: 'e-assets-financial',
			component: Financial,
			isStatus: 'only',
		},
		{
			id: 10700,
			baseId: 1070,
			name: '招投标',
			total: data ? toGetTotal('1070', data) : 0,
			info: data ? data.filter(i => /1070/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjzbzb'),
			disabled: true,
			tagName: 'e-assets-bidding',
			component: Bidding,
			isStatus: 'only',
		},
		{
			id: 11200,
			baseId: 1120,
			name: '在建工程',
			total: data ? toGetTotal('1120', data) : 0,
			info: data ? data.filter(i => /1120/.test(i.id)) : '',
			role: roleState('zcwj', ['zjgcjsdw', 'zjgczbdw', 'zjgcsgdw']),
			disabled: true,
			tagName: 'e-assets-construct',
			component: Construct,
			isStatus: 'only',
		},
		{
			id: 11000,
			baseId: 1100,
			name: '不动产登记',
			total: data ? toGetTotal('^1100', data) : 0,
			info: data ? data.filter(i => /1100/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjbdcdj'),
			disabled: true,
			tagName: 'e-assets-real-estate',
			component: RealEstate,
			isStatus: 'only',
		},
		{
			id: 11100,
			baseId: 1110,
			name: '车辆信息',
			total: data ? toGetTotal('1110', data) : 0,
			info: data ? data.filter(i => /1110/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjclxx'),
			disabled: true,
			tagName: 'e-assets-bidding',
			component: Car,
			isStatus: 'only',
		},
	].filter(i => (status ? i.isStatus === status : i.isStatus));
};

class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: subItems(props.count, props.portrait),
		};
	}

	componentDidMount() {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems(), 102);
		setTimeout(() => {
			const ele = getHrefQuery('ele');
			if (ele) this.handleScroll(ele);
		}, 400);
	}

	componentWillReceiveProps(nextProps) {
		const { count } = this.props;
		if (nextProps.count.length) {
			if (JSON.stringify(nextProps.count) !== JSON.stringify(count)) {
				this.setState({
					config: subItems(nextProps.count, nextProps.portrait),
				}, () => {
					const { toPushChild } = this.props;
					toPushChild(this.toGetSubItems(), 102);
				});
			}
		}
	}

	// 手动定位高度
	handleScroll = (eleID) => {
		const dom = document.getElementById(eleID);
		const { portrait } = this.props;
		const _height = portrait === 'business' ? 190 : 155;
		if (dom) {
			// window.scrollTo(0, document.getElementById(eleID).offsetTop - 168);
			window.scrollTo(0, document.getElementById(eleID).offsetTop - _height);
		}
	};

	// 获取config配置项
	toGetSubItems = () => {
		const { config } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{
					config.map(item => (
						item.role && (
						<Button className="intro-btn-items" disabled={item.total === 0} onClick={() => this.handleScroll(item.tagName)}>
							{`${item.name}${item.total ? ` ${item.total}` : ' 0'}`}
						</Button>
						)
					))
				}
			</div>
		);
	};


	render() {
		const { config } = this.state;
		const { count, portrait, assetLoading } = this.props;
		const aryResult = (subItems(count, portrait).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets info-assets-padding">
				{ assetLoading ? <Spin minHeight={350} />
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
Assets.config = {
	items: p => subItems('', p),
	idList: p => (subItems('', p).filter(i => i.role)).map(i => i.baseId),
	status: p => Boolean((subItems('', p).filter(i => i.role)).length),
};
export default Assets;
