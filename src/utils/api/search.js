import service from 'service';

import { urlEncode } from '@/utils';
/**
 * 【信息搜索接口】
 * @returns {Promise<*>}
 * @param params
 */
// 拍卖信息搜索 [zhousai]
export const fullAssetSearch = async (params) => {
	const response = await service.get('/yc/doc/search/fullAssetSearch', { params });
	return response.data;
};
// 拍卖信息导出(前1000条数据)
export const fullAssetSearchExport = '/yc/doc/search/fullAssetSearchExport';

// 涉诉信息 => 数量 [zhousai]
export const relationSearchCount = async (params) => {
	const response = await service.get('/yc/doc/search/trialSearchListCount',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};
// 涉诉信息 => 开庭数量 [zhousai]
export const courtSearchListCount = async (params) => {
	const response = await service.get('/yc/doc/search/courtSearchListCount',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};
// 涉诉信息 => 开庭公告 [zhousai]
export const ktggRelationSearch = async (params) => {
	const response = await service.get('/yc/doc/search/courtSearchList',
		{
			params,
			paramsSerializer: () => {
			// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};
// 涉诉信息 => 开庭公告导出 [zhousai]
export const ktggRelationSerachExport = '/yc/doc/search/courtSearchExport';

// 涉诉信息 => 立案信息 [zhousai]
export const trialRelationSearch = async (params) => {
	const response = await service.get('/yc/doc/search/trialSearchList',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};
// 涉诉信息 => 立案信息导出 [zhousai]
export const trialRelationSearchExport = '/yc/doc/search/trialSearchExport';

// 土地数据 => 出让结果 -- 本页导出 [youyu]
export const landSellExport = '/yc/information/land/landTransfer/export';

// 土地数据 => 出让结果 -- 导出全部 [youyu]
export const landSellExportAll = '/yc/information/land/landTransfer/exportAll';

// 土地数据 => 土地转让 -- 本页导出 [youyu]
export const landTransferExport = '/yc/information/land/landTransaction/export';

// 土地数据 => 土地转让 -- 导出全部 [youyu]
export const landTransferExportAll = '/yc/information/land/landTransaction/exportAll';

// 土地数据 => 土地抵押 -- 本页导出 [youyu]
export const landMortgageExport = '/yc/information/land/landMortgage/export';

// 土地数据 => 土地抵押 -- 导出全部 [youyu]
export const landMortgageExportAll = '/yc/information/land/landMortgage/exportAll';

// 土地数据 => 出让结果数量 [youyu]
export const landSellCount = async (params) => {
	const response = await service.get('/yc/information/land/landTransfer/searchCount',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 土地数据 => 出让转让数量 [youyu]
export const landTransferCount = async (params) => {
	const response = await service.get('/yc/information/land/landTransaction/searchCount',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 土地数据 => 土地抵押数量 [youyu]
export const landMortgageCount = async (params) => {
	const response = await service.get('/yc/information/land/landMortgage/searchCount',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 信息搜索 => 土地出让 [youyu]
export const landSellSearch = async (params) => {
	const response = await service.get('/yc/information/land/landTransfer/search',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 信息搜索 => 土地转让 [youyu]
export const landTransferSearch = async (params) => {
	const response = await service.get('/yc/information/land/landTransaction/search',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 信息搜索 => 土地抵押 [youyu]
export const landMortgageSearch = async (params) => {
	const response = await service.get('/yc/information/land/landMortgage/search',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 股权质押 -- 本页导出 [youyu]
export const equityPledgeExport = '/yc/information/pledge/export';

// 股权质押 -- 导出全部 [youyu]
export const equityPledgeExportAll = '/yc/information/pledge/exportAll';

// 股权质押 => 全文搜索 [youyu]
export const equityPledgeSearch = async (params) => {
	const response = await service.get('/yc/information/pledge/search',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 动产抵押 -- 本页导出 [youyu]
export const mortgageExport = '/yc/information/mortgage/export';

// 动产抵押 -- 导出全部 [youyu]
export const mortgageExportAll = '/yc/information/mortgage/exportAll';

// 动产抵押 => 全文搜索 [youyu]
export const mortgageSearch = async (params) => {
	const response = await service.get('/yc/information/mortgage/search',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};

// 失信记录 -- 本页导出 [huxin]
export const dishonestyExport = '/yc/information/dishonest/export';

// 动产抵押 -- 导出全部 [youyu]
export const dishonestyExportAll = '/yc/information/dishonest/exportAll';

// 动产抵押 => 全文搜索 [youyu]
export const dishonestySearch = async (params) => {
	const response = await service.get('/yc/information/dishonest/search',
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};


// 文书全文搜索
export const judgement = async (params) => {
	const response = await service.get('/yc/information/judgement/search', { params });
	return response.data;
};

// 文书全部导出(前1000条数据)
export const exportWritAll = '/yc/information/judgement/exportAll';

// 文书本页导出
export const exportWritCurrent = '/yc/information/judgement/export';

// 金融全文搜索
export const finance = async (params) => {
	const response = await service.get('/yc/information/finance/search', { params });
	return response.data;
};
// 金融全部导出(前1000条数据)
export const exportFinanceAll = '/yc/information/finance/exportAll';

// 金融本页导出
export const exportFinanceCurrent = '/yc/information/finance/export';

// 破产重组全文搜索
export const bankruptcySearch = async (params) => {
	const response = await service.get('/yc/information/bankruptcy/search', { params });
	return response.data;
};
// 破产重组全部导出(前1000条数据)
export const exportBankruptcyAll = '/yc/information/bankruptcy/exportAll';

// 破产重组本页导出
export const exportBankruptcyCurrent = '/yc/information/bankruptcy/export';
