import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import { markRead } from '@/utils/api/message';
import TableTaxViolation from '@/views/risk-monitor/operation-risk/table/taxViolation';
import message from '@/utils/api/message/message';
import { Spin } from '@/common';
import { clearZero } from '@/utils';

class IllegalTaxation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			current: 1,
			total: props.total,
			page: 1,
			num: 5,
			loading: false,
			obligorId: props.obligorId,
		};
	}

	componentDidMount() {
		this.toGetData();
	}

	componentWillReceiveProps(nextProps) {
		const { obligorId } = this.props;
		if (nextProps.obligorId !== obligorId) {
			this.setState({
				obligorId: nextProps.obligorId,
			}, () => {
				this.toGetData();
			});
		}
	}

	// 请求监控列表数据
	toGetData = () => {
		const { stationId, dataType } = this.props;
		const { page, num, obligorId } = this.state;
		const reg = new RegExp(dataType);
		const api = message.filter(item => reg.test(item.dataType))[0].list;
		const params = {
			obligorId,
			stationId,
			page,
			num,
		};
		this.setState({
			loading: true,
		});
		api(clearZero(params)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			}
		}).catch((err) => {
			this.setState({
				loading: false,
			});
			console.log('err === ', err);
		});
	};

	// 刷新页面
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 行点击事件
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		if (!isRead) {
			markRead({ id }).then((res) => {
				if (res.code === 200) {
					this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 监听页脚变化
	onPageChange = (val) => {
		this.setState({
			page: val,
		}, () => {
			this.toGetData();
		});
	};

	render() {
		const {
			dataSource, current, total, loading,
		} = this.state;
		const tableProps = {
			noSort: true,
			dataSource,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			isShowPagination: total > 5,
			pageSize: 5,
			current,
			total,
		};
		return (
			<Spin visible={loading}>
				<TableTaxViolation {...tableProps} />
			</Spin>
		);
	}
}

IllegalTaxation.propTypes = {
	total: PropTypes.number,
	// eslint-disable-next-line react/forbid-prop-types
	obligorId: PropTypes.any,
	dataType: PropTypes.number,
	stationId: PropTypes.number,
};

IllegalTaxation.defaultProps = {
	total: 0,
	obligorId: undefined,
	dataType: 11201,
	stationId: 0,
};

export default IllegalTaxation;
