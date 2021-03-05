import service from 'service';

const debtorInfo = params => service.get('/yc/obligor/monitor/overview/detail', { params })
	.then(res => res.data);

const businessInfo = params => service.get('/yc/business/monitor/overview/detail', { params })
	.then(res => res.data);

const dishonestStatus = params => service.get('/yc/search/portrait/company/dishonest-status', { params })
	.then(res => res.data);

const exportListEnp = '/yc/search/portrait/company/export/download';
const exportListPer = '/yc/search/portrait/personal/export/download';

export {
	debtorInfo, businessInfo, dishonestStatus, exportListEnp, exportListPer,
};
