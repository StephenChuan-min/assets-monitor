import React from 'react';
import { Popover, Tooltip, Button } from 'antd';
import QRCode from 'qrcode.react';
import PropTypes from 'reactPropTypes';
import './style.scss';

export default class PopCode extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			ktModalSourceLinkIcon,
			wsSourceLink,
			showContent,
			content,
			tooltip,
			url,
			qrCodeCondition,
		} = this.props;

		// 二维码
		const popContent = (
			<div className="yc-qrCode-element">
				<QRCode
					value={url}
					{...qrCodeCondition}
				/>
				<p style={{ color: '#4E5566' }}>扫描上方二维码，即可查看源链接</p>
			</div>
		);

		// 开庭modal框中链接的图片（改成字符串是为了配合 “拍卖信息-信息搜索” 页面资产匹配信息title）
		const imgToString = `<img class="linkPic" src="${ktModalSourceLinkIcon}" alt="${content}" />`;

		const contentDom = ktModalSourceLinkIcon ? imgToString : showContent || content;

		const linkDom = url
			? (
				<a
					href={url}
					dangerouslySetInnerHTML={{ __html: contentDom }}
				/>
			)
			: <span>{contentDom}</span>;

		// 判断是否需要tooltip
		const tooltipDom = tooltip ? (
			<Tooltip placement="top" title={content}>
				<div>{linkDom}</div>
			</Tooltip>
		) : <div>{linkDom}</div>;

		// 文书中源链接dom
		const sourceBtnDom = <Button className="judgement-header-btn" style={{ backgroundColor: '#fff' }}>{content}</Button>;

		return (
			<div style={{ display: 'inline-block' }}>
				<Popover
					content={popContent}
					trigger="click"
					placement={wsSourceLink ? 'bottomRight' : 'topLeft'}
					overlayClassName="yc-popover-element"
				>
					{wsSourceLink ? sourceBtnDom : <div>{tooltipDom}</div>}
				</Popover>
			</div>
		);
	}
}

PopCode.propTypes = {
	ktModalSourceLinkIcon: PropTypes.string,
	// 开庭modal框源链接icon地址
	wsSourceLink: PropTypes.boolean,
	// 是否为文书源链接
	isSourceLink: PropTypes.boolean,
	// 是否为源链接
	qrCodeCondition: PropTypes.obj,
	// 二维码属性
};

PopCode.defaultProps = {
	ktModalSourceLinkIcon: null,
	wsSourceLink: false,
	isSourceLink: false,
	qrCodeCondition: {
		renderAs: 'canvas',
		size: 144,
		bgColor: '#FFFFFF',
		fgColor: '#000000',
		level: 'L',
		includeMargin: false,
	},
};
