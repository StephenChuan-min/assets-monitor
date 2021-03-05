import React from 'react';
import { Tooltip } from 'antd';
import { toCutString, linkDom, getByteLength } from '@/utils';
import { Borrower } from '../icon';
import './style.scss';
import PopCode from '@/common/popCode';
import Cookies from 'universal-cookie';

/**
 * @author: async
 * @date: 2019-12-27
 * @version: v1.1
 * @Description: 多行省略号
 */
const cookies = new Cookies();
export default class Ellipsis extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
		this.maxWidth = props.width || 0;
	}

	componentDidMount() {
		const { width } = this.props;
		if (!width) {
			this.toGetMaxWidth(this.element);
			this.setState({});
		}
	}

	shouldComponentUpdate(nextProps) {
		if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
			if (!nextProps.width) this.toGetMaxWidth(this.element);
		}
		return true;
	}

	toGetMaxWidth=(e) => {
		const { width } = this.props;
		if (!width) {
			const ele = e || this.element;
			this.maxWidth = ele.parentElement.clientWidth;
		} else {
			this.maxWidth = width;
		}
		return this.maxWidth;
	};

	render() {
		const isSpecial = cookies.get('isSpecial');
		const {
			ktModalSourceLinkIcon, wsSourceLink, isSourceLink, tooltip, url, font, line, content, width, className, onClick, customColor, auto, obligorId,
			isBorrower = false, isBankruptcy = false, isLimitHeight = false, isTable = false, prefixContent, prefixStyle, regStatus, bussinessStyle,
		} = this.props;
		const _url = obligorId ? `#/business/debtor/detail?id=${obligorId}` : url;
		const _line = line || 1;
		const _width = width || this.maxWidth;
		const size = ((font || 12) / 2);
		const showContent = _width
			? toCutString(content, (_width * _line) / size - (3 * _line), '...') : '';
		// tooltip 的状态
		const _tooltip = showContent === content ? false : tooltip;
		// const ContentText = url ? linkDom(_url, showContent, '', '', '', (onClick || '')) : showContent;
		// const ContentText = <PopCode content={content} url={_url} showContent={showContent} target="" className="" style={null} click={onClick || ''} isSourceLink={isSourceLink} tooltip={_tooltip} wsSourceLink={wsSourceLink} ktModalSourceLinkIcon={ktModalSourceLinkIcon} />;
		const ContentText = url
			? isSpecial && isSourceLink
				? <PopCode content={content} url={_url} showContent={showContent} tooltip={_tooltip} wsSourceLink={wsSourceLink} ktModalSourceLinkIcon={ktModalSourceLinkIcon} />
				: linkDom(_url, showContent || content, '', '', '', (onClick || ''))
			  : showContent || content;
		const contentSize = (getByteLength(showContent || content) + 3) * size;
		const __width = contentSize < _width ? (auto ? 'auto' : contentSize) : _width;
		const _isBorrower = Boolean(isBorrower);
		const _isBankruptcy = Boolean(isBankruptcy);
		const _isLimitHeight = Boolean(isLimitHeight);
		const _isTable = Boolean(isTable);
		const addWidth = (_isBorrower ? 18 : 0) + (_isBankruptcy ? 18 : 0) + (_isLimitHeight ? 32 : 0) + (_isTable ? 32 : 0);
		const style = _width ? {
			color: customColor || undefined,
			width: bussinessStyle ? 'auto' : __width + addWidth,
			display: 'inline-block',
		} : '';
		// console.log(75, _width, __width, addWidth);
		return (
			<div ref={e => this.element = e} className={`yc-ellipsis-element${className ? ` ${className}` : ''}`} style={style}>
				{
					prefixContent ? <span style={prefixStyle}>{prefixContent}</span> : null
				}
				{/* {_url ? (ContentText || '-') : <span>{(ContentText || '-')}</span>} */}
				 {
					_tooltip
						? (
							<Tooltip placement="top" title={content}>
								{_url ? (ContentText || '-') : <span>{(ContentText || '-')}</span>}
							</Tooltip>
						)
						: (ContentText || '-')
				 }
				{ _isBorrower && <Borrower />}
				{ _isBankruptcy && <Borrower text="破" style={{ background: '#948BFF' }} />}
				{
					_isLimitHeight && (
						<Borrower
							text="限高"
							style={{
								background: '#FFE6F3',
								color: '#EC3498',
								width: '32px',
								textAlign: 'center',
							}}
						/>
					)}
				{
					_isTable && (
						<Borrower
							text={regStatus}
							style={{
								background: '#E5E5E5',
								color: '#4E5566',
								width: '32px',
								textAlign: 'center',
							}}
						/>
					)
				}
			</div>
		);
	}
}
