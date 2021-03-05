import React from 'react';
import recall from '@/assets/img/icon/icon-recall.png';

const readStatus = (text, record = {}) => {
	const { isRead, isDeleted } = record;
	return (
		<React.Fragment>
			{isDeleted ? <img src={recall} alt="" className="yc-assets-info-img" /> : null}
			<span className={!isRead && isRead !== undefined ? 'yc-table-read' : 'yc-table-unread'} />
			<span>{text}</span>
		</React.Fragment>
	);
};
export default readStatus;
