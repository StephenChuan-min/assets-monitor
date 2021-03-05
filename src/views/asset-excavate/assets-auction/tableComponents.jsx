import React from 'react';
import { Tooltip } from 'antd';
import accurate from '@/assets/img/icon/icon-jinzhun.png';
import dishonest1 from '@/assets/img/icon/icon_shixin.png';
import dishonest2 from '@/assets/img/icon/icon_cengshixin.png';
import { floatFormat } from '@/utils/format';
import { formatDateTime } from '@/utils/changeTime';
import { Button, Icon, Ellipsis } from '@/common';
import Matching from './matching-reason';

const statusType = (value) => {
	switch (value) {
	case -1: return '未知';
	case 1: return '股权项目';
	case 2: return '债权项目';
	case 3: return '资产项目';
	case 4: return '租赁项目';
	case 5: return '增资项目';
	case 6: return '其他项目';
	default: return '-';
	}
};

const peojectStatusMap = new Map([
	[1, '预披露'],
	[2, '等待挂牌'],
	[3, '挂牌中'],
	[4, '挂牌结束'],
	[5, '报名中'],
	[6, '报名结束'],
	[7, '竞价中'],
	[8, '竞价结束'],
	[9, '已成交'],
	[10, '已结束'],
	[11, '中止'],
	[0, '未知'],
	[null, '未知'],
]);

const AssetsInfo = (text, rowContent, index, noMatching = false, asset) => {
	const {
		obligorName, obligorNumber, orgName, updateTime, important, dishonestStatus, obligorId, isRead,
	} = rowContent;
	return (
		<React.Fragment>
			{important === 1 && !noMatching ? <img src={accurate} alt="" className="yc-assets-info-img" /> : null}
			{!asset && !isRead
				? (
					<span
						className={!isRead && isRead !== undefined ? 'yc-table-read' : 'yc-table-unread'}
						style={!isRead && isRead !== undefined ? { position: 'absolute', top: '45%' } : {}}
					/>
				) : null}
			<div className="assets-info-content" style={{ marginLeft: 10 }}>
				<li>
					<span className="list list-title align-justify">债 务 人：</span>
					<Ellipsis
						content={obligorName}
						url={obligorId ? `#/business/debtor/detail?id=${obligorId}` : ''}
						tooltip
						width={150}
						// width={getByteLength(content) * 6 > maxWidth ? maxWidth : (getByteLength(content) + 3) * 6}
					/>
				</li>
				<li>
					<span className="list list-title align-justify">证 件 号：</span>
					<span className="list list-content">{obligorNumber || '-'}</span>
				</li>
				<li>
					<span className="list list-title" style={{ width: 80 }}>负责人/机构：</span>
					{
						orgName ? (
							<Tooltip placement="top" title={orgName}>
								<span className="list list-content text-ellipsis ">{orgName}</span>
							</Tooltip>
						) : <span className="list list-content text-ellipsis">- </span>
					}
				</li>
				<li className="list-dishonest">
					<span className="list list-title">更新时间：</span>
					<span className="list list-content">{updateTime ? formatDateTime(updateTime) : '-'}</span>
					{ dishonestStatus === 1 ? <img src={dishonest1} alt="" className="list-dishonest-status" /> : ''}
					{ dishonestStatus === 2 ? <img src={dishonest2} alt="" className="list-dishonest-status" /> : ''}
				</li>
			</div>
		</React.Fragment>
	);
};

