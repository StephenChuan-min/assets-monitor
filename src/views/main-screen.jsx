import React from 'react';
import { Router, navigate } from '@reach/router';
import Cookies from 'universal-cookie';
/* 子路由模块  */
import Loadable from '@/common/loadable';
// import Monitor from '@/views/asset-excavate';
// import Risk from './risk-monitor';
// import Business from './business';
// import Company from './company';
// import Search from './search';
import { Spin, Button } from '@/common';
import { authRule } from '@/utils/api';
import { handleRule } from '@/utils';
import Error500 from '@/assets/img/error/500@2x.png';
import MessageDetail from '@/views/_others/messageDetail';
import Judgement from '@/views/_others/judgement';
import { Header, Container, Footer } from './_others/layout';
import ChangePassword from './_others/changPassword';
import Message from './_others/message';
import Home from './home';
import Account from './account';


// 新的引用方式，分割代码，懒加载
const InfoMonitor = Loadable(() => import('./info-monitor'));
const Monitor = Loadable(() => import('./asset-excavate'));
const Risk = Loadable(() => import('./risk-monitor'));
const Attention = Loadable(() => import('./info-monitor/attention'));

const InfoSearch = Loadable(() => import('./info-search'));
const Inquiry = Loadable(() => import('./portrait-inquiry'));
const Search = Loadable(() => import('./search'));

const InfoBusiness = Loadable(() => import('./business/view'));
const Business = Loadable(() => import('./business'));

const Organization = Loadable(() => import('./organization'));

const cookie = new Cookies();

// 返回路由表
const ruleList = (props) => {
	const l = [];
	const { rule } = props;
	if (rule.menu_sy)l.push(<Home path="/*" rule={rule.menu_sy} baseRule={rule} remark="首页" />);
	if (rule.menu_ywgl)l.push(<InfoBusiness path="business/view/*" rule={rule.menu_ywgl} baseRule={rule} remark="业务管理" />);
	if (rule.menu_ywgl)l.push(<Business path="business/*" rule={rule.menu_ywgl} baseRule={rule} remark="业务管理" />);

	if (rule.menu_jjgl)l.push(<Organization path="organization/*" rule={rule.menu_jjgl} baseRule={rule} remark="机构管理" />);

	/* 信息监控 [资产挖掘、风险监控] */
	if (rule.menu_zcwj || rule.menu_fxjk) {
		if (rule.menu_zcwj)l.push(<Monitor path="monitor/*" rule={rule.menu_zcwj} baseRule={rule} remark="信息监控-资产挖掘" />);
		if (rule.menu_fxjk)l.push(<Risk path="risk/*" rule={rule.menu_fxjk} baseRule={rule} remark="信息监控-风险监控" />);
		l.push(<InfoMonitor path="info/monitor/*" rule={rule} remark="信息监控-概览" />);
		l.push(<Attention path="info/monitor/attention/*" remark="信息监控-我的收藏" />);
	}

	/* 信息搜索 [画像查询、分类搜索] */
	if (rule.menu_hxcx || rule.menu_xxss)l.push(<InfoSearch path="info/search/*" rule={rule} remark="信息搜索-导航" />);
	if (rule.menu_hxcx)l.push(<Inquiry path="inquiry/*" rule={rule.menu_hxcx} baseRule={rule} remark="信息搜索-画像" />);
	if (rule.menu_xxss)l.push(<Search path="search/*" rule={rule.menu_xxss} baseRule={rule} remark="信息搜索-分类" />);

	// 账号开通
	if (rule.else.children.dljg)l.push(<Account path="account/*" rule={rule.else.children.dljg} baseRule={rule} remark="账号开通" />);

	l.push(<Message path="message/*" />);
	l.push(<ChangePassword path="change/password/*" />);
	l.push(<MessageDetail path="messageDetail/*" rule={rule} />);
	l.push(<Judgement path="judgement/*" />);

	if (!rule.menu_sy) {
		l[0].props.path = '/*';
	}
	return l;
};

