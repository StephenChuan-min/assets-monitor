import React from 'react';
import api from '@/utils/api/monitor-info/finance';
import { Spin } from '@/common';
import { clearEmpty } from '@/utils';
import Table from './publicity';

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

	componentWillReceiveProps() {
		const { curSourceObj } = this.props;
		if (curSourceObj) {
			Object.assign(curSourceObj, { page: 1 });
		}
	}

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

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.page = 1;
		this.condition.sortOrder = order;
		this.toGetData();
		const { onPageChange, onBtnChange, curSourceObj } = this.props;
		if (onPageChange)onPageChange();
		if (curSourceObj) {
			Object.assign(curSourceObj, { isRedirect: true, page: 1 });
			if (onBtnChange)onBtnChange(curSourceObj);
		}
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
	toGetData=() => {
		this.setState({ loading: true });
		const { reqUrl, id, curSourceObj } = this.props;
		if (curSourceObj) {
			this.condition.page = curSourceObj.page;
		}
		const toApi = reqUrl || api.attentionListPub;
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
			sourceType: this.condition.sourceType,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<Table {...tableProps} />
				</Spin>
			</div>

		);
	}
}
