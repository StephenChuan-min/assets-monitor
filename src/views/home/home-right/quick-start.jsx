import React from 'react';
import { navigate } from '@reach/router';
import { Icon } from '@/common';
import './style.scss';

class HomeQuickStart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleNavigate = (url) => {
		navigate(url);
	};

	render() {
		const { rule } = this.props;
		return (
			<div className="quick-start-container">
				<div className="quick-start-container-header">
					快速开始
				</div>
				<div className="quick-start-container-content">
					{rule.menu_ywgl && rule.menu_ywgl.children.ywglywst ? (
						<div className="quick-start-container-content-btn" onClick={() => this.handleNavigate('/business/view')}>
							<Icon type="icon-import" className="quick-start-container-content-btn-icon" />
							<span className="quick-start-container-content-btn-name">导入监控业务</span>
						</div>
					) : null}
					{rule.menu_hxcx ?	(
						<div className="quick-start-container-content-btn" onClick={() => this.handleNavigate('/info/search/portrait')}>
							<Icon type="icon-avatar" className="quick-start-container-content-btn-icon" />
							<span className="quick-start-container-content-btn-name">画像查询</span>
						</div>
					) : null}
					{rule.menu_xxss ? (
						<div className="quick-start-container-content-btn" onClick={() => this.handleNavigate('/info/search/several')}>
							<Icon type="icon-classification" className="quick-start-container-content-btn-icon" />
							<span className="quick-start-container-content-btn-name">分类搜索</span>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default HomeQuickStart;
