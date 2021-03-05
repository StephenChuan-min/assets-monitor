import React from 'react';
import { Affix, message } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { requestAll } from '@/utils/promise';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import risk from '@/utils/api/portrait-inquiry/enterprise/risk';
import {
	Tabs, Spin, Download, Icon as IconType, BreadCrumb,
} from '@/common';
import {
	getQueryByName, timeStandard, toEmpty, reviseNum,
} from '@/utils';
import { companyInfo, dishonestStatus, exportListEnp } from '@/utils/api/portrait-inquiry';
import Dishonest from '@/assets/img/icon/icon_shixin.png';
import { noneRemind } from '@/views/portrait-inquiry/inquiry-check';
import Overview from './overview';
import Assets from './assets';
import Info from './info';
import Risk from './risk';
import QueryView from '../common/queryView';
import './style.scss';

/* 基本选项 */
const source = () => [
	{
		id: 101,
		name: '概览',
		field: 'totalCount',
	},
	{
		id: 102,
		name: '资产',
		number: 0,
		showNumber: false,
	},
	{
		id: 103,
		name: '风险',
		number: 0,
		showNumber: false,
		field: 'followingCount',
	},
	{
		id: 105,
		name: '工商基本信息',
		field: 'ignoreCount',
	},
];

/* 获取注册状态样式 */
const getRegStatusClass = (val) => {
	if (val) {
		if (val.match(/(存续|在业)/)) return ' regStatus-green';
		if (val.match(/(迁出|其他)/)) return ' regStatus-orange';
		if (val.match(/(撤销|吊销|清算|停业|注销)/)) return ' regStatus-red';
	}
	return '';
};

