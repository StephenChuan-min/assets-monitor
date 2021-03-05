import service from 'service';

const inquiryList = params => service.get('/yc/search/portrait/company/list', { params })
	.then(res => res.data);

const inquiryPriorityList = params => service.get('/yc/search/portrait/company/priorityList', { params })
	.then(res => res.data);

const companyInfo = params => service.get('/yc/search/portrait/company/info', { params })
	.then(res => res.data);

const dishonestStatus = params => service.get('/yc/search/portrait/company/dishonest-status', { params })
	.then(res => res.data);

const inquiryLimit = () => service.get('/yc/search/portrait/limit/info').then(res => res.data);

const exportListEnp = '/yc/search/portrait/company/export/download';
const exportListPer = '/yc/search/portrait/personal/export/download';


export {
	inquiryList, inquiryPriorityList, companyInfo, dishonestStatus, exportListEnp, exportListPer, inquiryLimit,
};
