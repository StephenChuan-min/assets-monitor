import React from 'react';
import { Icon, Tooltip } from 'antd';

const TitleIcon = (prop) => {
	const { title, tooltip, icon } = prop;
	return (
		<React.Fragment>
			<span style={{ marginRight: 5 }}>{title}</span>
			<Tooltip placement="top" title={tooltip}>
				<Icon type={icon || 'info-circle-o'} />
			</Tooltip>
		</React.Fragment>
	);
};
export default TitleIcon;
