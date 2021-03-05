import React, { useState, useEffect } from 'react';
import Router from '@/utils/Router';
import Tabs from './search-tab';
import Detail from './search-detail';
import s from './source';
import './index.scss';

const HomeRouter = (props) => {
	const { rule } = props && props;
	const displayArray = s.getSource(rule).filter(item => item.status); // 过滤权限
	const [active, setActive] = useState(displayArray[0]);
	useEffect(() => {
		// Update the document title using the browser API
		document.title = '信息分类搜索';
	});
	const Module = s.getIdSource(active.id);

	return (
		<div className="search-wrapper">
			<p>信息分类搜索</p>
			<div className="tab-search">
				<Tabs simple source={displayArray} onChange={(item) => { setActive(item); }} />
				<div className="yc-query-data">
					{/* eslint-disable-next-line react/jsx-pascal-case */}
					 <Module.search />
				</div>
			</div>
		</div>
	);
};

const BaseRouter = ({ rule = {} }) => (
	<Router>
		<HomeRouter rule={rule.children} path="/*" />
		<Detail rule={rule.children} path="/search/detail/*" />
	</Router>
);

export default BaseRouter;
