import React from 'react';
import CustomModal from '@/common/custom/noPhoneModal/custom-modal';
import leftBackground from 'img/login/left_background.png';
import zhongguanBg from 'img/login/zhongguan_bg.png';
import Icon from '../icon';
import PhoneModal from '../../views/login/forgetPassword/noPhoneModal/index';
import footerImg from '../../assets/img/login/img_footer_qrcode.png';

const domainType = {
	ZG: 'zhongguan',
};

// 不传domainName的时候使用默认的node
const CustomAgency = (props) => {
	const {
		nodeName, node, type, nodeProps,
	} = props;
	const currentDomainName = window.location.hostname;
	let newNode = null;
	if (type === 'delete') {
		return null;
	}
	// 针对二级域名的匹配替换都在这里了
	switch (nodeName) {
	case 'loginName': if (currentDomainName.indexOf(domainType.ZG) >= 0) {
		newNode = null;
	} else {
		newNode = (
			<span className="yc-login-world">
				<Icon className="yc-login-icon" type="info-circle-o" />
				正式用户都会开通唯一的二级域名，请确认访问正确的二级域名网址进行登录
			</span>
		);
	} break;
	case 'footerIcon':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = (
				<Icon
					type="icon-zhongguanlogotu"
					className="yc-logo-icon"
				/>
			);
		} else {
			newNode = (
				<Icon
					type="icon-logo"
					className="yc-logo-icon"
				/>
			);
		} break;
	case 'footerTitle':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = '上海茸冕网络科技有限公司    ';
		} else {
			newNode = '杭州源诚科技有限公司    ';
		} break;
	case 'Copyright':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = 'Copyright © 2020 上海茸冕网络科技有限公司 ';
		} else {
			newNode = 'Copyright © 2018 杭州源诚科技有限公司 ';
		}
		break;
	case 'caseNum':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = '沪ICP备2020037843号';
		} else {
			newNode = '浙ICP备17030014号';
		} break;
	case 'noPhone':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			const customProps = {
				customVisible: nodeProps.noPhoneModalVisible,
				onCancel: nodeProps.onCancel,
				customTitle: '手机号不可用',
				customWidth: 380,
				type: 'small',
				icon: 'exclamation-circle',
				content: <div className="custom-content">
					<div className="custom-content-text">请联系客服，我们会第一时间为您处理。</div>
					<div className="custom-content-text">客服电话：138-1631-6187</div>
				</div>,
			};
			newNode = <CustomModal {...customProps} />;
		} else {
			newNode = <PhoneModal {...nodeProps} />;
		} break;
	case 'overdueAccount':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			const accountProps = {
				customVisible: nodeProps.accountVisible,
				onCancel: nodeProps.onCancel,
				customTitle: '账号过期提醒',
				customWidth: 380,
				type: 'small',
				icon: 'exclamation-circle',
				content: <div className="custom-content">
					<div className="custom-content-text">账号已过期，如果疑问，请联系客服。</div>
					<div className="custom-content-text">客服电话：138-1631-6187</div>
				</div>,
			};
			newNode = <CustomModal {...accountProps} />;
		} else {
			const accountProps = {
				customVisible: nodeProps.accountVisible,
				onCancel: nodeProps.onCancel,
				customTitle: '账号过期提醒',
				customWidth: 380,
				type: 'small',
				icon: 'exclamation-circle',
				content: <div className="custom-content">
					<div className="custom-content-text">账号已过期，建议添加微信。</div>
					<div className="custom-content-text">客服微信:180-7294-2900（同电话）</div>
				</div>,
			};
			newNode = <CustomModal {...accountProps} />;
		} break;
	case 'loginPic':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = <img className="yc-login-left-img" src={zhongguanBg} alt="" />;
		} else {
			newNode = <img className="yc-login-left-img" src={leftBackground} alt="" />;
		} break;
	case 'copyRightPhone':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = '13816316187';
		} else {
			newNode = '180-7294-2900';
		} break;
	case 'copyRightEmail':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = 'sales@zhongguandata.com';
		} else {
			newNode = 'sales@yczcjk.com';
		} break;
	case 'copyRightAddress':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = (
				<span>
					长宁区长宁路1133号长宁来福士广
					<br />
					<span style={{ marginLeft: 19 }}>场T1幢35层3510-15单元</span>
				</span>
			);
		} else {
			newNode = '杭州市西湖区华星世纪大楼6楼603';
		} break;
	case 'copyRightWX':
		if (currentDomainName.indexOf(domainType.ZG) >= 0) {
			newNode = null;
		} else {
			newNode = (
				<div className="right">
					<div className="copyright-item">
						<img src={footerImg} alt="" style={{ width: 60, height: 60 }} />
						<div className="copyright-code-text">微信公众号每月更新全国及各省司法拍卖统计报告；绑定账号可实时查看平台监控信息</div>
					</div>
				</div>
			);
		} break;
	// 这个是通用case
	case 'string': newNode = node; break;
	default: newNode = null; break;
	}
	return newNode;
};

export default CustomAgency;
