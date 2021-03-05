import React from 'react';
import Header from './header';
import Footer from './footer';
import './style.scss';

// 基础内容容器
const Container = (props) => {
	const { children } = props;
	return (
		<div className="yc-container-wrapper">
			<div className="yc-container-content">
				{children}
			</div>
		</div>
	);
};

export { Header, Container, Footer };
