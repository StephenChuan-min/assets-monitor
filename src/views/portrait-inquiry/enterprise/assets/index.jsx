import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import { roleState } from '@/utils/rule';
import Auction from './auction';
import Subrogation from './subrogation';
import Land from './land';
import Intangible from './intangible';
import Stock from './stock';
import Chattel from './chattel';
import Bidding from './bidding';
import Financial from './financial';
import UnBlock from './unblock';
import RealEstate from './real-estate';
import Car from './car';
import Construct from './construct';

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
		id: 10100,
		name: '资产拍卖',
		total: data ? toGetTotal('1010', data) : 0,
		info: data ? data.filter(i => /1010/.test(i.id)) : '',
		tagName: 'e-assets-auction',
		component: Auction,
	},
	{
		id: 10300,
		name: '土地信息',
		total: data ? toGetTotal('1030', data) : 0,
		info: data ? data.filter(i => /1030/.test(i.id)) : '',
		tagName: 'e-assets-land',
		component: Land,
	},
	{
		id: 10600,
		name: '无形资产',
		total: data ? toGetTotal('1060', data) : 0,
		info: data ? data.filter(i => /1060/.test(i.id)) : '',
		tagName: 'e-assets-intangible',
		component: Intangible,
	},
	{
		id: 10200,
		name: '代位权',
		total: data ? toGetTotal('1020', data) : 0,
		info: data ? data.filter(i => /1020/.test(i.id)) : '',
		tagName: 'e-assets-subrogation',
		component: Subrogation,
	},
	{
		id: 10400,
		name: '股权质押',
		total: data ? toGetTotal('1040', data) : 0,
		info: data ? data.filter(i => /1040/.test(i.id)) : '',
		tagName: 'e-assets-stock',
		component: Stock,
	},
	{
		id: 10500,
		name: '动产抵押',
		total: data ? toGetTotal('1050', data) : 0,
		info: data ? data.filter(i => /1050/.test(i.id)) : '',
		tagName: 'e-assets-chattel',
		component: Chattel,
	},
	{
		id: 10900,
		name: '查/解封资产',
		total: data ? toGetTotal('1090', data) : 0,
		info: data ? data.filter(i => /1090/.test(i.id)) : '',
		tagName: 'e-assets-unblock',
		component: UnBlock,
	},
	{
		id: 10800,
		name: '金融资产',
		total: data ? toGetTotal('1080', data) : 0,
		info: data ? data.filter(i => /1080/.test(i.id)) : '',
		tagName: 'e-assets-financial',
		component: Financial,
	},
	{
		id: 10700,
		name: '招投标',
		total: data ? toGetTotal('1070', data) : 0,
		info: data ? data.filter(i => /1070/.test(i.id)) : '',
		tagName: 'e-assets-bidding',
		component: Bidding,
	},
	{
		id: 11200,
		name: '在建工程',
		total: data ? toGetTotal('1120', data) : 0,
		info: data ? data.filter(i => /1120/.test(i.id)) : '',
		role: roleState('zcwj', ['zjgcjsdw', 'zjgczbdw', 'zjgcsgdw']),
		disabled: true,
		tagName: 'e-assets-construct',
		component: Construct,
	},
	{
		id: 11000,
		name: '不动产登记',
		total: data ? toGetTotal('1100', data) : 0,
		info: data ? data.filter(i => /1100/.test(i.id)) : '',
		role: roleState('zcwj', 'zcwjbdcdj'),
		disabled: true,
		tagName: 'e-assets-match',
		component: RealEstate,
	},
	{
		id: 11100,
		name: '车辆信息',
		total: data ? toGetTotal('1110', data) : 0,
		info: data ? data.filter(i => /1110/.test(i.id)) : '',
		role: roleState('zcwj', 'zcwjclxx'),
		disabled: true,
		tagName: 'e-assets-carInfo',
		component: Car,
	},
]);

export default class Assets extends React.Component {
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

	// 手动跳转指定高度
	handleScroll = (eleID) => {
		const dom = document.getElementById(eleID);
		// const _height = document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop + 250);
		}
	};

	toGetSubItems = () => {
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
		const { count, name } = this.props;
		const aryResult = (subItems(count).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				<Spin visible={loading} minHeight={350}>
					{
						aryResult ? config.map(Item => (
							// eslint-disable-next-line react/jsx-pascal-case
							Item.total ? <Item.component id={Item.tagName} data={Item.info} name={name || ''} /> : ''))
							: <NoContent />
					}
				</Spin>
				{/* { */}
				{/*	loading ? <Spin visible minHeight={350} /> : ( */}
				{/*		<div> */}
				{/*			{ */}
				{/*				aryResult ? config.map(Item => ( */}
				{/*					Item.total ? <Item.component id={Item.tagName} data={Item.info} /> : '')) */}
				{/*					: <NoContent /> */}
				{/*			} */}
				{/*		</div> */}
				{/*	) */}
				{/* } */}
			</div>
		);
	}
}
