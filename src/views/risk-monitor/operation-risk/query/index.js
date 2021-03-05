import QueryBusinessChange from './businessChange';
import QueryAbnormalOperation from './abnormalOperation';
import QueryIllegal from './illegal';
import QueryTaxViolation from './taxViolation';
import QueryAdministrativePenalties from './administrativePenalties';
import QueryEnvironmentalPunishment from './environmentalPunishment';

export default {
	YC030301: QueryAbnormalOperation,
	YC030302: QueryBusinessChange,
	YC030303: QueryIllegal,
	YC030304: QueryTaxViolation,
	YC030305: QueryAdministrativePenalties,
	YC030306: QueryEnvironmentalPunishment,
};
