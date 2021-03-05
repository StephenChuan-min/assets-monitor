import React from 'react';
import { Pagination, InputNumber } from 'antd';
import Button from '../button';

const paginationRewrite = (props) => {
	const { defaultPageSize, total } = props;
	return (
		<div className="yc-paginationRewrite">
			<Pagination {...props} showQuickJumper={false} />
			<Button>跳转</Button>
		</div>
	);
};
export default paginationRewrite;
