import React from 'react';
import { Tabs, Spin } from '@/common';
import { changeURLArg, parseQuery, toGetRuleSource } from '@/utils';
import {
	subrogationCount, landCount, lawsuitCount, operationCount,
} from '@/utils/api/monitor-info/attention';
import Intangible from '@/utils/api/monitor-info/intangible';
import ConstructApi from '@/utils/api/assets/construct';
import './style.scss';
import { promiseAll, requestAll } from '@/utils/promise';
import Apis from 'api/monitor-info/finance';
import Item from './item';

export default class MyAttention extends React.Component {
	constructor(props) {
		super(props);
		document.title = '我的收藏-信息监控';
		this.state = {
			initConfig: [
				toGetRuleSource(global.ruleSource, 'YC10', 'YC02'),
				toGetRuleSource(global.ruleSource, 'YC10', 'YC03'),
			],
			initType: 1,
			config: [],
			sourceType: 1,
			childType: 1,
			source: '',
			loading: false,
		};
	}

	componentWillMount() {
		const { initConfig } = this.state;
		const initType = Tabs.Simple.toGetDefaultActive(initConfig, 'init');
		const config = (toGetRuleSource(global.ruleSource, 'YC10', initType) || {}).child.filter(i => i.status);
		// console.log('componentWillMount config === ', config);
		const sourceType = Tabs.Simple.toGetDefaultActive(config, 'process');
		const source = (config.filter(i => i.id === sourceType))[0];
		const childAry = source.child ? source.child.filter(i => i.status) : '';
		const childType =	parseQuery(window.location.href).type || (childAry ? childAry[0].id : '');
		this.setState({
			config,
			initType,
			sourceType,
			source,
			childType,
		});
		this.toGetTotal(sourceType, source);
	}

	// 获取数据统计
	toGetTotal = (type, source) => {
		const _source = source;
		if (type === 'YC0202') {
			subrogationCount().then((res) => {
				// console.log(res);
				_source.child = _source.child.map((item) => {
					const _item = item;
					if (item.id === 'YC020201') _item.number = res.Trial;
					else if (item.id === 'YC020202') _item.number = res.Court;
					else if (item.id === 'YC020203') _item.number = res.Judgment;
					return _item;
				});
				this.setState({ source: _source });
			});
		} else if (type === 'YC0301') {
			lawsuitCount().then((res) => {
				_source.child = _source.child.map((item) => {
					const _item = item;
					if (item.id === 'YC030101') _item.number = res.Trial;
					else if (item.id === 'YC030102') _item.number = res.Court;
					else if (item.id === 'YC030103') _item.number = res.Judgment;
					return _item;
				});
				this.setState({ source: _source });
			});
		} else if (type === 'YC0303') {
			operationCount(source).then((res) => {
				_source.child = _source.child.map((item) => {
					const _item = item;
					// Abnormal, Change, Illegal, Punishment,
					if (item.id === 'YC030301') _item.number = res.Abnormal;
					else if (item.id === 'YC030302') _item.number = res.Change;
					else if (item.id === 'YC030303') _item.number = res.Illegal;
					else if (item.id === 'YC030304') _item.number = res.Violation;
					else if (item.id === 'YC030305') _item.number = res.Punishment;
					else if (item.id === 'YC030306') _item.number = res.Environment;
					return _item;
				});
				this.setState({ source: _source });
			});
		} else if (type === 'YC0203') {
			landCount().then((res) => {
				_source.child = _source.child.map((item) => {
					const _item = item;
					if (item.id === 'YC020301') _item.number = res.Land;
					if (item.id === 'YC020302') _item.number = res.Tran;
					if (item.id === 'YC020303') _item.number = res.Mort;
					return _item;
				});
				this.setState({
					source: _source,
				});
			});
		} else if (type === 'YC0205') {
			const promiseArray = [];
			promiseArray.push(Apis.attentionFollowBidCount());
			promiseArray.push(Apis.attentionFollowCountMerchants());
			promiseArray.push(Apis.attentionFollowCountPub());
			// 将传入promise.all的数组进行遍历，如果catch住reject结果，
			// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
			// console.log(promiseArray, 123);
			const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
			handlePromise.then((res) => {
				console.log(' YC0205 === ', res, _source.child);
				_source.child = _source.child.map((item) => {
					const _item = item;
					if (item.id === 'YC020501') _item.number = res.filter(i => i.name === 'bid')[0].data;
					else if (item.id === 'YC020502') _item.number = res.filter(i => i.name === 'merchants')[0].data;
					else if (item.id === 'YC020503') _item.number = res.filter(i => i.name === 'pub')[0].data;
					return _item;
				});
				this.setState({ source: _source });
			}).catch((reason) => {
				console.log('promise reject failed reason', reason);
			});

			// financeCount().then((res) => {
			// 	_source.child = _source.child.map((item) => {
			// 		const _item = item;
			// 		console.log('res ===', res);
			// 		if (item.id === 'YC020501') _item.number = res.Bid;
			// 		else if (item.id === 'YC020502') _item.number = res.Pub;
			// 		else if (item.id === 'YC020503') _item.number = res.Pub;
			// 		// else if (item.id === 'YC020503') _item.number = res.Result;
			// 		return _item;
			// 	});
			// 	this.setState({ source: _source });
			// });
		} else if (type === 'YC0207') {
			const urlList = source.child.map(item => ({
				api: Intangible(item.id, 'followListCount')(),
				info: { id: item.id },
			}));
			requestAll(urlList).then((res) => {
				_source.child = _source.child.map((item) => {
					const _item = item;
					res.map((i) => {
						if (item.id === i.id) {
							_item.number = i.data;
						}
						return i;
					});
					return _item;
				});
				this.setState({ source: _source });
			});
		} else if (type === 'YC0212') { // 在建工程
			const urlList = source.child.map(item => ({
				api: ConstructApi(item.id, 'followListCount')(),
				info: { id: item.id },
			}));
			requestAll(urlList).then((res) => {
				_source.child = _source.child.map((item) => {
					const _item = item;
					res.map((i) => {
						if (item.id === i.id) {
							_item.number = i.data;
						}
						return i;
					});
					return _item;
				});
				this.setState({ source: _source });
			});
		}
	};

