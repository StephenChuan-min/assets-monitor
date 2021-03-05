import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import { postMarkRead } from 'api/monitor-info/mortgage'; // 动产抵押已读
import PublicPerImg from '@/assets/img/business/icon_zwrpeople.png';
import { readStatusResult } from '@/utils/api/monitor-info/finance'; // 股权质押
import Api from '@/utils/api/monitor-info/public'; // 土地信息已读
import { Mining, Dump } from '@/utils/api/monitor-info/intangible'; // 无形资产已读
import { readStatus as bankruptcyReadStatus } from '@/utils/api/monitor-info/bankruptcy';
import { readStatus } from '@/utils/api/monitor-info/broken-record'; // 失信记录已读
import { Court, Trial, Judgment } from '@/utils/api/monitor-info/subrogation'; // 代位权
import { Court as lawsuitCourt, Trial as lawsuitTrial, Judgment as lawsuitJudgment } from '@/utils/api/risk-monitor/lawsuit'; // 涉诉信息
import { markReadStatus } from '@/utils/api/monitor-info/assets'; // 资产拍卖已读
import seizedUnblock from '@/utils/api/monitor-info/seizedUnbock'; // 查解封资产
import {
	ConstructApi, WinbidApi, UnderwayApi,
} from '@/utils/api/assets/construct'; // 在建工程
import { postMarkRead as realEstate } from '@/utils/api/monitor-info/real-estate'; // 不动产登记
import { postMarkRead as carApi } from '@/utils/api/monitor-info/car'; // 不动产登记
import limitConsumption from '@/utils/api/monitor-info/limit-consumption'; // 限制高消费

import {
	Abnormal, Illegal, Violation, Punishment,
} from '@/utils/api/risk-monitor/operation-risk'; // 经营异常
import { timeStandard } from '@/utils';
import { Ellipsis, Icon } from '@/common';
import borrow from '@/assets/img/home/icon-borrow.png';
import EmissionModal from './dynamic-modal/emission-modal';
import AssetAuctionModal from './dynamic-modal/assets-auction-modal';
import LandResultModal from './dynamic-modal/land-result-modal';
import LandTransferModal from './dynamic-modal/land-transfer-modal';
import LandMortgageModal from './dynamic-modal/land-mortgage-modal';
import MiningModal from './dynamic-modal/mining-modal';
import ChattelMortgageModal from './dynamic-modal/chattel-mortgage-modal';
import EquityPledgeModal from './dynamic-modal/equity-pledge-modal';
import SubrogationTrialModal from './dynamic-modal/subrogation-trial-modal';
import SubrogationJudgmentModal from './dynamic-modal/subrogation-judgment-modal';
import SubrogationCourtModal from './dynamic-modal/subrogation-court-modal';
import BankruptcyModal from './dynamic-modal/bankruptcy-modal';
import BrokenModal from './dynamic-modal/broken-record-modal';
import AbnormalModal from './dynamic-modal/abnormal-modal';
import IllegalModal from './dynamic-modal/illegal-modal';
import TaxModal from './dynamic-modal/tax-modal';
import PunishmentModal from './dynamic-modal/punishment-modal';
import LawsuitTrialModal from './dynamic-modal/lawsuit-trial-modal';
import LawsuitCourtModal from './dynamic-modal/lawsuit-court-modal';
import LawsuitJudgmentModal from './dynamic-modal/lawsuit-judgment-modal';
import UnblockModal from './dynamic-modal/unblock-modal';
import LimitHeightModal from './dynamic-modal/limit-height-modal';
import RealEstateModal from './dynamic-modal/real-estate-modal';
import CarModal from './dynamic-modal/car-modal';
import OnBuildConstruct from './dynamic-modal/onBuildConstruct';
import OnBuildWinbid from './dynamic-modal/onBuildWinbid';
import OnBuildUnderway from './dynamic-modal/onBuildUnderway';
import './style.scss';

