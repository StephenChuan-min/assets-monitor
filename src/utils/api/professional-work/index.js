import service from 'service';

const debtorInfo = params => service.get('/yc/obligor/monitor/overview/detail', { params })
	.then(res => res.data);

const businessInfo = params => service.get('/yc/business/monitor/overview/detail', { params })
	.then(res => res.data);

const dishonestStatus = params => service.get('/yc/search/portrait/company/dishonest-status', { params })
	.then(res => res.data);

const exportListDebtor = '/yc/obligor/monitor/download';
const exportListBusiness = '/yc/business/monitor/download';

export {
	debtorInfo, businessInfo, dishonestStatus, exportListDebtor, exportListBusiness,
};
