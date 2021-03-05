import service from 'service';


// 机构管理=>推送设置[C.H Wong]

// 推送人列表
export const pushList = params => service.get('/yc/pushManager/list', { params })
	.then(res => res.data);
// 推送人修改及保存
export const pushSave = params => service.post('/yc/pushManager/save', params)
	.then(res => res.data);

// 监控信息=>司法拍卖=>资产监控跟进[C.H Wong]


// 删除一条跟进记录
export const processDel = params => service.post('/yc/monitor/process/deleteProcessComment', params)
	.then(res => res.data);

// 获取跟进记录列表
export const processList = params => service.post('/yc/monitor/process/list', params)
	.then(res => res.data);

// 推送人修改及保存
export const processSave = params => service.post('/yc/monitor/process/save', params)
	.then(res => res.data);
