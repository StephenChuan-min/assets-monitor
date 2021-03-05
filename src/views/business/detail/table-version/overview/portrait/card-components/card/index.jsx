import React from 'react';
import img from '@/assets/img/business/assestCard.png';
import { Icon } from '@/common';
import matching from '@/assets/img/business/matching.png';
import './style.scss';

export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			IconType, IconColor, gmtCreate, count, text, children, asset, customStyle, portrait, obligorTotal, onClick, Risk, obligorName,
		} = this.props;
		const isBusiness = portrait && portrait === 'business';
		return (
			<div className={`business-card-container ${count && 'business-card-noCount-hover'}`} style={customStyle} onClick={() => onClick && onClick()}>
				<div className="card-header">
					<div className="card-header-left">
						<Icon className={`card-header-icon ${!count && 'business-card-noCount-color'}`} type={`icon-${IconType}`} style={IconColor} />
						<div className="card-left-font" style={{ display: 'inline-block' }}>{`${text || '资产拍卖'} (${count || 0})`}</div>
						{isBusiness && obligorTotal ? (
							<div className="card-content-role-itemLeft">
								<img className="card-role-itemLeft-img" src={matching} alt="" />
								<span className="portrait-card-num">{obligorTotal}</span>
								{obligorName}
								{/* 人匹配到资产拍卖信息 */}
							</div>
						) : null}
					</div>

				</div>
				<div className={Risk ? 'risk-card-content' : 'excavate-card-content'} style={asset ? { paddingLeft: 0 } : {}}>
					{children}
					<Icon className="business-card-container-arrow-icon" type="icon-icon_arrow" style={{ color: '#4E5566' }} />
				</div>

				{gmtCreate ? (
					<div className="business-card-footer">
						{`最近更新时间：${gmtCreate}`}
					</div>
				) : null}
			</div>
		);
	}
}
