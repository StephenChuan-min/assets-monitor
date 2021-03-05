import React from 'react';
import { Spin } from '@/common';
import { clearEmpty } from '@/utils';
import Api from '@/utils/api/monitor-info/public';
import TableBid from './table/bid';
import TableIllegal from './table/illegal';
import TablePunish from './table/punish';

export default class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
		};
		this.condition = {
			sortColumn: '',
			sortOrder: '',
			page: 1,
			num: 10,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	componentWillReceiveProps(nextProps) {
		const { sourceType } = this.props;
		if (sourceType !== nextProps.sourceType) {
			this.condition.sortColumn = '';
			this.condition.sortOrder = '';
			this.condition.page = 1;
			this.condition.sourceType = nextProps.sourceType;
			this.setState({
				dataSource: '',
				current: 1,
				total: 0,
			});
			this.toGetData(nextProps);
		}
	}

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.condition.page = 1;
		this.toGetData();
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.condition.page = val;
		this.toGetData();
		const { onPageChange } = this.props;
		if (onPageChange)onPageChange();
	};

	// 表格发生变化
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 查询数据methods
	toGetData=(nextProps) => {
		this.setState({ loading: true });
		const { sourceType, reqUrl, id } = nextProps || this.props;
		let toApi = '';
		if (sourceType === 1)toApi = Api.focusListBid;
		if (sourceType === 2)toApi = Api.focusListIllegal;
		if (sourceType === 3)toApi = Api.focusListPunish;
		toApi = reqUrl || toApi;
		toApi(clearEmpty(this.condition), id).then((res) => {
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

	// 获取DOM
	toGetDOM=(type) => {
		if (type === 1) return TableBid;
		if (type === 2) return TableIllegal;
		if (type === 3) return TablePunish;
		return TableBid;
	};

	render() {
		const {
			dataSource, current, total, loading,
		} = this.state;
		const { sourceType, normal, noSort } = this.props;
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
			sourceType: this.condition.sourceType,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortColumn,
		};
		const DOM = this.toGetDOM(sourceType);
		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<DOM {...tableProps} key={sourceType} />
				</Spin>
			</div>

		);
	}
}
