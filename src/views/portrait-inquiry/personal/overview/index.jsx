import React from 'react';
import { Spin } from '@/common';
import NoContent from '@/common/noContent';
import AssetAuction from './components/assetAuction';
import Subrogation from './components/subrogation';
import Involved from './components/involved';
import LostLetter from './components/lostLetter';
import TaxViolation from './components/taxVolation';
import './style.scss';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		document.title = '画像查询-个人';
		this.state = {
			AssetAuctionCount: 0,
			SubrogationCount: 0,
			AssetAuctionLoading: true,
			RiskSituation: true,
			InvolvedCount: 0,
			LostLetterCount: 0,
			TaxViolationCount: 0,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				AssetAuctionLoading: false,
				RiskSituation: false,
			});
		}, 10000);
	}

	// 获取资产监控可模块数量
	getAssetProfile = (AssetProfileCountValue, type, loading) => {
		switch (type) {
		case 'AssetAuction':
			return (
				this.setState({
					AssetAuctionCount: AssetProfileCountValue,
					AssetAuctionLoading: loading,
				})
			);
		case 'Subrogation':
			return (
				this.setState({
					SubrogationCount: AssetProfileCountValue,
					AssetAuctionLoading: loading,
				})
			);
		case 'Involved':
			return (
				this.setState({
					InvolvedCount: AssetProfileCountValue,
				})
			);
		case 'LostLetter':
			return (
				this.setState({
					LostLetterCount: AssetProfileCountValue,
					RiskSituation: loading,
				})
			);
		case 'TaxViolation':
			return (
				this.setState({
					TaxViolationCount: AssetProfileCountValue,
				})
			);
		default: return '-';
		}
	};

	render() {
		const {
			AssetAuctionCount, SubrogationCount, AssetAuctionLoading, InvolvedCount, LostLetterCount, TaxViolationCount, RiskSituation,
		} = this.state;
		const { viewLoading } = this.props;
		return (
			<div className="inquiry-overview">
				<div className="mark-line" />
				<div className="overview-left">
					<div className="yc-overview-title">资产概况</div>
					{
						viewLoading ? <Spin visible /> : [
							<div className="yc-overview-container">
								{/* 相关资产拍卖 */}
								<AssetAuction getAssetProfile={this.getAssetProfile} />
								{/* 代位权信息 (裁判文书) */}
								<Subrogation getAssetProfile={this.getAssetProfile} />
							</div>,
							AssetAuctionCount === 0 && SubrogationCount === 0
							&& (
								<Spin visible={AssetAuctionLoading}>
									{AssetAuctionLoading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到资产信息" />}
								</Spin>
							),
						]
					}

				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">风险情况</div>
					{
						viewLoading ? <Spin visible /> : [
							<div className="yc-overview-container">
								{/*  涉诉信息 (涉诉文书) */}
								<Involved getAssetProfile={this.getAssetProfile} />
								{/*  失信记录 */}
								<LostLetter getAssetProfile={this.getAssetProfile} />
								{/* 税收违法 */}
								<TaxViolation getAssetProfile={this.getAssetProfile} />
							</div>,
							InvolvedCount === 0 && LostLetterCount === 0 && TaxViolationCount === 0
							&& (
								<Spin visible={RiskSituation}>
									{RiskSituation ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到风险信息" />}
								</Spin>
							),
						]
					}
				</div>
			</div>
		);
	}
}
