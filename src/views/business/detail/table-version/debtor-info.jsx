import React from 'react';
import { Download, Icon as IconType } from '@/common';
import { exportListDebtor } from '@/utils/api/professional-work';
import {
	getQueryByName, timeStandard, toEmpty, w,
} from '@/utils';
import PublicImg from '@/assets/img/business/icon_zwr_company.png';
import PublicPerImg from '@/assets/img/business/icon_zwrpeople.png';
import isBreak from '@/assets/img/business/status_shixin.png';
import beforeBreak from '@/assets/img/business/status_cengshixin.png';

/* 获取注册状态样式 */
const getRegStatusClass = (val) => {
	if (val) {
		if (val.match(/(存续|在业)/)) return ' regStatus-green';
		if (val.match(/(迁出|其他)/)) return ' regStatus-orange';
		if (val.match(/(撤销|吊销|清算|停业|注销)/)) return ' regStatus-red';
	}
	return '';
};

/* 概要-down */
const DownloadButton = () => (
	<div className="intro-download">
		<Download
			style={{ width: 84 }}
			condition={{
				obligorId: getQueryByName(window.location.href, 'id'),
			}}
			icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
			api={exportListDebtor}
			normal
			text="下载"
		/>
	</div>
);

/* 企业概要 */
const EnterpriseInfo = (arg = {}) => {
	const {
		bankruptcy, dishonestStatus: isDishonest, pushState, limitConsumption,
	} = arg.data;
	const {
		obligorName: name, legalPersonName, regCapital, regCapitalUnit, regStatus, establishTime, usedName, logoUrl,
	} = arg.data;
	const { affixStatus } = arg;
	// console.log('affixStatus === ', affixStatus);
	const _formerNames = (usedName || []).join('、');
	const style = {
		// minWidth: 80,
		display: 'inline-block',
	};

	return (
		<div className="enterprise-info">
			{
				affixStatus ? (
					<div className="intro-title">
						<span className="yc-public-title-large-bold intro-title-name" style={isDishonest && { marginRight: '55px' }}>
							{name}
							{
								isDishonest === 1 ? <img className="intro-title-tag" src={isBreak} alt="" /> : null
							}
							{
								isDishonest === 2 ? <img className="intro-title-tag" src={beforeBreak} alt="" /> : null
							}
							{/* {isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null} */}
						</span>
						{
							regStatus
								? (
									<span
										className={`inquiry-list-regStatus${getRegStatusClass(regStatus)}`}
										style={isDishonest ? { marginTop: 2, marginLeft: 58 } : { marginTop: 2 }}
									>
										{regStatus}
									</span>
								) : ''
						}
						{
							limitConsumption ? <span className="inquiry-list-regStatus regStatus-orange" style={{ marginTop: 2, marginRight: 5 }}>已限高</span> : null
						}
						{
							bankruptcy ? <span className="inquiry-list-regStatus regStatus-red" style={{ marginTop: 2, marginRight: 5 }}>破产/重整风险</span> : null
						}
						<span
							className="inquiry-list-regStatus regStatus-blue"
							style={pushState ? { marginTop: 2, marginRight: 5 } : {
								marginTop: 2, marginRight: 5, color: '#7D8699', backgroundColor: '#F0F1F5', border: '1px solid #DADDE6',
							}}
						>
							{'当前推送状态：'}
							{pushState ? '开启' : '关闭'}
						</span>
					</div>
				) : (
					<React.Fragment>
						<div className="intro-icon">
							{
								logoUrl ? <div className="intro-icon-img-w"><img className="intro-icon-img" src={logoUrl} alt="" /></div>
									: <img className="intro-icon-img-auto" src={PublicImg} alt="" />
							}
						</div>
						<div className="intro-content">
							<div className="intro-title">
								<span className="yc-public-title-large-bold intro-title-name" style={isDishonest && { marginRight: '55px' }}>
									{name}
									{
										isDishonest === 1 ? <img className="intro-title-tag" src={isBreak} alt="" /> : null
									}
									{
										isDishonest === 2 ? <img className="intro-title-tag" src={beforeBreak} alt="" /> : null
									}
									{/* {isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null} */}
								</span>
								{
									regStatus ? (
										<span
											className={`inquiry-list-regStatus${getRegStatusClass(regStatus)}`}
											style={isDishonest ? { marginTop: 2, marginRight: 5 } : { marginTop: 2, marginRight: 5 }}
										>
											{regStatus}
										</span>
									) : null
								}
								{
									limitConsumption ? <span className="inquiry-list-regStatus regStatus-orange" style={{ marginTop: 2, marginRight: 5 }}>已限高</span> : null
								}
								{
									bankruptcy ? <span className="inquiry-list-regStatus regStatus-red" style={{ marginTop: 2, marginRight: 5 }}>破产/重整风险</span> : null
								}
								<span
									className="inquiry-list-regStatus regStatus-blue"
									style={pushState ? { marginTop: 2, marginRight: 5 } : {
										marginTop: 2, marginRight: 5, color: '#7D8699', backgroundColor: '#F0F1F5', border: '1px solid #DADDE6',
									}}
								>
									{'当前推送状态：'}
									{pushState ? '开启' : '关闭'}
								</span>
							</div>
							<div className="intro-base-info">
								<li className="intro-info-list intro-list-border">
									<span className="yc-public-remark">法定代表人：</span>
									<span className="yc-public-title" style={style}>{w(legalPersonName)}</span>
								</li>
								<li className="intro-info-list intro-list-border">
									<span className="yc-public-remark">注册资本：</span>
									<span className="yc-public-title" style={style}>{toEmpty(regCapital) ? `${regCapital}${regCapitalUnit}` : '-'}</span>
								</li>
								<li className="intro-info-list">
									<span className="yc-public-remark">成立日期：</span>
									<span className="yc-public-title">{establishTime ? timeStandard(establishTime) : '-'}</span>
								</li>
							</div>
							<div className="intro-used">
								<li className="intro-info-list">
									{
										toEmpty(_formerNames) ? [
											<span className="yc-public-remark">曾用名：</span>,
											<span className="yc-public-title">{_formerNames}</span>,
										] : null
									}
								</li>
							</div>
						</div>
					</React.Fragment>
				)
			}
			<DownloadButton />
		</div>
	);
};
/* 企业概要-简单版 */
// const EnterpriseInfoSimple = (props) => {
// 	const {
// 		data: {
// 			bankruptcy, dishonestStatus: isDishonest, pushState, limitConsumption, regStatus, obligorName,
// 		},
// 	} = props;
// 	return (
// 		<div className="enterprise-info enterprise-info-simple">
// 			<DownloadButton />
// 		</div>
// 	);
// };

