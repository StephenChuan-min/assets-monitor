import React from 'react';
import PropTypes from 'reactPropTypes';
import { Spin } from '@/common';
import { clearEmpty } from '@/utils';
import Api from '@/utils/api/monitor-info/seizedUnbock';
import TableView from './table';

class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			current: 1,
			total: 0,
			loading: false,
		};
		this.condition = {
			isAttention: 1,
			sortColumn: '',
			sortOrder: '',
			page: 1,
			num: 10,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	// 排序触发
	onSortChange = (field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.toGetData();
	};

	// 当前页数变化
	onPageChange = (val) => {
		this.condition.page = val;
		this.toGetData();
	};

	// 表格发生变化
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 查询数据methods
	toGetData = () => {
		this.setState({ loading: true });
		const { reqUrl } = this.props;
		let toApi = Api.followList;
		toApi = reqUrl || toApi;
		toApi(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: [],
					current: 1,
					total: 0,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
	};

	render() {
		const {
			dataSource, current, total, loading,
		} = this.state;
		const { normal, noSort } = this.props;
		const tableProps = {
			noSort,
			normal,
			manage: false,
			dataSource,
			current,
			total,
			onRefresh: this.onRefresh,
			onSelect: () => {},
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortColumn,
		};
		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<TableView {...tableProps} />
				</Spin>
			</div>

		);
	}
}

TableIntact.propTypes = {
	normal: PropTypes.bool,
	noSort: PropTypes.bool,
};

TableIntact.defaultProps = {
	normal: true,
	noSort: true,
};

export default TableIntact;
