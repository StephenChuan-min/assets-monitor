import React from 'react';
import PropTypes from 'reactPropTypes';
import UnblockTable from '@/views/asset-excavate/seized-unblock/table/table-version';
import { toGetNumber } from '@/utils/promise';

class UnBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 10901),
		};
	}

	render() {
		const { count } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`查/解封资产 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<UnblockTable portrait="enterprise" condition={{ e: 'unblock' }} />
				</div>
			</div>
		);
	}
}

UnBlock.propTypes = {
	id: PropTypes.number,
};

UnBlock.defaultProps = {
	id: 10900,
};
export default UnBlock;