	// Type变化
	onType = (nextType) => {
		const { initType } = this.state;
		if (nextType !== initType) {
			const config = (toGetRuleSource(global.ruleSource, 'YC10', nextType) || {}).child.filter(i => i.status);
			this.setState({ initType: nextType, config });
			window.location.href = changeURLArg(window.location.href, 'init', nextType);
			//	问题遗留：直接href导致每个Router重新渲染
		}
	};

	/* sourceType变化  */
	onSourceType = (nextSourceType) => {
		const { config, sourceType } = this.state;
		if (nextSourceType !== sourceType) {
			const source = config.filter(i => i.id === nextSourceType)[0];
			const childType = ((source.child || []).filter(i => i.status)[0] || {}).id || '';
			this.setState({
				sourceType: nextSourceType,
				source,
				childType,
			});
			this.toGetTotal(nextSourceType, source);
			const url = changeURLArg(window.location.href, 'process', nextSourceType);
			window.location.href = changeURLArg(url, 'type', childType);
			//	问题遗留：直接href导致每个Router重新渲染
		}
	};

	// 如果有子项按钮，点击切换
	onBtnChange = (val) => {
		const { sourceType, source } = this.state;
		this.setState({
			childType: val.id,
		});
		this.toGetTotal(sourceType, source);
		this.setState({
			loading: true,
		}, () => {
			this.setState({ loading: false });
		});
		if (!val.isRedirect) {
			window.location.href = changeURLArg(window.location.href, 'type', val.id);
		}
	};

	render() {
		const {
			config, sourceType, source, childType, initConfig, loading,
		} = this.state;
		const content = {
			source,
			sourceType,
			childType,
			onBtnChange: this.onBtnChange,
		};
		const newConfig = config && config.filter(i => i.status);
		// const newInitConfig = initConfig && initConfig.map(i => i).filter(l => l.status);
		return (
			<div className="yc-monitor-attention">
				<Tabs.Simple
					borderBottom
					onChange={this.onType}
					source={initConfig}
					field="init"
					type="primary"
					prefix={<div className="yc-tabs-simple-prefix">我的收藏</div>}
				/>
				<div className="yc-monitor-attention-content">
					<Tabs.Simple borderBottom onChange={this.onSourceType} source={newConfig} field="process" />
					{ loading ? <Spin visible /> : <Item {...content} mark="子模块展示内容" /> }
				</div>

			</div>
		);
	}
}
