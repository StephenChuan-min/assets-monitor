import service from 'service';
import { requestAll } from '@/utils/promise';
import { Court, Trial, Judgment } from './subrogation';
import { Court as lCourt, Trial as lTrial, Judgment as lJudgment } from '../risk-monitor/lawsuit';
import {
	attentionFollowListCount, // 收藏列表土地数据出让结果数量
	transferFollowListCount, // 收藏列表土地数据转让数量
	mortgageFollowListCount, // 收藏列表土地数据抵押数量
} from './public';
import {
	Abnormal, Change, Illegal, Punishment, Violation, Environment,
} from '../risk-monitor/operation-risk';

// 我的收藏

// /* 金融资产 - btn 数量 */
// const _params = { params: { isAttention: 1,		page: 1, num: 10 } };
// // 竞价项目 数量统计
// const Bid = () => service.get('/yc/monitor/auctionBidding/attentionList', _params);
// // 公示项目 数量统计
// const Pub = () => service.get('/yc/monitor/finance/attentionList', _params);

// export const assCount = () => {
// 	const result = {};
// 	return Pub().then((res) => {
// 		result.pub = res.data.data;
// 		return Bid();
// 	}).then((res) => {
// 		result.bid = res.data.data;
// 		return result;
// 	});
// };

/* 代位权 - 收藏列表 - 数量统计 */
export const subrogationCount = () => {
	const result = {};
	return Court.followListCount()
		.then((res) => {
			if (res.code === 200) result.Court = res.data;
			return Trial.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Trial = res.data;
			return Judgment.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Judgment = res.data;
			return result;
		})
		.catch(() => {
			// 异常处理
		});
};

/* 经营风险 - 收藏列表 - 数量统计 */
export const operationCount = (source) => {
	const list = [];
	source.child.forEach((item) => {
		if (item.status) {
			if (item.id === 'YC030301') list.push({ info: { field: 'Abnormal' }, api: Abnormal.followListCount() });
			else if (item.id === 'YC030302') list.push({ info: { field: 'Change' }, api: Change.followListCount() });
			else if (item.id === 'YC030303') list.push({ info: { field: 'Illegal' }, api: Illegal.followListCount() });
			else if (item.id === 'YC030304') list.push({ info: { field: 'Violation' }, api: Violation.followListCount() });
			else if (item.id === 'YC030305') list.push({ info: { field: 'Punishment' }, api: Punishment.followListCount() });
			else if (item.id === 'YC030306') list.push({ info: { field: 'Environment' }, api: Environment.followListCount() });
		}
	});
	const result = {};
	return requestAll(list).then((res) => {
		res.forEach((item) => {
			result[item.field] = item.data;
		});
		return result;
	});
};

/* 涉诉监控 - 收藏列表 - 数量统计 */
export const lawsuitCount = () => {
	const result = {};
	return lCourt.followListCount()
		.then((res) => {
			if (res.code === 200) result.Court = res.data;
			return lTrial.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Trial = res.data;
			return lJudgment.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Judgment = res.data;
			return result;
		})
		.catch(() => {
			// 异常处理
		});
};

/* 土地数据 - 收藏列表 - 数量统计 */
export const landCount = () => {
	const result = {};
	return attentionFollowListCount()
		.then((res) => {
			if (res.code === 200) result.Land = res.data;
			return transferFollowListCount();
		}).then((res) => {
			if (res.code === 200) result.Tran = res.data;
			return mortgageFollowListCount();
		}).then((res) => {
			if (res.code === 200) result.Mort = res.data;
			return result;
		})
		.catch(() => {
			// 异常处理
		});
};

/* 金融资产 - 收藏列表 - 数量统计 */
// export const financeCount = () => {
// 	const result = {};
// 	return attentionFollowBidCount()
// 		.then((res) => {
// 			if (res.code === 200) result.Bid = res.data;
// 			return attentionFollowPubCount();
// 		}).then((res) => {
// 			if (res.code === 200) result.Pub = res.data;
// 			return result;
// 		}).catch(() => {
// 			// 异常处理
// 		});
// };

/* 涉诉监控 - btn 数量 */
export const lawCount = () => service
	.get('/yc/monitor/focus/attentionCount', { params: { type: 0 } })
	.then(res => res.data);

/* 公示公告 - btn 数量 */
export const pubCount = () => service
	.get('/yc/bulletin/focus/countList', { params: { } })
	.then(res => res.data);
