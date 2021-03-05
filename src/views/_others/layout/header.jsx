import React from 'react';
import { Badge } from 'antd';
import { navigate } from '@reach/router';
import Ellipse from 'img/icon/icon_unread99.png';
import Circular from 'img/icon/icon_unread.png';
import logoImg from '@/assets/img/logo_white.png';
// import { unreadCount } from '@/utils/api/inform';
import { bankConf } from '@/utils/api/user';
import { toGetRuleSource } from '@/utils';
import HeaderCenter from './headerCenter/header-center';
import HeaderMessage from './headerMessage/header-message';
import './style.scss';

// const logoText = '源诚资产监控平台';
/* 导航项目 */
const Item = (props) => {
	const {
		name, children, id, dot,
	} = props;
	const { set, active } = props;
	/**
	 * 点击路由跳转方法
	 * @param event 点击元素
	 * @param items 当前项参数
	 * @param parent 父项参数
	 */
	const toNavigate = (event, items, parent) => {
		navigate(`${items.url}${items.param ? items.param : ''}`);
		const _childId = children ? children[0].id : '';
		set({
			p: parent ? parent.id : items.id,
			c: parent ? items.id : _childId,
		});
		event.stopPropagation();
	};

	const toHref = items => `#${items.url}${items.param ? items.param : ''}`;

	const parentChoose = active.p === id ? 'header-item-active' : 'header-item-normal';
	const { hash } = window.location;
	return (
		<li className={`header-item header-item-${id} ${parentChoose}`} onClick={e => toNavigate(e, props)}>
			<Badge dot={dot}>
				<a href={toHref(props)} style={active.p === id ? { color: '#fff' } : { color: '#fff', opacity: '0.8' }}>{name}</a>
			</Badge>
			<ul className="header-child-item">
				{
					children && children.map(item =>	(
						<li
							className={`child-item ${active.c === item.id ? 'child-item-active' : 'child-item-normal'}`}
							key={item.id}
							onClick={e => toNavigate(e, item, props)}
						>
							{item.name}
							{
								item.child && (
									<div className="header-itemChild_wrapper">
										<div className="header-itemChild_content">
											{
												item.child.map(i => i.status && (
													<li
														className={`itemChild-item ${(i.reg || new RegExp(i.url)).test(hash) ? 'itemChild-active' : 'itemChild-normal'}`}
														key={i.id}
														onClick={e => toNavigate(e, i, props)}
													>
														{i.name}
													</li>
												))
											}
										</div>
									</div>
								)
							}
						</li>
					))
					}
			</ul>
		</li>
	);
};

/* 获取默认路由 */
const defaultRouter = (source) => {
	const { hash } = window.location;
	const res = { p: '', c: '' };
	// 获取 备份 路由地址
	const backupUrl = (item) => {
		let result = false;
		if (item.backup) {
			item.backup.forEach((i) => {
				if (new RegExp(`^#${i}`).test(hash))result = true;
			});
		}
		return result;
	};

	source.forEach((item) => {
		if (new RegExp(item.url).test(hash) || backupUrl(item)) {
			res.p = '';
			res.c = '';
			if (item.children) {
				res.p = item.id;
				let rootUrlId = '';
				item.children.forEach((itemChild) => {
					const RegExpStr = itemChild.reg || new RegExp(itemChild.url);
					if (itemChild.rootUrl)rootUrlId = itemChild.id;
					if (RegExpStr.test(hash) || backupUrl(itemChild))res.c = itemChild.id;
				});
				res.c = res.c || rootUrlId;
			} else {
				res.p = item.id;
			}
		}
	});
	if (new RegExp('/message').test(hash))res.p = 101;
	if (res.p) return res;
	res.p = source[0].id;
	return res;
};

// Header 样式需求
export default class Headers extends React.Component {
	constructor(props) {
		super(props);
		this.source = toGetRuleSource(props.rule);
		this.state = {
			active: defaultRouter(this.source),
			config: this.source,
			num: '',
			data: [],
			// Surplus: '', // 剩余未读数
			innerUrl: '',
		};
	}

