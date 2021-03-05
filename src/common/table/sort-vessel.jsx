import React from 'react';

import order from '@/assets/img/icon/icon_arrow.png'; // 默认
import orderAsc from '@/assets/img/icon/icon_arrow_asc.png'; // 升序
import orderDesc from '@/assets/img/icon/icon_arrow_desc.png'; // 降序

export default class SortVessel extends React.Component {
	constructor(props) {
		super(props);
		// Get the default value 【 sortStatus 】
		this.state = {
			sortStatus: props.sortField === props.field ? props.sortOrder : 'order',
		};
	}

	componentWillReceiveProps(nextProps) {
		const { field } = this.props;
		const { sortStatus } = this.state;
		if (nextProps.sortField !== field && sortStatus !== 'order') {
			this.setState({
				sortStatus: 'order',
			});
		}
	}

	// , field, onClick, sortField, sortOrder,
	onSortField=() => {
		const { sortStatus } = this.state;
		const { field, onClick } = this.props;
		let _sortStatus = '';
		if (sortStatus === 'order')_sortStatus = 'DESC';
		if (sortStatus === 'DESC')_sortStatus = 'ASC';
		if (sortStatus === 'ASC') _sortStatus = 'order';
		this.setState({ sortStatus: _sortStatus });
		// console.log(field, _sortStatus, this.props);
		const r = _sortStatus === 'order';
		if (onClick) {
			onClick(r ? '' : field, r ? '' : _sortStatus);
		}
	};


	render() {
		const { children, mark, style } = this.props;
		const { sortStatus } = this.state;
		return (
			<div className="yc-table-sort-wrapper" onClick={this.onSortField} style={style}>
				{children}
				<span className="yc-title-mark">{mark}</span>
				{
					{
						order: <img src={order} alt="" className="yc-title-sort-img" />,
						DESC: <img src={orderDesc} alt="" className="yc-title-sort-img" />,
						ASC: <img src={orderAsc} alt="" className="yc-title-sort-img" />,
					}[sortStatus]
				}
			</div>
		);
	}
}
