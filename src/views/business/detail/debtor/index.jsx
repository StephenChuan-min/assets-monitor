import React from 'react';
import { Affix, Modal, Icon } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { getHrefQuery } from '@/utils';
/* utils */
import { requestAll } from '@/utils/promise';
import { getQueryByName } from '@/utils';
/* api collection */
import assets from '@/utils/api/professional-work/debtor/assets';
import risk from '@/utils/api/professional-work/debtor/risk';
import { debtorInfo } from '@/utils/api/professional-work';
/* components */
import {
	Tabs, BreadCrumb, Spin, Button,
} from '@/common';
import DebtorInfo from '@/views/business/detail/table-version/debtor-info';
import Overview from '@/views/business/detail/table-version/overview';
import Assets from '@/views/business/detail/table-version/assets';
import Risk from '@/views/business/detail/table-version/risk';
import Info from '@/views/business/detail/table-version/info';
import '../style.scss';

const constantNumber = 99999999; // 默认值
/* 基本选项 */
const source = () => [
	{
		id: 101,
		name: '概览',
		number: 0,
		showNumber: false,
		path: '/*',
		status: true,
		component: Overview,
		source: [],
	},
	{
		id: 102,
		name: '资产',
		showNumber: false,
		path: '/business/debtor/detail/info/102/*',
		config: Assets.config,
		status: Assets.config.status,
		component: Assets,
		apiData: assets,
		source: [],
	},
	{
		id: 103,
		name: '风险',
		showNumber: false,
		path: '/business/debtor/detail/info/103/*',
		config: Risk.config,
		status: Risk.config.status,
		component: Risk,
		apiData: risk,
		source: [],
	},
	{
		id: 105,
		name: '工商基本信息',
		path: '/business/debtor/detail/info/105/*',
		status: true,
		component: Info,
	},
].filter(i => i.status);

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '债务人详情';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		const defaultSourceType = window.location.hash.match(/\/detail\/info\/(\d{3})\/?/);
		super(props);
		const tabConfig = source();
		const typeStr = tabConfig.map(i => i.id).join('/') || '';
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType && typeStr.match(defaultSourceType[1])[0] ? Number(defaultSourceType[1]) : 101,
			affixStatus: false,
			loading: true,
			infoSource: {},
			// loading
			assetLoading: true,
			riskLoading: true,
			errorModalVisible: false,
			apiError: false,
			timeLeft: 3,
		};
		this.portrait = 'debtor_enterprise';
		// 画像类型：business 业务，debtor_enterprise 企业债务人 debtor_personal 个人债务人
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		const obligorId = getQueryByName(window.location.href, 'id') || constantNumber;
		debtorInfo({ obligorId }).then((res) => {
			if (res.code === 200) {
				const { obligorName } = res.data;
				if (obligorName && obligorName.length > 4) {
					this.portrait = 'debtor_enterprise';
				} else {
					this.portrait = 'debtor_personal';
					if (tabConfig && tabConfig.length === 4) {
						tabConfig.pop();
					}
				}
				this.setState({
					infoSource: res.data,
					loading: false,
				});
				/* 请求子项数据 */
				tabConfig.forEach((item, index) => this.toGetSubItemsTotal(item, index, this.portrait));
			} else {
				// message.error('网络请求失败！');
				let time = 3;
				const timer = setInterval(() => {
					time -= 1;
					this.setState({
						timeLeft: time,
					});
					if (time === 0) {
						this.closeErrorModal();
						clearInterval(timer);
					}
				}, 1000);
				this.openErrorModal();
				this.setState({
					loading: false,
					apiError: true,
					assetLoading: false,
					riskLoading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
				assetLoading: false,
				riskLoading: false,
			});
		});
	}

	// componentDidUpdate(prevState) {
	// 	const { sourceType } = this.state;
	// 	if (prevState.sourceType !== sourceType) {
	// 		const { href } = window.location;
	// 		console.log(href.indexOf('info') !== -1);
	// 		if (href.indexOf('info') !== -1) {
	// 			const type = href.match(/info\/(\S*)\?/)[1];
	// 			console.log(type);
	// 			if (type) {
	// 				this.onSourceType(type);
	// 			}
	// 		}
	// 	}
	// }

	// 获取各类子项总数
	toGetSubItemsTotal = ((item, index, portrait) => {
		const obligorId = getQueryByName(window.location.href, 'id') || constantNumber;
		if (item.config) {
			const { apiData, config: { idList: _idList, status: _status } } = item;
			const { tabConfig } = this.state;
			const apiArray = [];
			const idList = _idList(portrait);
			const status = _status(portrait);

			if (idList.length > 0 && status) {
				Object.keys(apiData).forEach((k) => {
					idList.forEach((i) => {
						const tempRep = new RegExp(`^${i}`);
						if (tempRep.test(k)) {
							apiArray.push({
								api: apiData[k].count({ obligorId }),
								info: { id: apiData[k].id },
							});
						}
					});
				});
			}
			// console.log('apiArray === ', apiArray);
			if (apiArray.length) {
				requestAll(apiArray).then((res) => {
					let count = 0;
					res.forEach(i => count += i.data);
					tabConfig[index].number = count;
					tabConfig[index].showNumber = true;
					tabConfig[index].source = res;
					const l = {};
					if (item.id === 102) l.assetLoading = false;
					if (item.id === 103) l.riskLoading = false;
					this.setState({ tabConfig, ...l });
					// console.log(tabConfig);
				});
			}
		}
	});

	handleDownload = () => {
		console.log('handleDownload');
	};

	handleAddChild = (val, id) => {
		this.childDomId = id;
		this.setState({
			childDom: val,
		});
	};

	onChangeAffix = (val) => {
		this.setState({ affixStatus: val });
	};

	openErrorModal = () => {
		this.setState({
			errorModalVisible: true,
		});
	};

	closeErrorModal = () => {
		window.close();
		this.setState({
			errorModalVisible: false,
		});
	};

	/* tab change */
	onSourceType = (val, item) => {
		const { sourceType, childDom } = this.state;
		const { href } = window.location;
		const eleStr = getHrefQuery('ele');
		let params = href.match(/\?/) ? href.slice(href.match(/\?/).index) : '';
		if (item) {
			params = eleStr ? params.replace(eleStr, '') : params;
		}
		if (val !== sourceType) {
			this.setState({
				sourceType: val,
				childDom: this.childDomId !== val ? '' : childDom,
			}, () => {
				navigate(`/business/debtor/detail/info/${val}${params}`);
			});
		}
	};

	render() {
		const {
			tabConfig, childDom, sourceType, infoSource, affixStatus, timeLeft, errorModalVisible, loading, assetLoading, riskLoading, apiError,
		} = this.state;
		const { baseRule } = this.props;
		const classList = ['info-detail', 'info-wrapper'];
		if (affixStatus) classList.push('enterprise-intro-affix');
		const params = {
			apiError,
			baseRule,
			loading,
			assetLoading,
			riskLoading,
			infoSource,
			toPushChild: this.handleAddChild, // tab 追加子项
			portrait: this.portrait,
		};
		return (
			<div className="yc-information-detail-wrapper">
				<div className="info-navigation">
					<BreadCrumb
						list={[
							{ id: -1, name: '业务管理', link: '/business/view/' },
							{ id: 1, name: '债务人', link: '/business/view/debtor' },
							{ id: 2, name: '债务人详情', link: '' },
						]}
						// suffix={(
						// 	<div className="intro-download" style={{ zIndex: 1 }}>
						// 		<Download
						// 			style={{ width: 84 }}
						// 			condition={{
						// 				obligorId: getQueryByName(window.location.href, 'id'),
						// 			}}
						// 			icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
						// 			api={exportListDebtor}
						// 			normal
						// 			text="下载"
						// 		/>
						// 	</div>
						// )}
					/>
				</div>
				<div className="mark-line" />
				<Affix onChange={this.onChangeAffix}>
					<Spin visible={loading}>
						<div className={classList.join(' ')} id="enterprise-intro-affix">
							<DebtorInfo data={infoSource} affixStatus={affixStatus} portrait={this.portrait} />
							{/* <div className="debtor-visualize-overview-line" /> */}
							<Tabs.Simple
								borderBottom
								onChange={this.onSourceType}
								source={tabConfig}
								hashUrl
								symbol="none"
								defaultCurrent={sourceType}
							/>
							{childDom}
						</div>
					</Spin>
				</Affix>
				<div className="info-content">
					<Router>
						{/* eslint-disable-next-line react/jsx-pascal-case */}
						{ !loading && tabConfig.map(I => <I.component count={I.source} path={I.path} {...params} />) }
					</Router>
				</div>
				{errorModalVisible && 	(
					<Modal
						visible={errorModalVisible}
						onCancel={this.handleCancel}
						footer={false}
						width={500}
						closable={false}
					>
						<div className="yc-confirm-body" style={{ padding: '10px 0' }}>
							<div className="yc-confirm-header">
								<Icon style={{ fontSize: 28, color: '#f66c5b', marginRight: 8 }} type="cross-circle" />
								<span className="yc-confirm-title">债务人不存在，可能关联的业务已经被删除</span>
							</div>
							<div className="yc-confirm-content" style={{ marginTop: 10 }}>
								<span style={{ color: '#1C80E1', fontSize: 14, marginRight: 5 }}>{timeLeft}</span>
								秒后自动关闭页面
							</div>
							<div className="yc-confirm-btn">
								<Button onClick={this.closeErrorModal} className="yc-confirm-footer-btn" type="primary">知道了</Button>
							</div>
						</div>
					</Modal>
				)}
			</div>
		);
	}
}
