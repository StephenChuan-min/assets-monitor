import React from 'react';
import { navigate } from '@reach/router';
import { Tabs } from '@/common';
import Router from '@/utils/Router';
import Business from './business-views';
import Debtor from './debtor-views';
/* 详情页相关 */
import DetailDebtor from './detail/debtor';
import DetailBusiness from './detail/business';
import DetailEdit from './detail/edit-info';

const source = rule => ([
	{
		id: 1,
		name: '业务视图',
		url: '/business',
		number: 0,
		dot: false,
		display: !!(rule && rule.ywglywst),
		components: Business,
	},
	{
		id: 2,
		name: '债务人',
		url: '/business/debtor',
		number: 0,
		dot: false,
		display: !!(rule && rule.ywglzwr),
		components: Debtor,
	},
]);

// eslint-disable-next-line no-unused-vars
const MainRouter = (props) => {
	const { rule } = props;
	const displayArray = source(rule).filter(item => item.display === true); // 过滤权限
	return [
		<Tabs onChange={res => navigate(res.url)} source={displayArray} />,
		<div className="yc-business yc-page-content">
			<Router>
				{/* eslint-disable-next-line react/jsx-pascal-case */}
				{ displayArray.map(Item => <Item.components path={`${Item.url}/*`} />) }
			</Router>
		</div>,
	];
};

const BusinessRouter = (props) => {
	const { rule: { children } } = props;
	return (
		<Router>
			{/* <MainRouter rule={children} path="/*" remark="业务（债务人）视图列表" /> */}
			<DetailBusiness rule={children} path="/business/detail/*" remark="业务详情（新）" />
			<DetailEdit rule={children} path="/business/detail/edit/info/*" remark="业务详情-编辑（新）" />
			<DetailDebtor rule={children} path="/business/debtor/detail/*" remark="债务人详情（新）" />
		</Router>
	);
};
export default BusinessRouter;