/* 企业概要 */
const EnterpriseInfo = (props) => {
	const {
		data: {
			name, regStatus, legalPersonName, regCapital, formerNames, establishTime, logoUrl,
		}, isDishonest, affixStatus,
	} = props;
	const _formerNames = (formerNames || []).join('、');
	const style = {
		minWidth: 80,
		display: 'inline-block',
	};
	return (
		<div className="enterprise-info">
			{
				affixStatus ? (
					<div className="intro-title">
						<span className="yc-public-title-large-bold intro-title-name">
							{name}
							{isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
						</span>
						{ regStatus
							? <span className={`inquiry-list-regStatus${getRegStatusClass(regStatus)}`} style={isDishonest ? { marginTop: 2, marginLeft: 58 } : { marginTop: 2 }}>{regStatus}</span> : ''
					}
					</div>
				) : (
					<React.Fragment>
						<div className="intro-icon">
							{
							logoUrl ? <div className="intro-icon-img-w"><img className="intro-icon-img" src={logoUrl} alt="" /></div>
								: <span>{name && name.slice(0, 4)}</span>
						}
						</div>
						<div className="intro-content">
							<div className="intro-title">
								<span className="yc-public-title-large-bold intro-title-name">
									{name}
									{isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
								</span>
								{
								regStatus ? <span className={`inquiry-list-regStatus${getRegStatusClass(regStatus)}`} style={isDishonest ? { marginTop: 2, marginLeft: 58 } : { marginTop: 2 }}>{regStatus}</span> : null
							}
							</div>
							<div className="intro-base-info">
								<li className="intro-info-list intro-list-border">
									<span className="yc-public-remark">法定代表人：</span>
									<span className="yc-public-title" style={style}>{legalPersonName || '-'}</span>
								</li>
								<li className="intro-info-list intro-list-border">
									<span className="yc-public-remark">注册资本：</span>
									<span className="yc-public-title" style={style}>{toEmpty(regCapital) ? reviseNum(regCapital) : '-'}</span>
								</li>
								<li className="intro-info-list">
									<span className="yc-public-remark">成立日期：</span>
									<span className="yc-public-title">{timeStandard(establishTime)}</span>
								</li>
							</div>
							<div className="intro-used">
								<li className="intro-info-list">
									{
									toEmpty(_formerNames) ? [
										<span className="yc-public-remark">曾用名：</span>,
										<span className="yc-public-title">{_formerNames}</span>,
									] : null
								}
								</li>
							</div>
						</div>
					</React.Fragment>
				)
			}
			<div className="intro-download">
				<Download
					style={{ width: 84 }}
					condition={{
						companyId: getQueryByName(window.location.href, 'id'),
					}}
					icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
					api={exportListEnp}
					normal
					text="下载"
					type="inquiry"
				/>
			</div>
		</div>
	);
};

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '企业详情-画像查询';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		const defaultSourceType = window.location.hash.match(/\/enterprise\/(\d{3})\/?/);

		super(props);
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType ? Number(defaultSourceType[1]) : 101,
			affixStatus: false,
			loading: true,
			infoSource: {},
			isDishonest: false,
			countSource: {
				assets: [],
				lawsuits: [],
				manage: [],
				risk: [],
			},
		};
	}

	componentWillMount() {
		const companyId = getQueryByName(window.location.href, 'id');
		noneRemind(global.PORTRAIT_INQUIRY_AFFIRM).then(() => {
			companyInfo({ companyId }).then((res) => {
				if (res.code === 200) {
					this.setState({
						infoSource: res.data,
						loading: false,
					});
					// debugger;
					setTimeout(() => {
						[{ d: assets, f: 'assets', i: 1 }, { d: risk, f: 'risk', i: 2 }]
							.forEach(item => this.toGetChildCount(companyId, item.d, item.f, item.i));
					}, 1000);
				} else {
					message.error('网络请求失败！');
					this.setState({
						loading: false,
					});
				}
			}).catch(() => {
				this.setState({
					loading: false,
				});
			});
			dishonestStatus({ companyId }).then((res) => {
				if (res.code === 200) {
					this.setState({
						isDishonest: res.data,
					});
				}
			});
		});
	}

	componentWillUnmount() {
		global.PORTRAIT_INQUIRY_AFFIRM = true;
	}

	/* 获取子项统计 */
	toGetChildCount = (companyId, apiData, field, index) => {
		const { tabConfig: con, countSource: cou } = this.state;
		const reqList = Object.keys(apiData).map(item => ({
			api: apiData[item].count({ companyId }, apiData[item].id),
			info: { id: apiData[item].id },
		}));
		requestAll(reqList).then((res) => {
			let count = 0;
			res.forEach(item => count += item.field ? item.data[item.field] || 0 : item.data || 0);
			con[index].number = count;
			con[index].showNumber = true;
			cou[field] = res;
			this.setState({
				tabConfig: con,
				countSource: cou,
			});
		});
	};

	handleDownload=() => {
	};

	handleAddChild=(val) => {
		this.setState({
			childDom: val,
		});
	};

	// 监听固钉是否触发
	onChangeAffix = (val) => {
		// console.log('affixStatus === ', val);
		this.setState({ affixStatus: val });
	};

	onSourceType=(val) => {
		const { sourceType } = this.state;
		const { href } = window.location;
		const params = href.match(/\?/) ? href.slice(href.match(/\?/).index) : '';
		if (val !== sourceType) {
			this.setState({
				sourceType: val,
				childDom: '',
			}, () => {
				navigate(`/inquiry/enterprise/${val}${params}`);
			});
		}
	};

	render() {
		const {
			tabConfig, childDom, sourceType, affixStatus, loading, infoSource, countSource, isDishonest,
		} = this.state;

		return (
			<div className="yc-inquiry-enterprise">
				<BreadCrumb
					className="yc-bread-crumb-box"
					list={[
						{ id: 1, name: '信息搜索', link: '/info/search' },
						{ id: 2, name: '画像查询', link: '/info/search/several' },
					]}
				/>
				<div className="queryView-box">
					<QueryView type={1} />
				</div>
				<div className="inquiry-enterprise-content">
					{/* 省略固钉的变化 onChange={this.onChangeAffix} */}
					<Affix onChange={this.onChangeAffix}>
						<Spin visible={loading}>
							<div className={`enterprise-intro${childDom ? '' : ' enterprise-intro-child'}${affixStatus ? ' enterprise-intro-affix' : ''}`} id="enterprise-intro">
								<EnterpriseInfo affixStatus={affixStatus} download={this.handleDownload} data={infoSource} isDishonest={isDishonest} />
								<Tabs.Simple
									borderBottom={affixStatus}
									onChange={this.onSourceType}
									source={tabConfig}
									symbol="none"
									defaultCurrent={sourceType}
								/>
								{childDom}
							</div>
						</Spin>
					</Affix>
					<Router>
						<Overview toPushChild={this.handleAddChild} path="/*" viewLoading={loading} />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/enterprise/102/*" count={countSource.assets} name={infoSource.name} />
						<Risk toPushChild={this.handleAddChild} path="/inquiry/enterprise/103/*" count={countSource.risk} name={infoSource.name} />
						{/* <Lawsuits toPushChild={this.handleAddChild} path="/inquiry/enterprise/103/*" count={countSource.lawsuits} /> */}
						{/* <Manage toPushChild={this.handleAddChild} path="/inquiry/enterprise/104/*" count={countSource.manage} /> */}
						<Info toPushChild={this.handleAddChild} path="/inquiry/enterprise/105/*" detailObj={infoSource} viewLoading={loading} />
					</Router>
				</div>
			</div>
		);
	}
}
