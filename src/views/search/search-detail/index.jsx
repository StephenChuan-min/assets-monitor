import React from 'react';
import Router from '@/utils/Router';
import { BreadCrumb } from '@/common';
import s from '../source';


const SearchBase = (props) => {
	const { rule } = props && props;
	const source = s.getSource(rule).filter(item => item.status); // 过滤权限
	let text = '拍卖信息';
	source.forEach((i) => { if (new RegExp(i.url).test(window.location.hash)) text = i.name; });
	return (
		<React.Fragment>
			<BreadCrumb list={[
				{ id: 1, name: '信息搜索', link: '/info/search' },
				{ id: 2, name: '分类搜索', link: '/info/search/several' },
				{ id: 3, name: text },
			]}
			/>
			<div className="yc-line" />
			<div className="yc-business yc-page-content">
				<Router>
					{ source.map(Item => <Item.components path={`${Item.url}/*`} />) }
				</Router>
			</div>
		</React.Fragment>
	);
};

export default SearchBase;