const ProjectInfo = (text, rowContent) => {
	const {
		 projectNumber, projectType, gmtPublish, title, sourceUrl,
	} = rowContent;
	return (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">项目名称：</span>
					{title ? (
						<Ellipsis
							content={title}
							url={sourceUrl ? `${sourceUrl}` : ''}
							tooltip
							width={150}
						/>
					) : (
						<span>
							{sourceUrl ? (
								<Ellipsis
									content="-"
									url={sourceUrl ? `${sourceUrl}` : ''}
									tooltip
									width={150}
								/>
							) : '-'}
						</span>
					)}
				</li>
				<li>
					<span className="list list-title align-justify">项目类型：</span>
					<span className="list list-content">{statusType(projectType) || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">项目编号：</span>
					<span className="list list-content">{projectNumber || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">发布日期：</span>
					<span className="list list-content">{gmtPublish || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	);
};

// 公示项目的项目信息
const ProjectPubInfo = (text, rowContent) => {
	const {
		projectStatus, startTime, endTime, listingPrice, listingUnit, transactionPrice, transactionPriceUnit, amounts, publicityType,
	} = rowContent;
	return (
		<React.Fragment>
			<div className="assets-info-content">
				{
					projectStatus >= 0 || projectStatus === null ? (
						<li>
							<span className="list list-title align-justify" style={{ width: 'auto' }}>项目状态：</span>
							<span>
								{peojectStatusMap.get(projectStatus)}
							</span>
						</li>
					) : null
				}
				{
					publicityType === 1 || publicityType === null ? (
						<React.Fragment>
							{
								startTime ? (
									<li>
										<span className="list list-title align-justify" style={{ width: 'auto' }}>挂牌开始日期：</span>
										<span className="list list-content">{startTime}</span>
									</li>
								) : null
							}
							{
								endTime ? (
									<li>
										<span className="list list-title align-justify" style={{ width: 'auto' }}>挂牌结束时间：</span>
										<span className="list list-content">{endTime}</span>
									</li>
								) : null
							}
							{
								listingPrice ? (
									<li>
										<span className="list list-title align-justify">挂牌价格：</span>
										<span className="list list-content">
											{floatFormat(listingPrice)}
											{listingUnit}
										</span>
									</li>
								) : null
							}
							{
								transactionPrice ? (
									<li>
										<span className="list list-title align-justify">成交价格：</span>
										<span className="list list-content">
											{floatFormat(transactionPrice)}
											{transactionPriceUnit}
										</span>
									</li>
								) : null
							}
						</React.Fragment>
					) : null
				}
				{
					publicityType === 2 ? (
						<React.Fragment>
							{
								amounts ? (
									<li>
										<span className="list list-title align-justify">资产总额：</span>
										<span className="list list-content">{floatFormat(amounts)}</span>
									</li>
								) : null
							}
						</React.Fragment>
					) : null
				}
			</div>
		</React.Fragment>
	);
};

const ListingInfo = (text, rowContent) => {
	const {
		price, listingPrice, listingUnit, startTime, endTime,
	} = rowContent;
	return (
		<React.Fragment>
			<div className="assets-info-content">

				<li>
					<span className="list list-title align-justify" style={{ width: 100 }}>挂牌起始日期：</span>
					<span className="list list-content">{startTime || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 100 }}>挂牌期满日期：</span>
					<span className="list list-content">{endTime || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 100 }}>挂  牌  价  格：</span>
					<span>{listingPrice || price ? (listingPrice ? `${floatFormat(listingPrice)} ${listingUnit}` : `${floatFormat(price)} ${listingUnit}`) : '未知'}</span>
				</li>
			</div>
		</React.Fragment>
	);
};

const MatchingReason = (text, content) => <Matching content={content} />;

// 失信记录-判决信息
const JudgmentInfo = (text, rowContent) => {
	const {
		courtName, caseCode, areaName, publishDate,
	} = rowContent;
	return (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">机构名称：</span>
					<span className="list list-content">{courtName || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">案号：</span>
					<span className="list list-content">{caseCode || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">省份：</span>
					<span className="list list-content">{areaName || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">发布时间：</span>
					<span className="list list-content">{publishDate || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	);
};
// 失信记录-执行情况
const ExecuteInfo = (text, rowContent) => {
	const {
		performance, disruptTypeName, businessEntity,
	} = rowContent;
	return (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 'auto' }}>被执行人的履行情况：</span>
					<span className="list list-content">{performance || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 'auto' }}>失信被执行人行为具体情形：</span>
					<span className="list list-content" style={{ maxWidth: 250 }}>{disruptTypeName || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 'auto' }}>法定代表人/负责人姓名：</span>
					<span className="list list-content">{businessEntity || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	);
};
// 失信记录-生效法律文书确定的义务
const DishonestInfo = (text, content) => <Matching content={content} dishonest />;

const AuctionInfo = (text, rowContent, toOpenHistory) => {
	const {
		title, url, court, consultPrice, start, currentPrice, status, initialPrice, roundTag, auctionStatusTag, historyAuction,
	} = rowContent;
	const auctionStatus = (s) => {
		let res = '-';
		switch (s) {
		case 1: res = '即将开始'; break;
		case 3: res = '正在进行'; break;
		case 5: res = '已成交'; break;
		case 7: res = '已流拍'; break;
		case 9: res = '中止'; break;
		case 11: res = '撤回'; break;
		default: res = '-';
		}
		return res;
	};
	return (
		<div className="yc-assets-table-info">
			{
				title || url ? (
					// <Tooltip placement="top" title={title}>
					// 	<a
					// 		className="table-info-title text-ellipsis click-link"
					// 		href={url}
					// 		target="_blank"
					// 		rel="noopener noreferrer"
					// 	>
					// 		{title || url}
					// 	</a>
					// </Tooltip>
					<div>
						<Ellipsis content={title || url} url={url} isSourceLink tooltip />
					</div>
				) : <div className="table-info-title ">-</div>
			}
			<li className="table-info-list list-width-180">
				<span className="info info-title">处置机关：</span>
				{
					court ? (
						<Tooltip placement="top" title={court}>
							<span className="info info-content text-ellipsis list-width-120">{court}</span>
						</Tooltip>
					) : <span className="info info-content">未知</span>
				}
			</li>
			<li className="table-info-list ">
				<span className="info info-title">评估价：</span>
				<span className="info info-content">{consultPrice ? `${floatFormat(consultPrice.toFixed(2))} 元` : '未知'}</span>
			</li>
			<br />
			<li className="table-info-list list-width-180">
				<span className="info info-title">开拍时间：</span>
				<span className="info info-content">{start !== null ? formatDateTime(start) : '未知'}</span>
			</li>
			{
				{
					1: (
						<li className="table-info-list ">
							<span className="info info-title">起拍价：</span>
							<span className="info-content info-over">
								{initialPrice ? `${floatFormat(initialPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
					5: (
						<li className="table-info-list ">
							<span className="info info-title">成交价：</span>
							<span className="info-content info-over">
								{currentPrice ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
				}[status] || (
					<li className="table-info-list ">
						<span className="info info-title">当前价：</span>
						<span className="info-content">
							{currentPrice ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
						</span>
					</li>
				)
			}
			<br />
			<li className="table-info-list list-width-180 yc-text-normal">
				<li className="table-info-list list-width-180">
					<span className="info info-title">拍卖状态：</span>
					<span className={`info info-content${status ? ` info-auction-${status}` : ''}`}>{auctionStatus(status)}</span>
				</li>

				{
					auctionStatusTag
						? (
							<li className="table-info-list list-width-180" style={{ marginTop: '9px' }}>
								<span className="info-tag info-tag_change">
									<Icon type="icon-remind" style={{ fontSize: '12px', marginRight: '1px' }} />
									拍卖状态变更
								</span>
							</li>
						) : null
				}
				{
					roundTag
						? (
							<li className="table-info-list list-width-180" style={{ marginTop: '5px' }}>
								<span className="info-tag info-tag_add">
									<Icon type="icon-remind" style={{ fontSize: '12px', marginRight: '1px' }} />
									新增拍卖轮次
								</span>
							</li>
						) : null
				}
			</li>
			<li className="table-info-list list-width-180 yc-text-normal">
				{
					(historyAuction || []).length ? (
						<li className="table-info-list list-width-180">
							<Button className="table-info-list-history" onClick={() => toOpenHistory(rowContent)}>
								<Icon type="icon-history" style={{ fontSize: 11, marginRight: 5 }} />
								查看历史拍卖信息
							</Button>
						</li>
					) : null
				}
			</li>
		</div>
	);
};

export {
	AssetsInfo, ProjectInfo, ProjectPubInfo, MatchingReason, AuctionInfo, DishonestInfo, JudgmentInfo, ExecuteInfo, ListingInfo,
};
