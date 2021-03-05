import React from 'react';
import { Modal, message } from 'antd';
import { navigate } from '@reach/router';
import { inquiryLimit } from 'api/portrait-inquiry';

const contentStr = num => React.createElement('p', { style: { fontSize: 14 } },
	React.createElement('span', { style: { marginBottom: 6 } }, '点击确认，将消耗1次查询次数，返回债务人相关资产、风险等各维度信息的综合查询结果。'),
	React.createElement('br', null),
	React.createElement('br', null),
	React.createElement('span', {}, '当前查询剩余次数：'),
	React.createElement('b', { color: '#4E5566' }, ` ${num || 0} 次`));

const contentStrRemind = num => React.createElement('p', { style: { fontSize: 14 } },
	React.createElement('span', { style: { marginBottom: 6 } }, '刷新后将消耗1次查询次数，并返回最新画像查询结果；'),
	React.createElement('br', null),
	React.createElement('br', null),
	React.createElement('span', { style: { marginBottom: 6 } }, '点击取消将返回画像查询首页。'),
	React.createElement('br', null),
	React.createElement('br', null),
	React.createElement('span', {}, '当前查询剩余次数：'),
	React.createElement('b', { color: '#4E5566' }, ` ${num || 0} 次`));

export const inquiryCheck = (url, type, remind = true) => {
	if (global.PORTRAIT_INQUIRY_ALLOW && type === 2) {
		return inquiryLimit().then((res) => {
			// console.log('查询画像的剩余次数 res ====', res);
			const { portraitLimitCount, portraitLimitUseCount } = res.data;
			const degree = portraitLimitCount - portraitLimitUseCount;
			if (degree > 0 && remind) {
				Modal.confirm({
					title: '确定查询此债务人画像？',
					content: contentStr(degree),
					iconType: 'exclamation-circle',
					className: 'message-confirm-icon',
					onOk() {
						if (url)navigate(url);
					},
					onCancel() {},
				});
			} else {
				message.warning('画像查询次数已用完，若需获取更多查询次数请联系销售或客服！');
			}
		});
	}
	return new Promise(resolve => resolve()).then(() => {
		if (url)navigate(url);
	});
};

export const noneRemind = affirm => inquiryLimit().then((res) => {
	if (global.PORTRAIT_INQUIRY_ALLOW) {
		const { portraitLimitCount, portraitLimitUseCount } = res.data;
		const degree = portraitLimitCount - portraitLimitUseCount;
		// eslint-disable-next-line no-shadow
		return new Promise((resolve) => {
			if (affirm) {
				if (degree > 0) {
					Modal.confirm({
						title: '刷新后将重新获取债务人画像！',
						content: contentStrRemind(degree),
						iconType: 'exclamation-circle',
						className: 'message-confirm-icon',
						onOk() {
							resolve();
						},
						onCancel() {
							navigate('/inquiry');
							// eslint-disable-next-line prefer-promise-reject-errors
						},
					});
				} else {
					Modal.warning({
						title: '画像查询次数已用完',
						content: '若需获取更多查询次数请联系销售或客服！',
						iconType: 'exclamation-circle',
						className: 'message-confirm-icon',
						onOk() {
							navigate('/inquiry');
							// eslint-disable-next-line prefer-promise-reject-errors
						},
					});
				}
			} else {
				resolve();
			}
		});
	}
	return new Promise(resolve => resolve());
});
