import React from 'react';
import { Modal } from 'antd';
import { getByteLength, timeStandard } from '@/utils';
import PartyInfoDetail from './party-info';
import PartyCrosswiseDetail from './party-crosswise';
import './style.scss';

const roleType = (value) => {
	switch (value) {
	case 1:
		return '纳税人';
	case 2:
		return '法定代表人';
	case 3:
		return '财务';
	default:
		return '-';
	}
};
// 处理 当事人数据列表，分类
const handleParties = (data) => {
	const source = [];
	data.forEach((i) => {
		if (source.length === 0) {
			source.push({
				index: source.length,
				role: i.role || roleType(i.identityType),
				roleType: i.roleType,
				child: [i],
			});
		} else {
			const _result = source.filter(item => item.role === i.role)[0];
			if (_result) {
				source[_result.index].child.push(i);
			} else {
				source.push({
					index: source.length,
					role: i.role || roleType(i.identityType),
					roleType: i.roleType,
					child: [i],
				});
			}
		}
	});
	source.sort((a, b) => a.roleType - b.roleType);
	return source;
};
/* // 案号 - 弹窗 */
export const caseInfo = (content, row) => {
	const { isDelete, ygList } = row;
	const ygListLength = window._.isArray(ygList) ? ygList.length : 0;
	if (isDelete || !ygListLength) return content || '-';
	const toClick =	() => Modal.info({
		title: '当事人详情',
		okText: '确定',
		iconType: 'null',
		className: 'assets-an-info',
		content: (
			<div style={{ marginLeft: -28, maxHeight: 400, overflow: 'auto' }}>
				{
					row.ygList && row.ygList.map(item => (
						<p style={{ margin: 5, fontSize: 14 }}>
							<strong>{`${item.ssdw}：`}</strong>
							<span>{item.mc}</span>
						</p>
					))
				}
			</div>
		),
		onOk() {},
	});
	return <span className="click-link" onClick={toClick}>{content}</span>;
};

/**
 * 数据列表 - 当事人
 * */
export const partyInfo = (value, row, noLink, noStatus, detailWidth) => {
	// 获取 字符最大长度
	const toGetStrWidth = (list) => {
		let maxRoleName = '';
		list.forEach((item) => {
			const { role } = item;
			const _site1 = role.indexOf('（') > -1 ? role.indexOf('（') : '';
			const _site2 = role.indexOf('(') > -1 ? role.indexOf('(') : '';
			const _role = (_site1 || _site2) ? role.slice(0, _site1 || _site2) : role;
			maxRoleName = _role.length > maxRoleName.length ? _role : maxRoleName;
		});
		return getByteLength(maxRoleName) * 6;
	};
	if ((value || {}).length) {
		const source = handleParties(value);
		const maxWidth = toGetStrWidth(source);
		return source.map(item => (
			<PartyInfoDetail {...item} id={row.id} row={row} key={row.id} width={maxWidth} noLink noStatus={noStatus} detailWidth={detailWidth} />
		));
	}
	return '-';
};

/**
 * 数据列表 - 当事人 - 横向
 * */
export const PartyCrosswise = (props) => {
	const {
		value, row, type, land, name, linkDetail,
	} = props;

	// 获取 字符最大长度
	const toGetStrWidth = (list) => {
		let maxRoleName = '';
		list.forEach((item) => {
			const { role } = item;
			const _site = role.indexOf('（') > -1 ? role.indexOf('（') : '';
			const _role = _site ? role.slice(0, _site) : role;
			maxRoleName = _role.length > maxRoleName.length ? _role : maxRoleName;
		});
		return getByteLength(maxRoleName) * 6;
	};
	const toShowDetail =	() => Modal.info({
		title: `${land ? name : '当事人详情'}`,
		okText: `${land ? '确定' : '关闭'}`,
		iconType: 'null',
		className: 'assets-an-info',
		content: (
			<div style={{ marginLeft: -28, maxHeight: 400, overflow: 'auto' }}>
				<div style={{ padding: '15px 0' }}>
					{land ? (
						<div style={{ maxHeight: 400, overflow: 'auto' }}>
							{partyInfo(value, row, true, true, 400)}
						</div>
					)
						: (
							<div>
								<div className="assets-info-content">
									<li className="yc-public-normal-bold" style={{ marginBottom: 10 }}>
										<span className="list list-content text-ellipsis" style={{ maxWidth: 300, color: '#20242e' }}>{row.caseNumber || '-'}</span>
									</li>
									<li>
										{ type === 'trial' ? [
											<span className="list list-title align-justify" style={{ width: 'auto' }}>立案日期</span>,
											<span className="list list-title-colon">:</span>,
											<span className="list list-content">{timeStandard(row.gmtRegister)}</span>,
										] : '' }
										{ type === 'court' ? [
											<span className="list list-title align-justify" style={{ width: 'auto' }}>开庭日期</span>,
											<span className="list list-title-colon">:</span>,
											<span className="list list-content">{timeStandard(row.gmtTrial)}</span>,
										] : '' }
										{ type === 'judgment' ? [
											<span className="list list-title align-justify" style={{ width: 'auto' }}>判决日期</span>,
											<span className="list list-title-colon">:</span>,
											<span className="list list-content">{timeStandard(row.gmtJudgment)}</span>,
										] : '' }
										<span className="list-split" style={{ height: 16 }} />
										<span className="list list-title align-justify" style={{ width: 'auto' }}>处置单位</span>
										<span className="list list-title-colon">:</span>
										<span className="list list-content" style={{ maxWidth: 300, color: '#20242e' }}>{row.court || '-'}</span>
									</li>
								</div>
								<div style={{ background: '#EBEEF5', margin: '20px 0', height: 1 }} />
								<div style={{ maxHeight: 400, overflow: 'auto', color: '#20242e' }}>
									{partyInfo(value, row, true, true, 400)}
								</div>
							</div>
						)}
				</div>
			</div>
		),
		onOk() {},
	});

	if (typeof value === 'object') {
		if (value.length) {
			const source = handleParties(value);
			const maxWidth = toGetStrWidth(source);
			const detailStatus = Boolean(source.filter(i => i.child.length > 1).length);
			// console.log(source);
			return (
				<div className="yc-party-crosswise">
					{
						source.map((item, index) => [
							<PartyCrosswiseDetail {...item} id={item.id} key={item.id} width={maxWidth} items={value} max={9999} linkDetail={linkDetail} />,
							index !== source.length - 1 ? <span className="yc-split-line yc-split-line-info" /> : null,
						])
					}
					{
						detailStatus ? <span className="click-link detail-style" onClick={toShowDetail}>详情</span> : null
					}
				</div>
			);
		}
	}
	return '-';
};
