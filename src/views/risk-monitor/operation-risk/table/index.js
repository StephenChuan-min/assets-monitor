import TableBusinessChange from './businessChange';
import TableAbnormalOperation from './abnormalOperation';
import TableIllegal from './illegal';
import TableTaxViolation from './taxViolation';
import TableAdministrativePenalties from './administrativePenalties';
import TableEnvironmentalPunishment from './environmentalPunishment';

export default {
	YC030301: TableAbnormalOperation,
	YC030302: TableBusinessChange,
	YC030303: TableIllegal,
	YC030304: TableTaxViolation,
	YC030305: TableAdministrativePenalties,
	YC030306: TableEnvironmentalPunishment,
};

// 经营异常（YC030301） 工商变更（YC030302) 严重违法（YC030303）
// 税收违法（YC030304） 行政处罚 (YC030305) 环保处罚（YC030306）