/* 个人概要 */
const PersonalInfo = (arg = {}) => {
	const {
		 dishonestStatus: isDishonest, pushState, limitConsumption,
	} = arg.data;
	const {
		obligorName: name, logoUrl, obligorNumber,
	} = arg.data;
	const { affixStatus } = arg;
	const style = {
		minWidth: 80,
		display: 'inline-block',
	};

	return (
		<div className="enterprise-info">
			{
				affixStatus ? (
					<div className="intro-title">
						<span className="yc-public-title-large-bold intro-title-name" style={isDishonest && { marginRight: '55px' }}>
							{name}
							{
								isDishonest === 1 ? <img className="intro-title-tag" src={isBreak} alt="" /> : null
							}
							{
								isDishonest === 2 ? <img className="intro-title-tag" src={beforeBreak} alt="" /> : null
							}
						</span>
						{
							limitConsumption ? <span className="inquiry-list-regStatus regStatus-orange" style={{ marginTop: 2, marginRight: 5 }}>已限高</span> : null
						}
						<span
							className="inquiry-list-regStatus regStatus-blue"
							style={pushState ? { marginTop: 2, marginRight: 5 } : {
								marginTop: 2, marginRight: 5, color: '#7D8699', backgroundColor: '#F0F1F5', border: '1px solid #DADDE6',
							}}
						>
							{'当前推送状态：'}
							{pushState ? '开启' : '关闭'}
						</span>
					</div>
				) : (
					<React.Fragment>
						<div className="intro-icon intro-icon-per">
							{
								logoUrl ? <div className="intro-icon-img-w"><img className="intro-icon-img" src={logoUrl} alt="" /></div>
									: <img className="intro-icon-img-auto" src={PublicPerImg} alt="" />
							}
						</div>
						<div className="intro-content" style={{ marginTop: 4, marginLeft: 76 }}>
							<div className="intro-title">
								<span className="yc-public-title-large-bold intro-title-name" style={isDishonest && { marginRight: '55px' }}>
									{name}
									{
										isDishonest === 1 ? <img className="intro-title-tag" src={isBreak} alt="" /> : null
									}
									{
										isDishonest === 2 ? <img className="intro-title-tag" src={beforeBreak} alt="" /> : null
									}
								</span>
								{
									limitConsumption ? <span className="inquiry-list-regStatus regStatus-orange" style={{ marginTop: 2, marginRight: 5 }}>已限高</span> : null
								}
								<span
									className="inquiry-list-regStatus regStatus-blue"
									style={pushState ? { marginTop: 2, marginRight: 5 } : {
										marginTop: 2, marginRight: 5, color: '#7D8699', backgroundColor: '#F0F1F5', border: '1px solid #DADDE6',
									}}
								>
									{'当前推送状态：'}
									{pushState ? '开启' : '关闭'}
								</span>
							</div>
							<div className="intro-base-info">
								<li className="intro-info-list">
									<span className="yc-public-remark">证件号：</span>
									<span className="yc-public-title" style={style}>{obligorNumber || '-'}</span>
								</li>
							</div>
						</div>
					</React.Fragment>
				)
			}
			<DownloadButton />
		</div>
	);
};
/* 个人概要-简单版 */
// const PersonalInfoSimple = (props) => {
// 	const {
// 		data: {
// 			dishonestStatus: isDishonest, pushState, limitConsumption, obligorName,
// 		},
// 	} = props;
// 	return (
// 		<div className="enterprise-info enterprise-info-simple">
// 			<DownloadButton />
// 		</div>
// 	);
// };

const DebtorInfo = (props) => {
	const { data, portrait, affixStatus } = props;
	if (/enterprise/.test(portrait)) {
		return <EnterpriseInfo affixStatus={affixStatus} data={data} />;
		// return affixStatus ? <EnterpriseInfoSimple data={data} /> : <EnterpriseInfo data={data} />;
	}
	// return affixStatus ? <PersonalInfoSimple data={data} /> : <PersonalInfo data={data} />;
	return <PersonalInfo affixStatus={affixStatus} data={data} />;
};

export default DebtorInfo;
