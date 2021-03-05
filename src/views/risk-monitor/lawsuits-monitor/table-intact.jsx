import React from 'react';
import API from '@/utils/api/risk-monitor/lawsuit';
import { Spin } from '@/common';
import { clearEmpty } from '@/utils';
import { TableCourt, TableTrial, TableJudgment } from './table';

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
		const { sourceType, curSourceObj } = this.props;
		if (curSourceObj) {
			Object.assign(curSourceObj, { page: 1 });
		}
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
		const { onPageChange, onBtnChange, curSourceObj } = this.props;
		if (onPageChange)onPageChange();
		if (curSourceObj) {
			Object.assign(curSourceObj, { isRedirect: true, page: 1 });
			if (onBtnChange)onBtnChange(curSourceObj);
		}
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

	// 当前页数变化
	onPageChange=(val) => {
		this.condition.page = val;
		this.toGetData();
		const { onPageChange, onBtnChange, curSourceObj } = this.props;
		if (onPageChange)onPageChange();
		if (curSourceObj) {
			Object.assign(curSourceObj, { isRedirect: true, page: val });
			if (onBtnChange)onBtnChange(curSourceObj);
		}
	};

	// 查询数据methods
	toGetData=(nextProps) => {
		this.setState({ loading: true });
		const {
			reqUrl, id, sourceType, curSourceObj,
		} = nextProps || this.props;
		if (curSourceObj) {
			this.condition.page = curSourceObj.page;
		}
		const toApi = reqUrl || API(sourceType, 'followList');
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

	render() {
		const {
			dataSource, current, total, loading,
		} = this.state;
		const { normal, noSort, sourceType } = this.props;
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
			sortOrder: this.condition.sortOrder,
		};

		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					{sourceType === 1 ? <TableTrial {...tableProps} /> : null}
					{sourceType === 2 ? <TableCourt {...tableProps} /> : null}
					{sourceType === 3 ? <TableJudgment {...tableProps} /> : null}
				</Spin>
			</div>

		);
	}
}
