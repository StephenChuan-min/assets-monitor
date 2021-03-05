import React from 'react';

const Split = <span className="list-split" style={{ height: 16 }} />;
const LiItem = (props) => {
	const {
		Li, title, children, noColon, cotStyle, style, className, suffix, auto, titleStyle,
	} = props;
	const listContent = auto ? 'list list-content-auto' : 'list list-content';
	const content = [
		title && <span className="list list-title align-justify" style={titleStyle}>{title}</span>,
		title && <span className="list list-title-colon" style={noColon && { visibility: 'hidden' }}>：</span>,
		children && <span className={listContent} style={cotStyle}>{children}</span>,
		suffix && suffix,
	];
	return Li ? <li className={className} style={style}>{content}</li> : content;
};

LiItem.Split = Split;

export default LiItem;