// const MainScreen = props => (
// 	<React.Fragment>
// 		<Header {...props} />
// 		<Container>
// 			<Router mode="hash">
// 				{ ruleList(props).map(item => item) }
// 			</Router>
// 		</Container>
// 		<Footer />
// 	</React.Fragment>
// );

const MainScreen = (props) => {
	const { hash, rule } = props;
	const reg = new RegExp('#/judgement');
	const newProps = {
		rule,
	};
	return (
		<React.Fragment>
			{
				!reg.test(hash) ? <Header {...newProps} /> : null
			}
			<Container>
				<Router mode="hash">
					{ ruleList(newProps).map(item => item) }
				</Router>
			</Container>
			<Footer />
		</React.Fragment>
	);
};

export default class Screen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: 'show',
			rule: [],
			errorCode: '',
			tokenText: '',
		};
	}

	componentWillMount() {
		// 判断是否是第一次登录
		const firstLogin = cookie.get('firstLogin');
		const token = cookie.get('token');
		const isSpecial = cookie.get('isSpecial');
		// console.log('Screen token === ', token);
		// 专线登录第一次不会修改密码
		if (!isSpecial) {
			if (firstLogin === 'true') {
				navigate('/change/password');
			}
		}
		document.body.style.overflowY = 'scroll';
		this.clientHeight = 500 || document.body.clientHeight;
		// console.log('componentWillMount:', document.body.clientHeight);
		if (token) {
			authRule().then((res) => {
				if (res.code === 200) {
					const rule = handleRule(res.data.orgPageGroups);
					const roleList = [];
					res.data.orgPageGroups.forEach((i) => {
						roleList.push(i.rule);
					});
					global.authRoleList = roleList;
					global.isProxyLimit = res.data.isProxyLimit;
					global.PORTRAIT_INQUIRY_ALLOW = res.data.isPortraitLimit;
					this.setState({
						loading: 'hidden',
						rule,
						errorCode: res.code,
						tokenText: res.message,
					});
					global.ruleSource = rule;
				} else {
					this.setState({
						loading: 'error',
						errorCode: res.code,
						tokenText: res.message,
					});
				}
			}).catch(() => {
				this.setState({
					loading: 'error',
					errorCode: 500,
				});
			});
		} else {
			navigate('/login');
		}
	}

	componentDidMount() {

	}


	componentWillReceiveProps(props) {
		// const { beforeToken } = this.state;
		// const token = cookie.get('token');
		// if (token !== beforeToken) {
		// 	this.setState({
		// 		loading: 'error',
		// 		errorCode: '401',
		// 		tokenText: '您的登录已过期，请重新登录',
		// 	});
		// }
		// 判断是否是第一次登录
		// console.log('main-screen:componentWillReceiveProps');
		const isSpecial = cookie.get('isSpecial');
		if (!isSpecial) {
			const firstLogin = cookie.get('firstLogin');
			if (props.location && props.location.hash !== '#/change/password' && firstLogin === 'true') {
				this.setState({
					loading: 'hidden',
				});
				navigate('/change/password');
			}
		}
	}

	componentWillUnmount() {
		document.body.style.overflowY = 'auto';
	}


	render() {
		const {
			loading, rule, errorCode, tokenText,
		} = this.state;
		const { location } = this.props;
		if (loading === 'show') {
			return <Spin visible={loading} text=" " transparent><div style={{ height: this.clientHeight || 500 }} /></Spin>;
		}
		if (loading === 'hidden') {
			return <MainScreen rule={rule} hash={location.hash} />;
		}
		if (loading === 'error') {
			return (
				<div style={{ padding: 150 }} className="yc-error-page">
					<div className="yc-error-content">
						<img src={Error500} alt="" className="yc-error-img" />
						<div className="yc-error-text">
							<li className="error-code">{errorCode}</li>
							<li className="error-text">{tokenText || '抱歉，服务器出错了'}</li>
							<Button
								title="返回登录页面"
								style={{ width: 120 }}
								onClick={() => {
									navigate('/login');
									window.location.reload(); // 退出登录刷新页面
								}}
							/>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}