let scrollInterval = '';
class DetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
			assetAuctionModalVisible: false,
			LandResultModalVisible: false,
			landTransferModalVisible: false,
			landMortgageModalVisible: false,
			miningModalVisible: false,
			emissionModalVisible: false,
			chattelMortgageModalVisible: false,
			equityPledgeModalVisible: false,
			subrogationTrialModalVisible: false,
			subrogationJudgmentModalVisible: false,
			subrogationCourtModalVisible: false,
			bankruptcyModalVisible: false,
			brokenModalVisible: false,
			abnormalModalVisible: false,
			illegalModalVisible: false,
			taxModalVisible: false,
			punishmentModalVisible: false,
			lawsuitTrialModalVisible: false,
			lawsuitCourtModalVisible: false,
			lawsuitJudgmentModalVisible: false,
			unBlockModalVisible: false,
			limitHeightModalVisible: false,
			realEstateModalVisible: false,
			carModalVisible: false,
			onBuildConstructVisible: false,
			onBuildWinbidVisible: false,
			onBuildUnderwayVisible: false,
			data: props.data || [],
			dataSource: [],
			animate: false,
			listMarginTop: 0,
			openMessage: false,
		};
		this.content = '';
	}

	componentDidMount() {
		const { data, getUnReadNum } = this.props;
		const hasUnRead = data && data.filter(i => i.isRead === false).length;
		getUnReadNum(hasUnRead);
		setTimeout(() => {
			this.startScrollUp();
		}, 500);
	}

	componentWillReceiveProps(nextProps) {
		const { data, status } = this.props;
		// 更新的时候不会重新滚动
		// setTimeout(() => {
		// 	this.startScrollUp();
		// }, 500);
		if (data !== nextProps.data) {
			this.setState(() => ({
				data: nextProps.data,
			}));
		}
		const box = document.getElementById('scrollList');
		if (status) {
			clearInterval(scrollInterval);
			box.scrollTop = 0;
			setTimeout(() => {
				this.startScrollUp();
			}, 250);
		}
	}

	// 表格发生变化
	onRefresh = (objValue, type) => {
		const { data } = this.state;
		const { index } = objValue;
		const _dataSource = [...data];
		_dataSource[index][type] = objValue[type];
		this.setState({
			data: _dataSource,
		});
	};

	// 已读操作
	isReadList = (item, index, api, type) => {
		// console.log('item ==', item);
		const { getUnReadNum } = this.props;
		const { data } = this.state;
		let value;
		const hasUnRead = data && data.filter(i => i.isRead === false).length;
		if (hasUnRead <= 0) { value = 0; }
		if (hasUnRead > 0) { value = hasUnRead - 1; }
		const { id, isRead } = item;
		const idList = [];
		idList.push(id);
		if (!isRead) {
			api(type === 'idList' ? { idList } : { id }).then((res) => {
				if (res.code === 200) {
					this.setState(() => ({
						openModal: true,
					}));
					getUnReadNum(value);
					clearInterval(scrollInterval);
					this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
				} else {
					console.error(res.data.message);
				}
			});
		}
	};

	// 手动点击重要信息列表项
	handleClick = (item, index) => {
		// console.log('item === ', item);
		this.setState(() => ({
			openModal: true,
		}));
		clearInterval(scrollInterval);
		const openModalMap = new Map([
			[101, () => {
				this.isReadList(item, index, markReadStatus);
				this.setState(() => ({ assetAuctionModalVisible: true, dataSource: item.detailList }));
			}],
			[201, () => {
				this.isReadList(item, index, Api.readStatusResult);
				this.setState(() => ({ LandResultModalVisible: true, dataSource: item.detailList }));
			}],
			[202, () => {
				this.isReadList(item, index, Api.readStatusTransfer);
				this.setState(() => ({ landTransferModalVisible: true, dataSource: item.detailList }));
			}],
			[203, () => {
				this.isReadList(item, index, Api.readStatusMortgage);
				this.setState(() => ({ landMortgageModalVisible: true, dataSource: item.detailList }));
			}],
			[301, () => {
				this.isReadList(item, index, Dump.read, 'idList');
				this.setState(() => ({ emissionModalVisible: true, dataSource: item.detailList }));
			}],
			[302, () => {
				this.isReadList(item, index, Mining.read, 'idList');
				this.setState(() => ({ miningModalVisible: true, dataSource: item.detailList }));
			}],
			[401, () => {
				this.isReadList(item, index, postMarkRead);
				this.setState(() => ({ chattelMortgageModalVisible: true, dataSource: item.detailList }));
			}],
			[501, () => {
				this.isReadList(item, index, readStatusResult);
				this.setState(() => ({ equityPledgeModalVisible: true, dataSource: item.detailList }));
			}],
			[601, () => {
				this.isReadList(item, index, Trial.read, 'idList');
				this.setState(() => ({ subrogationTrialModalVisible: true, dataSource: item.detailList }));
			}],
			[602, () => {
				this.isReadList(item, index, Court.read, 'idList');
				this.setState(() => ({ subrogationCourtModalVisible: true, dataSource: item.detailList }));
			}],
			[603, () => {
				this.isReadList(item, index, Judgment.read, 'idList');
				this.setState(() => ({ subrogationJudgmentModalVisible: true, dataSource: item.detailList }));
			}],
			[701, () => {
				this.isReadList(item, index, bankruptcyReadStatus, 'idList');
				this.setState(() => ({ bankruptcyModalVisible: true, dataSource: item.detailList }));
			}],
			[801, () => {
				this.isReadList(item, index, readStatus, 'idList');
				this.setState(() => ({ brokenModalVisible: true, dataSource: item.detailList }));
			}],
			[802, () => {
				this.isReadList(item, index, readStatus, 'idList');
				this.setState(() => ({ brokenModalVisible: true, dataSource: item.detailList }));
			}],
			[901, () => {
				this.isReadList(item, index, lawsuitTrial.read, 'idList');
				this.setState(() => ({ lawsuitTrialModalVisible: true, dataSource: item.detailList }));
			}],
			[902, () => {
				this.isReadList(item, index, lawsuitCourt.read, 'idList');
				this.setState(() => ({ lawsuitCourtModalVisible: true, dataSource: item.detailList }));
			}],
			[903, () => {
				this.isReadList(item, index, lawsuitJudgment.read, 'idList');
				this.setState(() => ({ lawsuitJudgmentModalVisible: true, dataSource: item.detailList }));
			}],
			[1001, () => {
				this.isReadList(item, index, Abnormal.read, 'idList');
				this.setState(() => ({ abnormalModalVisible: true, dataSource: item.detailList }));
			}],

			[1002, () => {
				this.isReadList(item, index, Illegal.read, 'idList');
				this.setState(() => ({ illegalModalVisible: true, dataSource: item.detailList }));
			}],
			[1003, () => {
				this.isReadList(item, index, Violation.read, 'idList');
				this.setState(() => ({ taxModalVisible: true, dataSource: item.detailList }));
			}],
			[1004, () => {
				this.isReadList(item, index, Punishment.read);
				this.setState(() => ({ punishmentModalVisible: true, dataSource: item.detailList }));
			}],
			[1301, () => {
				this.isReadList(item, index, limitConsumption.read, 'idList');
				this.setState(() => ({ limitHeightModalVisible: true, dataSource: item.detailList }));
			}],
			[1302, () => {
				this.isReadList(item, index, limitConsumption.read, 'idList');
				this.setState(() => ({ limitHeightModalVisible: true, dataSource: item.detailList }));
			}],
			[1401, () => {
				this.isReadList(item, index, seizedUnblock.read, 'idList');
				this.setState(() => ({ unBlockModalVisible: true, dataSource: item.detailList }));
			}],
			[1501, () => {
				this.isReadList(item, index, carApi, 'idList');
				this.setState(() => ({ carModalVisible: true, dataSource: item.detailList }));
			}],
			[1601, () => {
				this.isReadList(item, index, realEstate, 'idList');
				this.setState(() => ({ realEstateModalVisible: true, dataSource: item.detailList }));
			}],
			[1701, () => {
				this.isReadList(item, index, ConstructApi.read, 'idList');
				this.setState(() => ({ onBuildConstructVisible: true, dataSource: item.detailList }));
			}],
			[1702, () => {
				this.isReadList(item, index, WinbidApi.read, 'idList');
				this.setState(() => ({ onBuildWinbidVisible: true, dataSource: item.detailList }));
			}],
			[1703, () => {
				this.isReadList(item, index, UnderwayApi.read, 'idList');
				this.setState(() => ({ onBuildUnderwayVisible: true, dataSource: item.detailList }));
			}],
			['default', ['资产拍卖', 1]],
		]);
		const openModalMapType = openModalMap.get(item.detailType) || openModalMap.get('default');
		openModalMapType.call(this);
	};

	// 关闭弹窗
	onCancel = () => {
		setTimeout(() => {
			this.startScrollUp();
		}, 500);
		this.setState({
			openModal: false,
			emissionModalVisible: false,
			LandResultModalVisible: false,
			landTransferModalVisible: false,
			assetAuctionModalVisible: false,
			landMortgageModalVisible: false,
			miningModalVisible: false,
			chattelMortgageModalVisible: false,
			equityPledgeModalVisible: false,
			subrogationTrialModalVisible: false,
			subrogationJudgmentModalVisible: false,
			subrogationCourtModalVisible: false,
			bankruptcyModalVisible: false,
			brokenModalVisible: false,
			abnormalModalVisible: false,
			illegalModalVisible: false,
			taxModalVisible: false,
			punishmentModalVisible: false,
			lawsuitTrialModalVisible: false,
			lawsuitCourtModalVisible: false,
			lawsuitJudgmentModalVisible: false,
			unBlockModalVisible: false,
			limitHeightModalVisible: false,
			realEstateModalVisible: false,
			carModalVisible: false,
			onBuildConstructVisible: false,
			onBuildWinbidVisible: false,
			onBuildUnderwayVisible: false,
		});
	};

	handleNavigate = () => {
		navigate('/info/monitor');
	};

	// 开始滚动
	rollStart = () => {
		const { data } = this.state;
		const wrap = this.content;
		if (wrap && data && data.length > 4) {
			const box = document.getElementById('scrollList');
			const box1 = document.getElementById('detail-container_box1');
			// const box2 = document.getElementById('detail-container_box2');
			wrap.onmouseover = () => {
				clearInterval(scrollInterval);
			};
			if (box.scrollTop + 335 >= box1.scrollHeight) {
				this.setState(() => ({
					openMessage: true,
				}));
				clearInterval(scrollInterval);
				setTimeout(() => {
					this.setState(() => ({
						openMessage: false,
					}));
					box.scrollTop = 0;
					this.startScrollUp();
				}, 1500);
			} else {
				box.scrollTop += 1;
			}
		}
	};

	endScroll= () => {
		clearInterval(scrollInterval);
	};

	startScrollUp= () => {
		const isIe = document.documentMode === 8 || document.documentMode === 9 || document.documentMode === 10 || document.documentMode === 11;
		if (!isIe) {
			this.endScroll();
			this.rollStart();
			scrollInterval = setInterval(this.rollStart, 40); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
		}
	};

	handleMouseLeave = () => {
		const { openModal } = this.state;
		if (!openModal) {
			this.startScrollUp();
		}
	};

	render() {
		const {
			dataSource, data, emissionModalVisible, assetAuctionModalVisible, LandResultModalVisible, landTransferModalVisible, landMortgageModalVisible,
			miningModalVisible, chattelMortgageModalVisible, equityPledgeModalVisible, bankruptcyModalVisible,
			subrogationTrialModalVisible, subrogationJudgmentModalVisible, subrogationCourtModalVisible, brokenModalVisible, abnormalModalVisible, animate,
			illegalModalVisible, taxModalVisible, punishmentModalVisible, lawsuitTrialModalVisible, lawsuitCourtModalVisible, unBlockModalVisible,
			lawsuitJudgmentModalVisible, listMarginTop, openMessage, limitHeightModalVisible, realEstateModalVisible, carModalVisible, onBuildConstructVisible, onBuildWinbidVisible, onBuildUnderwayVisible,
		} = this.state;
		// console.log('detail item data === ', data);
		const isIe = document.documentMode === 8 || document.documentMode === 9 || document.documentMode === 10 || document.documentMode === 11;
		const isData = Array.isArray(data) && data.length > 0;
		const { detailTypeAll } = this.props;
		return (
			<div
				className="detail-container"
				onBlur={this.handleBlur}
				onMouseLeave={this.handleMouseLeave}
			>
				{
					isData ? (
						<div
							className="detail-container-box"
							ref={(c) => { this.content = c; }}
							onBlur={this.handleBlur}
							onMouseOut={this.handleMouseOut}
							id="scrollList"
							style={isIe ? { overflow: 'auto' } : {}}
						>
							<ul
								id="detail-container_box1"
								className={animate ? 'animate' : ''}
								style={{ marginTop: listMarginTop }}
							>
								{
									data.map((item, index) => (
										<li className="detail-container-content" onClick={() => this.handleClick(item, index)}>
											{item.isRead === false ? <div className="detail-container-content-icon" /> : null}
											<div className="detail-container-content-left" style={item.logoUrl ? { border: '1px solid #ccc' } : {}}>
												{
													item.logoUrl ? <img src={item.logoUrl} alt="" /> : (
														item.obligorName && item.obligorName.length > 4 ? (
															<div className="detail-container-content-left-icon">
																{item.obligorName.slice(0, 4)}
															</div>
														) : <img style={{ borderRadius: '20px' }} src={PublicPerImg} alt="" />
													)
												}
											</div>
											<div className="detail-container-content-middle" style={item.isRead === false ? { fontWeight: 700 } : {}}>
												<div className="detail-container-content-middle-header">
													<div className="detail-container-content-middle-header-name">
														<Ellipsis
															auto
															content={item.obligorName || '-'}
															tooltip
															font={14}
															width={370}
														/>
														{item.mainObligor ? <img src={borrow} alt="" /> : null}
													</div>
												</div>
												<div className="detail-container-content-middle-item">
													<div
														style={{ width: item.detailType === 1301 ? 335 : 350 }}
														className="detail-container-content-middle-item-detail"
													>
														{item.description || '-'}
													</div>
												</div>
											</div>
											<div
												className="detail-container-content-right"
											>
												<div className="detail-container-content-right-time">
													{item.timestamp ? timeStandard(item.timestamp) : '-'}
												</div>
												<div
													style={{ width: item.detailType === 1301 ? 130 : 100 }}
													className={`detail-container-content-right-tag 
													${(item.detailType === 701 || item.detailType === 801 || item.detailType === 1302) ? 'red' : 'yellow'} 
													${(item.detailType === 802 || item.detailType === 1301 || item.detailType === 1501) ? 'green' : ''}
													${(item.detailType === 1601) ? 'blue' : ''}`
													}
												>
													<Icon type={`icon-${detailTypeAll[item.detailType] ? detailTypeAll[item.detailType].icon : '-'}`} className="detail-container-content-right-tag-icon" style={{ fontWeight: 400 }} />
													{detailTypeAll[item.detailType] ? detailTypeAll[item.detailType].tag : '-'}
												</div>
											</div>
										</li>
									))
								}
								{openMessage ? <p className={`detail-openMessage ${openMessage ? 'opacityAnimation' : ''}`}>即将开始重新滚动</p> : null }
							</ul>
							<ul id="detail-container_box2" />
						</div>
					) : (
						<div className="detail-container-noData">
							<div className="detail-container-noData-img" />
							<span className="detail-container-noData-text">近30天暂无重要信息提醒</span>
							<div>
								<Button onClick={this.handleNavigate} type="primary" style={{ width: 180, height: 34, marginTop: '40px' }}>查看全部匹配信息概览</Button>
							</div>
						</div>
					)
				}
				{/** 资产拍卖Modal */}
				{assetAuctionModalVisible && (
					<AssetAuctionModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						assetAuctionModalVisible={assetAuctionModalVisible}
					/>
				)}
				{/** 土地出让结果Modal */}
				{LandResultModalVisible && (
					<LandResultModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						LandResultModalVisible={LandResultModalVisible}
					/>
				)}
				{/** 土地转让Modal */}
				{landTransferModalVisible && (
					<LandTransferModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						landTransferModalVisible={landTransferModalVisible}
					/>
				)}
				{/** 土地抵押Modal */}
				{landMortgageModalVisible && (
					<LandMortgageModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						landMortgageModalVisible={landMortgageModalVisible}
					/>
				)}
				{/** 采矿权发证Modal */}
				{miningModalVisible && (
					<MiningModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						miningModalVisible={miningModalVisible}
					/>
				)}
				{/** 排污权Modal */}
				{emissionModalVisible && (
					<EmissionModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						emissionModalVisible={emissionModalVisible}
					/>
				)}
				{/** 商标专利Modal */}
				{/* {trademarkModalVisible && ( */}
				{/*	<TrademarkModal */}
				{/*		onCancel={this.onCancel} */}
				{/*		onOk={this.onOk} */}
				{/*		dataSource={dataSource} */}
				{/*		trademarkModalVisible={trademarkModalVisible} */}
				{/*	/> */}
				{/* )} */}
				{/** 建筑建造Modal */}
				{/* {constructionModalVisible && ( */}
				{/*	<Construction */}
				{/*		onCancel={this.onCancel} */}
				{/*		onOk={this.onOk} */}
				{/*		dataSource={dataSource} */}
				{/*		constructionModalVisible={constructionModalVisible} */}
				{/*	/> */}
				{/* )} */}

				{/** 动产抵押Modal */}
				{chattelMortgageModalVisible && (
					<ChattelMortgageModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						chattelMortgageModalVisible={chattelMortgageModalVisible}
					/>
				)}
				{/** 股权质押Modal */}
				{equityPledgeModalVisible && (
					<EquityPledgeModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						equityPledgeModalVisible={equityPledgeModalVisible}
					/>
				)}
				{/** 代位权(立案)Modal */}
				{subrogationTrialModalVisible && (
					<SubrogationTrialModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						subrogationTrialModalVisible={subrogationTrialModalVisible}
					/>
				)}
				{/** 代位权(开庭)Modal */}
				{subrogationCourtModalVisible && (
					<SubrogationCourtModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						subrogationCourtModalVisible={subrogationCourtModalVisible}
					/>
				)}

				{/** 代位权(文书)Modal */}
				{subrogationJudgmentModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						subrogationJudgmentModalVisible={subrogationJudgmentModalVisible}
					/>
				)}
				{/** 失信（列入）Modal */}
				{brokenModalVisible && (
					<BrokenModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						brokenModalVisible={brokenModalVisible}
					/>
				)}
				{/** 失信（移除）Modal */}
				{brokenModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						brokenModalVisible={brokenModalVisible}
					/>
				)}
				{/** 破产重组Modal */}
				{bankruptcyModalVisible && (
					<BankruptcyModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						bankruptcyModalVisible={bankruptcyModalVisible}
					/>
				)}
				{/** 经营异常Modal */}
				{abnormalModalVisible && (
					<AbnormalModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						abnormalModalVisible={abnormalModalVisible}
					/>
				)}
				{/** 严重违法Modal */}
				{illegalModalVisible && (
					<IllegalModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						illegalModalVisible={illegalModalVisible}
					/>
				)}
				{/* /!** 税收违法Modal *!/ */}
				{taxModalVisible && (
					<TaxModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						taxModalVisible={taxModalVisible}
					/>
				)}
				{/* /!** 行政处罚Modal *!/ */}
				{punishmentModalVisible && (
					<PunishmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						punishmentModalVisible={punishmentModalVisible}
					/>
				)}
				{/** 涉诉信息(立案)Modal */}
				{lawsuitTrialModalVisible && (
					<LawsuitTrialModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						lawsuitTrialModalVisible={lawsuitTrialModalVisible}
					/>
				)}
				{/** 涉诉信息(开庭)Modal */}
				{lawsuitCourtModalVisible && (
					<LawsuitCourtModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						lawsuitCourtModalVisible={lawsuitCourtModalVisible}
					/>
				)}

				{/** 涉诉信息(文书)Modal */}
				{lawsuitJudgmentModalVisible && (
					<LawsuitJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						lawsuitJudgmentModalVisible={lawsuitJudgmentModalVisible}
					/>
				)}

				{/** 查解封资产Modal */}
				{unBlockModalVisible && (
					<UnblockModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						unBlockModalVisible={unBlockModalVisible}
					/>
				)}

				{/** 限制高消费Modal */}
				{limitHeightModalVisible && (
					<LimitHeightModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						limitHeightModalVisible={limitHeightModalVisible}
					/>
				)}
				{/** 车辆信息 */}
				{carModalVisible && (
					<CarModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						carModalVisible={carModalVisible}
					/>
				)}
				{/** 不动产Modal */}
				{realEstateModalVisible && (
					<RealEstateModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						realEstateModalVisible={realEstateModalVisible}
					/>
				)}
				{/* 在建工程-建设单位 */}
				{onBuildConstructVisible && (
					<OnBuildConstruct
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						onBuildConstructVisible={onBuildConstructVisible}
					/>
				)}
				{/* 在建工程-招标单位 */}
				{onBuildWinbidVisible && (
					<OnBuildWinbid
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						onBuildWinbidVisible={onBuildWinbidVisible}
					/>
				)}
				{/* 在建工程-施工单位 */}
				{onBuildUnderwayVisible && (
					<OnBuildUnderway
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						onBuildUnderwayVisible={onBuildUnderwayVisible}
					/>
				)}
			</div>
		);
	}
}

export default DetailItem;
