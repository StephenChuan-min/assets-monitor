import React from 'react';
import Merchants from './table-merchants';
import Publicity from './table-publicity';
import Biding from './table-biding';

const TableIntact = (props) => {
	const { sourceType } = props;
	if (sourceType === 1) return <Biding {...props} />;
	if (sourceType === 2) return <Merchants {...props} />;
	if (sourceType === 3) return <Publicity {...props} />;
	return <Biding {...props} />;
};
export default TableIntact;
