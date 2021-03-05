import React from 'react';
import { Affix, message } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import {
	Tabs, Download, Icon as IconType, BreadCrumb,
} from '@/common';
import Dishonest from '@/assets/img/icon/icon_shixin.png';
import assets from '@/utils/api/portrait-inquiry/personal/assets';
import risk from '@/utils/api/portrait-inquiry/personal/risk';
import { getInfo, getDishonestStatus } from '@/utils/api/portrait-inquiry/personal/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';
import { requestAll } from '@/utils/promise';
import { exportListPer } from '@/utils/api/portrait-inquiry';
import './style.scss';
import { noneRemind } from '@/views/portrait-inquiry/inquiry-check';
import QueryView from '../common/queryView';
import OverView from './overview';
import Assets from './assets';
import Risk from './risk';

const source = () => [
	{
		id: 201,
		name: '概览',
		field: 'totalCount',
	},
	{
		id: 202,
		name: '资产',
		number: 0,
		showNumber: false,
	},
	{
		id: 203,
		name: '风险',
		number: 0,
		showNumber: false,
	},
];

/* 企业概要 */
const PersonalInfo = (props) => {
	const {
		urlInfo, visible, isDishonestStatus,
	} = props;
	return (
		<div className="personal-info">
			<div className="intro-icon">
				<span>{visible === false && urlInfo.obligorName ? urlInfo.obligorName.slice(0, 1) : ''}</span>
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold intro-title-name">
						{visible === false && urlInfo.obligorName ? urlInfo.obligorName : '-'}
						{isDishonestStatus ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
					</span>
				</div>
				<div className="intro-base-info">
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">证件号：</span>
						<span className="yc-public-title">{visible === false && urlInfo.obligorNumber ? urlInfo.obligorNumber : '-'}</span>
					</li>
				</div>
			</div>

			<div className="intro-download">
				<Download
					style={{ width: 84 }}
					condition={{
						obligorName: getQueryByName(window.location.href, 'name'),
						obligorNumber: getQueryByName(window.location.href, 'num'),
					}}
					icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
					api={exportListPer}
					normal
					text="下载"
					type="inquiry"
				/>
			</div>
		</div>
	);
};

/* 企业概要-简单版 */
const PersonalInfoSimple = (props) => {
	const {
		urlInfo, visible, isDishonestStatus,
	} = props;
	return (
		<div className="personal-info">
			<div className="intro-title">
				<span className="yc-public-title-large-bold intro-title-name">
					{visible === false && urlInfo.obligorName ? urlInfo.obligorName : '-'}
					{isDishonestStatus ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
				</span>
			</div>
			<div className="intro-download">
				<Download
					style={{ width: 84 }}
					condition={{
						obligorName: getQueryByName(window.location.href, 'name'),
						obligorNumber: getQueryByName(window.location.href, 'num'),
					}}
					icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
					api={exportListPer}
					normal
					text="下载"
					type="inquiry"
				/>
			</div>
		</div>
	);
};
export default class Personal extends React.Component {
	constructor(props) {
		document.title = '个人详情-画像查询';
		super(props);
		const _hash = window.location.hash;
		const defaultSourceType = window.location.hash.match(/\/personal\/(\d{3})\/?/);
		this.state = {
			loading: true,
			infoSource: '',
			tabConfig: source(),
			countSource: {
				assets: [],
				risk: [],
			},
			childDom: '',
			affixStatus: false,
			sourceType: defaultSourceType ? Number(defaultSourceType[1]) : 201,
			overViewLoading: true,
			isDishonestStatus: false,
		};
		this.info = {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		};
		this.hash = JSON.stringify(_hash);
		this.dd = getQueryByName(window.location.href, 'dd');
	}

	componentWillMount() {
		// console.log('componentWillMount');
		this.toAffirmGet();
	}

	componentWillReceiveProps() {
		const { hash } = window.location;
		const { sourceType, childDom } = this.state;
		const defaultSourceType = Number((window.location.hash.match(/\/personal\/(\d{3})\/?/) || [])[1]) || 201;
		const _dd = getQueryByName(window.location.href, 'dd');
		// console.log('dd ===', _dd, this.dd);
		// console.log('info ===', this.toGetInfo(), this.info);
		// console.log('hash ===', hash, this.hash);
		if (sourceType !== defaultSourceType || JSON.stringify(this.info) !== JSON.stringify(this.toGetInfo()) || hash !== this.hash) {
			this.info = this.toGetInfo();
			this.setState({
				sourceType: defaultSourceType,
				childDom: defaultSourceType === 201 ? '' : childDom,
			}, () => {
				if (hash !== this.hash) {
					if (this.dd !== _dd) {
						this.setState({
							overViewLoading: true,
						}, () => {
							this.toAffirmGet();
						});
					}
					this.hash = hash;
					// this.toAffirmGet();
				}
			});
		}
	}

	componentWillUnmount() {
		global.PORTRAIT_INQUIRY_AFFIRM = true;
	}

	// 查询画像的限制的查询次数
	toAffirmGet = () => {
		noneRemind(global.PORTRAIT_INQUIRY_AFFIRM).then(() => {
			this.getData();
		}).catch(() => {
			message.warning('请求异常，请刷新页面');
		});
	};

	// 获取债务人信息
	getData = () => {
		const params = this.info;
		// console.log('getInfo request =====', params);
		getInfo(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					infoSource: res.data,
					loading: false,
					overViewLoading: false,
				}, () => {
					this.toTouchCount();
					getDishonestStatus(params).then((result) => {
						if (result.code === 200) {
							this.setState({
								isDishonestStatus: result.data,
							});
						}
					}).catch();
				});
			} else {
				this.setState({ loading: false, overViewLoading: false });
			}
		}).catch(() => {
			this.setState({ loading: false, overViewLoading: false });
		});
	};

	// 从地址栏获取债务人基本信息
	toGetInfo = () => ({
		obligorName: getQueryByName(window.location.href, 'name'),
		obligorNumber: getQueryByName(window.location.href, 'num'),
	});

	// 遍历获取各项统计
	toTouchCount = () => {
		const params = this.info;
		[{ d: assets, f: 'assets', i: 1 }, { d: risk, f: 'risk', i: 2 }]
			.forEach(item => this.toGetChildCount(params, item.d, item.f, item.i));
	};

	/* 获取子项统计 */
	toGetChildCount=(params, apiData, field, index) => {
		const { tabConfig: con, countSource: cou } = this.state;
		const reqList = Object.keys(apiData).map(item => ({
			api: apiData[item].count(params, apiData[item].id),
			info: { id: apiData[item].id },
		}));
		requestAll(reqList).then((res) => {
			let count = 0;
			res.forEach(item => count += item.field ? item.data[item.field] : item.data);
			con[index].number = count;
			con[index].showNumber = true;
			cou[field] = res;
			this.setState({
				tabConfig: con,
				countSource: cou,
			});
		});
	};

	// 子组件的统计和传给当前组件
	handleAddChild=(val) => {
		this.setState({
			childDom: val,
		});
	};

	// 切换数据统计
	onSourceType = (val) => {
		const { sourceType } = this.state;
		const { href } = window.location;
		const params = href.match(/\?/) ? href.slice(href.match(/\?/).index) : '';
		if (sourceType !== val) {
			this.setState({
				sourceType: val,
				childDom: '',
			}, () => {
				navigate(`/inquiry/personal/${val}${params}`);
			});
		}
	};

	// 页面滑动，启动固钉
	onChangeAffix=(val) => {
		this.setState({ affixStatus: val });
	};

	render() {
		const {
			tabConfig, sourceType, childDom, affixStatus, countSource, loading, infoSource, overViewLoading, isDishonestStatus,
		} = this.state;
		return (
			<div className="yc-inquiry-personal">
				<BreadCrumb
					className="yc-bread-crumb-box"
					list={[
						{ id: 1, name: '信息搜索', link: '/info/search' },
						{ id: 2, name: '画像查询', link: '/info/search/several' },
					]}
				/>
				<div className="queryView-box">
					<QueryView type={2} />
				</div>
				<div className="inquiry-personal-content">
					<Spin visible={loading}>
						<Affix onChange={this.onChangeAffix}>

							<div className={`personal-intro${childDom ? '' : ' personal-intro-child'}${affixStatus ? ' personal-intro-affix' : ''}`} id="personal-intro">
								{
									affixStatus
										? <PersonalInfoSimple download={this.handleDownload} info={infoSource} isDishonestStatus={isDishonestStatus} urlInfo={this.info} visible={loading} />
										: <PersonalInfo download={this.handleDownload} info={infoSource} isDishonestStatus={isDishonestStatus} urlInfo={this.info} visible={loading} />
								}
								<Tabs.Simple
									onChange={this.onSourceType}
									source={tabConfig}
									symbol="none"
									defaultCurrent={sourceType}
								/>
								{childDom}
							</div>
						</Affix>

					</Spin>
					<Router>
						<OverView toPushChild={this.handleAddChild} path="/*" viewLoading={overViewLoading} />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/personal/202/*" count={countSource.assets} obligorName={this.info.obligorName} />
						<Risk toPushChild={this.handleAddChild} path="/inquiry/personal/203/*" count={countSource.risk} obligorName={this.info.obligorName} />
					</Router>
				</div>
			</div>
		);
	}
}
