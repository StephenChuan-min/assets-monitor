import React from 'react';
import ReactDOM from 'react-dom';
import 'anujs/lib/createClass';	// needed by antd 1.x
import { Provider } from 'react-redux';
import { message } from 'antd';
import store from './stores/app';
import App from './views/app';
import './assets/css/index.scss';
import './utils/config';

const Version = 'v2.8.1';
const BetaNumber = '.18';
const info = `Version：${Version}${BetaNumber ? `-beta${BetaNumber}` : ''}`;
window.CurrentVersions = info;
if (window.location.protocol === 'http:') {
	console.info(info);
}

if (process.env.NODE_ENV === 'production') {
	global.console = {
		info: () => { },
		log: () => { },
		warn: () => { },
		debug: () => { },
		error: () => { },
	};
}

message.config({ top: 300 });

ReactDOM.render(
	<Provider store={store} className="Provider">
		<App />
	</Provider>,
	document.getElementById('app'),
);
