import React, { useState } from 'react';
import './index.scss';

const Tabs = (props) => {
	const { source = [], onChange, defaultActive } = props;
	const [active, setActive] = useState(defaultActive || source[0].id); // 选中过滤后的第一个值
	const handleClick = (item) => {
		setActive(item.id);
		onChange(item);
	};
	return (
		<div className="yc-tabs-search">
			{source.map(item => (
				<div
					key={item.id}
					className={active === item.id ? 'tabs-nav-item active' : 'tabs-nav-item'}
					onClick={() => handleClick(item)}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};

export default Tabs;
