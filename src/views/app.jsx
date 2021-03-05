import React from 'react';
import { Router } from '@reach/router';
import MainScreen from './main-screen';
import LoginPage from './login';
// import TestPage from '@/views/_others/_test';

export default class BaseRouter extends React.PureComponent {
	componentWillMount() {
		const currentName = window.location.hostname;
		if (currentName.indexOf('zhongguan') >= 0) {
			let link = document.querySelector('link[rel~=\'icon\']');
			if (!link) {
				link = document.createElement('link');
				link.rel = 'icon';
				document.getElementsByTagName('head')[0].appendChild(link);
			}
			link.href = './static/zg_icon.ico';
		}
	}

	render() {
		return (
			<Router mode="hash" className="yc-router">
				<MainScreen path="/*" remark="主路由" />
				<LoginPage path="login/*" remark="登录页面" />
				{/* <TestPage path="test/*" remark="测试页面" /> */}
			</Router>
		);
	}
}