	componentWillMount() {
		bankConf().then((res) => {
			if (res.code === 200) {
				if (res.data.innerUrl) {
					this.setState({
						innerUrl: res.data.innerUrl,
					});
				}
			}
		}).catch(() => {
		    // 异常处理
		});
	}

	componentDidMount() {
		// const { rule } = this.props;
		window.scrollTo(0, 0);
		// if (rule.menu_sy) {
		// 	unreadCount().then((res) => {
		// 		if (res.code === 200) {
		// 			this.setState({
		// 				Surplus: res.data,
		// 			});
		// 		}
		// 	});
		// }
	}

	componentWillReceiveProps() {
		// const { rule } = this.props;
		const { active } = this.state;
		// const { Surplus, active } = this.state;
		const _active = defaultRouter(this.source);
		// if (rule.menu_sy) {
		// 	unreadCount().then((res) => {
		// 		if (res.code === 200) {
		// 			if (Surplus !== res.data) {
		// 				window.location.reload(); // 实现页面重新加载/
		// 			}
		// 		}
		// 	});
		// }
		if (active !== _active) {
			this.setState({
				active: _active,
			});
		}
	}

	componentDidUpdate() {
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		window.scrollTo(0, 0);
	}

	// 获取消息数量
	getNoticeNum = (data) => {
		this.setState({
			num: data,
		});
	};

	// 获取当前机构
	getData = (data) => {
		this.setState({
			data,
		});
		if (this.headerMes) {
			this.headerMes.informCenter();
		}
	};

	render() {
		const {
			active, config, data, num, innerUrl,
		} = this.state;
		const { rule } = this.props;
		const newConfig = config && config.length > 0 && config.filter(i => i.name !== null && i.status);
		return (
			<div className="yc-header-wrapper">
				<div
					className="yc-header-default"
					onClick={(e) => {
						// 禁止点击事件
						e.preventDefault();
						e.stopPropagation();
						return false;
					}}
				/>
				<div className="yc-header-content">
					{
						innerUrl ? 	(
							<div className="header-logo-custom">
								<img className="header-logo-custom-pic" src={innerUrl} alt="" />
							</div>
						) : 					(
							<div className="header-logo">
								<img src={logoImg} alt="" />
								<span className="yc-public-white-large">源诚资产监控平台</span>
							</div>
						)
					}
					<div className="header-menu">
						{newConfig.map(items => (
							<Item
								key={items.id}
								{...items}
								set={val => this.setState({ active: val })}
								active={active}
							/>
						))}
					</div>
					<div className="header-else">
						{
							data && data.expire && data.expire >= 0 && (
							<div className="header-else-left">
								{
									data.expire === 1 ? (<div className="yc-leftTime">今日到期</div>) : (<div className="yc-leftTime">{`账号到期还剩：${data.expire}天`}</div>)
								}
								<div className="else-child else-line" />
							</div>
							)
						}
						{
							rule.menu_sy && (
							<div
								className={`else-child else-notice ${active.p === 101 ? 'header-item-active' : 'header-item-normal'}`}
								onClick={(event) => {
									this.setState({ active: { p: 101, c: '' } });
									navigate('/message');
									event.stopPropagation();
								}}
							>
								<div className="notice-icon yc-notice-img" />
								{
									num ? (num < 10 ? <img className="yc-Circular-icon" src={Circular} alt="" /> : <img className="yc-Ellipse-icon" src={Ellipse} alt="" />) : ''
								}
								{
									num ? <span className="yc-badge-num" style={num > 99 ? { left: '28px' } : { left: '30px' }}>{num > 99 ? '99+' : num}</span> : ''
								}
								<HeaderMessage rule={rule} getNoticeNum={this.getNoticeNum} mark="消息中心大概预览" ref={e => this.headerMes = e} />
							</div>
							)
						}
						{/* <HeaderMessage mark="消息中心大概预览" /> */}
						<div className="else-child else-line" />
						<div className="else-child else-username header-item-normal">
							<li className="else-child-li">
								您好，
								{data && data.name}
							</li>
							<li className="else-child-li-orgName">{data && data.orgName}</li>
							<HeaderCenter getData={this.getData} mark="个人中心大概" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
