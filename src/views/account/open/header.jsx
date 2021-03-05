import React from 'react';
import { Icon } from '@/common';
import './index.scss';

const Header = () => (
	<React.Fragment>
		<div className="account-header">
			<div className="account-header-title">账号开通</div>
			<div className="account-header-tips">
				<Icon type="icon-bianzu" className="account-header-tips-icon" />
				<span className="account-header-tips-content">提示：不同机构之间，数据是隔离的.同个机构下的账号，数据是共享的</span>
			</div>
		</div>
		<div className="account-header-line" />
	</React.Fragment>

);
export default Header;
