import React from 'react';
import './style.scss';

const Badge = (props) => {
	const { children, dot, style } = props;
	return (
		<span className="yc-badge">
			{children}
			{
				dot ?	<sup className="yc-badge-tab yc-badge-img" style={style} /> : ''
			}
		</span>
	);
};

export default Badge;
