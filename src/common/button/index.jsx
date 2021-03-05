import React from 'react';
import './style.scss';

const comButton = (props) => {
	const {
		style, children, className,
	} = props;
	const {
		size, type, disabled, onClick, icon, active, title,
	} = props;
	// type 类型 primary 常规按钮颜色 warning 警告色 default 默认颜色 common 通用按钮色
	const classList = ['yc-btn', 'ie-css3'];
	if (size) classList.push(size ? `yc-btn-${size}` : '');
	if (className)classList.push(className);
	if (active) {
		classList.push('yc-btn-active');
	}
	if (disabled) {
		classList.push('yc-btn-disabled');
	} else {
		classList.push(type ? `yc-btn-${type}` : 'yc-btn-default');
	}
	// const childrenDom = React.Children.map(children, i => i);
	// console.log(childrenDom);
	return (
		<React.Fragment>
			<button
				type="button"
				style={style}
				disabled={disabled || false}
				className={classList.join(' ')}
				onClick={(e) => { if (onClick && !disabled)onClick(e); }}
			>
				{ icon ? icon() : null}
				<span style={icon ? { marginLeft: 3 } : ''}>{children || title}</span>
			</button>
		</React.Fragment>
	);
};
export default comButton;
