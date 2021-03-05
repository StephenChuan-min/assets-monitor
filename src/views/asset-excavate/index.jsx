import React from 'react';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { Button, Icon, BreadCrumb } from '@/common';
// import { unReadCount } from '@/utils/api/monitor-info';
import { toGetRuleSource } from '@/utils';
// 主要内容模块
import Assets from './assets-auction'; // 资产拍卖
import Subrogation from './subrogation'; // 代位权
import LandData from './land-data'; // 土地信息
import Tender from './tender-bid'; // 招标中标
import Financial from './financial-assets'; // 金融资产
import Mortgage from './chattel-mortgage'; // 动产抵押
import Intangible from './intangible-assets'; // 无形资产
import EquityPledge from './equity-pledge'; // 股权质押
import SeizedUnblock from './seized-unblock'; // 查解封资产
import Car from './car'; // 车辆信息
import RealEstate from './real-estate'; // 不动产登记
import ConstructProject from './construct-project';
// import Public from './public-proclamation'; // 公示公告
// import Attention from '../my-attention'; // 我的收藏
// import VersionUpdateModal from '../_others/layout/versionUpdateModal';
import ClearProcess from './assets-auction/clearProcess';
// 资产清收流程
const noPage = () => <div>暂未开发</div>;

// 获取展示配置
const toGetRuth = (moduleID) => {
	const childID = 'YC02';
	const result = toGetRuleSource(global.ruleSource, moduleID, childID);
	return result.child.map((item) => {
		const _item = item;
		let components = '';
		if (item.id === `${childID}01`) {
			components = Assets;
		} else if (item.id === `${childID}02`) {
			components = Subrogation;
		} else if (item.id === `${childID}03`) {
			components = LandData;
		} else if (item.id === `${childID}04`) {
			components = Tender;
		} else if (item.id === `${childID}05`) {
			components = Financial;
		} else if (item.id === `${childID}06`) {
			components = Mortgage;
		} else if (item.id === `${childID}07`) {
			components = Intangible;
		} else if (item.id === `${childID}08`) {
			components = EquityPledge;
		} else if (item.id === `${childID}09`) {
		  components = SeizedUnblock;
		} else if (item.id === `${childID}10`) {
		  components = RealEstate;
		} else if (item.id === `${childID}11`) {
		  components = Car;
		} else if (item.id === `${childID}12`) {
			components = ConstructProject;
		} else {
			components = noPage;
		}
		_item.paramUrl = item.paramUrl || '';
		_item.components = components;
		return _item;
	});
};

// 主界面
class MonitorMain extends React.Component {
	constructor(props) {
		super(props);
		const _source = toGetRuth('YC10');
		this.state = {
			source: _source,
		};
		this.sourceType = '';
	}

	componentWillMount() {
		console.log(window.location.hash);
	}

	componentDidMount() {
		// this.onUnReadCount();
		// this.setUnReadCount = setInterval(() => {
		// 	this.onUnReadCount();
		// }, 30 * 1000);
	}

	componentWillUnmount() {
		// if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	/* 更新未读数据统计 */
	toRefreshCount = (typeID, count) => {
		const { source } = this.state;
		const _source = source.map((item) => {
			const _item = item;
			if (_item.id === typeID) _item.dot = count;
			return _item;
		});
		this.setState({ source: _source });
	};

	// onUnReadCount = () => {
	// 	const { source } = this.state;
	// 	unReadCount({ event: 'loop' }).then((res) => {
	// 		const { data, code } = res;
	// 		if (code === 200) {
	// 			const _source = source.map((item) => {
	// 				const _item = item;
	// 				// console.log(_item.id, 123);
	// 				if (_item.id === 'YC0201') _item.dot = data.auctionCount;
	// 				if (_item.id === 'YC0202') _item.dot = data.subrogationCourtSessionCount || data.subrogationFilingCount || data.subrogationJudgmentCourt;
	// 				if (_item.id === 'YC0203') _item.dot = data.landTransferFlag || data.landTransactionFlag || data.landMortgageFlag; // 土地信息
	// 				if (_item.id === 'YC0204') _item.dot = data.biddingCount; // 招标中标
	// 				if (_item.id === 'YC0205') _item.dot = data.financeCount || data.auctionBiddingCount; // 金融资产
	// 				if (_item.id === 'YC0206') _item.dot = data.mortgageFlag; // 动产抵押
	// 				if (_item.id === 'YC0207') _item.dot = data.intangibleConstructFlag || data.intangibleEmissionFlag || data.intangibleMiningFlag || data.intangibleTrademarkFlag; // 动产抵押
	// 				return _item;
	// 			});
	// 			this.setState({ source: _source });
	// 		}
	// 	});
	// };

	toNavigate = () => {
		navigate(`/info/monitor/attention?init=YC02${this.sourceType ? `&process=${this.sourceType}` : ''}`);
	};


	render() {
		const { source } = this.state;
		const { rule } = this.props;
		const _source = source.filter(item => item.status);
		let text = _source[0].name;
		_source.forEach((i) => {
			if (new RegExp(i.url).test(window.location.hash)) {
				text = i.name;
				this.sourceType = i.id;
			}
		});
		return (
			<React.Fragment>
				<BreadCrumb
					list={[
						{ id: 1, name: '信息监控', link: '/info/monitor' },
						{ id: 2, name: '资产挖掘', link: '/info/monitor/excavate' },
						{ id: 3, name: text },
					]}
					suffix={(
						<div className="yc-suffix-wrapper">
							<Button
								style={{ margin: '12px 20px', width: 95, padding: '2px 9px' }}
								onClick={this.toNavigate}
								size="large"
								className="attention-btn-icon"
								icon={() => <Icon type="icon-follow-ed" className="yc-btn-icon" />}
								title="我的收藏"
							/>
						</div>
					)}
				/>
				<div className="yc-line" />
				<div className="yc-monitor yc-page-content">
					<Router>
						{
							_source.map(Item => (
								// eslint-disable-next-line react/jsx-pascal-case
								<Item.components
									path={`${Item.url}/*`}
									rule={rule}
									toRefreshCount={this.toRefreshCount}
								/>
							))
						}
					</Router>
				</div>
			</React.Fragment>
		);
	}
}

const monitorRouter = (props) => {
	const { rule } = props;
	return (
		<Router>
			<MonitorMain path="/*" rule={rule} />
			{/* <Attention path="/monitor/attention/*" rule={rule} /> */}
			<ClearProcess path="/monitor/clearProcess/*" />
		</Router>
	);
};
export default monitorRouter;
