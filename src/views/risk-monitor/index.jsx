import React from 'react';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { Button, Icon, BreadCrumb } from '@/common';
// import { unReadCount } from '@/utils/api/monitor-info';
import ruleMethods from '@/utils/rule';
/* 主要内容模块 */
import Lawsuits from './lawsuits-monitor';
import Bankruptcy from './bankruptcy';
import Operation from './operation-risk';
import BrokenRecord from './broken-record';
import LimitConsumption from './limit-consumption';
import './style.scss';

/* 获取展示配置 */
const toGetRuth = (moduleID) => {
	const result = ruleMethods.toGetRuleSource(global.ruleSource, moduleID, 'YC03');
	const noPage = () => <div>暂未开发</div>;
	const baseID = 'YC03';
	return result.child.map((item) => {
		let components = '';
		if (item.id === `${baseID}01`) components = Lawsuits;
		else if (item.id === `${baseID}02`) components = Bankruptcy;
		else if (item.id === `${baseID}03`) components = Operation;
		else if (item.id === `${baseID}04`) components = BrokenRecord;
		else if (item.id === `${baseID}05`) components = LimitConsumption;
		else components = noPage;
		return Object.assign({}, item, {
			components,
			paramUrl: item.paramUrl || '',
		});
	});
};

// 主界面
class RiskMonitor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			source: toGetRuth('YC10'),
		};
		this.sourceType = '';
	}

	componentWillMount() {
		// this.onUnReadCount();
		// this.setUnReadCount = setInterval(() => {
		// 	// this.onUnReadCount();
		// }, 30 * 1000);
	}

	componentWillUnmount() {
		// if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	// 一级tab未读消息统计
	// onUnReadCount = () => {
	// 	const { source } = this.state;
	// 	unReadCount({ event: 'loop' }).then((res) => {
	// 		const { data, code } = res;
	// 		if (code === 200) {
	// 			const _source = source.map((item) => {
	// 				const _item = item;
	// 				if (_item.id === 'YC0301') _item.dot = data.trialCourtSessionCount || data.trialFilingCount || data.trialJudgmentCount;
	// 				if (_item.id === 'YC0302') _item.dot = data.bankruptcyCount;
	// 				if (_item.id === 'YC0303') _item.dot = data.companyAbnormalCount || data.companyIllegalCount || data.changeFlag || data.punishmentFlag || data.taxCount || data.epbCount;
	// 				if (_item.id === 'YC0304') _item.dot = data.dishonestCount;
	// 				if (_item.id === 'YC0305') _item.dot = true;
	// 				return _item;
	// 			});
	// 			console.log('_source === ', _source);
	// 			this.setState({ source: _source });
	// 		}
	// 	});
	// };

	toNavigate = () => {
		navigate(`/info/monitor/attention?init=YC03${this.sourceType ? `&process=${this.sourceType}` : ''}`);
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
						{ id: 2, name: '风险监控', link: '/info/monitor/risk' },
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
						{/* eslint-disable-next-line react/jsx-pascal-case */}
						{ _source.map(Item => <Item.components path={`${Item.url}/*`} rule={rule} />) }
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
			<RiskMonitor path="/*" rule={rule} />
		</Router>
	);
};
export default monitorRouter;
