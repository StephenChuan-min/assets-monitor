import React from 'react';
import { getCount } from '@/utils/api/professional-work/info';
import { Button, Spin } from '@/common';
import { parseQuery } from '@/utils';
import NoContent from '@/common/noContent';
import BusinessInfo from './components/businessInfo';
import KeyPersonnel from './components/keyPersonnel';
import ShareholderInfo from './components/shareholderInfo';
import EquityPenetration from './components/equityPenetration';
import Branch from './components/branch';
import OutboundInvestment from './components/outboundInvestment';
import BusinessCircles from './components/businessCircles';

const subItems = (data) => {
	const result = [
		{
			id: 1,
			name: '基本信息',
			disabled: data && data.BusinessInfo <= 0,
			tagName: 'e-assets-businessInfo',
			component: BusinessInfo,
		},
		{
			id: 2,
			name: '主要人员',
			total: data && data.mainPerson,
			disabled: data && data.mainPerson <= 0,
			tagName: 'e-assets-keyPersonnel',
			component: KeyPersonnel,
		},
		{
			id: 3,
			name: '股东信息',
			total: data && data.stockholder,
			disabled: data && data.stockholder <= 0,
			tagName: 'e-assets-shareholderInfo',
			component: ShareholderInfo,
		},
		{
			id: 4,
			name: '股权穿透图',
			disabled: data && data.EquityPenetration <= 0,
			tagName: 'e-assets-equityPenetration',
			component: EquityPenetration,
		},
		{
			id: 5,
			name: '分支机构',
			total: data && data.branch,
			disabled: data && data.branch <= 0,
			tagName: 'e-assets-branch',
			component: Branch,
		},
		{
			id: 6,
			name: '对外投资',
			total: data && data.investment,
			disabled: data && data.investment <= 0,
			tagName: 'e-assets-outboundInvestment',
			component: OutboundInvestment,
		},
		{
			id: 7,
			name: '工商变更',
			total: data && data.change,
			disabled: data && data.change <= 0,
			tagName: 'e-assets-businessCircles',
			component: BusinessCircles,
		},
	];
	if (global.GLOBAL_MEIE_BROWSER) {
		result.splice(3, 1);
	}
	return result;
};
export default class Info extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			tabConfig: subItems(),
			loading: true,
			isEmptyObject: false,
		};
	}

	componentWillMount() {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems(), 105);
	}

	componentDidMount() {
		const { toPushChild } = this.props;
		const { hash } = window.location;
		const urlValue = parseQuery(hash);

		const params = {
			id: urlValue.id || -999999,
		};
		getCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: res.data,
					loading: false,
					tabConfig: subItems(res.data),
				}, () => {
					toPushChild(this.toGetSubItems(), 105);
				});
			} else {
				const data = {
					BusinessInfo: 0,
					branch: 0,
					change: 0,
					investment: 0,
					EquityPenetration: 0,
					mainPerson: 0,
					stockholder: 0,
				};
				this.setState({
					data,
					isEmptyObject: true,
					loading: false,
					tabConfig: subItems(data),
				}, () => {
					toPushChild(this.toGetSubItems(), 105);
				});
			}
		});
	}

	handleScroll=(eleID) => {
		const dom = document.getElementById(eleID);
		const _height = 155 || document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop - _height);
		}
	};

	toGetSubItems = () => {
		const { tabConfig } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{
					tabConfig.map(item => (
						<Button className="intro-btn-items" disabled={item.disabled} onClick={() => this.handleScroll(item.tagName)}>
							{
								item.id === 1 || item.id === 4 ? `${item.name}` : (`${item.name}${item.total ? ` ${item.total}` : ' 0'}`)
							}
						</Button>
					))
				}
			</div>
		);
	};


	render() {
		const { data, loading, isEmptyObject } = this.state;
		const { infoSource } = this.props;
		return (
			<div className="inquiry-assets info-assets-padding">
				{
					loading ? <Spin visible /> : (
						data && subItems(data).map(Item => (
							data && Item.disabled === false ? <Item.component name={infoSource && infoSource.obligorName} id={Item.tagName} /> : ''))
					)
				}
				{isEmptyObject && !loading && <NoContent style={{ paddingBottom: 60 }} font="暂无数据" />}
			</div>
		);
	}
}
