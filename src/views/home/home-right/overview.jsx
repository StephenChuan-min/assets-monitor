import React from 'react';
import { navigate } from '@reach/router';
import { Icon, Spin } from '@/common';
import './style.scss';

class HomeOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleNavigate = (val) => {
		const toNavigate = new Map([
			['auction', () => { navigate('/monitor?process=1'); }],
			['land', () => { navigate('/monitor/land'); }],
			['intangible', () => { navigate('/monitor/intangible'); }],
			['subrogation', () => { navigate('/monitor/subrogation'); }],
			['stock', () => { navigate('/monitor/pledge'); }],
			['chattel', () => { navigate('/monitor/mortgage'); }],
			['finance', () => { navigate('/monitor/financial'); }],
			['bidding', () => { navigate('/monitor/tender'); }],
			['cheliangxinxi', () => { navigate('/monitor/car'); }],
			['budongchandengji', () => { navigate('/monitor/realEstate'); }],
			['bankruptcy', () => { navigate('/risk/bankruptcy'); }],
			['broken', () => { navigate('/risk/broken'); }],
			['lawsuit', () => { navigate('/risk/info'); }],
			['operation-risk', () => { navigate('/risk/operation'); }],
			['limit', () => { navigate('/risk/limitHight'); }],
			['unlock', () => { navigate('/monitor/seizedUnblock'); }],
			['construct-circle', () => { navigate('/monitor/construct'); }],
			['default', () => { console.log('未匹配'); }],
		]);
		const excavateMap = toNavigate.get(val.icon) || toNavigate.get('default');
		if (val) { excavateMap.call(this); }
	};

	isArray = arr => arr && Array.isArray(arr) && arr.length > 0;

	render() {
		const { assetArray, riskArray, loading } = this.props;
		const isAssetArray = this.isArray(assetArray);
		const isRiskArray = this.isArray(riskArray);
		const newAssetArray = assetArray && assetArray.filter(i => i.status);
		const newRiskArray = riskArray && riskArray.filter(i => i.status);
		return (
			<div className="home-overview-container">
				<div className="home-overview-container-header">
					监控入口
					<div className="home-overview-container-header-detail">
						<span className="home-overview-container-header-detail-text" onClick={() => navigate('/info/monitor/excavate')}>详情</span>
						<Icon type="icon-icon_arrow" className="home-overview-container-header-detail-icon" />
					</div>
				</div>
				<Spin visible={loading} minHeight={600}>
					{
						loading ? null :	(
							<div className="home-overview-container-content">
								{newAssetArray && newAssetArray.length > 0 && (
								<div>
									<div className="home-overview-container-content-title">
										<div className="content-title-item" />
										<div className="content-title-name">资产挖掘</div>
									</div>
									<div className="home-overview-container-content-asset">
										{
											isAssetArray && newAssetArray.map((item) => {
												const { color } = item;
												return (
													<div
														className="home-overview-container-content-asset-item"
														onClick={() => this.handleNavigate(item)}
													>
														<Icon type={`icon-${item.icon}`} className="home-overview-container-content-asset-item-icon" style={{ color }} />
														<div className="home-overview-container-content-asset-item-text">
															{item.name}
														</div>
														{
															item.count > 0 ? (
																<span className="home-overview-container-content-asset-item-dot">
																	{item.count > 99 ? '99+' : item.count}
																</span>
															) : null
														}
													</div>
												);
											})
										}
									</div>
								</div>
								)}
								{
									newRiskArray && newRiskArray.length > 0 && (
										<div>
											<div className="home-overview-container-content-title">
												<div className="content-title-item" />
												<div className="content-title-name">风险参考</div>
											</div>
											<div className="home-overview-container-content-risk">
												{
													isRiskArray && newRiskArray.map((item) => {
														const { color } = item;
														return (
															<div
																className="home-overview-container-content-asset-item"
																onClick={() => this.handleNavigate(item)}
															>
																<Icon
																	type={`icon-${item.icon}`}
																	className="home-overview-container-content-asset-item-icon"
																	style={{ color }}
																/>
																<div className="home-overview-container-content-asset-item-text">
																	{item.name}
																</div>
																{
																	item.count > 0 ? (
																		<span className="home-overview-container-content-asset-item-dot">
																			{item.count > 99 ? '99+' : item.count}
																		</span>
																	) : null
																}
															</div>
														);
													})
												}
											</div>
										</div>
									)
								}
							</div>
						)
					}
				</Spin>
			</div>
		);
	}
}

export default HomeOverview;
